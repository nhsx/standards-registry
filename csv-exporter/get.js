const ObjectsToCsv = require('objects-to-csv');
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

    const csv = await new ObjectsToCsv(results).toString();
    const fileToSave = `test.csv`;

    // Save to file:
    // await csv.toDisk(`./${fileToSave}`);
    const info = { count };
    console.info(`saved result with ${count} records to ${fileToSave}`);
    return { json: results, csv: csv.toString(), info };
  } catch (e) {
    console.info(`failed to write out records to csv`);
    console.error(e);
  }
};
