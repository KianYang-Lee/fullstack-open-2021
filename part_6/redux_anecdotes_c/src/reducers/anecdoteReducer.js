import anecdoteService from '../services/anecdotes';

// 6.13 Step 1: Fetch anecdotes from backend
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find(anecdote => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );

    case 'NEW_ANECDOTE':
      return [...state, action.data];

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      return state;
  }
};

export const castVote = (id, anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    });
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(
      {
        type: 'INIT_ANECDOTES',
        data: anecdotes
      }
    );
  };
};

export default anecdoteReducer;