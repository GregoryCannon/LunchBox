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

var testPoll, testPollId;
var getPollDataWithDelay = require('../controllers/test_poll_data');
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
  const _err = (err) => { throw err };

  beforeEach(function(done){
    socket = io('http://localhost:3000');
    socket.emit('deleteAllPolls');
    socket.once('_deleteAllPolls', () => {
      socket.emit('createPoll', getPollDataWithDelay(100000));
      socket.once('_createPoll', (poll) => {
        testPoll = poll;
        testPollId = String(testPoll._id);
        if (poll.options.length != 2) _throw('didn\'t create poll in setup');
        done()
      });
    });
  });

  afterEach(function(done){
    socket.once('disconnect', () => { done() });
    socket.disconnect();
  })

  it('can get poll', (done) => {
    socket.emit('getPoll', testPollId);
    socket.once('_getPoll', (poll) => {
      if (!poll) _throw('got null poll');
      if (testPoll.options.length != 2) _throw('poll has invalid data')
      done();
    });
  });

  it('can submit votes', (done) => {
    socket.emit('submitVotes', testPollId, voteData)
    socket.once('_submitVotesError', _err);
    socket.once('_getPoll', (poll) => {
      if (Object.keys(poll.options[1].voters).length != 2){
        _throw('123 after votes wrong');
      }
      if (!_.isEqual(poll.options[0].voters, testPoll.options[0].voters)){
        _throw('abc after votes wrong');
      }
      done()
    });
  });

  it('can delete poll', (done) => {
    socket.emit('deletePoll', testPollId);
    socket.once('_deletePollError', _err);
    socket.once('_deletePoll', () => {
      socket.emit('getPoll', testPollId);
      socket.once('_getPollError', () => { done() });
      socket.once('_getPoll', (poll) => {
        if (poll) _throw('poll was not deleted');
        done();
      });
    });
  });

  it('poll closes after delay', (done) => {
    // Create a poll that will close itself after ~2 seconds
    socket.emit('createPoll', getPollDataWithDelay(200));
    socket.once('_createPoll', () => {
      socket.once('_closePollError', _err);
      socket.once('_getPoll', (poll) => {
        // Just check if it's closed
        if (poll.open) _throw('didn\'t actually close poll after delay')
        done()
      });
    });
  });

  it('submitting to closed poll fails', (done) => {
    // Create a poll that will close itself after ~2 seconds
    socket.emit('createPoll', getPollDataWithDelay(200));
    socket.once('_createPoll', () => {
      socket.once('_closePollError', _err);
      socket.once('_getPoll', (poll) => {
        // Try submitting
        socket.emit('submitVotes', poll._id, voteData)
        socket.once('_submitVotesError', () => { done() });
        socket.once('_getPoll', _throwFunc('got successful submit to closed poll'))
      });
    });
  });
});
