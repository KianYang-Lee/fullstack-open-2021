// ------------------------- COMPLEX STATE : MULTIPLE STATES ------------------------ //
// import React, { useState } from 'react';

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   return (
//     <div>
//       {left}
//       <button onClick={() => setLeft(left + 1)}>
//         left
//       </button>
//       <button onClick={() => setRight(right + 1)}>
//         right
//       </button>
//     </div>
//   );
// };

// export default App;

// // ---- COMPLEX STATE : saving click count of both left and right buttons into a single object ------------------------ //
// import React, { useState } from 'react';

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   });

//   const handleLeftClick = () => {
//     const newClicks = {
//       left: clicks.left + 1,
//       right: clicks.right
//     };
//     setClicks(newClicks);
//   };

//   const handleRightClick = () => {
//     const newClicks = {
//       left: clicks.left,
//       right: clicks.right + 1
//     };
//     setClicks(newClicks);
//   };

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>
//         left
//       </button>
//       <button onClick={handleRightClick}>
//         right
//       </button>
//       {clicks.right}
//     </div>
//   );
// };

// export default App;

// // ---- COMPLEX STATE : USING OBJECT SPREAD SYNTAX AND SIMPLY FUNCTION WITHOUT ASSIGNING TO VAR ------------------------ //
// import React, { useState } from 'react';

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   });

//   const handleLeftClick = () => {
//     setClicks({ ...clicks, left: clicks.left + 1 });
//   };

//   const handleRightClick = () => {
//     setClicks({ ...clicks, right: clicks.right + 1 });
//   };

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>
//         left
//       </button>
//       <button onClick={handleRightClick}>
//         right
//       </button>
//       {clicks.right}
//     </div>
//   );
// };

// export default App;

// // -------------------------- HANDLING ARRAYS ------------------------ //
// import React, { useState } from 'react';

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'));
//     setLeft(left + 1);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'));
//     setRight(right + 1);
//   };

//   return (
//     <div>
//       {left}
//       <button onClick={handleLeftClick}>
//         left
//       </button>
//       <button onClick={handleRightClick}>
//         right
//       </button>
//       {right}
//       <p>{allClicks.join(' ')}</p>
//     </div>
//   );
// };

// export default App;

// // --------------------- CONDITIONAL RENDERING ----------------------------- //
// // modify our application so that the rendering of the clicking history is handled by a new History component
// import React, { useState } from 'react';

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     );
//   }

//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   );
// };

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'));
//     setLeft(left + 1);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'));
//     setRight(right + 1);
//   };

//   return (
//     <div>
//       {left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   );
// };

// export default App;

// // --------------------- CONDITIONAL RENDERING: REFACTORING WITH BUTTON COMPONENT ----------------------------- //
// import React, { useState } from 'react';

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     );
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   );
// };

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>{text}</button>
// );

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'));
//     setLeft(left + 1);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'));
//     setRight(right + 1);
//   };

//   return (
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text='left' />
//       <Button handleClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   );
// };

// export default App;

// ----------- PASSING EVENT HANDLERS TO CHILD COMPONENTS AND NEVER DEFINE NEXT COMPONENTS --------- //
import React, { useState } from 'react';

const Display = props => <div>{props.value}</div>;

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = newValue => setValue(newValue);

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text='thousand' />
      <Button handleClick={() => setToValue(0)} text='reset' />
      <Button handleClick={() => setToValue(value + 1)} text='increment' />
    </div>
  );

};

export default App;