var express = require('express');
var router = express.Router();
var poll = require('../controllers/poll');

router.route('/')
	.get(poll.getPolls)
	.post(poll.createPoll)
	.delete(poll.deletePolls);

router.route('/:id')
	.get(poll.getPoll)
	.put(poll.submitVotes)
	.lock(poll.closePoll)
	.delete(poll.deletePoll);

module.exports = router;
