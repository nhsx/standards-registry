import axios from 'axios';
import { findKey, isEqual } from 'lodash';

const mappings = {
  'in-development': [
    'draft',
    'in_development',
    'in-development',
    'In Development',
    'In development',
  ],
  active: ['active', 'Active'],
  deprecated: ['deprecated', 'Deprecated'],
  retired: ['retired', 'Retired'],
  'draft-in-progress': [
    'draft-in-progress',
    'draft_in_progress',
    'Draft in progress',
    'Draft in Progress',
  ],
  'awaiting-approval': [
    'awaiting',
    'awaiting-approval',
    'awaiting_approval',
    'Awaiting approval',
    'Awaiting Approval',
  ],
  proposed: ['proposed', 'Proposed'],
  'on-hold': ['on-hold', 'on_hold', 'On hold', 'On Hold'],
  cancelled: ['discontinued', 'Discontinued', 'cancelled', 'Cancelled'],
};

export function up(item) {
  const newStatus = findKey(mappings, (options) =>
    options.includes(item.status)
  );
  if (!newStatus) {
    throw new Error(`Mismatch: ${item.name}, ${item.status}`);
  }
  return {
    ...item,
    status: newStatus,
  };
}
