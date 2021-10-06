import React from 'react';

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important';

  // React uses className attribute (instead of class attribute for regular HTML)
  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;