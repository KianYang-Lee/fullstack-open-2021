const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// 4.15 Step 3: Create new users
usersRouter.post('/', async (request, response) => {
  const body = request.body;

  // 4.16 Step 4: Password validation
  if (body.password === undefined) {
    response.status(400).send({ error: 'Password required' });
  } else if (body.password.length < 3) {
    response.status(400).send({ error: 'Password length needs to be at least 3 characters' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

// Get all users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    // .populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
    .populate('blogs');
  response.json(users);
});

module.exports = usersRouter;

