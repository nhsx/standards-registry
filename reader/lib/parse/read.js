// Read the spreadsheet from google and parse into values ready for CKAN
import { readFile, writeFile } from 'fs/promises';
import { joinTitlesToValues, prepHeadings } from './index.js';

export const parseSheet = async (fileLocation = '../sheet.json') => {
  const sheet = JSON.parse(
    await readFile(new URL(fileLocation, import.meta.url))
  );
  const { values } = sheet;
  const headings = prepHeadings(values.shift());
  const parsed = values.map((vals) => joinTitlesToValues(headings, vals));
  console.log('Parsed sheet', parsed);
  return await writeFile('parsed.json', JSON.stringify(parsed));
};
