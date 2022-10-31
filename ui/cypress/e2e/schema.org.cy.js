describe('Schema.org representations', () => {
  describe('WebPage', () => {
    const schemaExpected = {
      '@context': 'https://schema.org/',
      '@type': 'WebPage',
      title: 'Help and resources',
      description:
        'Explore resources for the data standards community in health and social care including links to discussion forums and government regulations.',
      url: `${Cypress.config().baseUrl}/help-and-resources`.replace(
        /^https?:\/\//,
        ''
      ),
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'england.interop.standards@nhs.net',
      },
    };
    it('Should produce a schema.org webpage entity in the head', () => {
      cy.visit('/help-and-resources');
      cy.document()
        .get('head script[class="structured-data-list"]')
        .then((jsonSchema) => {
          expect(jsonSchema).to.have.attr('type', 'application/ld+json');

          expect(jsonSchema.text()).to.deep.equal(
            JSON.stringify(schemaExpected)
          );
        });
    });
  });
});
