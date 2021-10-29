// Receives an array of blog posts as a parameter

const blog = require("../models/blog");

//  and always return 1
const dummy = (blogs) => {
  return 1;
};

// Receives a list of blog pposts as a parameter. The function returns the
//  total sum of likes in all of the blog posts
const totalLikes = (blogs, prop) => {
  const reducer = (sum, blog) => {
    return sum + blog[prop];
  };

  return blogs.reduce(reducer, 0);
};

// Receives a list of blogs as parameter and finds out which blog has most
//  likes. If there are many top favorites, just return one
// Return format is object of {title: String, author: String, likes: Number}
const mostLikedBlog = (blogs) => {
  const reducer = (max, blog) => {
    return (max.likes > blog.likes
      ? max
      : blog);
  };
  const result = blogs.reduce(reducer, 0);
  delete result._id;
  delete result.__v;
  delete result.url;
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  mostLikedBlog
};

// 4.6 Use Lodash library. Takes an array of blogs as param and
//  returns the author who has the largest amount of blogs
// Return: {author: String, blogs: Number}

// 4.7 Takes an array of blogs as its param. 
//  Returns the author, whose blog posts have the largest amount of likes.
// Return: {author: String, likes: Number}