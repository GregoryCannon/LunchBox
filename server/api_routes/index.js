var express = require('express');
var router = express.Router();
var options = require('./options');

router.use('/options', options);

module.exports = router;
