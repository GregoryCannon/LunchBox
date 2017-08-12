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
  Poll.findById(pollId, function(err, poll){
    if (!poll) return callback({ message: 'No poll exists for that ID' }, null);

    poll.voteTotals = getVoteTotals(poll);
    poll.scores = getOptionScores(poll, 1, -1, -10);
    callback(err, poll);
  });
}

/* Takes a poll, calculates the score for each option, and return a map from
 * yelp ID to that option's score.  */
const getOptionScores = (poll, upVal, downVal, vetoVal) => {
  const scoresMap = {};
  poll.options.forEach(function(option){
    var optionScore = 0;
    Object.keys(option.voters).forEach(function (key){
      switch(option.voters[key]){
        case 'up': optionScore += upVal; break;
        case 'down': optionScore += downVal; break;
        case 'veto': optionScore += vetoVal; break;
      }
    })
    scoresMap[option.yelpId] = optionScore;
  });
  return scoresMap;
}

/* Takes a poll, totals up the votes for each option, and returns a map from
 * yelp ID to that option's votes  (e.g. {up: 1, down: 1, veto: 0}).     */
const getVoteTotals = (poll) => {
  const totalsMap = {};
  poll.options.forEach(function(option){
    const scores = { up: 0, down: 0, veto: 0 };
    Object.keys(option.voters).forEach(function(key){
      const vote = option.voters[key];
      if (['up', 'down', 'veto'].includes(vote)){
        scores[vote]++;
      }
    })
    totalsMap[option.yelpId] = scores;
  });
  return totalsMap;
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
      // Submit their vote for each option
      currentPoll.options.forEach(function(option){
        const vote = voteData.votes[option.yelpId];
        if (vote){
          option.voters[voteData.voterName] = vote
        }
      });
      Poll.findByIdAndUpdate(pollId, currentPoll, {new: true}, callback);
    }
  });

}
