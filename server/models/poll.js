'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OptionSchema = new Schema({
  name: String,
  voteCount: Number,
  voters: Array
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

var VoteSchema = new Schema({
  name: String,
  voter_name: String,
  options: Array
})

module.exports = mongoose.model('Poll', PollSchema);
