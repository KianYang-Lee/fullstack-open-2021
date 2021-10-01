// ========= PRINTING NORMAL LOG MESSAGES & ================= //
// =========  ERROR FOR ALL ERROR MESSAGES =================== //
const process = require('process');

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV === 'test') {
    console.error(...params);
  }
};

module.exports = {
  info, error
};