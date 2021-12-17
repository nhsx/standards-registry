import { readFile, writeFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import slugify from 'slugify';

const config = dotenv.config('./.env').parsed;
const { CKAN_URL, CKAN_API_KEY } = config;
const sheet = JSON.parse(
  await readFile(new URL('./parsed.json', import.meta.url))
);

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startTime = new Date();
const logTitle = `log-${startTime.toISOString()}.txt`;
const logStream = createWriteStream(logTitle, { flags: 'a' });
const report = {
  total: 1,
  successes: 0,
  failures: 0,
};
(async () => {
  for (const record of sheet) {
    await sleep(150); //sleep .15s between hits to the api

    const { title } = record;
    // Slugify titles in a similar fashion to CKAN auto-slug
    const name = slugify(title, { lower: true, strict: true });
    console.log('Proecessing record:', title);

    const params = {
      ...record,
      ...{
        name,
        owner_org: 'nhs-digital',
      },
    };

    try {
      const lookup =
        `${CKAN_URL}/package_show?` +
        new URLSearchParams({
          id: name,
        });

      console.log(`searching for ${lookup}`);
      const response = await fetch(lookup);
      const check = await response.json();

      console.log('check response:', check);

      const endpoint = check.success
        ? `/package_update?id=${title}`
        : '/package_create';
      const action = check.success ? 'Update' : 'Create';

      console.log(`about to write to  ${process.env.CKAN_URL}${endpoint}`);

      const write = await fetch(`${process.env.CKAN_URL}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          Authorization: CKAN_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      const writeData = await write.json();
      const { success } = writeData;
      const statusStr = success ? 'successful' : 'unsuccessful';
      const message = `${action} for "${title}" ${statusStr}`;
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
      console.log(`Error trying whilst working on ${title}`);
      console.log(e.stack);
    }
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
})();
