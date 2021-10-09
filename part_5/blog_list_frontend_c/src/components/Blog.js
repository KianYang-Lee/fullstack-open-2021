// 5.7 Step 7: Add show button and view
import React, { useState } from 'react';

const Blog = ({ blog, removeBlog, currentSessionUser, addLike }) => {
  // CSS
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleDetailsView = () => {
    setVisible(!visible);
  };

  const addLikeHandler = async (event) => {
    event.preventDefault();
    const changedBlog = { ...blog, likes: ++blog.likes };
    addLike(changedBlog);
    setLikes(changedBlog.likes);
  };

  // 5.10 Step 10: Delete blog posts
  const removeBlogHandler = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog);
    }
  };

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleDetailsView}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div className="togglableBlogDetails" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {likes}
          <button onClick={addLikeHandler}>like</button>
        </div>
        {blog.user.name}
        <div>
          {blog.user.username === currentSessionUser.username ? <button onClick={removeBlogHandler}>remove</button> : ''}
        </div>
      </div>
    </div >
  );
};

export default Blog;