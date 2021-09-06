// // --------------------------- UNICAFE: STEP 1 + STEP 2 ---------------------------------- //
// import React, { useState } from 'react';

// const Button = props => <button onClick={props.handleClick}>{props.text}</button>;

// const Display = props => <div>{props.text}: {props.value}</div>;

// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   const handleGood = () => setGood(good + 1);
//   const handleNeutral = () => setNeutral(neutral + 1);
//   const handleBad = () => setBad(bad + 1);

//   // the total number of collected feedback
//   let all = good + neutral + bad;
//   // average score (good: 1, neutral: 0, bad: -1)
//   let average = ((good) + bad * (-1)) / all;
//   // percentage of positive feedback
//   let positive = good / all * 100;

//   return (
//     <div>
//       <h1>give feedback</h1>
//       <Button handleClick={handleGood} text='good' />
//       <Button handleClick={handleNeutral} text='neutral' />
//       <Button handleClick={handleBad} text='bad' />
//       <h2>statistics</h2>
//       <Display value={good} text='good' />
//       <Display value={neutral} text='neutral' />
//       <Display value={bad} text='bad' />
//       <Display value={all} text='all' />
//       <Display value={average} text='average' />
//       <Display value={positive} text='positive' />

//     </div>
//   );
// };

// export default App;

// // --------------------------- UNICAFE: STEP 3 ---------------------------------- //
// import React, { useState } from 'react';

// const Button = props => <button onClick={props.handleClick}>{props.text}</button>;

// const Display = props => <div>{props.text}: {props.value}</div>;

// const Statistics = (props) => {
//   // reassignment
//   const good = props.good;
//   const neutral = props.neutral;
//   const bad = props.bad;

//   // the total number of collected feedback
//   let all = good + neutral + bad;
//   // average score (good: 1, neutral: 0, bad: -1)
//   let average = ((good) + bad * (-1)) / all;
//   // percentage of positive feedback
//   let positive = good / all * 100;

//   return (
//     <div>
//       <p>all: {all}</p>
//       <p>average: {average}</p>
//       <p>positive: {positive} %</p>
//     </div>
//   );
// };

// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   const handleGood = () => setGood(good + 1);
//   const handleNeutral = () => setNeutral(neutral + 1);
//   const handleBad = () => setBad(bad + 1);



//   return (
//     <div>
//       <h1>give feedback</h1>
//       <Button handleClick={handleGood} text='good' />
//       <Button handleClick={handleNeutral} text='neutral' />
//       <Button handleClick={handleBad} text='bad' />
//       <h2>statistics</h2>
//       <Display value={good} text='good' />
//       <Display value={neutral} text='neutral' />
//       <Display value={bad} text='bad' />
//       <Statistics good={good} neutral={neutral} bad={bad} />

//     </div>
//   );
// };

// export default App;

// // --------------------------- UNICAFE: STEP 4 ---------------------------------- //
// import React, { useState } from 'react';

// const Button = props => <button onClick={props.handleClick}>{props.text}</button>;

// const Display = props => {
//   if (props.goodValue === 0 || props.neutralValue === 0 || props.badValue === 0) {
//     return (
//       <div>No feedback given</div>
//     );
//   }

//   return (
//     <div>
//       <p>{props.goodText}: {props.goodValue}</p>
//       <p>{props.neutralText}: {props.neutralValue}</p>
//       <p>{props.badText}: {props.badValue}</p>
//     </div>
//   );
// };

// const Statistics = (props) => {
//   // reassignment
//   const good = props.good;
//   const neutral = props.neutral;
//   const bad = props.bad;

//   // the total number of collected feedback
//   let all = good + neutral + bad;
//   // average score (good: 1, neutral: 0, bad: -1)
//   let average = ((good) + bad * (-1)) / all;
//   // percentage of positive feedback
//   let positive = good / all * 100;

//   if (props.goodValue === 0 || props.neutralValue === 0 || props.badValue === 0) {
//     return (
//       <div></div>
//     );
//   }

//   return (
//     <div>
//       <p>all: {all}</p>
//       <p>average: {average}</p>
//       <p>positive: {positive} %</p>
//     </div>
//   );
// };

// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   const handleGood = () => setGood(good + 1);
//   const handleNeutral = () => setNeutral(neutral + 1);
//   const handleBad = () => setBad(bad + 1);



//   return (
//     <div>
//       <h1>give feedback</h1>
//       <Button handleClick={handleGood} text='good' />
//       <Button handleClick={handleNeutral} text='neutral' />
//       <Button handleClick={handleBad} text='bad' />
//       <h2>statistics</h2>
//       <Display goodValue={good} goodText='good' neutralValue={neutral}
//         neutralText='neutral' badValue={bad} badText='bad' />
//       <Statistics goodValue={good} neutralValue={neutral} badValue={bad} />

//     </div>
//   );
// };

// export default App;

// --------------------------- UNICAFE: STEP 5 ---------------------------------- //
// Let's continue refactoring the application. Extract the following two components:

// Button for defining the buttons used for submitting feedback
// StatisticLine for displaying a single statistic, e.g. the average score.


import React, { useState } from 'react';

const Button = props => <button onClick={props.handleClick}>{props.text}</button>;

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}:</td>
    <td>{props.value}</td>
  </tr>);

const Statistics = (props) => {
  // reassignment
  const good = props.statistics.good;
  const neutral = props.statistics.neutral;
  const bad = props.statistics.bad;

  // the total number of collected feedback
  let all = good + neutral + bad;
  // average score (good: 1, neutral: 0, bad: -1)
  let average = ((good) + bad * (-1)) / all;
  // percentage of positive feedback
  let positive = good / all * 100;

  if (props.statistics.good === 0 &&
    props.statistics.neutral === 0 &&
    props.statistics.bad === 0) {
    return (
      <div>No feedback given</div>
    );
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.statistics.good} />
        <StatisticLine text='neutral' value={props.statistics.neutral} />
        <StatisticLine text='bad' value={props.statistics.bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h2>statistics</h2>
      <Statistics statistics={statistics} />

    </div>
  );
};

export default App;