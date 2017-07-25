'use strict';
module.exports = function(app) {
  var pollController = require('../controllers/pollController');


  // pollController Routes
  app.route('/polls')
    .get(pollController.list_all_polls) // not in client
    .post(pollController.create_poll)
    .delete(pollController.delete_all_polls); // not in client


  app.route('/polls/:pollId')
    .get(pollController.read_poll)
    .put(pollController.send_votes)
    .lock(pollController.close_poll)
    .delete(pollController.delete_poll);
};
