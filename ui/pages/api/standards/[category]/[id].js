const DATA = {
  id: 123,
  status: 'active',
  data: {
    title: 'Mental health inpatient discharge',
    content: 'Approved content format for collecting information about an adult transferring from mental health to GP services.',
    owner: 'Professional Record Standards Body',
    reference: 'PRSB9784',
    category:	'Content format',
    version: '2.1 (latest version)',
    lastUpdated: new Date('14 April 2020').toISOString(),
    releaseNotes: `The Mental health inpatient discharge has been updated to version 2.1 (Dec 17 2019). V2.1 includes an update to:

  * structured dose direction cluster
  * structured dose amount
  * structured dose timing and dose direction duration.`,
    careSettings: `
  * GP practices
  * social care
  * hospital trust
  * mental health`
  }

}

export default function handler(req, res) {
  res.status(200).json(DATA)
}
