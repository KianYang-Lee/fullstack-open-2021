import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

// 6.9 Step 7: Defining Redux store in a separate module
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
});
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ));

export default store;