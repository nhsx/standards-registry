import { a11yLog } from '../support/custom';

describe('Homepage', () => {
  it('should show home page and call to action', () => {
    cy.visit('/');
    cy.contains(
      'Find standards to record, handle and exchange data in England'
    );
    cy.contains(
      'Use this directory to find nationally recognised data standards for use in health and adult social care.'
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
      cy.get('main');
      cy.injectAxe();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);
      cy.get('.nhsuk-phase-banner__text a').focus();
      cy.checkA11y(null, null, a11yLog);
      cy.get('#recent-standards a').first().focus();
      cy.checkA11y(null, null, a11yLog);
    });

    it('use a11y checker with wcag2aa', () => {
      cy.visit('/');
      cy.injectAxe();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);
      cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2aa', 'wcag21aa'],
        },
      });
    });
  });

  it('passes html validation', () => {
    cy.visit('/');
    cy.get('main');
    cy.htmlvalidate();
  });

  describe('cookies', () => {
    it('clicking approve removes banner, sets consent preference:true', () => {
      cy.visit('/');
      cy.get('#nhsuk-cookie-banner').should('be.visible');
      cy.getCookie('localConsent').should('not.exist');
      cy.get('#nhsuk-cookie-banner__link_accept_analytics').click();
      cy.get('#nhsuk-cookie-banner').should('not.exist');
      cy.getCookie('localConsent').should('have.property', 'value', 'true');
    });

    it('clicking reject removes banner, sets consent preference:false', () => {
      cy.visit('/');
      cy.get('#nhsuk-cookie-banner').should('be.visible');
      cy.getCookie('localConsent').should('not.exist');
      cy.get('#nhsuk-cookie-banner__link_reject').click();
      cy.get('#nhsuk-cookie-banner').should('not.exist');
      cy.getCookie('localConsent').should('have.property', 'value', 'false');
    });
  });
});
