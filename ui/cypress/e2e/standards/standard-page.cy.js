describe('Standards', () => {
  it('should be able to access a content standards model', () => {
    cy.visit('/standards/about-me');
    cy.contains('h1', 'About Me');
  });
});
