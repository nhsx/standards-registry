import fetch from 'node-fetch';
import 'dotenv/config';
import ObjectsToCsv from 'objects-to-csv';
import { writeFile } from 'fs/promises';

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
      console.info('response from ckan', data);
      return console.error(`failed read from ckan using ${listEndpoint}`);
    }

    const csv = new ObjectsToCsv(results);
    const jsonFile = `test.json`;
    const fileToSave = `test.csv`;

    // Save to file:
    await writeFile(`./${jsonFile}`, JSON.stringify(results));
    await csv.toDisk(`./${fileToSave}`);
    console.info(`saved result with ${count} records to ${fileToSave}`);
  } catch (e) {
    console.info(`failed to write out records to csv`);
    console.error(e);
  }
};

getAllDataSets();
