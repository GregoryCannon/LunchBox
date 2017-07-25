'use strict';

var mongoose = require('mongoose'),
  Poll = mongoose.model('Poll');

const standard = (res) => {
  return (function(err, poll) {
    if (err) res.send(err);
    res.json(poll);
  });
};

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

const sumVotes = (voters) => {
  let sum = 0;
  voters.forEach((v) => {
    sum += v.voteCount;
  });
  return sum;
}

exports.send_votes = (req, res) => {
  Poll.findById(req.params.pollId, function(err, currentPoll){
    if (err) res.send(err);

    if (currentPoll.status[0] == 'open'){
      // Add the new votes to each option
      currentPoll.options.forEach(function(option){
        const newVote = req.body.options.find(function(d){
          return d.name == option.name;
        });
        if (newVote != undefined && newVote.voteCount != 0){
          // Remove previous votes by same person
          option.voters = option.voters.filter((v) => {
            return (v.voter_name != req.body.voter_name);
          });

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
