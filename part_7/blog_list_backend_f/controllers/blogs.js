const blogsRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;
  // 4.19 Step 7: Adding blog only possible if valid token is attached
  // User identified is the creator of the blog
  const user = await User.findById(request.user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

// 4.21 Step 9: A blog can be deleted by original user
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // Extractor user
  const userId = request.user;
  // Verify whether token user same as blog creator
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    const user = await User.findById(userId);
    user.blogs = user.blogs.filter(blog => {
      blog._id.toString() !== request.params.id;
    });

    return response.status(204).end();
  }

  return response.status(401).json({ error: 'User not authorized to delete blog' });
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;