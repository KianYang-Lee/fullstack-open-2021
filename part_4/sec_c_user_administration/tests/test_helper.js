const Note = require('../models/note');
const User = require('../models/user');

// Initialze DB before every test
const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

// Create a unique DB object ID
const nonExistingId = async () => {
  const note = new Note(
    {
      content: 'willremovethissoon',
      date: new Date()
    });

  await note.save();
  await note.remove();

  return note._id.toString();
};

// Get all notes stored in DB
const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(note => note.toJSON());
};

// Verify the state of DB after a user is created
const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialNotes, nonExistingId, notesInDb, usersInDb
};