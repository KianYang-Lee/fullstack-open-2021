import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const App = () => {
  return (
    <div>
      <div>
        {/* App renders value of counter by asking it from store */}
        {store.getState()}
      </div>
      {/* Action handlers of button dispatch the right actions to the store */}
      <button
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  );
};

// Function to renders the whole app
const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

// First rendering of the app
renderApp();

// Listen for changes in the store and re-render the app if state is changed
store.subscribe(renderApp);
