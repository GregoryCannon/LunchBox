var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VoteSchema = new Schema({
  name: String,  // Poll name
  voter_name: String,
  options: Array
})

var OptionSchema = new Schema({
  name: String,
  voteCount: Number,
  voters: [VoteSchema]
});

var PollSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  options: [OptionSchema],
  created_date: {
    type: Date,
    default: Date.now
  },
  open: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Poll', PollSchema);
