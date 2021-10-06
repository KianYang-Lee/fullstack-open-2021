// DISPLAYING THE LOGIN FORM ONLY WHEN APPROPRIATE
// The state and all the functions related are defined outside of
//  the component and are passed to the component as props.
// Destructuring is used to assign props to variables
// Example of not using destructuring:
//  (props) => return <div>{props.attribute}</div>s

import React from 'react';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;