// --------------------------- COURSEINFO STEP 6 ---------------------------------- //
// the Course component contains the components defined in the previous part, 
// which are responsible for rendering the course name and its parts.;

// --------------------------- COURSEINFO STEP 7 AND 8 ---------------------------------- //
// Show also the sum of the exercises of the course. 

// -------------------------- COURSEINFO STEP 9 AND 2.5 ---------------------------------- //
// Let's extend our application to allow for an arbitrary number of courses

import React from 'react';
import Course from './components/Course';
import Header from './components/Header';

const App = () => {
  // const-definitions
  const title = 'Web development curriculum';
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <Header title={title} />
      <Course courses={courses} title={title} />
    </div>
  );
};

export default App;