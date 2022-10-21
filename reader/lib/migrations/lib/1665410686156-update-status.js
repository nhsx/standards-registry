import axios from 'axios';
import { findKey, isEqual } from 'lodash'

const mappings = {
  'in-development': [
    'draft',
    'in_development',
    'in-development',
    'In Development',
    'In development'
  ],
  'active': [
    'active',
    'Active'
  ],
  'deprecated': [
    'deprecated',
    'Deprecated'
  ],
  'retired': [
    'retired',
    'Retired'
  ],
  'draft-in-progress': [
    'draft-in-progress',
    'draft_in_progress',
    'Draft in progress',
    'Draft in Progress'
  ],
  'awaiting-approval': [
    'awaiting',
    'awaiting-approval',
    'awaiting_approval',
    'Awaiting approval',
    'Awaiting Approval'
  ],
  'proposed': [
    'proposed',
    'Proposed'
  ],
  'on-hold': [
    'on-hold',
    'on_hold',
    'On hold',
    'On Hold'
  ],
  'cancelled': [
    'discontinued',
    'Discontinued',
    'cancelled',
    'Cancelled'
  ]
}

export function migrate(item) {
  const newStatus = findKey(mappings, options => options.includes(item.status));
  if (!newStatus) {
    throw new Error(`Mismatch: ${item.name}, ${item.status}`)
  }
  return {
    ...item,
    status: newStatus
  }
}

export async function run({ dryRun = false, ckanUrl, ckanToken } = {}) {
  const headers = {
    Authorization: ckanToken,
    'Content-Type': 'application/json',
  };

  // upper limit 1000 rows
  const { data } = await axios.get(`${ckanUrl}/package_search?rows=1000`);

  const { results } = data.result;
  const mappedResults = results.map(migrate);
  const toPatch = mappedResults.filter((item, i) => !isEqual(item, results[i]));

  if (dryRun) {
    console.log(`Dry run. ${toPatch.length} records to be patched`);
    console.log(`Run migrate again without --dry-run flag to update records`);
    return;
  }

  const promises = toPatch.map(async record => {
    const res = await axios.post(`${ckanUrl}/package_patch?id=${record.name}`, record, { headers })
  });

  try {
    await Promise.all(promises)
  } catch (err) {
    throw new Error(err.response.data)
  }

};