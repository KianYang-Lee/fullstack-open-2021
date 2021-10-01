const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

// Wraps app modules into a superagent object
// Supertest takes care that the application being tested is
//  started at the port that it uses internally
const api = supertest(app);

const Note = require('../models/note');

// beforeEach(async () => {
//   // Clear out DB at the beginning
//   await Note.deleteMany({});
//   let noteObject = new Note(helper.initialNotes[0]);
//   await noteObject.save();
//   noteObject = new Note(helper.initialNotes[1]);
//   await noteObject.save();
// });

// ===== Optimizing beforeEach function ===== //
// beforeEach not waiting for forEach loop to finish executing
// beforeEach(async () => {
//   await Note.deleteMany({});
//   console.log('cleared');

//   helper.initialNotes.forEach(async (note) => {
//     let noteObject = new Note(note);
//     await noteObject.save();
//     console.log('saved');
//   });
//   console.log('done');
// });

// // Fix using Promise.all method
// // Executes the promises it receives in parallel
// //  problematic if the promises need to be executed in a particular order
// beforeEach(async () => {
//   await Note.deleteMany({});

//   const noteObjects = helper.initialNotes.map(
//     note => new Note(note)
//   );
//   const promiseArray = noteObjects.map(note => note.save());
//   await Promise.all(promiseArray);
// });

// for...of block guarantees a specific execution order
beforeEach(async () => {
  await Note.deleteMany({});

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }
});

test('notes are returned as json', async () => {
  console.log('entered test');
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

// // Inspect the response data stored in response.body property
// test('there are two notes', async () => {
//   const response = await api.get('/api/notes');

//   // Execution gets here only after the HTTP request is complete
//   // Easier to code than Promise
//   expect(response.body).toHaveLength(2);
// });

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes');

//   expect(response.body[0].content).toBe('HTML is easy');
// });

test('all notes are returned', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.map(r => r.content);
  // Create an array containing the content of every note returned by API
  expect(contents).toContain(
    'Browser can execute only Javascript'
  );
});

// Test addition of new note
//  Verify that the amount of notes returned by API increases,
//  and that newly added note is in the list
test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  // // Before refactoring
  // const response = await api.get('/api/notes');
  // expect(response.body).toHaveLength(initialNotes.length + 1);
  // After refactoring
  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  // // Before refactoring
  // const contents = response.body.map(r => r.content);
  // expect(contents).toContain(
  //   'async/await simplifies making async calls'
  // );
  // After refactoring
  const contents = notesAtEnd.map(n => n.content);
  expect(contents).toContain(
    'async/await simplifies making async calls'
  );
});

// Test verifying a note without content will not be saved
test('note without content is not addeed', async () => {
  const newNote = {
    important: true
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

// Test for fetching an individual note
test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb();

  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  // Turn note object's date property to string for comparison
  const processedNotedToView = JSON.parse(JSON.stringify(noteToView));

  expect(resultNote.body).toEqual(processedNotedToView);
});

// Test for removing an individual note
test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  );

  const contents = notesAtEnd.map(r => r.content);

  expect(contents).not.toContain(noteToDelete.content);
});

// Close DB connection after all tests have finished running
// Jest function
afterAll(done => {
  mongoose.connection.close();
  done();
});