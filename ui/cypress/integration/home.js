describe('Homepage', () => {
  it('should show home page and call to action', () => {
    cy.visit('/');
    cy.contains(
      'Find standards to exchange data in health and adult social care'
    );
    cy.contains(
      'Use this directory to find nationally recognised standards for use in technology in England.'
    );
  });

  it('should show recent standards on the right hand side', () => {
    cy.visit('/');

    cy.get('ul#recent-standards li').should('have.length', 3);
  });

  describe('Search', () => {
    it('Can search from the homepage', () => {
      cy.visit('/');
      cy.doSearch('allergies');
      cy.get('#browse-results li').not('have.length', 0);
    });
    it('Blank search returns results', () => {
      cy.visit('/');
      cy.doSearch(' ');
      cy.get('#browse-results li').not('have.length', 0);
    });
  });
});
