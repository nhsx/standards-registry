export const careSettings = [
  'Community health',
  'Dentistry',
  'Hospital',
  'Maternity',
  'Mental Health',
  'Patient',
  'Pharmacy',
  'GP / Primary Care',
  'Transport / Infrastructure',
  'Social care',
  'Urgent And Emergency Care',
];

export const businessUse = [
  'Appointment / Scheduling',
  'Referrals',
  'Access to Records',
  'Clinical Decision Support',
  'Continuity of Care (ToC)',
  'Demographics',
  'Key Care Information',
  'Prescribing',
  'Dispensing',
  'Vaccination',
  'Messaging',
  'Patient Communication',
  'Reference Data',
  'Information Governance',
  'Security',
  'Tests and diagnostics',
];

const headings = [
  'title',
  'name',
  'notes',
  'owner_org',
  'reference_code',
  'status',
  'standard_category',
  'dependencies',
  'related standards',
  'Community health',
  'Dentistry',
  'Hospital',
  'Maternity',
  'Mental Health',
  'Patient',
  'Pharmacy',
  'GP / Primary Care',
  'Transport / Infrastructure',
  'Social care',
  'Urgent And Emergency Care',
  'Appointment / Scheduling',
  'Referrals',
  'Access to Records',
  'Clinical Decision Support',
  'Continuity of Care (ToC)',
  'Demographics',
  'Key Care Information ',
  'Prescribing ',
  'Dispensing',
  'Vaccination',
  'Messaging',
  'Patient Communication',
  'Reference Data ',
  'Information Governance',
  'Security',
  'Tests and diagnostics ',
];
export const sample = {
  headings,
  values: [
    'About Me',
    'https://theprsb.org/standards/aboutme/',
    'Part of a suite of social care standards, About Me information is the most important details that a person wants to share with professionals in health and social care.',
    'prsb',
    '',
    'ACTIVE',
    'RECORD STANDARD',
    'Shared Care Record or other infrastructure.',
    'Core Information Standard (CIS) or other standards that use it. E.g. the Digital Care and Support Plan and Urgent Referral from Care Home to Hospital\n' +
      'Standard.',
    'X',
    'X',
    'X',
    'X',
    'X',
    '',
    'X',
    'X',
    '',
    'X',
    'X',
    '',
    'X',
    '',
    '',
    '',
    'X',
    'X',
    '',
    '',
    '',
    '',
    'X',
  ],
};

const sentenceCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const prepHeadings = (headings) => headings.map((i) => i.trim());

export const joinTitlesToValues = (colTitles, vals) => {
  return vals
    .map((v) => (v.toLowerCase() === 'x' ? true : v))
    .reduce((result, field, index) => {
      const key = colTitles[index];
      if (!!field) {
        if (key === 'standard_category') {
          field = sentenceCase(field.replace('&', 'and'));
        }

        if (key === 'status') {
          field = field.toLowerCase();
        }

        // dumb way of segmenting to business and care setting
        if (businessUse.includes(colTitles[index])) {
          result['business_use'] = [colTitles[index]]
            .concat(result['business_use'])
            .filter((i) => i)
            .sort();
        } else if (careSettings.includes(colTitles[index])) {
          result['care_setting'] = [colTitles[index]]
            .concat(result['care_setting'])
            .filter((i) => i)
            .sort();
        } else {
          result[colTitles[index]] = field;
        }
      }
      return result;
    }, {});
};
