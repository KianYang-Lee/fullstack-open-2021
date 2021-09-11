import React, { useEffect, useState } from 'react';
import Note from './components/Note';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // // most concise way to write
  // useEffect(() => {
  //   console.log('effect');
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled');
  //       setNotes(response.data);
  //     });
  // }, []);

  // another look on the useEffect code
  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);
      });
  };
  // second parameter of useEffect specify how often the effect is run
  // if it is an empty array, it is only run along with first render of component
  useEffect(hook, []);

  console.log('render', notes.length, 'notes');
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note={note} />)}
      </ul>
    </div>
  );
};

export default App;