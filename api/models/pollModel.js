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
    Required: 'Kindly enter the name of the poll'
  },
  options: [OptionSchema],
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['not started', 'open', 'closed']
    }],
    default: ['open']
  }
});

/**
  Informational Schema
  */

var VoteSchema = new Schema({
  name: String,
  voter_name: String,
  options: Array
})

module.exports = mongoose.model('Poll', PollSchema);
