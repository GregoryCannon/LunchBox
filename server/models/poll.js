var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const requiredString = { type: String, required: true };

const VoteSchema = new Schema({
  voterName: requiredString,
  vote: {
    type: String,
    enum: ['up', 'down', 'veto'],
    required: true
  }
});

const OptionSchema = new Schema({
  name: requiredString,
  yelpId: requiredString,
  imgUrl: requiredString,
  price: requiredString,
  rating: requiredString,
  distance: requiredString,
  categories: requiredString,
  yelpUrl: requiredString,
  voters: {
    type: [VoteSchema],
  }
});

const PollSchema = new Schema({
  pollName: requiredString,
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
