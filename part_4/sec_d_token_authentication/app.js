const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

logger.info('connecting to', config.MONGODB_URI);

// Responsible for establishing connection to DB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

// Router is used if URL starts with /api/notes
app.use('/api/notes', notesRouter);

// Router is used if URL starts with /api/users
app.use('/api/users', usersRouter);

// Router is used if URL starts with /api/login
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;