'use strict';

var mongoose = require('mongoose'),
  Poll = mongoose.model('Poll');

// Standard callback
const standard = (res) => {
  return (function(err, poll) {
    if (err) res.send(err);
    res.json(poll);
  });
};

// Callback with message
const message = (res, msg) => {
  return (function(err, _) {
    if (err) res.send(err);
    res.json({ message: msg });
  });
};


exports.list_all_polls = (req, res) => {
  Poll.find({}, standard(res));
}


exports.create_poll = (req, res) => {
  const addCreationDefaults = (poll) => {
    poll.options.forEach(function(option){
      option.voteCount = 0;
      option.voters = [];
    })
    return poll;
  }

  var new_poll = new Poll(addCreationDefaults(req.body));
  new_poll.save(standard(res));
}


exports.read_poll = (req, res) => {
  Poll.findById(req.params.pollId, standard(res));
}


exports.send_votes = (req, res) => {
  const sumVotes = (voters) => voters.reduce((s, a) => s + a.value, 0);

  Poll.findById(req.params.pollId, function(err, currentPoll){
    if (err) res.send(err);

    if (currentPoll.status[0] == 'open'){
      // Loop through the options and add the new votes
      currentPoll.options.forEach(function(option){
        const newVote = req.body.options.find(v => (v.name == option.name));

        if (newVote != undefined && newVote.voteCount != 0){
          // Remove previous votes by same person
          option.voters = option.voters.filter(v => (v.voter_name != req.body.voter_name));

          option.voters.push({
            voter_name: req.body.voter_name,
            voteCount: newVote.voteCount
          });
          option.voteCount = sumVotes(option.voters);
        }
      });

      // Update the database
      Poll.findByIdAndUpdate(req.params.pollId, currentPoll, {new: true}, standard(res));
    }

    else {
      res.json({ message: 'Cannot send votes - poll is closed.'});
    }
  });
}


exports.close_poll = (req, res) => {
  Poll.findById(req.params.pollId, function(err, currentPoll){
    if (err) res.send(err);

    currentPoll.status = ['closed'];
    Poll.findByIdAndUpdate(req.params.pollId, currentPoll, {new: true}, standard(res));
  });
}


exports.delete_poll = (req, res) => {
  Poll.remove({ _id: req.params.pollId }, message(res, 'Removed poll.'));
}


exports.delete_all_polls = (req, res) => {
  Poll.remove({}, message(res, 'Removed all polls.'));
}
