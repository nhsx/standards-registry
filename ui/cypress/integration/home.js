describe('Homepage', () => {
  it('should show home page and call to action', () => {
    cy.visit('/');
    cy.contains('Find standards for data and interoperability in health and social care');
    cy.contains('Use this directory to find nationally recognised information standards for interoperable technology in health and adult social care.')
  });

  it('should show recent standards on the right hand side', () => {
    cy.visit('/');

    cy.get('ul#recent-standards li').should('have.length', 3)
  });
});
