describe('app', () => {
  describe('log in', () => {
    it('successfully logs a user in to their account, and logs them back out again', () => {
      cy.visit('/');
      cy.contains('NC News');
      cy.get('a.login-link[href="/login"]')
        .click()
        .should(() => expect(localStorage.getItem('login')).to.eq(null));
      cy.url().should('includes', 'login');
      cy.get('[cy-data="username"]').type('tickle122');
      cy.get('[cy-data="password"]').type('password');
      cy.get('[cy-data="submit"]').click();
      cy.get('img.nav-avatar')
        .click()
        .should(() => expect(localStorage.getItem('login')).to.eq('tickle122'));
      cy.url().should('includes', 'users/tickle122');
    });
    it('will not log a user in when given an incorrect password', () => {
      cy.visit('/');
      cy.contains('NC News');
      cy.get('a.login-link[href="/login"]')
        .click()
        .should(() => expect(localStorage.getItem('login')).to.eq(null));
      cy.url().should('includes', 'login');
      cy.get('[cy-data="username"]').type('tickle122');
      cy.get('[cy-data="password"]').type('sneaky');
      cy.get('[cy-data="submit"]')
        .click()
        .click()
        .should(() => expect(localStorage.getItem('login')).to.eq(null));
      cy.contains('Login not found');
      cy.url().should('includes', '/login');
    });
  });
  describe('browsing links', () => {
    it('allows a non-logged in user to navigate between pages of the site', () => {
      cy.visit('/');
      cy.get('span.button-toggle').click();
      cy.get('a.nav-link[href="/articles"').click();
      cy.get('span.button-toggle').click();
      cy.url().should('includes', 'articles');
      cy.get('span.button-toggle').click();
      cy.get('a.nav-link[href="/users"').click();
      cy.get('span.button-toggle').click();
      cy.url().should('includes', 'users');
    });
  });
  describe.only('adding a new article', () => {
    it('should allow a user to post a new topic', () => {
      cy.server();
      cy.route({
        method: 'POST',
        url: 'https://ncknewsrob.herokuapp.com/api/topics*',
        response: {
          topic: {
            slug: 'test',
            description: 'test description'
          }
        }
      });
      cy.visit('/');
      cy.get('a.login-link[href="/login"]')
        .click()
        .should(() => expect(localStorage.getItem('login')).to.eq(null));
      cy.url().should('includes', 'login');
      cy.get('[cy-data="username"]').type('tickle122');
      cy.get('[cy-data="password"]').type('password');
      cy.get('[cy-data="submit"]').click();
      cy.get('span.button-toggle').click();
      cy.get('a.nav-link[href="/new"]').click();
      cy.get('span.button-toggle').click();
      cy.get('input[placeholder="New topic"]').type('test');
      cy.get('input[placeholder="Description of topic"]').type(
        'test description'
      );
      cy.get('button[cy-data="submit-topic"]').click();
      cy.get('select').select('test');
    });
  });
});
