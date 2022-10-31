import { writeToCKAN } from './lib/write/index.js';
import { program, Option } from 'commander';
import fetch from 'node-fetch';

const logo = `
[49m[K[0m
  [2C[48;5;32m                                              [49m
  [2C[48;5;32m     [48;5;231m     [48;5;32m     [48;5;231m   [48;5;32m  [48;5;231m    [48;5;32m     [48;5;231m    [48;5;32m  [48;5;231m         [48;5;32m  [49m
  [2C[48;5;32m    [48;5;231m      [48;5;32m    [48;5;231m    [48;5;32m [48;5;231m    [48;5;32m     [48;5;231m    [48;5;32m [48;5;231m          [48;5;32m   [49m
  [2C[48;5;32m    [48;5;231m       [48;5;32m   [48;5;231m    [48;5;32m [48;5;231m    [48;5;32m     [48;5;231m    [48;5;32m [48;5;231m    [48;5;32m         [49m
  [2C[48;5;32m   [48;5;231m    [48;5;32m [48;5;231m    [48;5;32m [48;5;231m    [48;5;32m  [48;5;231m            [48;5;32m  [48;5;231m        [48;5;32m     [49m
  [2C[48;5;32m   [48;5;231m    [48;5;32m  [48;5;231m   [48;5;32m [48;5;231m    [48;5;32m [48;5;231m             [48;5;32m     [48;5;231m       [48;5;32m   [49m
  [2C[48;5;32m  [48;5;231m    [48;5;32m   [48;5;231m       [48;5;32m  [48;5;231m    [48;5;32m     [48;5;231m    [48;5;32m        [48;5;231m    [48;5;32m   [49m
  [2C[48;5;32m  [48;5;231m    [48;5;32m    [48;5;231m      [48;5;32m [48;5;231m    [48;5;32m     [48;5;231m    [48;5;32m  [48;5;231m          [48;5;32m    [49m
  [2C[48;5;32m  [48;5;231m   [48;5;32m     [48;5;231m      [48;5;32m [48;5;231m    [48;5;32m     [48;5;231m    [48;5;32m [48;5;231m         [48;5;32m      [49m
  [2C[48;5;32m                                              [49m
  [0m  
`;

program
  .name('write-json-to-ckan')
  .description(
    `Takes a JSON file of records from one CKAN environment and writes them to another
    
    e.g. to pull records down from the test env and write to prod:
    
    $ node write-json-to-ckan.js --from 'https://2gv8f9zmci.execute-api.eu-west-2.amazonaws.com/dev/get?key={apiKey}&env=https://manage.test.standards.nhs.uk/api/action' --wrtite-location dev
    `
  )
  .version('0.0.0')
  .requiredOption(
    '-f, --from <url>',
    'you must specify a CKAN package json download endpoint, e.g. https://2gv8f9zmci.execute-api.eu-west-2.amazonaws.com/dev/get?key={key}&env=https://manage.test.standards.nhs.uk/api/action'
  )
  .addOption(
    new Option(
      '-w, --write-location <local|dev|test|prod>',
      'environment to write to'
    ).choices(['local', 'dev', 'test', 'prod'])
  )
  .option('--dry-run <bool>', 'set dry-run', false);

program.addHelpText('beforeAll', logo);

program.parse();
const opts = program.opts();

const { from: location } = opts;
console.log(logo);
console.log(`fetching records from
${location}`);

// map dev,test,prod to nhs domains
const mapEnv = (to) =>
  to === 'local'
    ? 'http://localhost:5005/api/action'
    : `https://manage.${to.replace(
        'prod',
        ''
      )}.standards.nhs.uk/api/action`.replace('..', '.');

const res = await fetch(location);
const data = await res.json();
await writeToCKAN({
  data, // write directly with json data
  ckanUrl: mapEnv(opts.writeLocation),
  dryRun: opts.dryRun,
});
