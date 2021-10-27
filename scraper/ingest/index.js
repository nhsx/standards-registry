require('dotenv').config('../.env');
const path = require('path');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const fetch = require('node-fetch');

const owners = {
  prsb: 'professional-record-standards-body',
  nhsd: 'nhs-digital',
  apic: 'nhs-digital'
};

const csv = fs.readFileSync(path.resolve(__dirname, '../standards.csv'));
const rows = parse(csv, { columns: true });

(async () => {
  for await (row of rows) {
    const name = row.title.toLowerCase().replace(/[^a-z ]/g, '').replace(/ /g, '-');
    try {
      const response = await fetch(`${process.env.CKAN_URL}/api/3/action/package_show?id=${name}`);
      const data = await response.json();

      const params = {
        name,
        title: row.title,
        url: row.url,
        notes: row.description,
        owner_org: owners[row.owner],
        resources: [
          { url: row.url }
        ],
        extras: [
          { key: 'status', value: 'active' }
        ]
      };

      const endpoint = data.success ? `/api/3/action/package_update?id=${name}` : '/api/3/action/package_create';
      const action = data.success ? 'Updated' : 'Created';
      const ingest = await fetch(`${process.env.CKAN_URL}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          Authorization: process.env.API_KEY,
          'Content-Type': 'application/json'
        }
      });
      const ingestData = await ingest.json();
      if (ingestData.success) {
        console.log(`${action} "${row.title}"`);
      } else {
        console.log(`Failed to ingest: ${name}`);
        console.log(ingestData);
      }
    } catch(e) {
      console.log(`Failed to ingest: ${name}`);
      //console.log(e.stack);
    }
  };
})();
