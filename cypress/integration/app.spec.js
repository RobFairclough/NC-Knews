describe('app', () => {
  describe('log in', () => {
    it('successfully logs a user in to their account', () => {
      cy.visit('/');
      cy.contains('NC News');
      cy.get('a.login-link[href="/login"]').click();
      cy.url().should('includes', 'login');
      cy.get('[cy-data="username"]').type('tickle122');
      cy.get('[cy-data="password"]').type('password');
      cy.get('[cy-data="submit"]').click();
      cy.get('img.nav-avatar').click();
      cy.url().should('includes', 'users/tickle122');
    });
    it('will not log a user in when given an incorrect password', () => {
      cy.visit('/');
      cy.contains('NC News');
      cy.get('a.login-link[href="/login"]').click();
      cy.url().should('includes', 'login');
      cy.get('[cy-data="username"]').type('tickle122');
      cy.get('[cy-data="password"]').type('sneaky');
      cy.get('[cy-data="submit"]').click();
      cy.contains('Login not found');
      cy.url().should('includes', '/login');
    });
  });
});
