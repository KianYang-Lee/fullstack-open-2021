import React from 'react';

// this is one component: Header component
const Header = (props) => {
  // rendering the name of the course
  return (
    // this is called fragments, wrapping the elements to be returned by the component with an empty element
    // is required because adjacent JSX elements must be wrapped in an enclosing tag 
    <>
      {/* this is not HTML but JSX, wrapper used by React to write HTML */}
      <h1>
        {props.course}
      </h1>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  );
};

const Content = (props) => {
  // Refactor the Content component so that it does not render any names of parts or their number of exercises by itself.
  //  Instead it only renders three Part components of which each renders the name and number of exercises of one part.
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  );
};

const Total = (props) => {
  // renders the total number of exercises.
  return (
    <>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>);
};

const App = () => {
  // const-definitions 
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  );
};

export default App;;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
