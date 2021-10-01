const notesRouter = require('express').Router();
const Note = require('../models/note');

// Using async/await syntax introduced in ES7
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
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

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });

  // Use try/catch to handle exceptions
  try {
    const savedNote = await note.save();
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