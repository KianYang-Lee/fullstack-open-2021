const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

// Using async/await syntax introduced in ES7
notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    // Populate user info by the defined "types" to the references in
    //  Mongoose schema with the `ref` option
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

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;

  // Send info about user that created a note in userId
  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  });

  // Use try/catch to handle exceptions
  try {
    const savedNote = await note.save();
    // Store the id of note in notes field
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    response.json(savedNote);
  } catch (exception) {
    // Passes the request handling to the error 
    //  handling middleware
    next(exception);
  }

});

notesRouter.delete('/:id', async (request, response, next) => {
  // Using express-async-error library
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