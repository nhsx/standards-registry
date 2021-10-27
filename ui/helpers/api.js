import { stringify } from 'qs';
const CKAN_URL = process.env.CKAN_URL;

export async function read({ id }) {
  const response = await fetch(`${CKAN_URL}/package_show?id=${id}`);
  const data = await response.json();
  return data.result;
}

export async function list({ page = 1, q }) {
  const rows = 10;

  const start = (page - 1) * rows

  const query = stringify({ q, rows, start });

  const response = await fetch(`${CKAN_URL}/package_search?${query}`)
  const data = await response.json();

  return data.result;
}
