import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  console.log(notification);
  if (notification === 'Wrong credentials') {
    console.log('WC');
    return (
      <div className="error">
        {notification}
      </div>
    );
  } else if (notification) {
    return (<div className="success">
      {notification}
    </div>);
  } else {
    return null;
  }
};

export default Notification;