import dotenv from 'dotenv';
import path from 'path';
import { google } from 'googleapis';
import { writeFile } from 'fs/promises';
import { parseSheet } from './lib/parse/read.js';
import { writeToCKAN } from './lib/write.js';

// If modifying these scopes, delete token.json.
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const spreadsheetId = '1ulj3WY6Nvr9LCHY84SFjtLLgCLweMA75Bvp3dcsLzGQ';

const authenticate = async () => {
  const gorth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes,
  });
  const auth = await gorth.getClient();
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });
  return { sheets };
};

try {
  const options = {
    spreadsheetId,
    range: 'standards', // NB: this the name of the spreadsheet, but can be modified to a range like range: 'A1:AQ186',
  };
  const { sheets } = await authenticate();
  const res = await sheets.spreadsheets.values.get(options);
  const { values } = res.data;

  console.log('Pulled down sheet', options);
  console.log(values[0]);

  const ckanApiKey = process.env.CKAN_API_KEY;
  const ckanUrl = process.env.CKAN_URL;
  await writeFile('sheet.json', JSON.stringify(res.data));
  await parseSheet();
  await writeToCKAN({ ckanApiKey, ckanUrl });
} catch (err) {
  console.error(err);
}
