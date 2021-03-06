// ============== 3.9 - 11 PHONEBOOK BACKEND STEP 9 TO 11 ======================= //
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  },
  {
    "id": 5,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.static('build'));
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

app.get("/api/persons", (request, response) => {
  response.json(persons);
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

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: 'Name or number is missing'
    });
  }

  matched_name = persons.find(person => person.name === body.name);
  if (matched_name) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * (999 - 1) + 1)
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});