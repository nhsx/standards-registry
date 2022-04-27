import { google } from 'googleapis';
import { writeFile } from 'fs/promises';
import { parseSheet } from './lib/parse/read.js';
import { writeToCKAN } from './lib/write/index.js';

const spreadsheetId = '1ulj3WY6Nvr9LCHY84SFjtLLgCLweMA75Bvp3dcsLzGQ';

const authenticate = async () => {
  // If modifying these scopes, delete token.json.
  const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
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
  const { config } = res;
  const { values } = res.data;

  console.log(
    `Pulled down sheet "${options.spreadsheetId}" 
From ${config.url}
Found: ${values.length} entries in ${res.data.majorDimension} across range ${res.data.range}`
  );
  console.log('Headings from sheet:', values[0]);
  // TODO:
  // Should we avoid making a write/read here and just parse the json values?
  await writeFile('sheet.json', JSON.stringify(res.data));
  const parsedFileLocation = await parseSheet();
  console.log('sending ', parsedFileLocation);
  await writeToCKAN({
    fileLocation: `./${parsedFileLocation}`,
    dryRun: true,
  });
} catch (err) {
  console.error(err);
}
