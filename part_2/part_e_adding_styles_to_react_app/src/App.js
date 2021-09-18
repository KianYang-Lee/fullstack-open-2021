// // ---------------- IMPROVED ERROR MESSAGE ----------------- //
// // You have to toggle "Make importance" button of
// // `This note is not saved to server` to display the
// // error message.
// import React, { useState, useEffect } from 'react';
// import Note from './components/Note';
// import noteService from './services/notes';
// import Notification from './components/Notification';

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');
//   const [showAll, setShowAll] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     noteService
//       .getAll()
//       .then(initialNotes => {
//         setNotes(initialNotes);
//       });
//   }, []);

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       date: new Date().toISOString(),
//       important: Math.random() > 0.5,
//     };

//     noteService
//       .create(noteObject)
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote));
//         setNewNote('');
//       });
//   };

//   const toggleImportanceOf = id => {
//     const note = notes.find(n => n.id === id);
//     const changedNote = { ...note, important: !note.important };

//     noteService
//       .update(id, changedNote)
//       .then(returnedNote => {
//         setNotes(notes.map(note => note.id !== id ? note : returnedNote));
//       })
//       .catch(error => {
//         // add logic for displaying the error message
//         setErrorMessage(
//           `Note '${note.content}' was already removed from server`
//         );
//         setTimeout(() => {
//           setErrorMessage(null);
//         }, 5000);
//         setNotes(notes.filter(n => n.id !== id));
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
//       <Notification message={errorMessage} />
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note =>
//           <Note
//             key={note.id}
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

// ---------------- INLINE STYLES ----------------- //
// React bases the division of application along the lines
// of its logical functional entities, a complete opposite
// practice compared to traditional writing of CSS, HTML and JS
// into separate files

import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';

const Footer = () => {
  const footerStyle = {
    // Each CSS property is defined differently in JS
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
        // add logic for displaying the error message
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  );
};

export default App;