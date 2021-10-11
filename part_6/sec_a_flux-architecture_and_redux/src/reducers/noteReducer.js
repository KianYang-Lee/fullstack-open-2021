// Bad reducer because reducer must be pure functions
// Pure function: 
// - do not cause any side effects 
// - must always return same response when called with same params
const badNoteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.data); // Changes the state of the state-object (BAD!)
    return state;
  }
  return state;
};

// Better alternative
const concatNoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data);
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

// Array spread syntax
// ...state breaks the array up into individual elements,
//  which can be placed in another array
const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data];
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

const generateId = () =>
  Math.floor(Math.random() * 1000000);

// Action Creators (functions that create actions)
// Since not necessary for React components to know Redux
//  action types and forms, we can separate them out
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  };
};

// A module can have only one default export but multiple
//  "normal" exports, which can be imported using:
//  import { toggleImportanceOf } from './../reducers/noteReducer'
export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  };
};

// This allows reducer to be imported the usual way:
//  import noteReducer from './reducers/noteReducer
export default noteReducer;