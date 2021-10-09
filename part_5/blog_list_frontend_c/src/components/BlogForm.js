// 5.6 Step 6: Separating BlogForm

import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      author,
      title,
      url
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>title:
          <input type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>author:
          <input type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <div>url:
            <input type="text"
              value={url}
              id="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;