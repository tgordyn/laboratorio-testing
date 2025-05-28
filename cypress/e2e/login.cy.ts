describe('Login flow', () => {
  it('should login with valid credentials and redirect', () => {
    // Arrange
    cy.visit('/login');

    // Act
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.url().should('include', '/submodule-list');
  });
});
