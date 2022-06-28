import { readFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import { mergeRecord } from '../merge-record/index.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import slugify from 'slugify';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = dotenv.config('./.env').parsed;

const startTime = new Date();
const logTitle = `log-${startTime.toISOString()}.txt`;
const logStream = createWriteStream(path.resolve(`./logs/${logTitle}`), {
  flags: 'a',
});

const report = {
  total: 1,
  successes: 0,
  failures: 0,
};

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const writeRecord = async ({ record, headers, ckanUrl, dryRun } = {}) => {
  await sleep(150); //sleep .15s between hits to the api

  const { title, reference_code } = record;
  // Slugify titles in a similar fashion to CKAN auto-slug
  const name = slugify(title, { lower: true, strict: true });
  console.log('\n * Processing record:\n  ', title);
  const params = {
    ...record,
    ...{
      name,
      mandated: !!reference_code,
    },
  };
  let recordToWrite = params;

  if (dryRun) {
    console.log('DRY RUN:');
    console.log('DRY RUN: RECORD ENTRY', record);
    return;
  }

  try {
    const lookup =
      `${ckanUrl}/package_show?` +
      new URLSearchParams({
        id: name,
      });

    console.log(` * Searching for ${lookup}`);
    const response = await fetch(lookup, {
      headers,
    });
    const check = await response.json();
    const endpoint = check.success
      ? `/package_patch?id=${name}`
      : '/package_create';
    if (check.success) {
      const { result: ckanResult } = check;
      // combine response and params
      recordToWrite = mergeRecord(ckanResult, params);
    }
    const action = check.success ? 'Patch' : 'Create';

    console.log(` * About to ${action} ${ckanUrl}${endpoint}`);
    console.log(' * Writing record', recordToWrite);

    const write = await fetch(`${ckanUrl}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(recordToWrite),
      headers,
    });

    const writeData = await write.json();
    const { success } = writeData;

    const statusStr = success ? 'successful' : 'unsuccessful';
    const message = ` * ${action} for "${title}" ${statusStr}\n`;
    const time = new Date();

    (success && report.successes++) || report.failures++;
    report.total++;

    console.log(message);

    logStream.write(`
    ${time.toUTCString()}
    ${message}
    ${JSON.stringify(writeData)}
    ----
    `);
  } catch (e) {
    console.error(e);
    console.log(`Error trying whilst working on ${title}`);
    console.log(e.stack);
  }
};

const readSheet = async (fileLocation) => {
  console.log('reading from', path.join(__dirname, '../../', fileLocation));
  const sheet = JSON.parse(
    await readFile(path.join(__dirname, '../../', fileLocation))
  );
  console.log(`From ${fileLocation}, got sheet with ${sheet.length} records`);
  return sheet;
};

export const writeToCKAN = async ({
  dryRun = false,
  ckanUrl = config.CKAN_URL,
  ckanApiKey = config.CKAN_API_KEY,
  fileLocation = './test.json',
  data = null,
} = {}) => {
  const headers = {
    Authorization: ckanApiKey,
    'Content-Type': 'application/json',
  };

  const results = data ? data.result.results : await readSheet(fileLocation);

  for (const record of results) {
    await writeRecord({ record, headers, ckanUrl, dryRun });
  }
  logStream.write(`
      -----------------------------
      Final report
      -----------------------------
      Total records processed: ${report.total}
      Successes: ${report.successes}
      Failures: ${report.failures}
      Time taken: ${(new Date() - startTime) / 1000}s
      -----------------------------
      `);
  logStream.end();
};
