import axios from 'axios';
// const baseUrl = 'http://localhost:3001/api/notes';

// Declare baseUrl using relative URL since both frontend and
//  backend are at the same address
const baseUrl = '/api/notes';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};
// a shorter syntax
export default { getAll, create, update };

// export default {
//   getAll: getAll,
//   create: create,
//   update: update
// };

