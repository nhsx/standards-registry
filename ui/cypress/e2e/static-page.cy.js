describe('Static page', () => {
  describe('Search', () => {
    it('Can search from the nav search', () => {
      cy.visit('/community');
      cy.doSearch('allergies');
      cy.get('#browse-results li').should('have.length.of.at.least', 1);
    });
  });
});
