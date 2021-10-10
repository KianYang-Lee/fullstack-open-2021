Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Lee Kian Yang',
      username: 'kylee',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000/api/notes');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app');
  });

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

  describe('when logged in', function () {
    // Skip UI and login using backend
    beforeEach(function () {
      cy.login({ username: 'kylee', password: 'password' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        });
      });
      it('it can be made important', function () {
        // cy.contains('another note cypress')
        //   .parent()
        //   .find('button')
        //   .click();

        // cy.contains('another note cypress')
        //   .parent()
        //   .find('button')
        //   .should('contain', 'make not important');
        // More concise way of writing
        cy.contains('another note cypress')
          .parent()
          .find('button')
          .as('theButton');

        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second note')
          .parent()
          .find('button')
          .click();

        cy.contains('second note')
          .parent()
          .find('button')
          .should('contain', 'make not important');
      });
    });
  });

  // it.only('login fails with wrong password', function () {
  //   cy.contains('login').click();
  //   cy.get('#username').type('kylee');
  //   cy.get('#password').type('wrong');
  //   cy.get('#login-button').click();

  //   cy.get('.error')
  //     .should('contain', 'Wrong credentials')
  //     .and('have.css', 'color', 'rgb(255, 0, 0)');
  //   // .and('have.css', 'border-style', 'solid');

  //   cy.get('html').should('not.contain', 'Lee Kian Yang logged-in');
  // });
});