import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { castVote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

// 6.8 Step 6: Separate rendering of anecdote list into
//  its own component
const AnecdoteList = () => {
  // 6.5 Step 3: Anecdotes are ordered by number of votes
  const dispatch = useDispatch();
  const unfilteredAnecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes));

  // 6.12 Step 10: Filter
  const filter = useSelector(state => state.filter);
  // const anecdotes = unfilteredAnecdotes;
  const anecdotes = unfilteredAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter));

  const vote = (id, content) => {
    dispatch(castVote(id));
    dispatch(setNotification(`You voted '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;