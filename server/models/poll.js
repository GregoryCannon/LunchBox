var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const requiredString = { type: String, required: true };

const OptionSchema = new Schema({
  name: requiredString,
  yelpId: requiredString,
  imgUrl: requiredString,
  price: String,
  rating: String,
  distance: String,
  categories: String,
  yelpUrl: requiredString,
  voters: {
    type: Object,
    default: {}
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
