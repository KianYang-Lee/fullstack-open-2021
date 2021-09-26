// // ============== 3.9 - 11 PHONEBOOK BACKEND STEP 9 TO 11 ======================= //
// let persons = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   },
//   {
//     "id": 5,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ];

// const express = require('express');
// const morgan = require('morgan');
// const app = express();
// const cors = require('cors');
// app.use(express.json());
// app.use(express.static('build'));
// morgan.token('body', (request, response) => {
//   return JSON.stringify(request.body);
// });
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
// app.use(cors());

// app.get("/api/persons", (request, response) => {
//   response.json(persons);
// });

// app.get("/info", (request, response) => {
//   const date = new Date();
//   const total = persons.length;
//   return response.send(
//     `
//     <p>Phonebook has info for ${total} people</p>
//     <p>${date}</p>
//     `
//   );
// });

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find(person => person.id === id);
//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter(person => person.id !== id);
//   response.status(204).end();
// });

// app.post("/api/persons", (request, response) => {
//   const body = request.body;
//   if (!(body.name && body.number)) {
//     return response.status(400).json({
//       error: 'Name or number is missing'
//     });
//   }

//   matched_name = persons.find(person => person.name === body.name);
//   if (matched_name) {
//     return response.status(400).json({
//       error: 'name must be unique'
//     });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: Math.floor(Math.random() * (999 - 1) + 1)
//   };

//   persons = persons.concat(person);

//   response.json(person);
// });

// const PORT = process.env.PORT || 3002;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ============== 3.13 - 18 PHONEBOOK WITH MONGODB ======================= //

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');
app.use(express.json());
app.use(express.static('build'));
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  const total = persons.length;
  return response.send(
    `
    <p>Phonebook has info for ${total} people</p>
    <p>${date}</p>
    `
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then(person =>
    response.json(person))
    .catch(error => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: 'Name or number is missing'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });
  person.save().then(savedPerson => {
    response.json(savedPerson);
  });

  // matched_name = persons.find(person => person.name === body.name);
  // if (matched_name) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name == 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
};
app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});