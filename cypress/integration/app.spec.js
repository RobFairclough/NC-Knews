/* eslint-disable no-undef */
describe('app', () => {
  describe('log in', () => {
    it('successfully logs a user in to their account, and logs them back out again', () => {
      cy.visit('/');
      cy.contains('NC News');
      cy.login('tickle122', 'password');
      cy.get('img.nav-avatar')
        .click()
        .should(() => expect(localStorage.getItem('login')).to.eq('tickle122'));
      cy.url().should('includes', 'users/tickle122');
      cy.get('span.button-toggle').click();
      cy.get('a.nav-link[href="/"]')
        .click()
        .should(() => expect(localStorage.getItem('login')).to.eq(null));
    });
    it('will not log a user in when given an incorrect password', () => {
      cy.visit('/');
      cy.contains('NC News');
      cy.login('tickle122', 'wrongpass').should(() =>
        expect(localStorage.getItem('login')).to.eq(null)
      );
      cy.contains('Login not found');
      cy.url().should('includes', '/login');
    });
  });
  describe('registration', () => {
    it('should not allow a user to sign up with a username that is already taken', () => {
      cy.visit('/');
      cy.register('tickle122', 'Tom Tickle is Taken', 'test', 'test');
      cy.get('span.error-text').should('be.visible');
    });
    it('should prevent the user from signing up if their passwords do not match', () => {
      cy.visit('/');
      cy.register('tester', 'testname', 'one thing', 'another thing');
      cy.get('span.error-text').should('be.visible');
    });
    it('should allow a new, unique user with valid information to sign up', () => {
      cy.server();
      cy.route({
        method: 'POST',
        url: '*',
        response: { new_user: { username: 'rob', name: 'Rob Fairclough' } }
      });
      cy.visit('/');
      cy.register('rob', 'Rob Fairclough', 'test', 'test');
      cy.get('a.login-link[href="/login"]').click();
      cy.get('span.error-text').should('not.be.visible');
    });
  });
  describe('browsing links', () => {
    it('allows a non-logged in user to navigate between pages of the site', () => {
      cy.visit('/');
      cy.get('span.button-toggle').click();
      cy.get('a.nav-link[href="/articles"]').click();
      cy.url().should('includes', 'articles');
      cy.get('span.button-toggle').click();
      cy.get('a.nav-link[href="/users"').click();
      cy.url().should('includes', 'users');
    });
  });
  describe('adding a new article', () => {
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
      cy.login('tickle122', 'password');
      cy.get('span.button-toggle').click();
      cy.get('a.nav-link[href="/new"]').click();
      cy.get('input[placeholder="New topic"]').type('test');
      cy.get('input[placeholder="Description of topic"]').type(
        'test description'
      );
      cy.get('button[cy-data="submit-topic"]').click();
      cy.get('select').select('test');
    });
    it('should allow a user to post an article to a new topic', () => {
      cy.server();
      cy.route({
        method: 'POST',
        url: 'https://ncknewsrob.herokuapp.com/api/topics',
        response: {
          topic: {
            slug: 'test',
            description: 'test description'
          }
        }
      });
      cy.route({
        method: 'POST',
        url: 'https://ncknewsrob.herokuapp.com/api/topics/test*',
        response: {
          article: {
            article_id: 1,
            author: 'tickle122',
            title: 'testing a react app',
            body: 'cypress cypress cypress hello',
            created_at: '2018-08-18',
            topic: 'test'
          }
        }
      });
      cy.visit('/');
      cy.login('tickle122', 'password');
      cy.get('span.button-toggle').click();
      cy.get('a.nav-link[href="/new"]').click();
      cy.get('input[placeholder="New topic"]').type('test');
      cy.get('input[placeholder="Description of topic"]').type(
        'test description'
      );
      cy.get('button[cy-data="submit-topic"]').click();
      cy.get('select').select('test');
      cy.get('[cy-data="headline"]').type('testing a react app');
      cy.get('[cy-data="article-body"]').type('cypress cypress cypress hello');
      cy.get('[cy-data="submit-article"]').click();
      cy.contains('Article posted!');
    });
  });
});
