import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';
import App from './App';
import { Provider } from 'react-redux';

// FORWARDING REDUX-STORE TO VARIOUS COMPONENTS

const store = createStore(noteReducer);

// App defined as a child of a Provider component provided
//  by react-redux library with application's store given as attribute
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
