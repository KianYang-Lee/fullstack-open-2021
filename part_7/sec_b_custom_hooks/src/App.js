// CUSTOM HOOK
import React, { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  // Function returns all of the attributes by the input
  return {
    type,
    value,
    onChange
  };
};

// Reusing the same hook
const App = () => {
  const name = useField('text');
  const born = useField('text');
  const height = useField('text');

  return (
    <div>
      <form>
        name:
        {/* <input
          type={name.type}
          value={name.value}
          onChange={name.onChange}
        /> */}
        {/* We can use spread syntax since name object has exactly */}
        {/* all of the attributes that the input element expects to receive as props */}
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};

export default App;