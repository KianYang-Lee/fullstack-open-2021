import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  // 5.9 Step 9: Sort blog list
  const copyOfBlogs = blogs.slice(0);
  const sortedBlogs = copyOfBlogs.sort((a, b) => b.likes - a.likes);

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  const attemptingLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      // 5.2 Step 2: Make use of local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      dispatch(setNotification('Wrong credentials'), 5);
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
  };

  const removeBlog = async (blogObject) => {
    await blogService.remove(blogObject);
    setBlogs(blogs.filter(blog => blog.id !== blogObject.id));
  };

  const addLike = async (blogObject) => {
    await blogService.update(blogObject.id, blogObject);
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const beforeLoggedInDisplay = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          handleSubmit={attemptingLogin}
        />
      </Togglable>
    );
  };

  const loggedInDisplay = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        {user.name} logged in
        <button type="submit" onClick={handleLogout}>logout</button>
        {blogForm()}

        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} currentSessionUser={user} addLike={addLike} />
        )}
      </div>
    );
  };

  return (
    <div>

      {user === null ? beforeLoggedInDisplay() : loggedInDisplay()}

    </div>
  );
};

export default App;