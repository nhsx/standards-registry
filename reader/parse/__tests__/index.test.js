import { joinHeadingsValues, headings, values, prepHeadings } from '../index';

describe('parse', () => {
  describe('prepHeadings', () => {
    test('trims headings', () => {
      expect(prepHeadings(['trim  ', '  space'])).toEqual(['trim', 'space']);
    });
  });

  describe('joinHeadingsValues', () => {
    test('join headings to values', () => {
      expect(joinHeadingsValues(prepHeadings(headings), values)).toEqual('');
    });
  });
});
