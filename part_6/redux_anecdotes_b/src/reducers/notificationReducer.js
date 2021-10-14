// 6.11 Step 9: Add and remove notifications
const initialNotification = null;

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log('Notify');
      return action.notification;
    case 'REMOVE_NOTIFICATION':
      console.log('Remove');
      return action.notification;
    default:
      return state;
  }
};

// Action creator
export const setNotification = notification => {

  return {
    type: 'SET_NOTIFICATION',
    notification
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: null
  };
};

export default notificationReducer;