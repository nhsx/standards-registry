import { up } from '../lib/1665410686156-update-status';
import { fromCkan } from './__fixtures__';

describe('update status', () => {
  test('Maps in-development statuses', () => {
    expect(up({ ...fromCkan, status: 'draft' })).toEqual({
      ...fromCkan,
      status: 'in-development',
    });
    expect(up({ ...fromCkan, status: 'in_development' })).toEqual({
      ...fromCkan,
      status: 'in-development',
    });
    expect(up({ ...fromCkan, status: 'in-development' })).toEqual({
      ...fromCkan,
      status: 'in-development',
    });
    expect(up({ ...fromCkan, status: 'In Development' })).toEqual({
      ...fromCkan,
      status: 'in-development',
    });
    expect(up({ ...fromCkan, status: 'In development' })).toEqual({
      ...fromCkan,
      status: 'in-development',
    });
  });

  test('Maps active statuses', () => {
    expect(up({ ...fromCkan, status: 'active' })).toEqual({
      ...fromCkan,
      status: 'active',
    });
    expect(up({ ...fromCkan, status: 'Active' })).toEqual({
      ...fromCkan,
      status: 'active',
    });
  });

  test('Maps deprecated statuses', () => {
    expect(up({ ...fromCkan, status: 'deprecated' })).toEqual({
      ...fromCkan,
      status: 'deprecated',
    });
    expect(up({ ...fromCkan, status: 'Deprecated' })).toEqual({
      ...fromCkan,
      status: 'deprecated',
    });
  });

  test('Maps retired statuses', () => {
    expect(up({ ...fromCkan, status: 'retired' })).toEqual({
      ...fromCkan,
      status: 'retired',
    });
    expect(up({ ...fromCkan, status: 'Retired' })).toEqual({
      ...fromCkan,
      status: 'retired',
    });
  });

  test('Maps draft-in-progress statuses', () => {
    expect(up({ ...fromCkan, status: 'draft-in-progress' })).toEqual({
      ...fromCkan,
      status: 'draft-in-progress',
    });
    expect(up({ ...fromCkan, status: 'draft_in_progress' })).toEqual({
      ...fromCkan,
      status: 'draft-in-progress',
    });
    expect(up({ ...fromCkan, status: 'Draft in progress' })).toEqual({
      ...fromCkan,
      status: 'draft-in-progress',
    });
    expect(up({ ...fromCkan, status: 'Draft in Progress' })).toEqual({
      ...fromCkan,
      status: 'draft-in-progress',
    });
  });

  test('Maps awaiting-approval statuses', () => {
    expect(up({ ...fromCkan, status: 'awaiting' })).toEqual({
      ...fromCkan,
      status: 'awaiting-approval',
    });
    expect(up({ ...fromCkan, status: 'awaiting-approval' })).toEqual({
      ...fromCkan,
      status: 'awaiting-approval',
    });
    expect(up({ ...fromCkan, status: 'awaiting_approval' })).toEqual({
      ...fromCkan,
      status: 'awaiting-approval',
    });
    expect(up({ ...fromCkan, status: 'Awaiting approval' })).toEqual({
      ...fromCkan,
      status: 'awaiting-approval',
    });
    expect(up({ ...fromCkan, status: 'Awaiting Approval' })).toEqual({
      ...fromCkan,
      status: 'awaiting-approval',
    });
  });

  test('Maps proposed statuses', () => {
    expect(up({ ...fromCkan, status: 'proposed' })).toEqual({
      ...fromCkan,
      status: 'proposed',
    });
    expect(up({ ...fromCkan, status: 'Proposed' })).toEqual({
      ...fromCkan,
      status: 'proposed',
    });
  });

  test('Maps on-hold statuses', () => {
    expect(up({ ...fromCkan, status: 'on-hold' })).toEqual({
      ...fromCkan,
      status: 'on-hold',
    });
    expect(up({ ...fromCkan, status: 'on_hold' })).toEqual({
      ...fromCkan,
      status: 'on-hold',
    });
    expect(up({ ...fromCkan, status: 'On hold' })).toEqual({
      ...fromCkan,
      status: 'on-hold',
    });
    expect(up({ ...fromCkan, status: 'On Hold' })).toEqual({
      ...fromCkan,
      status: 'on-hold',
    });
  });

  test('Maps cancelled statuses', () => {
    expect(up({ ...fromCkan, status: 'cancelled' })).toEqual({
      ...fromCkan,
      status: 'cancelled',
    });
    expect(up({ ...fromCkan, status: 'discontinued' })).toEqual({
      ...fromCkan,
      status: 'cancelled',
    });
    expect(up({ ...fromCkan, status: 'Discontinued' })).toEqual({
      ...fromCkan,
      status: 'cancelled',
    });
    expect(up({ ...fromCkan, status: 'Cancelled' })).toEqual({
      ...fromCkan,
      status: 'cancelled',
    });
  });
});
