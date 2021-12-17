import dotenv from 'dotenv';
import path from 'path';
import { google } from 'googleapis';
import { writeFile } from 'fs/promises';

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
  const { sheets } = await authenticate();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    // range: 'A1:AQ186',
    // NB: this the name of the spreadsheet
    range: 'standards',
  });
  console.log(res);

  const { values } = res.data;

  console.log(values[0]);

  await writeFile('sheet.json', JSON.stringify(res.data));
} catch (err) {
  console.error(err);
}
