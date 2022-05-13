describe('Standards Listing Index', () => {
  it('should accesss standards listing page', () => {
    cy.visit(`/standards`);
    cy.get('ul#browse-results');
    cy.contains('Browse the standards directory');
  });

  it('There should be results in the directory ', () => {
    cy.visit(`/standards`);
    cy.get('#browse-results li').should('have.length', 10);
  });

  describe('Search', () => {
    it('Can search by standard matching', () => {
      cy.visit('/standards');
      cy.get('input[name="q"]').type('allergies');

      cy.contains('Search').click();
      cy.get('#browse-results li').should('have.length', 1);
    });

    it('Can search by fuzzy match', () => {
      cy.visit('/standards');
      cy.get('input[name="q"]').type('alergy');

      cy.contains('Search').click();

      cy.get('#resultSummary')
        .invoke('attr', 'data-loading')
        .should('eq', 'false');

      cy.get('#browse-results li').should('have.length', 1);
      cy.contains('#browse-results li', 'Allergy').click();

      cy.get('#browse-results li').should('have.length', 1);
      cy.contains('#browse-results li', 'Allergy').click();
    });

    describe('Organisation mapping', () => {
      it('Can search by organisation', () => {
        cy.visit('/standards');
        cy.get('input[name="q"]').type('prsb');

        cy.contains('Search').click();

        cy.get('#browse-results li').not('have.length', 0);
      });

      it('Displays org matches first', () => {
        cy.visit('/standards');
        cy.get('input[name="q"]').type('prsb');
        cy.contains('Search').click();

        cy.get('#resultSummary')
          .invoke('attr', 'data-loading')
          .should('eq', 'false');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500); // TODO: why is this necessary?

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'Professional Record Standards Body');

        cy.go('back');
        cy.get('#browse-results li a').eq(1).click();

        cy.contains('td', 'Professional Record Standards Body');
      });

      it('Matches various variations of prsb', () => {
        cy.visit('/standards');
        cy.get('input[name="q"]').type('professional record standards body', {
          force: true,
        });

        cy.contains('Search').click();

        cy.get('#resultSummary')
          .invoke('attr', 'data-loading')
          .should('eq', 'false');
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'Professional Record Standards Body', {
          force: true,
        });

        cy.go('back');

        cy.get('input[name="q"]').type('professional records standards body', {
          force: true,
        });

        cy.contains('Search').click();
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'Professional Record Standards Body');
      });

      it('Matches various variations of nhs', () => {
        cy.visit('/standards');
        cy.get('input[name="q"]').type('nhsd', { force: true });

        cy.contains('Search').click();
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'NHS Digital');

        cy.go('back');

        cy.get('input[name="q"]').type('nhsx', { force: true });

        cy.contains('Search').click();
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'NHS Digital');

        cy.go('back');

        cy.get('input[name="q"]').type('nhs digital', { force: true });

        cy.contains('Search').click();
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'NHS Digital');
      });
    });
  });
});
