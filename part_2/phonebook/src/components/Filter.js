import React from 'react';

const Filter = ({ onChange, filter }) => {
  return (
    <p>filter shown with <input onChange={onChange} value={filter} /></p>
  );
};

export default Filter;