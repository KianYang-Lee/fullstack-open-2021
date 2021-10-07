import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [blogCreationMessage, setBlogCreationMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    blogService.setToken(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });
      // 5.2 Step 2: Make use of local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // 5.2 Step 2: Load user token from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.Token);
    }
  }, []);

  // 5.3 Step 3: Create blog
  const handleBlogSubmission = async (event) => {
    event.preventDefault();
    const blogObject = await blogService.create({ author, title, url });
    setBlogs(blogs.concat(blogObject));
    setBlogCreationMessage(`A new blog ${blogObject.title} added`);
    setTimeout(() => {
      setBlogCreationMessage(null);
    }, 5000);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  // 5.1 Step 1: Login Form
  const loginForm = () => {
    return (
      <div>
        <h1>Login</h1>
        <Notification blogCreationMessage={blogCreationMessage} errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const loggedInDisplay = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification blogCreationMessage={blogCreationMessage} errorMessage={errorMessage} />
        {user.name} logged in
        <button type="submit" onClick={handleLogout}>logout</button>
        <h2>Create New</h2>
        <form onSubmit={handleBlogSubmission}>
          <div>title:
            <input type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>author:
            <input type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
            <div>url:
              <input type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
          </div>
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    );
  };

  return (
    <div>

      {user === null ? loginForm() : loggedInDisplay()}

    </div>
  );
};

export default App;