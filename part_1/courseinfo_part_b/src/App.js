// // courseinfo step4
// import React from 'react';

// // this is one component: Header component
// const Header = (props) => {
//   // rendering the name of the course
//   return (
//     // this is called fragments, wrapping the elements to be returned by the component with an empty element
//     // is required because adjacent JSX elements must be wrapped in an enclosing tag 
//     <>
//       {/* this is not HTML but JSX, wrapper used by React to write HTML */}
//       <h1>
//         {props.course}
//       </h1>
//     </>
//   );
// };

// const Part = (props) => {
//   return (
//     <>
//       <p>{props.part} {props.exercises}</p>
//     </>
//   );
// };

// const Content = (props) => {
//   // Refactor the Content component so that it does not render any names of parts or their number of exercises by itself.
//   //  Instead it only renders three Part components of which each renders the name and number of exercises of one part.
//   const lists = props.parts.map(function (item) {
//     return <Part part={item.name} exercises={item.exercises} />;
//   });
//   return lists;
// };

// const Total = (props) => {
//   // renders the total number of exercises.
//   return (
//     <>
//       <p>Number of exercises {props.parts[0].exercises + props.parts[0].exercises + props.parts[0].exercises}</p>
//     </>);
// };

// const App = () => {
//   // const-definitions 
//   const course = 'Half Stack application development';
//   // place the objects (with attributes) into an array
//   const parts = [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     },
//   ];

//   return (
//     <div>
//       <Header course={course} />
//       <Content parts={parts} />
//       <Total parts={parts} />
//     </div>
//   );
// };

// export default App;

// courseinfo step5
import React from 'react';

const App = () => {
  // const-definitions 
  const course = {
    // place the objects (with attributes) into an array
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

// this is one component: Header component
const Header = (props) => {
  console.log(props);
  // rendering the name of the course
  return (
    <>
      <h1>
        {props.course.name}
      </h1>
    </>
  );
};

const Part = (props) => {
  console.log(props);

  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  );
};

const Content = (props) => {
  // Refactor the Content component so that it does not render any names of parts or their number of exercises by itself.
  //  Instead it only renders three Part components of which each renders the name and number of exercises of one part.
  console.log(props);
  const lists = props.parts.parts.map(function (item) {
    return <Part part={item.name} exercises={item.exercises} />;
  });
  return lists;
};

const Total = (props) => {
  // renders the total number of exercises.
  let sum = 0;
  props.parts.parts.forEach(element => {
    //   console.log(element.exercises);
    sum += element.exercises;
    //   console.log(sum);
  });

  return (
    <>
      <p>Number of exercises {sum}</p>
    </>);
};

export default App;