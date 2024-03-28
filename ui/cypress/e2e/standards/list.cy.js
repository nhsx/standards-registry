import { a11yLog, failLevel } from '../../support/custom';

describe('Standards Listing Index', () => {
  it('should accesss standards listing page', () => {
    cy.visit(`/published-standards`);
    cy.get('ul#browse-results');
    cy.contains('Published standards');
  });

  it('There should be results in the directory ', () => {
    cy.visit(`/published-standards`);
    cy.get('#browse-results li').should('have.length', 10);
  });

  it('Should pass basic a11y check', () => {
    cy.visit(`/published-standards`);
    // make sure main content area is loaded before injecting a11y checker
    cy.get('main');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);
    cy.injectAxe();
    cy.checkA11y(null, null, a11yLog);
  });

  it('passes html validation', () => {
    cy.visit(`/published-standards`);
    cy.get('main');
    cy.htmlvalidate(
      {
        rules: {
          'valid-id': 'off',
          'require-sri': 'off',
        },
      },
      {
        include: ['body'],
      }
    );
  });
  describe('filters and pagination', () => {
    it('Can change page', () => {
      cy.visit('/published-standards');
      cy.get('.nhsuk-pagination').contains('a', 'Next').click();
      cy.url().should('contain', 'page=2');

      cy.get('.nhsuk-pagination').contains('a', 'Next').click();
      cy.url().should('contain', 'page=3');

      cy.get('.nhsuk-pagination').contains('a', 'Prev').click();
      cy.url().should('contain', 'page=2');

      cy.get('.nhsuk-pagination').contains('a', 'Prev').click();
      cy.url().should('contain', 'page=1');
    });

    it('a11y when clicking into filters', () => {
      cy.visit('/published-standards');
      cy.get('details[title="Care setting"]').click();
      cy.get('details[title="Topic"]').click();
      cy.injectAxe();
      cy.checkA11y(null, null, a11yLog);
      cy.get('details[title="Care setting"] summary').click();
      cy.get('details[title="Topic"] summary').click();
      cy.checkA11y(null, null, a11yLog);
    });

    it('Can filter by mandated, and remove filter (regression)', () => {
      cy.visit('/published-standards');
      let results;

      cy.get('span[role="status"]').then($span => {
        const text = $span.text()
        results = parseInt(text.match(/\d+/)[0])
      });

      cy.get('[title="Requirement"]').click();
      cy.get('#mandated').scrollIntoView().click({ force: true });

      // wait added for api response
      cy.wait(500);

      cy.get('span[role="status"]').then($span => {
        const text = $span.text()
        const filteredResults = parseInt(text.match(/\d+/)[0]);
        expect(filteredResults).to.be.lessThan(results);
      });

      cy.get('#mandated').click();

      cy.wait(500);

      cy.get('span[role="status"]').then($span => {
        const text = $span.text()
        const filteredResults = parseInt(text.match(/\d+/)[0]);
        expect(filteredResults).to.be.equal(results);
      });
    });

    it('Resets page when filtered', () => {
      cy.visit('/published-standards');
      cy.get('.nhsuk-pagination').contains('a', 'Next').click();
      cy.url().should('contain', 'page=2');

      cy.get('[title="Requirement"]').click();
      cy.get('#mandated').scrollIntoView().click({ force: true });

      cy.url().should('not.contain', 'page');
      cy.url().should('contain', 'mandated');
    });
  });

  describe('Search', () => {
    it('Can search by standard matching', () => {
      cy.visit('/published-standards');
      cy.injectAxe();
      cy.doSearch('hospital');
      cy.get('#browse-results li').not('have.length', 0);

      cy.checkA11y(null, null, a11yLog, failLevel);
    });

    it('Can search by fuzzy match', () => {
      cy.visit('/published-standards');
      cy.doSearch('hosptal');

      cy.get('#browse-results li').should('have.length.of.at.least', 1);
      cy.contains('#browse-results li', 'hospital');
    });

    it('emboldens matches', () => {
      cy.visit('/published-standards');
      cy.doSearch('medicine');
      cy.get('#browse-results li').eq(0).contains('strong', 'Medicine');
    });

    describe('Organisation mapping', () => {
      it('Can search by organisation', () => {
        cy.visit('/published-standards');

        cy.doSearch('prsb');

        cy.get('#browse-results li').not('have.length', 0);
      });

      it('Displays org matches first', () => {
        cy.visit('/published-standards');
        cy.doSearch('prsb');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('Core information standard');
      });

      it('Matches various variations of prsb', () => {
        cy.visit('/published-standards');
        cy.doSearch('prsb');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('Community Pharmacy Information Standard');

        cy.visit('/published-standards');
        cy.doSearch('professional records standards body');
        cy.get('#browse-results li a').eq(0).click({
          force: true,
        });
        cy.contains('dd', 'Professional Record Standards Body');
      });

      it('Matches various variations of nhs', () => {
        cy.visit('/published-standards');
        cy.doSearch('nhsd');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('dd', 'NHS');

        cy.visit('/published-standards');

        cy.doSearch('nhsx');
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('dd', 'NHS');

        cy.visit('/published-standards');

        cy.doSearch('nhs digital');
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('dd', 'NHS');
      });
    });
  });
});
