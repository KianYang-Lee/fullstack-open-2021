// ============ BLOG LIST 4.1 - 4.2 ========= //

const config = require('./utils/config');
const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// ========= 4.3 - 4.7 BLOG LIST ========== //
// Let's create a collection of helper functions that are meant to 
// assist dealing with the blog list. 
// Create the functions into a file called utils/list_helper.js. 
// Write your tests into an appropriately named test file under the tests directory.