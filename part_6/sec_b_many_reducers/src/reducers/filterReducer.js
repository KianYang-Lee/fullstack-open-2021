// Separate reducer for state of the filter
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// Action creator for filterReducer
export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter
  };
};

export default filterReducer;