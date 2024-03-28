import axios from 'axios';
import { stringify } from 'qs';
import { findKey } from 'lodash';
import filters from '../schema/filters';
const { CKAN_URL, PAGES_CKAN_URL } = process.env;

const DEFAULT_SORT = {
  score: 'desc',
  metadata_created: 'desc',
};

async function callApi(url) {
  try {
    const {
      data: { result },
    } = await axios.get(url);

    return result;
  } catch (err) {
    console.warn('error trying to call', url);
    console.error(err);
  }
}

export function queriseSelections(selections) {
  const selectionsRef = { ...selections };
  const query = {};
  if (!selections) return;

  for (const prop in selections) {
    if (typeof selections[prop] === 'boolean') {
      query[prop] = selectionsRef[prop];
      continue;
    }
    if (typeof selections[prop] === 'string') {
      selectionsRef[prop] = [selectionsRef[prop]];
    }
    if (selectionsRef[prop].length) {
      const join = `* ${(filters[prop] && filters[prop].type) || 'AND'} *`;
      query[prop] = `(*${selectionsRef[prop].join(join)}*)`;
    } else {
      delete query[prop];
    }
  }
  return query;
}

function getSearchQuery(q) {
  if (!q) {
    return undefined;
  }

  const searchPrefix = 'rs:'; // Prefix to indicate Lucene query syntax
  if (q.toLowerCase().startsWith(searchPrefix.toLowerCase())) {
    return q.slice(searchPrefix.length);
  }

  const pattern =
    /^(DAPB|ISB|DCB|SCCI)\s?[0-9]{4}\s?((Amd*|-)?\s?\d{2,4}\/?\d{0,4})?$/i;
  const isMatch = pattern.test(q);
  if (isMatch) {
    return `reference_code:"${q}"`;
  }

  let query = `(title:${q}~ OR ${q})`;

  const organisationMappings = {
    'professional-record-standards-body': [
      'prsb',
      'professional record standards body',
      'professional records standards body',
    ],
    'nhs-digital': ['nhs', 'nhsd', 'nhsx', 'nhs digital'],
  };

  const org = findKey(organisationMappings, (mappings) =>
    mappings.includes(q.toLowerCase())
  );

  if (org) {
    query = `(organization:${org} OR ${query})`;
  }

  return query;
}

export function serialise(obj = {}) {
  if (Object.keys(obj).length === 0) {
    return;
  }
  const str = Object.keys(obj)
    .reduce((acc, key) => {
      acc.push(key + ':' + obj[key]);
      return acc;
    }, [])
    .join(' AND ');
  return `(${str})`;
}

export async function read({ id }) {
  return callApi(`${CKAN_URL}/package_show?id=${id}`);
}

export async function getPages() {
  return callApi(`${PAGES_CKAN_URL}/ckanext_pages_list`);
}

export async function list(
  { page = 1, q, sort, inactive = false, orderBy, order, ...filters },
  futureAndPublished = false
) {
  if (!sort) {
    if (orderBy) {
      sort = {
        [orderBy]: order || 'asc',
      };
    } else {
      sort = DEFAULT_SORT;
    }
  }

  if (!q && !sort) {
    sort = {
      ['name']: 'asc',
    };
  }

  let sortstring, fq;
  const rows = 10;

  const start = (page - 1) * rows;

  if (typeof sort === 'string') {
    sortstring = sort;
  } else {
    sortstring = Object.entries(sort)
      .map((i) => i.join(' '))
      .join(', ');
  }

  if (!futureAndPublished) {
    filters.is_published_standard = !inactive;
  }

  fq = serialise(queriseSelections(filters));

  const query = getSearchQuery(q);
  const ckanQuery = stringify({ q: query, fq, rows, start, sort: sortstring });
  return callApi(`${CKAN_URL}/package_search?${ckanQuery}`);
}

export async function schema(dataset = 'dataset') {
  return callApi(`${CKAN_URL}/scheming_dataset_schema_show?type=${dataset}`);
}

export async function filterSearch(query = '') {
  return callApi(`${CKAN_URL}/package_search${query}`);
}
