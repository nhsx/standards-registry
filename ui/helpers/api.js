import fetch from 'node-fetch';
import { stringify } from 'qs';
const CKAN_URL = process.env.CKAN_URL;

const typeMap = {
  'Technical standards and specifications': 'Technical specifications and APIs',
  'Record standard': 'Clinical and care record standards',
  'Data definitions and terminologies': 'Medical data and dictionaries',
  'Information code of practice and governance standard': 'Data governance and information'
};

// TODO: neaten
export function queriseSelections(selections) {
  const selectionsRef = { ...selections };
  const query = {};
  if (!selections) return;

  for (const prop in selections) {
    if (typeof selections[prop] === 'string') {
      selectionsRef[prop] = [selectionsRef[prop]];
    }
    // sanitise "Appointment / thing" => "Appointment"
    selectionsRef[prop] = selectionsRef[prop].map((i) => i.split(' ').shift());
    if (selectionsRef[prop].length) {
      query[prop] = `(*${selectionsRef[prop].join('* OR *')}*)`;
    } else {
      delete query[prop];
    }
  }
  return query;
}

// helper function for building SOLR Filter Queries into package_search
// e.g. // /package_search?fq=(care_setting:(*Dentistry*%20OR%20*Community*)%20OR%20business_use:(*Continuity*))
export function serialise(obj = {}) {
  if (Object.keys(obj).length === 0) {
    return;
  }
  const str = Object.keys(obj)
    .reduce((acc, key) => {
      acc.push(key + ':' + obj[key]);
      return acc;
    }, [])
    .join(' OR ');
  return `(${str})`;
}

export async function read({ id }) {
  const response = await fetch(`${CKAN_URL}/package_show?id=${id}`);
  const data = await response.json();
  if (typeMap[data.result.standard_category]) {
    data.result.standard_category = typeMap[data.result.standard_category];
  }
  return data.result;
}

export async function getPages() {
  const response = await fetch(`${CKAN_URL}/ckanext_pages_list`);
  const data = await response.json();
  return data.result;
}

export async function list({ page = 1, q, sort, filters }) {
  let sortstring, fq;
  const rows = 10;

  const start = (page - 1) * rows;
  // e.g.
  // sort=score desc, metadata_modified desc
  if (sort) {
    if (typeof sort === 'string') {
      sortstring = sort;
    } else {
      sortstring = Object.entries(sort)
        .map((i) => i.join(' '))
        .join(', ');
    }
  }

  fq = serialise(queriseSelections(filters));

  const query = `title:${q}~ OR ${q}`;
  const ckanQuery = stringify({ q: query, fq, rows, start, sort: sortstring });

  const response = await fetch(`${CKAN_URL}/package_search?${ckanQuery}`);
  const data = await response.json();
  data.result.results.forEach(record => {
    if (typeMap[record.standard_category]) {
      record.standard_category = typeMap[record.standard_category];
    }
  });
  return data.result;
}

export async function schema(dataset = 'dataset') {
  const response = await fetch(
    `${CKAN_URL}/scheming_dataset_schema_show?type=${dataset}`
  );
  const data = await response.json();



  const category = data.result.dataset_fields.find(field => field.field_name === 'standard_category');
  if (category) {
    category.choices.forEach(choice => {
      if (typeMap[choice.value]) {
        choice.label = typeMap[choice.value];
      }
    });
  }

  return data.result;
}

export async function filterSearch(query = '') {
  // /package_search?fq=(care_setting:(*Dentistry*%20OR%20*Community*)%20AND%20business_use:(*Continuity*))
  const response = await fetch(`${CKAN_URL}/package_search${query}`);

  const data = await response.json();
  return data.result;
}
