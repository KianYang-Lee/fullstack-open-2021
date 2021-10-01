const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const listHelper = require('../utils/list_helper');


const api = supertest(app);
const Blog = require('../models/blog');

// Initialize test DB state
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map(
    blog => new Blog(blog)
  );
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('Testing APIs', () => {
  // 4.8 Step 1
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(3);
  });

  // 4.10 Step 3
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

  // 4.14 Step 1
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
  // 4.9 Step 2
  test('Verify unique identifier property of blog is id', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;

    expect(blogs[0].id).toBeDefined();
  });

  // 4.11 Step 4
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

  // 4.12 Step 5
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


describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs, 'likes');
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{
      title: 'Good Food',
      author: 'Penang Foodies',
      url: 'www.abc.com',
      likes: 3
    }];

    const result = listHelper.totalLikes(blogs, 'likes');
    expect(result).toBe(3);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'Good Food',
        author: 'Penang Foodies',
        url: 'www.abc.com',
        likes: 3
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.totalLikes(blogs, 'likes');
    expect(result).toBe(8);
  });
});


describe('top liked blog', () => {
  test('of a bigger list is selected right', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Good Food',
        author: 'Penang Foodies',
        url: 'www.abc.com',
        likes: 3,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f5',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations.html',
        __v: 0
      }
    ];

    const result = listHelper.mostLikedBlog(blogs);
    expect(result).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    );
  });
});




