import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { uniq, get, isEqual, difference } from 'lodash';
import cache from './cache.json';
import config from './config';
import axios from 'axios';

export async function runMigration({
  migrate,
  dryRun = false,
  ckanUrl,
  ckanToken,
  filename,
} = {}) {
  const headers = {
    Authorization: ckanToken,
    'Content-Type': 'application/json',
  };

  // upper limit 1000 rows
  const { data } = await axios.get(`${ckanUrl}/package_search?rows=1000`);
  const { results } = data.result;
  const mappedResults = results.map(migrate);
  const toPatch = mappedResults.filter((item, i) => !isEqual(item, results[i]));

  console.log(`Running migration: ${filename}`);
  if (dryRun) {
    console.log(`Dry run. ${toPatch.length} records to be patched`);
    console.log(`Run migrate again without --dry-run flag to update records`);
    return;
  }

  const promises = toPatch.map(async (after) => {
    const res = await axios.post(
      `${ckanUrl}/package_patch?id=${after.name}`,
      after,
      { headers }
    );
    console.log(`done patching ${after.name}`);
    const before = results.find((r) => r.name === after.name);

    const diff = {};

    Object.keys(after).forEach((key) => {
      const b = before[key];
      const a = after[key];
      if (!isEqual(a, b)) {
        diff[key] = b;
      }
    });

    return {
      name: after.name,
      diff,
    };
  });

  return Promise.all(promises);
}

export async function make(name) {
  const timestamp = Date.now();
  const filename = `${timestamp}-${name}`;

  const TEMPLATE_MIGRATION = fs
    .readFileSync(
      path.join(__dirname, './templates/migration.template.js'),
      'utf8'
    )
    .replace(/{{FILENAME}}/g, filename);
  const TEMPLATE_TEST = fs
    .readFileSync(path.join(__dirname, './templates/test.template.js'), 'utf8')
    .replace(/{{FILENAME}}/g, filename);

  fs.writeFileSync(
    path.join(__dirname, `./lib/${filename}.js`),
    TEMPLATE_MIGRATION
  );
  fs.writeFileSync(
    path.join(__dirname, `./__tests__/${filename}.test.js`),
    TEMPLATE_TEST
  );
}

export async function up({ env = 'local', force = false, dryRun = false }) {
  const dir = fs.readdirSync(path.join(__dirname, './lib'));

  const { ckanUrl, ckanToken } = config[env];
  const cacheItems = get(cache, env, []);

  const toRun = dir.filter(
    (d) => force || !cacheItems.map((c) => c.migration).includes(d)
  );

  if (!toRun.length) {
    console.log('Migrations up to date');
    return;
  }

  const promises = toRun.map(async (filename) => {
    const migration = await import(`./lib/${filename}`);

    let success = false;

    let changes = [];

    try {
      changes = await runMigration({
        migrate: migration.up,
        dryRun,
        ckanUrl,
        ckanToken,
        filename,
      });
      console.log(`${filename} completed successfully`);
      success = true;
    } catch (err) {
      console.log(err?.response?.data?.error);
      console.log(`${filename} failed`);
      success = false;
    }

    return {
      migration: filename,
      success,
      changes,
    };
  });

  const results = await Promise.all(promises);

  const toCache = results.filter((item) => item.success);

  if (dryRun) {
    return;
  }

  fs.writeFileSync(
    path.join(__dirname, './cache.json'),
    JSON.stringify(
      {
        ...cache,
        [env]: [...cacheItems, ...toCache],
      },
      null,
      2
    )
  );
}

export async function down({ env = 'local', force = false, dryRun = false }) {
  const dir = fs.readdirSync(path.join(__dirname, './lib'));

  const { ckanUrl, ckanToken } = config[env];
  const cacheItems = get(cache, env, []);

  const lastMigration = cacheItems.pop();

  if (!lastMigration) {
    console.log('No migration found to roll back');
    return;
  }

  const headers = {
    Authorization: ckanToken,
    'Content-Type': 'application/json',
  };

  const promises = lastMigration.changes.map(async (item) => {
    const { name, diff } = item;
    const { data } = await axios.get(`${ckanUrl}/package_show?id=${name}`);
    const result = Object.assign({}, data.result, diff);
    const res = await axios.post(
      `${ckanUrl}/package_patch?id=${name}`,
      result,
      { headers }
    );
    console.log(`done patching ${name}`);
  });

  try {
    await Promise.all(promises);
    console.log('Rolled back migration successfully');
    fs.writeFileSync(
      path.join(__dirname, './cache.json'),
      JSON.stringify(
        {
          ...cache,
          [env]: cacheItems,
        },
        null,
        2
      )
    );
  } catch (err) {
    console.log('Error rolling back migration');
    console.log(err?.response?.data?.error);
  }
}
