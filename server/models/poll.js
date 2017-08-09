var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const VoteSchema = new Schema({
  voterName: String,
  vote: {
    type: String,
    enum: ['up', 'down', 'veto'],
    required: true
  }
});

const OptionSchema = new Schema({
  optionName: {
    type: String,
    required: true
  },
  voters: {
    type: [VoteSchema],
  }
});

const PollSchema = new Schema({
  pollName: {
    type: String,
    required: true
  },
  options: {
    type: [OptionSchema],
  },
  endTime: {
    type: Date,
    required: true
  },
  open: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Poll', PollSchema);
