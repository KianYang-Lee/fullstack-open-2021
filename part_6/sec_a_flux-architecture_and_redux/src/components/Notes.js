import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

// Presentational component - not aware that event handler it gets
//  as props dispatches an action
const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  );
};

// Container component: contains some application logic:
//  - defines what event handlers of Note components do
//  - coordinates the configuration of presentational components (Note)
const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state);

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() =>
            dispatch(toggleImportanceOf(note.id))}
        />)}
    </ul>
  );
};

export default Notes;