// Read the spreadsheet from google and parse into values ready for CKAN
import { readFile, writeFile } from 'fs/promises';
import { joinTitlesToValues, trimArr } from './index.js';

export const parseSheet = async ({
  readLocation = '../../sheet.json',
  parsedWriteLocation = 'parsed.json',
} = {}) => {
  const sheet = JSON.parse(
    await readFile(new URL(readLocation, import.meta.url))
  );
  const { values } = sheet;
  const headings = trimArr(values.shift());
  const parsed = values.map((vals) => joinTitlesToValues(headings, vals));
  await writeFile(parsedWriteLocation, JSON.stringify(parsed));
  return parsedWriteLocation;
};
