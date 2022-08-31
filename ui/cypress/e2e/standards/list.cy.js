import { a11yLog, failLevel } from '../../support/custom';

describe('Standards Listing Index', () => {
  it('should accesss standards listing page', () => {
    cy.visit(`/current-standards`);
    cy.get('ul#browse-results');
    cy.contains('Current standards');
  });

  it('There should be results in the directory ', () => {
    cy.visit(`/current-standards`);
    cy.get('#browse-results li').should('have.length', 10);
  });

  describe.only('filters and pagination', () => {
    it('Can change page', () => {
      cy.visit('/current-standards');
      cy.get('.nhsuk-pagination').contains('a', 'Next').click();
      cy.url().should('contain', 'page=2');

      cy.get('.nhsuk-pagination').contains('a', 'Next').click();
      cy.url().should('contain', 'page=3');

      cy.get('.nhsuk-pagination').contains('a', 'Prev').click();
      cy.url().should('contain', 'page=2');

      cy.get('.nhsuk-pagination').contains('a', 'Prev').click();
      cy.url().should('contain', 'page=1');
    });

    it('Can filter by mandated, and remove filter (regression)', () => {
      cy.visit('/current-standards');
      let results;
      cy.get('span[role="status"]').should((el) => {
        results = parseInt(el.text().replace(' Results', ''));
      });
      cy.get('#mandated').click();

      cy.get('span[role="status"]').should((el) => {
        const filteredResults = parseInt(el.text().replace(' Results', ''));
        expect(filteredResults).to.be.lessThan(results);
      });

      cy.get('#mandated').click();

      cy.get('span[role="status"]').should((el) => {
        const filteredResults = parseInt(el.text().replace(' Results', ''));
        expect(filteredResults).to.be.equal(results);
      });
    });

    it('Resets page when filtered', () => {
      cy.visit('/current-standards');
      cy.get('.nhsuk-pagination').contains('a', 'Next').click();
      cy.url().should('contain', 'page=2');

      cy.get('#mandated').click();

      cy.url().should('not.contain', 'page');
      cy.url().should('contain', 'mandated');
    });
  });

  describe('Search', () => {
    it('Can search by standard matching', () => {
      cy.visit('/current-standards');
      cy.injectAxe();
      cy.doSearch('allergies');
      cy.get('#browse-results li').not('have.length', 0);

      cy.checkA11y(null, null, a11yLog, failLevel);
    });

    it('Can search by fuzzy match', () => {
      cy.visit('/current-standards');
      cy.doSearch('alergy');

      cy.get('#browse-results li').should('have.length.of.at.least', 1);
      cy.contains('#browse-results li', 'Allergy').click();
    });

    it('emboldens matches', () => {
      cy.visit('/current-standards');
      cy.doSearch('medicine');
      cy.get('#browse-results li').eq(0).contains('strong', 'Medicine');
    });

    describe('Organisation mapping', () => {
      it('Can search by organisation', () => {
        cy.visit('/current-standards');

        cy.doSearch('prsb');

        cy.get('#browse-results li').not('have.length', 0);
      });

      it('Displays org matches first', () => {
        cy.visit('/current-standards');
        cy.doSearch('prsb');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('dd', 'Professional Record Standards Body');
      });

      it('Matches various variations of prsb', () => {
        cy.visit('/current-standards');
        cy.doSearch('prsb');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('dd', 'Professional Record Standards Body');

        cy.visit('/current-standards');
        cy.doSearch('professional records standards body');
        cy.get('#browse-results li a').eq(0).click({
          force: true,
        });
        cy.contains('dd', 'Professional Record Standards Body');
      });

      it('Matches various variations of nhs', () => {
        cy.visit('/current-standards');
        cy.doSearch('nhsd');

        cy.get('#browse-results li a').eq(0).click();

        cy.contains('dd', 'NHS Digital');

        cy.visit('/current-standards');

        cy.doSearch('nhsx');
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('dd', 'NHS Digital');

        cy.visit('/current-standards');

        cy.doSearch('nhs digital');
        cy.get('#browse-results li a').eq(0).click();

        cy.contains('dd', 'NHS Digital');
      });
    });
  });
});
