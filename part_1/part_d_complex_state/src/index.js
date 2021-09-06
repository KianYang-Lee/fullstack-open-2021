import ReactDOM from 'react-dom';
import App from './App';

// not using stateful component
// let counter = 1;

// declaration of "refresh" arrow function using ES6 arrow notation
// const refresh = () => {
//   ReactDOM.render(<App counter={counter} />,
//     document.getElementById('root'));
// };

// increase counter by 1 and re-render the page with latest value
// refresh();
// counter += 1;
// refresh();
// counter += 1;
// refresh();

// re-rendering and incrementing the counter every second by using setInterval
// setInterval(() => {
//   refresh();
//   counter += 1;
// }, 1000);

ReactDOM.render(<App />,
  document.getElementById('root'));