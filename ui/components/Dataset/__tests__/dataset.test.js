import { formatDate } from '../index';

// Results come back from CKAN in format  "2022-05-13T10:46:49.247745"
describe('formatDate', () => {
  test('is in format 1 Jan 1970', () => {
    expect(formatDate('2021-12-22T13:24:22.310661')).toEqual('22 Dec 2021');
    expect(formatDate('2022-05-04T10:46:49.247745')).toEqual('4 May 2022');
  });
});
