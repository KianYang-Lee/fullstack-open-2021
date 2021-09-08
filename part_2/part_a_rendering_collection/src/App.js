// // ------------------- Rendering Collections -------------------------- //
// import React from 'react';

// const App = (props) => {
//   const { notes } = props;

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(note =>
//           <li key={note.id}>
//             {note.content}
//           </li>)}
//       </ul>
//     </div>
//   );
// };

// export default App;

// // ------------------- Refactoring Modules -------------------------- //
// import React from 'react';

// const Note = ({ note }) => {
//   return (
//     <li>{note.content}</li>
//   );
// };

// const App = ({ notes }) => {
//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(note => <Note key={note.id} note={note} />)}
//       </ul>
//     </div>
//   );
// };

// export default App;

// ------------------- Refactoring Modules to Different ES6 Files ---------------- //
import React from 'react';
import Note from './components/Note';

const App = ({ notes }) => {
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