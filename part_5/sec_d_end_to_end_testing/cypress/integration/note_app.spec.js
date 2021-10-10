// Recommends arrow functions not to be used by Mocha
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('Note app', function () {
  beforeEach(function () {
    // Add a new user to backend
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Lee Kian Yang',
      username: 'kylee',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    // Now DB has same state for each test
    cy.visit('http://localhost:3000/api/notes');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app');
  });

  // it('front page contains random text', function () {
  //   cy.contains('wtf is this app');
  // });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });

  it('user can login', function () {
    cy.contains('login').click();
    cy.get('#username').type('kylee');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Lee Kian Yang logged-in');
  });

  // Test "new note" functionality
  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('#username').type('kylee');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click();
        cy.get('input').type('another note cypress');
        cy.contains('save').click();
      });
      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click();

        cy.contains('another note cypress')
          .contains('make not important');
      });
    });
  });

  // FAILED LOGIN TEST
  // Cypress only run the required test
  it.only('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('kylee');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    // Ensure that the application prints an error message
    // cy.contains('Wrong credentials');
    // cy.get('.error').contains('Wrong credentials');
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
    // This returns null value for border-style in Firefox, not sure why
    // .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Lee Kian Yang logged-in');
  });
});