describe('Standards Listing Index', () => {
  it('should accesss standards listing page', () => {
    cy.visit(`/standards`);
    cy.get('ul#browse-results');
    cy.contains('Current standards');
  });

  it('There should be results in the directory ', () => {
    cy.visit(`/standards`);
    cy.get('#browse-results li').should('have.length', 10);
  });

  describe('Search', () => {
    it('Can search by standard matching', () => {
      cy.visit('/standards');
      cy.doSearch('allergies');
      cy.get('#browse-results li').not('have.length', 0);
    });

    it('Can search by fuzzy match', () => {
      cy.visit('/standards');
      cy.doSearch('alergy');

      cy.get('#browse-results li').should('have.length.of.at.least', 1);
      cy.contains('#browse-results li', 'Allergy').click();
    });

    it('emboldens matches', () => {
      cy.visit('/standards');
      cy.doSearch('medicine');
      cy.get('#browse-results li').eq(0).contains('strong', 'Medicine');
    });

    describe('Organisation mapping', () => {
      it('Can search by organisation', () => {
        cy.visit('/standards');

        cy.doSearch('prsb');

        cy.get('#browse-results li').not('have.length', 0);
      });

      it('Displays org matches first', () => {
        cy.visit('/standards');
        cy.doSearch('prsb');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'Professional Record Standards Body');
      });

      it('Matches various variations of prsb', () => {
        cy.visit('/standards');
        cy.doSearch('prsb');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'Professional Record Standards Body');

        cy.visit('/standards');
        cy.doSearch('professional records standards body');
        cy.get('#browse-results li a').eq(0).click({
          force: true,
        });
        cy.contains('td', 'Professional Record Standards Body');
      });

      it('Matches various variations of nhs', () => {
        cy.visit('/standards');
        cy.doSearch('nhsd');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'NHS Digital');

        cy.visit('/standards');

        cy.doSearch('nhsx');
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'NHS Digital');

        cy.visit('/standards');

        cy.doSearch('nhs digital');
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('td', 'NHS Digital');
      });
    });
  });
});
