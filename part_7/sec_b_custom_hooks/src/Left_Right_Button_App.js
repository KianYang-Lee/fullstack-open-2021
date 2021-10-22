// CUSTOM HOOK
import React, { useState } from 'react';

// const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>);

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

// Reusing the same hook
const App = () => {
  const left = useCounter();
  const right = useCounter();

  return (
    <div>
      {left.value}
      <Button onClick={left.increase} text='left' />
      <Button onClick={right.increase} text='right' />
      {right.value}
    </div>
  );
};

export default App;