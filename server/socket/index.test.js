var express = require('express');
var app = express();
var mongoose = require('mongoose');
var _ = require('lodash');
var socketConfig = require('./index');
var io = require('socket.io-client');
var socket;

before(function(done){
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pollDb', { useMongoClient: true });
  mongoose.connection.on('error', done);
  mongoose.connection.once('open', done);
  const port = process.env.PORT || 3000;
  const server = app.listen(port);
  socketConfig(server);
});

var poll, pollId;
const pollData = require('../controllers/test_poll_data');
const voteData = {
  voterName: 'Jake',
  votes: {
    12369: 'veto'
  }
}

describe('socket index test', function() {
  this.timeout(5000);

  // Functions for common actions in the tests
  const _throw = (msg) => { throw { message: msg }};
  const _throwFunc = (msg) => ( function(){ _throw(msg) } );
  const _err = (err) => {
    console.log('happy');
    throw err };

  beforeEach(function(done){
    socket = io('http://localhost:3000');
    socket.emit('deleteAllPolls');
    socket.on('_deleteAllPolls', () => {
      socket.emit('createPoll', pollData);
      socket.on('_createPoll', (val) => {
        poll = val;
        pollId = String(poll._id);

        //Check that it set up properly (is created, and gets closed after delay)
        if (poll.options.length != 2) _throw('didn\'t create poll in setup');
        socket.on('_closePollError', _err);
        socket.on('_closePoll', () => { done() });
      })
    })
  });

  afterEach(function(done){
    socket.on('disconnect', () => { done() });
    socket.disconnect();
  })

  it('can get poll', (done) => {
    socket.emit('getPoll', pollId);
    socket.on('_getPoll', (resultPoll) => {
      if (!resultPoll) _throw('got null poll');
      if (poll.options.length != 2) _throw('poll has invalid data')
      done();
    })
  })

  it('can delete poll', (done) => {
    socket.emit('deletePoll', pollId);
    socket.on('_deletePollError', _err);
    socket.on('_deletePoll', () => {
      socket.emit('getPoll', pollId);
      socket.on('_getPollError', () => { done() });
      socket.on('_getPoll', (poll) => {
        if (poll) _throw('poll was not deleted');
        done();
      });
    });
  })

  it('submitting to closed poll fails', (done) => {
    socket.emit('submitVotes', pollId, voteData)
    socket.on('_submitVotesError', () => { done() });
    socket.on('_submitVotes', _throwFunc('got successful submit to closed poll'))
  })

  it('can submit votes', (done) => {
    // Create a poll that won't immediately close
    const pollDataLongDelay = _.cloneDeep(pollData);
    pollDataLongDelay.endTime = (new Date() + 5000)
    socket.emit('createPoll', pollDataLongDelay);
    socket.on('_createPoll', (poll) => {

      // Test submitting to this new poll
      socket.emit('submitVotes', pollId, voteData)
      socket.on('_submitVotesError', _err);
      socket.on('_getPollError', _err)
      socket.on('_getPoll', (resultPoll) => {
        if (Object.keys(resultPoll.options[1].voters).length != 2){
          _throw('123 after votes wrong');
        }
        if (!_.isEqual(resultPoll.options[0].voters, poll.options[0].voters)){
          _throw('abc after votes wrong');
        }
        done()
      })
    })
  });
});
