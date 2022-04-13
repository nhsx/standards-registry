const fetch = require('node-fetch');

module.exports = async function getAllDataSets(ckanUrl, ckanApiKey) {
  // Authentication allows unpublished and draft sets in results
  const headers = {
    Authorization: ckanApiKey,
  };
  const listEndpoint = `${ckanUrl}/package_search?include_private=true&include_drafts=true&rows=1000`;

  try {
    const response = await fetch(listEndpoint, {
      method: 'GET',
      headers,
    });
    const data = await response.json();

    const { success } = data;
    const { results, count } = data.result;

    if (!success) {
      console.info('response from ckan', data);
      return console.error(`failed read from ckan using ${listEndpoint}`);
    }

    return { results, count };
  } catch (e) {
    console.info(`failed to write out records to csv`);
    console.error(e);
  }
};
