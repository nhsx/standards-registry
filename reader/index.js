import dotenv from 'dotenv';
import path from 'path';
import { google } from 'googleapis';

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
    range: 'A1:AQ186',
  });
  console.log(res);
  const { values } = res.data;
  console.log(values[0]);
  console.log(values[1]);
  // values.map((i) => console.log('val', i));
} catch (err) {
  console.error(err);
}

// // wmail=	marvell-metas@ckan-metas.iam.gserviceaccount.com

// const config = dotenv.config('./env').parsed;
// const apiKey = config.API_KEY;
// // const readerOptions = {
// //   apiKey,
// //   sheetId,
// //   range: 'A1:AQ186',
// //   returnAllResults: false,
// // };
// const sheets = google.sheets({
//   version: 'v4',
//   auth: {
//     apiKey,
//   },
// });
// const clientId = 'ckan-metas';

// sheets.spreadsheets.values.get(
//   {
//     apiKey,
//     spreadsheetId,
//     range: 'Class Data!A2:E10',
//   },
//   (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const rows = res.data.values;
//     if (rows.length) {
//       // console.log('Name, Major:');
//       // Print columns A and E, which correspond to indices 0 and 4.
//       rows.map((row) => {
//         console.log(`${row[0]}, ${row[4]}`);
//       });
//     } else {
//       console.log('No data found.');
//     }
//   }
// );
