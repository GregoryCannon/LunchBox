var mongoose = require('mongoose');
var Poll = require('../models/poll');
var getSubmissionFormatErrors = require('./submit_validation');
var _ = require('lodash');

exports.createPoll = (pollData, callback) => {
  const poll = new Poll(pollData);
  poll.save(callback);
}


exports.closePoll = (id, callback) => {
  Poll.findById(id, function(err, currentPoll){
    if (err) return err;
    currentPoll.open = false;
    Poll.findByIdAndUpdate(id, currentPoll, {new: true}, callback);
  });
}


exports.deletePoll = (id, callback) => {
  Poll.remove({ _id: id }, function(err, val){
    callback(err, null)
  });
}


exports.deleteAllPolls = (callback) => {
  Poll.remove({}, function(err, val){
    callback(err, null)
  });
}


exports.getPoll = (id, callback) => {
  Poll.findById(id, callback);
}


exports.getAllPolls = (callback) => {
  Poll.find({}, callback);
}


exports.submitVotes = (id, voteData, callback) => {
  const err = validateSubmitData(voteData);
  if (err){
    callback(err, null);
    return;
  }

  Poll.findById(id, function(err, currentPoll){
    if (err) {
      callback(err, null);
    } else if (!currentPoll) {
      callback({ message: 'cannot submit votes - poll does not exist.' }, null);
    } else if (!currentPoll.open) {
      callback({ message: 'cannot submit votes - poll is closed.' }, null);
    }
    else {
      currentPoll.options.forEach(function(option){
        const name = voteData.voterName;
        const thisOptionVote = voteData.options.find(v => (v.optionName == option.optionName));

        // Remove their old votes, then add new
        option.voters = option.voters.filter(v => v.voterName != name);
        if (thisOptionVote){
          option.voters.push({
            voterName: name,
            vote: thisOptionVote.vote
          });
        }
      });
      Poll.findByIdAndUpdate(id, currentPoll, {new: true}, callback);
    }
  });
}
