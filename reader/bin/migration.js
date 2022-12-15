#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { program, Option } from 'commander';
import { up, down, make } from '../lib/migrations';

program
  .name('migration tool')
  .description('CLI to migrate and rollback CKAN data migrations')
  .version('0.0.1');

program
  .command('make')
  .description(
    'Create a new timestamped migration file and corresponding tests'
  )
  .argument('<name> [string]', 'name of file')
  .action(make);

program
  .command('up')
  .description('Run any new migrations since last run')
  .option('--dry-run', 'Preview the migration results before persisting')
  .option('--force', 'Force rerun of migration')
  .addOption(
    new Option('-e, --env <string>', 'environment')
      .choices(['local', 'dev', 'test', 'prod'])
      .default('local')
  )
  .action(up);

program
  .command('down')
  .description('Roll back the last migration')
  .option('--dry-run [boolean]')
  .addOption(
    new Option('-e, --env <string>', 'environment')
      .choices(['local', 'dev', 'test', 'prod'])
      .default('local')
  )
  .action(down);

program.parse();
