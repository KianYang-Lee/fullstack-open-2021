// CUSTOM HOOK
import React, { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>);

// Extract counter logic into a custom hook
// So that we can extract state of App component and its manipulation
// Managing counter state and logic is now responsibility of custom hook
const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    setValue(value - 1);
  };

  const zero = () => {
    setValue(0);
  };

  return {
    value,
    increase,
    decrease,
    zero
  };
};

const App = () => {
  // React components use the custom hook
  const counter = useCounter();


  return (
    <div>
      <Display counter={counter.value} />
      <Button onClick={counter.increase} text='plus' />
      <Button onClick={counter.zero} text='zero' />
      <Button onClick={counter.decrease} text='minus' />
    </div>
  );
};

export default App;