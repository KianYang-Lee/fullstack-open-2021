import axios from 'axios';

const baseUrl = 'http://localhost:3003/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// 6.14 Step 2
const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

// 6.17 Step 5: Voting
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default {
  getAll,
  createNew,
  update
};