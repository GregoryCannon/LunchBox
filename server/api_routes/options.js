var express = require('express');
var router = express.Router();
var option = require('../controllers/option');

router.route('/:location/:sortBy')
  .get(option.getOptions)

router.route('/:location/:sortBy/:keyword')
  .get(option.getOptions)

module.exports = router;
