import fetch from 'node-fetch';
import { stringify } from 'qs';
const CKAN_URL = process.env.CKAN_URL;

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
      query[prop] = `(*${selectionsRef[prop].join('* AND *')}*)`;
    } else {
      delete query[prop];
    }
  }
  return query;
}

// helper function for building SOLR Filter Queries into package_search
// e.g. // /package_search?fq=(care_setting:(*Dentistry*%20OR%20*Community*)%20AND%20business_use:(*Continuity*))
export function serialise(obj = {}) {
  if (Object.keys(obj).length === 0) {
    return;
  }
  let str = Object.keys(obj)
    .reduce((acc, key) => {
      acc.push(key + ':' + obj[key]);
      return acc;
    }, [])
    .join(' AND ');
  return `(${str})`;
}

export async function read({ id }) {
  const response = await fetch(`${CKAN_URL}/package_show?id=${id}`);
  const data = await response.json();
  return data.result;
}

export async function list({ page = 1, q, sort, query }) {
  let sortstring, fq;
  const rows = 10;

  const start = (page - 1) * rows;

  if (sort) {
    sortstring = `${sort.column} ${sort.order}`;
  }
  // TODO: figure out how to get q/rows etc from this
  fq = serialise(queriseSelections(query));

  const ckanQuery = stringify({ q, fq, rows, start, sort: sortstring });

  const response = await fetch(`${CKAN_URL}/package_search?${ckanQuery}`);
  const data = await response.json();

  return data.result;
}

export async function schema(dataset = 'dataset') {
  const response = await fetch(
    `${CKAN_URL}/scheming_dataset_schema_show?type=${dataset}`
  );
  const data = await response.json();
  return data.result;
}

export async function filterSearch(query = '') {
  // /package_search?fq=(care_setting:(*Dentistry*%20OR%20*Community*)%20AND%20business_use:(*Continuity*))
  const response = await fetch(`${CKAN_URL}/package_search${query}`);

  const data = await response.json();
  return data.result;
}
