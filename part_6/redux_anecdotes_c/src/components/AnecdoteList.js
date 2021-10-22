import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { castVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const unfilteredAnecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes));

  const filter = useSelector(state => state.filter);
  const anecdotes = unfilteredAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter));

  const vote = (id, anecdote) => {
    dispatch(castVote(id, anecdote));
    // 6.18 Step 6: Use asynchronous action creator for notification
    dispatch(setNotification(`You voted '${anecdote.content}'`, 10));
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;