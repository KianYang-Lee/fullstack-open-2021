import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    // This cannot be bundled without loader because this is JSX
    // for rendering view in React (not plain JS)
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={() => setCounter(counter + 1)}>
        press
      </button>
    </div>

  );
};

export default App;