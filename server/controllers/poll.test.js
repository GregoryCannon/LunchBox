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
const pollData = {
  pollName: 'test',
  options: [
    { name: 'abc',
      yelpId: '69420',
      imgUrl: 'google.com',
      price: '$$',
      rating: '3',
      distance: '5.0',
      categories: 'boba, poke',
      yelpUrl: 'apple.com',
      voters: [
        { voterName: 'Greg', vote: 'up' },
        { voterName: 'Dan', vote: 'down' },
        { voterName: 'Dan', vote: 'down' },
        { voterName: 'John', vote: 'veto' }
    ]},
    { name: '123',
      yelpId: '12369',
      imgUrl: 'gizoogle.com',
      price: '$$$$',
      rating: '5',
      distance: '6.0',
      categories: 'chedda, cheez',
      yelpUrl: 'dank.kush',
      voters: [
      { voterName: 'Greg', vote: 'up' }
    ]}
  ],
  endTime: Date.now()
};

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
    controller.getPoll(id, function(err, val){
      if (err) throw 'failed to get poll';
      if (!val) throw 'got null data';
      if (val.pollName != 'test' || val.options[0].voters.length != 4) throw 'got incorrect data';
      done();
    })
  })

  it('get option scores', (done) => {
    controller.getOptionScores(id, 1, -1, -10, function(err, val){
      if (err) throw 'failed to get data from backend';
      const expected = {
        69420: -11,
        12369: 1
      };
      if (!_.isEqual(val.scores, expected)) throw 'got incorrect option scores';
      done();
    })
  })

  it('get vote totals', (done) => {
    controller.getVoteTotals(id, function(err, val){
      if (err) throw 'failed to get data from backend';
      const expected = {
        69420: { up: 1, down: 2, veto: 1 },
        12369: { up: 1, down: 0, veto: 0 }
      };
      if (!_.isEqual(val.voteTotals, expected)) throw 'got incorrect vote totals';
      done();
    })
  })

  it('submitVotes', (done) => {
    if (poll.options[1].voters.length != 1) throw '123 before votes wrong';
    const voteData = {
      voterName: 'Tessa',
      options: [
        { name: '123', vote: 'veto' }
      ]
    }
    controller.submitVotes(id, voteData, function(err, val){
      if (err) return done(err);
      if (val.options[1].voters.length != 2) throw '123 after votes wrong';
      if (!_.isEqual(val.options[0].length, poll.options[0].length)) throw 'abc after votes';
      done()
    })
  });
})
