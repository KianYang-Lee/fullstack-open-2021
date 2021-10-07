import React from 'react';
const Notification = ({ blogCreationMessage, errorMessage }) => {
  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    );
  } else if (blogCreationMessage) {
    return (
      <div className="success">
        {blogCreationMessage}
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;