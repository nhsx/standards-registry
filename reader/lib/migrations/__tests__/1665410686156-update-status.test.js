import { migrate } from '../lib/1665410686156-update-status';
import { fromCkan } from './__fixtures__';

describe('update status', () => {
  test('Maps in-development statuses', () => {
    expect(migrate({ ...fromCkan, status: 'draft' })).toEqual({ ...fromCkan, status: 'in-development' });
    expect(migrate({ ...fromCkan, status: 'in_development' })).toEqual({ ...fromCkan, status: 'in-development' });
    expect(migrate({ ...fromCkan, status: 'in-development' })).toEqual({ ...fromCkan, status: 'in-development' });
    expect(migrate({ ...fromCkan, status: 'In Development' })).toEqual({ ...fromCkan, status: 'in-development' });
    expect(migrate({ ...fromCkan, status: 'In development' })).toEqual({ ...fromCkan, status: 'in-development' });
  });

  test('Maps active statuses', () => {
    expect(migrate({ ...fromCkan, status: 'active' })).toEqual({ ...fromCkan, status: 'active' });
    expect(migrate({ ...fromCkan, status: 'Active' })).toEqual({ ...fromCkan, status: 'active' });
  });

  test('Maps deprecated statuses', () => {
    expect(migrate({ ...fromCkan, status: 'deprecated' })).toEqual({ ...fromCkan, status: 'deprecated' });
    expect(migrate({ ...fromCkan, status: 'Deprecated' })).toEqual({ ...fromCkan, status: 'deprecated' });
  });

  test('Maps retired statuses', () => {
    expect(migrate({ ...fromCkan, status: 'retired' })).toEqual({ ...fromCkan, status: 'retired' });
    expect(migrate({ ...fromCkan, status: 'Retired' })).toEqual({ ...fromCkan, status: 'retired' });
  });

  test('Maps draft-in-progress statuses', () => {
    expect(migrate({ ...fromCkan, status: 'draft-in-progress' })).toEqual({ ...fromCkan, status: 'draft-in-progress' });
    expect(migrate({ ...fromCkan, status: 'draft_in_progress' })).toEqual({ ...fromCkan, status: 'draft-in-progress' });
    expect(migrate({ ...fromCkan, status: 'Draft in progress' })).toEqual({ ...fromCkan, status: 'draft-in-progress' });
    expect(migrate({ ...fromCkan, status: 'Draft in Progress' })).toEqual({ ...fromCkan, status: 'draft-in-progress' });
  });

  test('Maps awaiting-approval statuses', () => {
    expect(migrate({ ...fromCkan, status: 'awaiting' })).toEqual({ ...fromCkan, status: 'awaiting-approval' });
    expect(migrate({ ...fromCkan, status: 'awaiting-approval' })).toEqual({ ...fromCkan, status: 'awaiting-approval' });
    expect(migrate({ ...fromCkan, status: 'awaiting_approval' })).toEqual({ ...fromCkan, status: 'awaiting-approval' });
    expect(migrate({ ...fromCkan, status: 'Awaiting approval' })).toEqual({ ...fromCkan, status: 'awaiting-approval' });
    expect(migrate({ ...fromCkan, status: 'Awaiting Approval' })).toEqual({ ...fromCkan, status: 'awaiting-approval' });
  });

  test('Maps proposed statuses', () => {
    expect(migrate({ ...fromCkan, status: 'proposed' })).toEqual({ ...fromCkan, status: 'proposed' });
    expect(migrate({ ...fromCkan, status: 'Proposed' })).toEqual({ ...fromCkan, status: 'proposed' });
  });

  test('Maps on-hold statuses', () => {
    expect(migrate({ ...fromCkan, status: 'on-hold' })).toEqual({ ...fromCkan, status: 'on-hold' });
    expect(migrate({ ...fromCkan, status: 'on_hold' })).toEqual({ ...fromCkan, status: 'on-hold' });
    expect(migrate({ ...fromCkan, status: 'On hold' })).toEqual({ ...fromCkan, status: 'on-hold' });
    expect(migrate({ ...fromCkan, status: 'On Hold' })).toEqual({ ...fromCkan, status: 'on-hold' });
  });

  test('Maps cancelled statuses', () => {
    expect(migrate({ ...fromCkan, status: 'cancelled' })).toEqual({ ...fromCkan, status: 'cancelled' });
    expect(migrate({ ...fromCkan, status: 'discontinued' })).toEqual({ ...fromCkan, status: 'cancelled' });
    expect(migrate({ ...fromCkan, status: 'Discontinued' })).toEqual({ ...fromCkan, status: 'cancelled' });
    expect(migrate({ ...fromCkan, status: 'Cancelled' })).toEqual({ ...fromCkan, status: 'cancelled' });
  });
});
