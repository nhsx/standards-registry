import fetch from 'node-fetch';
import 'dotenv/config';
import ObjectsToCsv from 'objects-to-csv';

const { CKAN_URL: ckanUrl, CKAN_API_KEY: ckanApiKey } = process.env;

const getAllDataSets = async () => {
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
      console.log(data);
      return console.error(`failed read from ckan using ${listEndpoint}`);
    }

    const csv = new ObjectsToCsv(results);
    const fileToSave = `test.csv`;

    // Save to file:
    const writing = await csv.toDisk(`./${fileToSave}`);
    console.log(`saved result with ${count} records to ${fileToSave}`);
    //   console.log(await csv.toString());
  } catch (e) {
    console.log(`failed to write out records to csv`);
    console.error(e);
  }
};

getAllDataSets();
