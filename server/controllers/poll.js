var mongoose = require('mongoose');
var Poll = require('../models/poll');
var validateSubmitData = require('./submit_validation');
var _ = require('lodash');


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
    if (err) return callback(err, null)
    if (!poll) return callback({ message: 'No poll exists for that ID' }, null);
    poll = JSON.parse(JSON.stringify(poll))
    poll.voteTotals = getVoteTotals(poll);
    poll.scores = getOptionScores(poll, 1, -1, -10);
    poll.voters = getVoters(poll);
    callback(err, poll);
  });
}

/* Takes a poll, calculates the score for each option, and return a map from
 * yelp ID to that option's score.  */
const getOptionScores = (poll, upVal, downVal, vetoVal) => {
  const scoresMap = {};
  poll.options.forEach(function(option){
    var optionScore = 0;
    Object.keys(option.voters || []).forEach(function (key){
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
 * yelp ID to that option's voters  (e.g. {up: [], down: [], veto: []}).     */
const getVoteTotals = (poll) => {
  const result = {};
  poll.options.forEach(function(option){
    const votes = { up: [], down: [], veto: [] };
    Object.keys(option.voters || []).forEach(function(voter){
      const vote = option.voters[voter];
      votes[vote].push(voter)
    })
    result[option.yelpId] = votes;
  });
  return result;
}

const getVoters = (poll) => {
  var voters = {}
  poll.options.forEach(function(option) {
    Object.keys(option.voters || []).forEach(function(voter) {
      if (!(voter in voters)) {
        voters[voter] = {}
      }
      voters[voter][option.yelpId] = option.voters[voter]
    })
  })
  return voters
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
