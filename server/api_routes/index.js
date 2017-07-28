var express = require('express');
var router = express.Router();
var polls = require('./polls');
var suggestions = require('./suggestions');

router.use('/polls', polls);
router.use('/suggestions', suggestions);

module.exports = router;
