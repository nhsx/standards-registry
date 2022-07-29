import { a11yLog, failLevel } from '../support/custom';

describe('Homepage', () => {
  it('should show home page and call to action', () => {
    cy.visit('/');
    cy.contains(
      'Find standards to exchange data in health and adult social care'
    );
    cy.contains(
      'Use this directory to find nationally recognised standards needed for interoperability in England.'
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

  describe('a11y', () => {
    it('has sufficient contrast on focussed links', () => {
      cy.visit('/');
      cy.injectAxe();
      cy.get('.nhsuk-phase-banner__text a').focus();
      cy.checkA11y(null, null, a11yLog, failLevel);
      cy.get('#recent-standards a').first().focus();
      cy.checkA11y(null, null, a11yLog, failLevel);
    });
  });
});
