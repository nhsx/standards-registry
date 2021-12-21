import { joinTitlesToValues, sample, prepHeadings } from '../index';

const { headings, values } = sample;

describe('parse', () => {
  describe('prepHeadings', () => {
    test('trims headings', () => {
      expect(prepHeadings(['trim  ', '  space'])).toEqual(['trim', 'space']);
    });
  });

  describe('joinTitlesToValues', () => {
    const result = joinTitlesToValues(prepHeadings(headings), values);
    test('sets business use and care setting', () => {
      expect(result.business_use).toEqual([
        'Patient Communication',
        'Key Care Information',
        'Demographics',
        'Referrals',
      ]);
      expect(result.care_setting).toEqual([
        'Urgent And Emergency Care',
        'Social care',
        'GP / Primary Care',
        'Pharmacy',
        'Mental Health',
        'Maternity',
        'Hospital',
        'Dentistry',
        'Community health',
      ]);
    });
    test('sets status field to lowercase', () => {
      result.status
        .split('')
        .forEach((l) => expect(l).toEqual(l.toLowerCase()));
    });
    test('sentence casing the standard_category', () => {
      const cat = result.standard_category;
      expect(cat.charAt(0)).toEqual(cat.charAt(0).toUpperCase());
      cat
        .slice(1)
        .split('')
        .forEach((l) => expect(l).toEqual(l.toLowerCase()));
    });
  });
});
