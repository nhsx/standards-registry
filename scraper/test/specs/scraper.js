const path = require('path');
const fs = require('fs');
const Url = require('url');
const stringify = require('csv-stringify');

const PRSB = 'https://theprsb.org/standards/';
const NHSD = 'https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections';

const columns = [
  'owner',
  'title',
  'url',
  'description',
  'approval'
];

describe('WebScraper', () => {

  before(() => {
    this.output = stringify({ header: true, columns });
    this.output.pipe(fs.createWriteStream(path.resolve(__dirname, '../../standards.csv')));
  });

  after(() => {
    this.output.end();
  });

  it('PRSB', async () => {
    await browser.url(PRSB);
    await browser.$('table').waitForDisplayed();
    const standards = await browser.$$('table tbody tr');
    for await (row of standards)  {
      const link = await row.$('td:nth-child(1) a');
      const url = await link.getAttribute('href');
      const title = await link.getText();
      const description = await row.$('td:nth-child(2)').getText();
      this.output.write({
        owner: 'prsb',
        url,
        title,
        description,
        approval: ''
      });
    };
  });

  it('NHS Digital', async () => {
    await browser.url(NHSD);

    // enlarge screen because table only renders at larger window sizes
    await browser.setWindowSize(1400, 1200);
    await browser.$('table').waitForDisplayed();
    const standards = await browser.$$('table tbody tr');

    // get the list of child pages from the directory
    const pages = [];
    for await (row of standards) {
      const type = await row.$('td:nth-child(2)').getText();
      const title = await row.$('td:nth-child(1)').getText();
      if (type === 'Standard') {
        const url = await row.$('td:nth-child(3) a').getAttribute('href');
        const linkText = await row.$('td:nth-child(3) a').getText();
        const approval = linkText.match(/^((DAPB|DCB|ISB|SCCI) ?[0-9]*).*$/) ? linkText.match(/^((DAPB|DCB|ISB|SCCI) ?[0-9]*).*$/)[1].replace(' ', '') : '';

        // some links are /root/referenced/urls - normalise those
        if (Url.parse(url).hostname === null) {
          pages.push({ url: 'https://digital.nhs.uk' + url, title, approval });
        } else {
          pages.push({ url, title, approval });
        }
      }
    }

    // load the descriptions from the child pages
    for await (page of pages) {
      let description = '';
      if (Url.parse(page.url).hostname === Url.parse(NHSD).hostname) {
        await browser.url(page.url);
        description = await browser.$('.nhsd-o-hero [data-uipath="document.summary"]').getText();
      }
      this.output.write({
        owner: 'nhsd',
        ...page,
        description: description.trim()
      });
    };

  });

});

