/* eslint-disable no-undef */

Cypress.Commands.add('login', (user, pass) => {
  cy.get('a.login-link[href="/login"]')
    .click()
    .should(() => expect(localStorage.getItem('login')).to.eq(null));
  cy.url().should('includes', 'login');
  cy.get('[cy-data="username"]').type(user);
  cy.get('[cy-data="password"]').type(pass);
  cy.get('[cy-data="submit"]').click();
});
Cypress.Commands.add('register', (user, name, pass, confirmPass, avatar) => {
  cy.get('a.login-link[href="/login"]').click();
  cy.get('button[cy-data="show-registration"]').click();
  cy.get('input[cy-data="register-username"]').type(user);
  cy.get('input[cy-data="register-name"]').type(name);
  cy.get('input[cy-data="register-password"]').type(pass);
  cy.get('input[cy-data="register-confirm-password"]').type(confirmPass);
  if (avatar) cy.get('input[cy-data="register-avatar"]').type(avatar);
  cy.get('button[cy-data="register-submit"]').click();
});
