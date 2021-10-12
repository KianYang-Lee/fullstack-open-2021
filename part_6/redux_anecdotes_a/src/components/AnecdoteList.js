import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { castVote } from "../reducers/anecdoteReducer";

// 6.8 Step 6: Separate rendering of anecdote list into
//  its own component
const AnecdoteList = () => {
  // 6.5 Step 3: Anecdotes are ordered by number of votes
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes));
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(castVote(id));
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;