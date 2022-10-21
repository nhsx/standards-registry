import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { uniq, get } from 'lodash'
import minimist from 'minimist';
import cache from './cache.json';
import config from './config';

const argv = minimist(process.argv.slice(2));
const dir = fs.readdirSync(path.join(__dirname, './lib'));

const env = argv['env'] || 'local';

const { ckanUrl, ckanToken } = config[env];
const alreadyRun = get(cache, env, [])

const promises = dir.filter(d => argv['force'] || !alreadyRun.includes(d)).map(async filename => {
  const migration = await import(`./lib/${filename}`);

  let success = false;

  try {
    await migration.run({ dryRun: argv['dry-run'], ckanUrl, ckanToken });
    success = true
  } catch (err) {
    console.log(err)
    success = false;
  }

  return {
    migration: filename,
    success
  }

});

(async () => {
  const results = await Promise.all(promises)

  const toCache = results
    .filter(item => item.success)
    .map(item => item.migration);

  if (argv['dry-run']) {
    return;
  }

  fs.writeFileSync(
    path.join(__dirname, './cache.json'),
    JSON.stringify(
      {
        ...cache,
        [env]: uniq([ ...alreadyRun, ...toCache ]),
      },
      null,
      2
    ))
})()