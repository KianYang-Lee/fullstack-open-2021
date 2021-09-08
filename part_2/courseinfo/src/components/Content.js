import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // https://stackoverflow.com/questions/5732043/how-to-call-reduce-on-an-array-of-objects-to-sum-their-properties
    const reducer = (accumulator, currentValue) => {
        return { exercises: accumulator.exercises + currentValue.exercises };
    };
    const total = parts.reduce(reducer);
    return (
        <div>
            <h2>{parts.name}</h2>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <strong>total of {total.exercises} exercises</strong>
        </div>
    );
};

export default Content;