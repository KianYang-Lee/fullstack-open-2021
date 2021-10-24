import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  // Use global constanT from config
  const notes = useNotes(BACKEND_URL);

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
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>

  );
};

export default App;