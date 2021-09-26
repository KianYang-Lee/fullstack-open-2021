const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connected to MongoDB:', error.message);
  });

// Specify validation rules for each field in schema
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// Public interface of module is defined by setting a value to
//  module.exports variable and setting the value to Note model
// Other variables like `mongoose` and `url` will not be accessible
//  or visible to users of the module.
module.exports = mongoose.model('Note', noteSchema);