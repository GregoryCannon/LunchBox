var controller = require('./poll');
var mongoose = require('mongoose');
var _ = require('lodash');


before(function(done){
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pollDb', { useMongoClient: true });
  mongoose.connection.on('error', done);
  mongoose.connection.once('open', done);
});

var poll, id;
const pollData = require('./test_poll_data');

describe('poll controller test', () => {
  beforeEach(function(done){
    controller.deleteAllPolls(function(err, val){
      if (err) return done(err);
      controller.createPoll(pollData, function(err, val){
        if (err) return done(err);
        poll = val;
        id = String(poll._id);
        done()
      });
    });
  });

  it('setup worked (deleteAllPolls and createPolls)', () => {
    if (poll.options.length != 2) throw "didn't create poll in setup";
  });

  it('close poll', (done) => {
    controller.closePoll(id, function(err, val){
      if (err) return done(err);
      if (val.open !== false) throw 'didn\'t actually close poll';
      done()
    })
  });

  it('delete poll', (done) => {
    controller.deletePoll(id, function(err, val){
      if (err) throw 'failed to delete poll';
      done();
    })
  });

  it('get poll', (done) => {
    controller.getPoll(id, function(err, resultPoll){
      if (err) throw 'failed to get poll';
      if (!resultPoll) throw 'got null data';
      if (resultPoll.pollName != 'test'
          || Object.keys(resultPoll.options[0].voters).length != 4){
        throw 'got incorrect data';
      }
      if (!resultPoll.scores) throw 'missing option scores';
      if (!resultPoll.voteTotals) throw 'missing vote totals';
      done();
    })
  })

  it('get option scores', (done) => {
    controller.getPoll(id, function(err, resultPoll){
      if (err) throw 'failed to get poll';
      const expected = {
        69420: -11,
        12369: 1
      };
      console.log(resultPoll.scores);
      if (!_.isEqual(resultPoll.scores, expected)) throw 'got incorrect option scores';
      done();
    })
  })

  it('get vote totals', (done) => {
    controller.getPoll(id, function(err, resultPoll){
      if (err) throw 'failed to get poll';
      const expected = {
        69420: { up: 1, down: 2, veto: 1 },
        12369: { up: 1, down: 0, veto: 0 }
      };
      if (!_.isEqual(resultPoll.voteTotals, expected)) throw 'got incorrect vote totals';
      done();
    })
  })

  it('submitVotes', (done) => {
    if (Object.keys(poll.options[1].voters).length != 1) throw '123 before votes wrong';
    const voteData = {
      voterName: 'Tessa',
      votes: {
        12369: 'veto'
      }
    }
    controller.submitVotes(id, voteData, function(err, val){
      if (err) return done(err);
      if (Object.keys(val.options[1].voters).length != 2) throw '123 after votes wrong';
      if (!_.isEqual(val.options[0].voters, poll.options[0].voters)) throw 'abc after votes';
      done()
    })
  });
})
