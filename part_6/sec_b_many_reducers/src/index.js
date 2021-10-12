import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import { Provider } from 'react-redux';

import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

// Create actual reducer by combining two existing reducers
//  using combineReducers function
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
});

const store = createStore(reducer, composeWithDevTools());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
