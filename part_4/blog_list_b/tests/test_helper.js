const Blog = require('../models/blog');

// Initial blogs
const initialBlogs = [
  {
    title: 'Good Food',
    author: 'Penang Foodies',
    url: 'www.abc.com',
    likes: 3,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations.html',
  }
];

// Initialize DB with initial blog list
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

// Create a unique non-existing object ID
const createNonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'willremovethissoon',
      author: 'willremovethissoon',
      likes: 0,
      url: 'willremovethissoon',
    }
  );
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  createNonExistingId
};