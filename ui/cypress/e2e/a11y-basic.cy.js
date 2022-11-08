import { a11yLog, failLevel } from '../support/custom';

describe('Page a11y', () => {
  describe('Homepage', () => {
    it('passes a11y', () => {
      cy.visit('/');
      cy.get('[role="main"]');
      cy.get('h1');
      cy.injectAxe();
      cy.wait(100);
      cy.checkA11y(null, null, a11yLog);
    });
  });

  describe('Future Standards', () => {
    it('passes a11y', () => {
      cy.visit('/future-standards');
      cy.get('[role="main"]');
      cy.get('h1');
      cy.injectAxe();
      cy.wait(100);
      cy.checkA11y(null, null, a11yLog);

      cy.get('th a').first().click();
      cy.checkA11y(null, null, a11yLog);
      cy.get('th a').first().click();
      cy.checkA11y(null, null, a11yLog);
      cy.get('th a').click({ multiple: true });
      cy.checkA11y(null, null, a11yLog);
    });
  });

  describe('Static Pages', () => {});
  describe('Published Standards', () => {});
});
