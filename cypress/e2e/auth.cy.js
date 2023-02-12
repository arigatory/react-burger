describe('Test auth', () => {
  beforeEach(() => {
    const email = 'arigatory@gmail.com';
    const password = '!QAZxsw2';
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid=email_input]').type(`${email}{enter}`);
    cy.get('[data-testid=password_input]').type(`${password}{enter}`);
  });

  it('should show user name', () => {
    cy.get('[data-testid="profile_link"]').should('have.text', 'arigatory');
  });

  it('should visit profile', () => {
    cy.visit('http://localhost:3000/profile/about');
  });
});
