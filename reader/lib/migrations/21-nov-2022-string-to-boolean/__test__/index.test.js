import { fixture } from './fixtures/standard-fixture';
import { setValueToBoolean } from '..';

describe('setValueToBoolean', () => {
  it('set strings to booleans', () => {
    let record = fixture;
    expect(record.is_published_standard).toBe('true');
    expect(record.mandated).toBe('false');

    record = { ...fixture, ...setValueToBoolean(fixture) };

    expect(record.is_published_standard).toBe(true);
    expect(record.mandated).toBe(false);
  });
});
