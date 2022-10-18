const parseJsonSchema = (elem) =>
  JSON.parse(
    JSON.stringify(elem.text()).replaceAll('&quot;', '"').trim().slice(1, -1)
  );

describe('Schema.org representations', () => {
  describe('WebPage', () => {
    it('Should produce a schema.org webpage entity in the head', () => {
      cy.visit('/help-and-resources');
      cy.document()
        .get('head script[class="structured-data-list"]')
        .then((jsonSchema) => {
          expect(jsonSchema).to.have.attr('type', 'application/ld+json');
          expect(parseJsonSchema(jsonSchema)).to.deep.equal({
            '@context': 'https://schema.org/',
            '@type': 'WebPage',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'england.interop.standards@nhs.net',
            },
            title: 'Help and resources',
            description:
              'Explore resources for the data standards community in health and social care including links to discussion forums and government regulations.',
            url: `${Cypress.config().baseUrl}/help-and-resources`.replace(
              /^https?:\/\//,
              ''
            ),
          });
        });
    });
  });
});
