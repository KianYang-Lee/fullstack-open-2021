// // ----------------- 1.12: ANECDOTES STEP 1 -------------------- //
// // Expand the following application by adding a button that can be clicked to 
// // display a random anecdote from the field of software engineering: 

// import React, { useState } from 'react';

// const App = () => {
//   const anecdotes = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
//     'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
//   ];

//   const [selected, setSelected] = useState(0);

//   const handleClicks = () => setSelected(Math.floor(Math.random() * anecdotes.length));

//   return (
//     <div>
//       <p>{anecdotes[selected]}</p>
//       <button onClick={handleClicks}>next anecdote</button>
//     </div>
//   );
// };

// export default App;

// // ----------------- 1.13: ANECDOTES STEP 2 -------------------- //
// // Expand your application so that you can vote for the displayed anecdote.

// import React, { useState } from 'react';

// const App = () => {
//   const anecdotes = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
//     'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
//   ];
//   // generate a random integer to assign the next anecdotes
//   const randomNumber = Math.floor(Math.random() * anecdotes.length);
//   const [selected, setSelected] = useState(0);
//   const handleClicks = () => setSelected(randomNumber);

//   // create a state for array points and updater function setPoints
//   // array state is updated by creating a copy and increment by one.
//   // if updater function is called, replace the array state with the copy of array state
//   const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
//   const copy = [...points];
//   copy[selected] += 1;
//   const handleSetPoints = () => setPoints(copy);
//   return (
//     <div>
//       <p>{anecdotes[selected]}</p>
//       <p>has {points[selected]} votes</p>
//       <button onClick={handleSetPoints}>vote</button>
//       <button onClick={handleClicks}>next anecdote</button>
//     </div>
//   );
// };

// export default App;

// ----------------- 1.14: ANECDOTES STEP 3 -------------------- //
// Now implement the final version of the application that displays the anecdote with the largest number of votes:

import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
  // generate a random integer to assign the next anecdotes
  const randomNumber = Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(0);
  const handleClicks = () => setSelected(randomNumber);

  // create a state for array points and updater function setPoints
  // array state is updated by creating a copy and increment by one.
  // if updater function is called, replace the array state with the copy of array state
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const copy = [...points];
  copy[selected] += 1;
  const handleSetPoints = () => setPoints(copy);

  // select index with largest value in the array
  const indexOfMaxValue = points.indexOf(Math.max(...points));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleSetPoints}>vote</button>
      <button onClick={handleClicks}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexOfMaxValue]}</p>
      <p>has {points[indexOfMaxValue]} votes</p>
    </div>
  );
};

export default App;