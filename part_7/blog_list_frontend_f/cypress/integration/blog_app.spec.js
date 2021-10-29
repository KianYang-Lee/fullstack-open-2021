Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// 5.17 Step 1
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Lee Kian Yang',
      username: 'kylee',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
    cy.should('not.contain', 'username');
  });

  // 5.18 Step 2
  describe('Login', function () {
    beforeEach(function () {
      cy.contains('login').click();
    });
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('kylee');
      cy.get('#password').type('password');
      cy.get('#login-button').click();

      cy.contains('Lee Kian Yang logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('kylee');
      cy.get('#password').type('wrongpassword');
      cy.get('#login-button').click();

      cy.contains('Wrong credentials');
    });
  });

  // 5.19 Step 3: End-to-end testing
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'kylee', password: 'password' });
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#author').type('This is author');
      cy.get('#title').type('This is title');
      cy.get('#url').type('This is url');
      cy.get('#create-button').click();
      cy.contains('This is title');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ author: 'Great author', title: 'Awesome title', url: 'www.url.com' });
        cy.contains('Awesome title')
          .find('button')
          .click();
      });

      // 5.20 Step 4
      it('User can like a blog', function () {
        cy.get('.likes').should('contain', '0');
        cy.get('#like-button').click();
        cy.get('.likes').should('contain', '1');
      });

      // TODO: 5.21 Step 5
      it('User can remove a blog', function () {
        cy.contains('remove').click();
        cy.contains('create new blog');
      });
    });

    describe('Many blogs exist', function () {
      it.only('and they are ordered with most likes being first during first render', function () {
        cy.createBlog({ author: '3 likes', title: '3 likes', url: 'www.url.com', likes: 3 });
        // cy.createBlog({ author: '2 likes', title: '2 likes', url: 'www.url.com', likes: 2 });
        // cy.createBlog({ author: '1 likes', title: '1 likes', url: 'www.url.com', likes: 1 });

        cy.contains('3 likes')
          .find('button')
          .click()
          .get('.likes')
          .should('contain', '3');
      });
    });

  });
});