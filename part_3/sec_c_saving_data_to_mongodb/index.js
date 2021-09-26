// // ================ BACKEND CONNECTED TO A DB ================== //

// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(express.json());
// app.use(cors());

// const mongoose = require('mongoose');
// const url =
//   `mongodb+srv://fullstack_admin:${password}@fullstack.1insp.mongodb.net/note-app?retryWrites=true&w=majority`;

// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean
// });

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   }
// });

// const Note = mongoose.model('Note', noteSchema);


// // (request, response) is an event handler!
// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>');
// });

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes);
//   });
// });

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' });
// };
// app.use(unknownEndpoint);

// // Use port defined in environment variable port or 3001 (if env var undefined)
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // ================ DB CONFIGURATION INTO ITS OWN MODULE ================== //
// // Importing environment variable
// require('dotenv').config();

// const express = require('express');
// const app = express();
// const cors = require('cors');
// // Note variable will be assigned to the same object that the module defines
// const Note = require('./models/note');
// app.use(express.json());
// app.use(cors());

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes);
//   });
// });

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' });
// };
// app.use(unknownEndpoint);

// // Use port defined in environment variable port or 3001 (if env var undefined)
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ================ USING DB IN ROUTE HANDLERS ================== //

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/note');
const { request, response } = require('express');
// Order of middleware is important!
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

// // Fetching individual note
// app.get('/api/notes/:id', (request, response) => {
//   Note.findById(request.params.id).then(note => {
//     if (note) {
//       response.json(note);
//     } else {
//       // Error handling if person does not exist
//       response.status(404).end();
//     }
//   })
//     // Handle event where findById method is rejected
//     .catch(error => {
//       console.log(error);
//       // Send 400 (bad request)
//       response.status(400).send({ error: 'malformatted id' });
//     });
// });

// Error handling using middleware
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    // if next function is called with a param, the execution will
    //  continue to the error handler middleware
    .catch(error => next(error));
});

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important
  };
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(error => next(error));
});


// Handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

// this has to be the last loaded middleware
app.use(errorHandler);

// Use port defined in environment variable port or 3001 (if env var undefined)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});