#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function createMigration(name) {
  const timestamp = Date.now();
  const filename = `${timestamp}-${name}`;

  fs.writeFileSync(path.join(process.cwd(), `./lib/migrations/lib/${filename}.js`), '')
  fs.writeFileSync(path.join(process.cwd(), `./lib/migrations/__tests__/${filename}.test.js`), '')
}

const [name] = process.argv.slice(2);
createMigration(name)