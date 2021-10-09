import React from 'react';

// Implement error message
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
};

export default Notification;