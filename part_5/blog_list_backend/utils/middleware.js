const jwt = require('jsonwebtoken');
const logger = require('./logger');
const process = require('process');
const User = require('../models/user');

// 4.20 Step 8: Allows routes to access token with request.token
// This middleware needs to be registered in app.js file before all the
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  // Pass the control to the next middleware
  next();
};

// 4.21 Step 9: Finds out who the user is and attach
//  to the request object
const userExtractor = async (request, response, next) => {
  if (!request.token) {
    // 4.23 Step 11: If token not provided, exit and respond with 401 Unauthorized
    return response.status(401).json({ error: 'Unauthorized' });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  request.user = user._id;

  next();
};

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    response.status(400).json({ error: 'token expired' });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};