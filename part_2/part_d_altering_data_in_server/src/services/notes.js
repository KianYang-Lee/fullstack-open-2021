// // The module returns an object that has three functions (getAll, create, and update) 
// // as its properties that deal with notes. 
// // The functions directly return the promises returned by the
// // axios methods.
// import axios from 'axios';
// const baseUrl = 'http://localhost:3001/notes';

// const getAll = () => {
//   return axios.get(baseUrl);
// };

// const create = newObject => {
//   return axios.post(baseUrl, newObject);
// };


// const update = (id, newObject) => {
//   return axios.put(`${id}/${id}`, newObject);
// };

// export default {
//   getAll: getAll,
//   create: create,
//   update: update
// };

// ----------------- REFACTORING -------------------- //
// instead of the entire HTTP response, 
// we would only get the response data.
import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll2 = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  };
  return request.then(response => response.data.concat(nonExisting));
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

