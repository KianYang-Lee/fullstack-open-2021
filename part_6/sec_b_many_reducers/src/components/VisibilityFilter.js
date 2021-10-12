import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      {/* This is a button group since names are the same */}
      all <input type="radio" name="filter"
        onChange={() => dispatch(filterChange('ALL'))} />
      important <input type="radio" name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))} />
      nonimportant <input type="radio" name="filter"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
    </div>
  );
};

export default VisibilityFilter;