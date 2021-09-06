// ------------------------------------------------------------------ //
// counter component
// import React from 'react';

// const App = (props) => {
//   const { counter } = props;
//   return (
//     <div>{counter}</div>
//   );
// };

// export default App;

// ------------------------------------------------------------------ //

// counter increment using stateful component
// import React, { useState } from 'react';
// const App = () => {
//   const [counter, setCounter] = useState(0);

//   setTimeout(
//     () => setCounter(counter + 1),
//     1000
//   );

//   console.log('rendering...', counter);

//   return (
//     <div>{counter}</div>
//   );
// };

// export default App;

// ------------------------------------------------------------------ //

// event handler using mouseclick to increment counter
// import React, { useState } from 'react';
// const App = () => {
//   const [counter, setCounter] = useState(0);

//   // const handleClick = () => {
//   //   console.log('clicked');
//   // };

//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={() => setCounter(counter + 1)}>
//         plus
//       </button>
//       <button onClick={() => setCounter(0)}>
//         zero
//       </button>
//     </div>
//   );
// };

// export default App;

// ------------------------------------------------------------------ //

// event handler using mouseclick to increment counter (REFACTOR)
// import React, { useState } from 'react';
// const App = () => {
//   const [counter, setCounter] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1);

//   const setToZero = () => setCounter(0);

//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={increaseByOne}>
//         plus
//       </button>
//       <button onClick={setToZero}>
//         zero
//       </button>
//     </div>
//   );
// };

// export default App;

// ---------------- PASSING STATE TO CHILD COMPONENTS ---------------------- //

// import React, { useState } from 'react';

// const Display = (props) => {
//   return (
//     <div>{props.counter}</div>
//   );
// };

// const Button = (props) => {
//   return (
//     <button onClick={props.onClick}>
//       {props.text}
//     </button>
//   );
// };

// const App = () => {
//   const [counter, setCounter] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1);
//   const setToZero = () => setCounter(0);
//   const decreaseByOne = () => setCounter(counter - 1);

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text='plus' />
//       <Button onClick={setToZero} text='zero' />
//       <Button onClick={decreaseByOne} text='minus' />
//     </div>
//   );
// };

// export default App;

// ---------------- REFACTORING THE COMPONENTS ---------------------- //

import React, { useState } from 'react';

// destructuring
const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>);


const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);
  const decreaseByOne = () => setCounter(counter - 1);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text='plus' />
      <Button onClick={setToZero} text='zero' />
      <Button onClick={decreaseByOne} text='minus' />
    </div>
  );
};

export default App;