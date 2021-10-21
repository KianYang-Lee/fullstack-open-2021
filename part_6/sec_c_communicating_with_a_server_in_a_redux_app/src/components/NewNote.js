import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import noteService from '../services/notes';

const NewNote = (props) => {
  const dispatch = useDispatch();

  // const addNote = async (event) => {
  //   event.preventDefault();
  //   const content = event.target.note.value;
  //   event.target.note.value = '';
  //   // To also create new note in DB
  //   const newNote = await noteService.createNew(content);
  //   dispatch(createNote(newNote));
  // };

  // Above approach is OK but communication should be abstracted
  //  away from the components if possible, so they only
  //  need to call the appropriate action creator
  // They should only use fn provided as a prop without caring
  //  about the communication with server that is happening in the 
  //  background
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;