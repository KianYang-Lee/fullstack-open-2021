import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

// forwardRef function call allows component access to the ref that is assigned.
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // This is a React hook to define functions in a component
  //  which can be invoked from outside of the component.
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {/* props.children refers to child component, which is LoginForm */}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

// Define buttonLabel prop as a mandatory or required string-type prop
Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;