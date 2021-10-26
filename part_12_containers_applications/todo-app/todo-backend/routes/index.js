const express = require('express');
const router = express.Router();

const configs = require('../util/config');

let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
    "message": "This message is generated hot!"
  });
});

module.exports = router;
