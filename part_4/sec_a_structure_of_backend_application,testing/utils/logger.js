// ========= PRINTING NORMAL LOG MESSAGES & ================= //
// =========  ERROR FOR ALL ERROR MESSAGES =================== //
const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.log(...params);
};

module.exports = {
  info, error
};