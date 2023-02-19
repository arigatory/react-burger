import { baseUrl, email, password, name } from './consts';

describe('Test auth', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
    cy.get('[data-testid=email_input]').type(`${email}{enter}`);
    cy.get('[data-testid=password_input]').type(`${password}{enter}`);
  });

  it('should show user name', () => {
    cy.get('[data-testid="profile_link"]').should('have.text', name);
  });

  it('should visit profile', () => {
    cy.visit(`${baseUrl}/profile/about`);
  });
});
