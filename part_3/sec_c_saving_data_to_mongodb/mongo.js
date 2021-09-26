// ======== Practice application: SAVING NOTES USING MONGODB ===== //

const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

// Accessing command line parameter
const password = process.argv[2];

const url =
  `mongodb+srv://fullstack_admin:${password}@fullstack.1insp.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url);

// Define the schemma for a note and the matching model
// Schema tells Mongoose how the note objects are to be stored
//  in the DB
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

// Note model definition - 'Note' will trigger name of collection
//  to be lowercased plural 'notes'
const Note = mongoose.model('Note', noteSchema);

// Application creates a new note object with Note model
const note = new Note({
  content: 'Callback-functions suck',
  date: new Date(),
  important: true,
});

// The param for then method is an event handler
// This line save the object into DB and then the
//  event handler gets called and close the DB connection
note.save().then(result => {
  console.log('note saved!');
  mongoose.connection.close();
});

// ======== Practice application: FETCHING OBJECTS FROM DB ===== //

// const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>');
//   process.exit(1);
// }

// // Accessing command line parameter
// const password = process.argv[2];

// const url =
//   `mongodb+srv://fullstack_admin:${password}@fullstack.1insp.mongodb.net/note-app?retryWrites=true&w=majority`;

// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

// const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// });

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });