import React, { useState } from 'react';
import Notification from './Notification';

const LoginForm = ({
  handleSubmit
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = (event) => {
    event.preventDefault();
    handleSubmit({
      username, password
    });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h1>Login</h1>
      <Notification />
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            id='password'
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  );
};

export default LoginForm;