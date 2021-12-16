// Read the spreadsheet from google and parse into values ready for CKAN

import { readFile } from 'fs/promises';
import { joinTitlesToValues, prepHeadings } from './index.js';

const sheet = JSON.parse(
  await readFile(new URL('../sheet.json', import.meta.url))
);
const { values } = sheet;

const headings = prepHeadings(values.shift());
const parsed = values.map((vals) => joinTitlesToValues(headings, vals));

console.log(parsed);
