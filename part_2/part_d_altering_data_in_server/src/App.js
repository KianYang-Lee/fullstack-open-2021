// // ------------------- ADDING NOTE USING POST REQUEST ----------- //
// import React, { useState, useEffect } from 'react';
// import Note from './components/Note';
// import axios from 'axios';

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     console.log('effect');
//     axios
//       .get('http://localhost:3001/notes')
//       .then(response => {
//         console.log('promise fulfilled');
//         setNotes(response.data);
//       });
//   }, []);
//   console.log('render', notes.length, 'notes');

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       date: new Date().toISOString(),
//       important: Math.random() > 0.5,
//     };

//     axios
//       .post('http://localhost:3001/notes', noteObject)
//       .then(response => {
//         setNotes(notes.concat(response.data));
//         setNewNote('');
//       });
//   };

//   const handleNoteChange = (event) => {
//     console.log(event.target.value);
//     setNewNote(event.target.value);
//   };

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important);

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note =>
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input
//           value={newNote}
//           onChange={handleNoteChange}
//         />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   );
// };

// export default App;

// // --------------------- CHANGING THE IMPORTANCE OF NOTES --------- //
// // ------------------- ADDING NOTE USING POST REQUEST ----------- //
// // Let's add a button to every note that can be used for toggling its importance.
// // Changes made at Note component
// import React, { useState, useEffect } from 'react';
// import Note from './components/Note';
// import axios from 'axios';
// import noteService from './services/notes';

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');
//   const [showAll, setShowAll] = useState(false);

//   const toggleImportanceOf = (id) => {
//     // ES6 template literals
//     const url = `http://localhost:3001/notes/${id}`;
//     const note = notes.find(n => n.id === id);
//     const changedNote = { ...note, important: !note.important };

//     axios.put(url, changedNote).then(response => {
//       setNotes(notes.map(note => note.id !== id ? note : response.data));
//     });
//   };

//   useEffect(() => {
//     console.log('effect');
//     axios
//       .get('http://localhost:3001/notes')
//       .then(response => {
//         console.log('promise fulfilled');
//         setNotes(response.data);
//       });
//   }, []);
//   console.log('render', notes.length, 'notes');

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       date: new Date().toISOString(),
//       important: Math.random() > 0.5,
//     };

//     axios
//       .post('http://localhost:3001/notes', noteObject)
//       .then(response => {
//         setNotes(notes.concat(response.data));
//         setNewNote('');
//       });
//   };

//   const handleNoteChange = (event) => {
//     console.log(event.target.value);
//     setNewNote(event.target.value);
//   };

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important);

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map((note, i) =>
//           <Note key={i}
//             note={note}
//             toggleImportance={() => toggleImportanceOf(note.id)}
//           />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input
//           value={newNote}
//           onChange={handleNoteChange}
//         />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   );
// };

// export default App;

// ---------------- EXTRACTING COMMUNICATION WITH BACKEND --------- //
// ------------------- INTO A SEPARATE MODULE ----------- //
import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        );
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;