import { createStore } from 'redux';

function App() {
  // State of store is change with action.
  // This is an action. They are objects with at least a field determining
  //  the type of te action
  // const incrementAction = {
  //   type: 'INCREMENT'
  // };

  // A reducer is a function that returns a new state when given the
  //  current state and an action as parameters
  // The first parameter is the state in the store. Reducer returns
  //  a new state based on the actions type. Also, a default value is set for state
  const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      case 'ZERO':
        return 0;
      default: // if none of the above matches, code comes here
        return state;
    }
  };

  // Reducer is given as a param to createStore fn that creates the store
  const store = createStore(counterReducer);

  // Store uses reducer to handle actions
  store.dispatch({ type: 'INCREMENT' });

  // State of the store can be found using method getState
  console.log(store.getState());
  // 1

  store.dispatch({ type: 'INCREMENT' });
  console.log(store.getState());
  // 2

  // Create callback functions the store calls when its state is changed
  store.subscribe(() => {
    const storeNow = store.getState();
    console.log(storeNow);
  });

  store.dispatch({ type: 'ZERO' }); // 0
  store.dispatch({ type: 'DECREMENT' }); // 01

  return null;
};

export default App;
