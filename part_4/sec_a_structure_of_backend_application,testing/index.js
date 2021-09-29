// ============= STRUCTURE OF BACKEND APPLICATION & ============== //
// ============ INTRODUCTION TO TESTING ========================== //

// This file only imports actual application from `app.js` file
//  and then starts the application.

const app = require('./app'); // the actual Express application
const http = require('http');
const config = require('./utils/config'); // access environment variables by importing 
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});