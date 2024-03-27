import { a11yLog, failLevel } from '../support/custom';

describe('Static page', () => {
  describe('Search', () => {
    it('Can search from the nav search', () => {
      cy.visit('/help-and-resources');
      cy.injectAxe();
      cy.checkA11y(null, null, a11yLog, failLevel);
      cy.doSearch('hospital');
      cy.get('#browse-results li').should('have.length.of.at.least', 1);
    });
  });
});
