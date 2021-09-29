const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const process = require('process');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connected to MongoDB', error);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);