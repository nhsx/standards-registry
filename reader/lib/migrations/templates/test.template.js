import { up, down } from '../lib/{{FILENAME}}';
import { fromCkan } from './__fixtures__';

describe('{{FILENAME}}', () => {
  describe('up', () => {
    test('Add at least one test', () => {
      const expected = { ...fromCkan };
      expect(up(fromCkan)).toEqual(expected);
    });
  });

  describe('down', () => {
    test('Add at least one test', () => {
      const expected = { ...fromCkan };
      expect(down(fromCkan)).toEqual(expected);
    });
  });
});
