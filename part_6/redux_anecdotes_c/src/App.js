import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  // 6.13 Step 1
  const dispatch = useDispatch();


  // 6.15 Step 3: Modify initialization of redux store to make 
  //  use of asynchronous action creator
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;