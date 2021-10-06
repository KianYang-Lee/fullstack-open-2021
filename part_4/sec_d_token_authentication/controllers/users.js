// Creating new users happens in compliance with the RESTful conventions
//  by making an HTTP POST request to the users path
// We will define a separate router for this

const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  // Password is not stored, instead we store the hash of password
  //  generated by `bcrypt.hash` function
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

// Returns all users in DB
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    // Populate method performs multiple queries under the hood to fetch
    //  results that resemble JOIN in RDB
    // Add Mongo syntax to choose specific field(s)
    .populate('notes', { content: 1, date: 1 });
  response.json(users);
});

module.exports = usersRouter;