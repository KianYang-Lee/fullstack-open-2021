import React from 'react';
import axios from 'axios';

// Class Components Code
class App extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    // Class components only has one state
    this.state = {
      anecdotes: [],
      current: 0
    };
  }

  // Executed once right after the first time a component renders
  // Trigger the fetching of data from a server
  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes').then(response => {
      // Calling setState always trigger the rerender of Class Component
      this.setState({ anecdotes: response.data });
    });
  };

  handleClick = () => {
    const current = Math.floor(
      Math.random() * this.state.anecdotes.length
    );
    this.setState({ current });
  };

  // Render defines how and what is rendered to the screen
  render() {
    if (this.state.anecdotes.lenght === 0) {
      return <div>no anecdotes...</div>;
    }

    return (
      <div>
        <h1>anecdote of the day</h1>
        <div>
          {this.state.anecdotes[this.state.current].content}
        </div>
        <button onClick={this.handleClick}>next</button>
      </div>
    );
  }
}

export default App;