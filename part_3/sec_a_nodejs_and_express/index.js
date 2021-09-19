// // ========================= HELLO WORLD WEB SERVER ================================ //
// const http = require('http');

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('Hello World');
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

// // ========================= HELLO WORLD WEB SERVER ================================ //
// const http = require('http');

// let notes = [
//   { id: 1, content: "HTML is easy", date: "2019-05-30T17:30:31.098Z", important: true },
//   { id: 2, content: "Browser can execute only Javascript", date: "2019-05-30T18:39:34.091Z", important: false },
//   { id: 3, content: "GET and POST are the most important methods of HTTP protocol", date: "2019-05-30T19:20:14.298Z", important: true }];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(notes));
// });

// const PORT = 3002;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

// // ============================ WEB AND EXPRESS ========================== //
// const express = require('express');
// const app = express();

// let notes = [
//   { id: 1, content: "HTML is easy", date: "2019-05-30T17:30:31.098Z", important: true },
//   { id: 2, content: "Browser can execute only Javascript", date: "2019-05-30T18:39:34.091Z", important: false },
//   { id: 3, content: "GET and POST are the most important methods of HTTP protocol", date: "2019-05-30T19:20:14.298Z", important: true }];

// // event handler to handle HTTP GET request made to app's root
// // request parameter contains all info of HTTP request
// // response parameter is used to define how the request is responded to
// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>');
// });

// app.get('/api/notes', (request, response) => {
//   response.json(notes);
// });

// const PORT = 3002;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ================ FETCHING A SINGLE RESOURCE USING REST INTERAFCE ================== //
// =================== DELETEING RESOURCES ============================================ //
// ==================== RECEIVING DATA =========================================== //
const express = require('express');
const app = express();

// allow easier access to data
app.use(express.json());

let notes = [
  { id: 1, content: "HTML is easy", date: "2019-05-30T17:30:31.098Z", important: true },
  { id: 2, content: "Browser can execute only Javascript", date: "2019-05-30T18:39:34.091Z", important: false },
  { id: 3, content: "GET and POST are the most important methods of HTTP protocol", date: "2019-05-30T19:20:14.298Z", important: true }];

// event handler to handle HTTP GET request made to app's root
// request parameter contains all info of HTTP request
// response parameter is used to define how the request is responded to
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

// create a route for fetching a single resource
// www.example.com/api/notes/{unique_identifier}
// /:id will handle all HTTP GET requests, that are of the form /api/notes/SOMETHING
// where SOMETHING is an arbitrary string. The id param can be
// accessed through the request object.
app.get('/api/notes/:id', (request, response) => {
  // This will not work because 1 != '1' when using '===' operator
  // const id = request.params.id;
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  response.json(note);
});

// We also need to handle the case where no resource (note) is found
//  by returning a 404 status code instead of 200
// The following similar interface provides such functionality
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);

  if (note) {
    response.json(note);
  } else {
    // status method set the status, end method responds to request 
    //  without sending any data
    response.status(404).end();
  }
});

// 204 means resource is deleted successfully (?)
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

// // receiving data, event handler access data from body property
// //  of request object
// // Only return a response with the request body
// app.post('/api/notes', (request, response) => {
//   const note = request.body;
//   console.log(note);
//   response.json(note);
// });

// app.post('/api/notes', (request, response) => {
//   const maxId = notes.length > 0
//     ? Math.map(...notes.map(n => n.id))
//     : 0;

//   const note = request.body;

//   // not a recommended way to generate ID
//   note.id = maxId + 1;

//   notes = notes.concat(notet);

//   response.json(note);
// });

// Separate ID generation into another function
const generateId = () => {
  const maxId = notes.length > 0
    // notes.map() returns a new array containing all IDs of notes, the array is
    //  transformed into individual numbers using spread syntax before 
    //  supplying into Math.max function
    ? Math.max(...notes.map(n => n.id))
    : 0;
  return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;

  // Specify content must not be null
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const note = {
    content: body.content,
    // Allow important key to be null
    important: body.important || false,
    // Generation of date property done by server instead as we can't trust host
    //  machine running the browser to have its clock set correctly
    date: new Date(),
    id: generateId()
  };

  notes = notes.concat(note);

  response.json(note);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});