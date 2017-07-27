'use strict';

var express = require('express');
var router = express.Router();
var poll = require('../controllers/poll');

router.get('/', poll.getAllPolls);
router.post('/', poll.createPoll);
router.delete('/', poll.deleteAllPolls);

router.get('/:id', poll.getPoll);
router.put('/:id', poll.submitVotes);
router.lock('/:id', poll.closePoll);
router.delete('/:id', poll.deletePoll);

module.exports = router;
