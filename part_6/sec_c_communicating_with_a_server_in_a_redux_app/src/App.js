import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import noteService from './services/notes';
import { initializeNotes } from './reducers/noteReducer';

// STORE WITH COMPLEX STATE

const App = () => {
  const dispatch = useDispatch();

  // Effect hook to trigger first rendering
  useEffect(() => {
    // Initialize state based on server data
    noteService.getAll().then(notes =>
      dispatch(initializeNotes(notes))
    );
  }, [dispatch]); // Reexecute effect if dispatch 
  // variable changes during runtime

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div >
  );
};

export default App;