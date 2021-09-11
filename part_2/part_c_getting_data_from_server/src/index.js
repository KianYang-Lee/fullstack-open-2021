// --------------------------------- AXIOS AND PROMISES ----------------------------- //
// import ReactDOM from 'react-dom';
// import App from './App.js';
// import axios from 'axios';

// // // verbose way to write a callback function registered by `then` method 
// // // and providing it with a `response` object as a parameter
// // const promise = axios.get('http://localhost:3001/notes');
// // promise.then(response => {
// //   const notes = response.data;
// //   console.log('Response', notes);
// // });

// // better way to write:
// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data;
//     console.log(notes);
//   });

// const promise2 = axios.get('http://localhost:3001/foobar');
// console.log(promise2);

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

// //  note that this approach has many issues, as we're rendering the
// //  entire App component only when we successfully retrieve a response
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// import axios from 'axios';

// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data;
//   ReactDOM.render(
//     <App notes={notes} />,
//     document.getElementById('root')
//   );
// });

// ------------------------------- EFFECT HOOKS ------------------------------------- //
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));