import React from 'react';
import { createNote, toggleImportanceOf } from './reducers/noteReducer';
import { useSelector, useDispatch } from 'react-redux';

// UNCONTROLLED FROM

// App gets the right action by calling creator function
const App = () => {
  // useDispatch hook provides any React component access to the
  //  dispatch function of redux store defined in `index.js`
  const dispatch = useDispatch();

  // component can access notes stored in the store with
  //  useSelector hook. Function param either searches for or selects
  //  data from redux-store. Since we need all notes,
  //  our selector function returns the whole state
  const notes = useSelector(state => state);

  // Eg. Selecting notes marked as important only
  // const importantNotes = useSelector(state => state.filter(note => note.imporant === true))

  const addNote = (event) => {
    event.preventDefault();
    // This can be used because the field has attribute "name"
    //  specified
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li
            key={note.id}
            onClick={() => toggleImportance(note.id)}
          >

            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div >
  );
};

export default App;