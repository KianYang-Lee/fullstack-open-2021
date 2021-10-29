const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

// Initialize test DB state
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map(
    blog => new Blog(blog)
  );
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);

  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'testAccount', name: 'tester', passwordHash });
  await user.save();
});

describe('Creating new users', () => {
  test('Valid creation', async () => {
    const usersAtStart = await helper.usersInDb();

    const validUser = {
      username: 'validAccount',
      name: 'validTester',
      password: 'validPassword'
    };

    await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(validUser.username);
  });

  test('Without username', async () => {
    const noUserName = {
      name: 'invalidTest',
      password: 'validPassword'
    };

    await api
      .post('/api/users')
      .send(noUserName)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Without password', async () => {
    const noPassword = {
      name: 'invalidTest',
      username: 'validUsername'
    };

    const response = await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toEqual('Password required');
  });

  test('Password length less than minimum', async () => {
    const invalidPasswordLength = {
      name: 'invalidTest',
      username: 'validUsername',
      password: 'OK'
    };

    const response = await api
      .post('/api/users')
      .send(invalidPasswordLength)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toEqual('Password length needs to be at least 3 characters');
  });

  test('Username length less than minimum', async () => {
    const invalidUsernameLength = {
      name: 'invalidTest',
      username: 'OK',
      password: 'validPassword'
    };

    await api
      .post('/api/users')
      .send(invalidUsernameLength)
      .expect(400)
      .expect('Content-Type', /application\/json/);

  });
});

describe('Testing Blog APIs', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(3);
  });

  test('A valid blog can be added', async () => {
    const newBlog = {

      title: 'Good Food',
      author: 'Penang Foodies',
      url: 'www.abc.com',
      likes: 3
    };

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('A single blog post can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    );

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('An existing blog can be modified', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToModify = blogsAtStart[0];

    const modifications = {
      title: 'changetitle',
      author: 'changeauthor',
      url: 'www.changeurl.com',
      likes: 8
    };

    const resultBlog = await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(modifications)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    delete resultBlog.body.id;
    expect(resultBlog.body).toEqual(modifications);
  });
});

describe('Viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.createNonExistingId();

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404);
  });
});

describe('Blog properties where', () => {
  test('Verify unique identifier property of blog is id', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;

    expect(blogs[0].id).toBeDefined();
  });

  test('"likes" default to 0 if not specified in request', async () => {
    const newBlog = {
      title: 'National Lifestyles',
      author: 'National Geographics',
      url: 'www.ng.com',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toEqual(0);
  });

  test('Return 400 if title and url missing from request body', async () => {
    const blogWithoutTitle = {
      author: 'National Geographics',
      url: 'www.ng.com',
    };

    const blogWithoutUrl = {
      title: 'Failed blog',
      author: 'National Geographics',
    };

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});


afterAll(done => {
  mongoose.connection.close();
  done();
});
