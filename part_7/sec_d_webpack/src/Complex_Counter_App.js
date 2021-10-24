import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    // This cannot be bundled without loader because this is JSX
    // for rendering view in React (not plain JS)
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>
    </div>

  );
};

export default App;