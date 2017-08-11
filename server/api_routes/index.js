var express = require('express');
var router = express.Router();
var suggestions = require('./suggestions');

router.use('/suggestions', suggestions);

module.exports = router;
