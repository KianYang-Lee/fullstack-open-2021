const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const process = require('process');

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// Isolate token  authorization header and
const getTokenFrom = request => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// Note creation only possible if request has valid token attached
// Using Bearer scheme on Authorization header
notesRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);

  //  check validity with `jwt.verify`
  //  Return the object which the token was based on
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  response.json(savedNote);
});

notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(error => next(error));
});

module.exports = notesRouter;