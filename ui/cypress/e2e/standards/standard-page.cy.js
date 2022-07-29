import { a11yLog } from '../../support/custom';
const failOn = ['serious', 'critical'];

describe('Standards', () => {
  it('should be able to access a content standards model', () => {
    cy.visit('/standards/about-me');
    cy.contains('h1', 'About Me');
    cy.injectAxe();
    cy.checkA11y(null, null, a11yLog, failOn);
  });
});
