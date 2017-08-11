var mongoose = require('mongoose');
var Poll = require('../models/poll');
var validateSubmitData = require('./submit_validation');
var _ = require('lodash');


/* Each function takes a callback, which should be in the form:
    function (err, val){
      // err is the error object, or null if there is no error
      // val is the returned value from the function
    }
 */


// Returns the created poll as a js object
exports.createPoll = (pollData, callback) => {
  const poll = new Poll(pollData);
  poll.save(callback);
}


// Returns the closed poll as a js object
exports.closePoll = (pollId, callback) => {
  Poll.findById(pollId, function(err, currentPoll){
    if (err) return callback(err, null);
    currentPoll.open = false;
    Poll.findByIdAndUpdate(pollId, currentPoll, {new: true}, callback);
  });
}


exports.deletePoll = (pollId, callback) => {
  Poll.remove({ _id: pollId }, function(err, val){
    callback(err, null)
  });
}


exports.deleteAllPolls = (callback) => {
  Poll.remove({}, function(err, val){
    callback(err, null)
  });
}


// Returns the requested poll as a js object
exports.getPoll = (pollId, callback) => {
  Poll.findById(pollId, callback);
}

/* Total up the final score for each option, according to the weights passed in.
 *  (e.g. you pass in that up = 1, down = -1, veto = -10)
 * Returns the poll object, with the map as the '.scores' property */
exports.getOptionScores = (pollId, upVal, downVal, vetoVal, callback) => {
  Poll.findById(pollId, function(err, val){
    if (err) return callback(err, null)

    const scoresMap = {};
    val.options.forEach(function(option){
      var optionScore = 0;
      option.voters.forEach(function(voter){
        switch (voter.vote) {
          case 'up': optionScore += upVal; break;
          case 'down': optionScore += downVal; break;
          case 'veto': optionScore += vetoVal; break;
        }
      });
      scoresMap[option.yelpId] = optionScore;
    });
    val.scores = scoresMap;
    callback(err, val);
  });
}

/* Create a map from yelpId to the vote totals (e.g. {up: 1, down: 1, veto: 0}),
 * and adds it to the poll object as a '.voteTotals' property   */
exports.getVoteTotals = (pollId, callback) => {
  Poll.findById(pollId, function(err, val){
    if (err) return callback(err, null)

    const totalsMap = {};
    val.options.forEach(function(option){
      const scores = { up: 0, down: 0, veto: 0 };
      option.voters.forEach(function(voter){
        if (['up', 'down', 'veto'].includes(voter.vote)){
          scores[voter.vote]++;
        }
      });
      totalsMap[option.yelpId] = scores;
    });
    val.voteTotals = totalsMap;
    callback(err, val);
  });
}


// Returns the poll after the new votes are added in
exports.submitVotes = (pollId, voteData, callback) => {
  const err = validateSubmitData(voteData);
  if (err) return callback(err, null);

  Poll.findById(pollId, function(err, currentPoll){
    if (err) {
      callback(err, null);
    } else if (!currentPoll) {
      callback({ message: 'cannot submit votes - poll does not exist.' }, null);
    } else if (!currentPoll.open) {
      callback({ message: 'cannot submit votes - poll is closed.' }, null);
    }
    else {
      submit(pollId, voteData, currentPoll, callback);
    }
  });
}

const submit = (pollId, voteData, currentPoll, callback) => {
  currentPoll.options.forEach(function(option){
    const name = voteData.voterName;
    const thisOptionVote = voteData.options.find(v => (v.name == option.name));

    // Remove their old votes, then add new
    option.voters = option.voters.filter(v => v.voterName != name);
    if (thisOptionVote){
      option.voters.push({
        voterName: name,
        vote: thisOptionVote.vote,
      });
    }
  });
  Poll.findByIdAndUpdate(pollId, currentPoll, {new: true}, callback);
}
