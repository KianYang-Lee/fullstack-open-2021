// Handling of environment variables
// This is a file, and its parent directory is a module!
require('dotenv').config();
const process = require('process');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT
};