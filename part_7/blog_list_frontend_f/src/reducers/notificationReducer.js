// 7.9 redux Step 1
const initialNotification = null;

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;

    case 'REMOVE_NOTIFICATION':
      return action.notification;

    default:
      return state;
  }
};

export const setNotification = (notification, seconds) => {
  console.log('Dispatching setNotfication');
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification: null
      });
    }, seconds * 1000);
  };
};

export default notificationReducer;