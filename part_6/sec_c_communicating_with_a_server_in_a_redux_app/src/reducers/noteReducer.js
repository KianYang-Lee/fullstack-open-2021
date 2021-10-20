const noteReducer = (state = [], action) => {
  console.log('ACTION:', action);
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data];
    case 'INIT_NOTES':
      return action.data;
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id;
      const noteToChange = state.find(n => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      };
      return state.map(note =>
        note.id !== id ? note : changedNote
      );
    }
    default:
      return state;
  }
};

// generateId no longer needed since it is generated by backend
export const createNote = (data) => {
  return {
    type: 'NEW_NOTE',
    data
  };
};

export const initializeNotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  };
};

export default noteReducer;