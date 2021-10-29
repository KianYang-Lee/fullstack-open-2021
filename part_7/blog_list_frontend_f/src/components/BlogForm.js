// 5.6 Step 6: Separating BlogForm

import React, { useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch();
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
    dispatch(setNotification(`A new blog ${title} added`, 5));
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
        <button type="submit" id="create-button">create</button>
      </form>
    </div>
  );
};

export default BlogForm;