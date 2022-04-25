describe('Standards Listing Index', () => {
  it('should accesss standards listing page', () => {
    cy.visit(`/standards`);
    cy.get('ul#browse-results')
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

      cy.get('#browse-results li').should('have.length', 1)
    });

    describe('Organisation mapping', () => {
      it('Can search by organisation', () => {
        cy.visit('/standards');
        cy.get('input[name="q"]').type('prsb');

        cy.contains('Search').click();

        cy.get('#browse-results li').should('have.length', 6)
      });

      it('Displays org matches first', () => {
        cy.visit('/standards');
        cy.get('input[name="q"]').type('prsb');

        cy.contains('Search').click();
        cy.get('#browse-results li a').eq(0).click()

        cy.contains('td', 'Professional Record Standards Body');

        cy.go('back');
        cy.get('#browse-results li a').eq(1).click()

        cy.contains('td', 'Professional Record Standards Body');

        cy.go('back')
        cy.get('#browse-results li a').eq(2).click()

        // TODO: this shows NHS Digital in error
        cy.contains('td', 'NHS Digital')
      });
    });
  });
});
