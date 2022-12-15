import { fromCkan, fromParsed } from './__fixtures__';
import { mergeRecord } from '../index';

describe('mergeRecord', () => {
  const { result: ckanResult } = fromCkan;
  const res = mergeRecord(ckanResult, fromParsed);
  test('updates owner_org', () => {
    expect(ckanResult.owner_org).toEqual(
      '9d919972-3272-441f-9c6d-ed2745acb2d5'
    );
    expect(fromParsed.owner_org).toEqual('professional-record-standards-body');
    expect(res.owner_org).toEqual('professional-record-standards-body');
  });
  test('updates mandated', () => {
    expect(ckanResult.mandated).toEqual('\\true');
    expect(fromParsed.mandated).toEqual(false);
    expect(res.mandated).toEqual(false);
  });
});
