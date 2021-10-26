import './App.css';
import TodoView from './Todos/TodoView';

function App() {
  return (
    <div className="App">
      <div>Hello Everbody this is hot-loaded.</div>
      <div>and this is hot-loaded using docker-compose</div>
      <TodoView />
    </div>
  );
}

export default App;
