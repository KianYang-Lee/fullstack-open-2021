import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    {/* {console.log(store.getState())} */}
    <App />
  </Provider>,
  document.getElementById('root')
);