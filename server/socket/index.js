var socketIo = require('socket.io');
var controller = require('../controllers/poll');


const setupIo = (app, server) => {
  var io = socketIo.listen(server);
  var connections = [], rooms = [];

  /* Given a string (e.g. _createPoll), makes a callback that emits either
   * '_createPoll' and the result, or '_createPollError' and the error object */
  const makeCallback = (emitName) => (
    function (err, val){
      if (err)
        socket.emit(emitName + 'Error', err);
      else
        socket.emit(emitName, val)
    }
  );

  io.sockets.on('connection', function(socket){
    connections.push(socket)
    console.log("Connected: %s sockets connected- ", connections.length );

    socket.on('disconnect', function() {
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect;
      console.log("Disconnected: %s sockets left.", connections.length);
    });

    socket.on('joinRoom', function(room) {
      if (!rooms.includes(room)) rooms.push(room);
      socket.join(room);
      io.sockets.in(room).emit('message', `Welcome to the ${room} room!`);
    });

    socket.on('createPoll', function(pollData){
      controller.createPoll(pollData, makeCallback('_createPoll'));

      const msDelay = Math.abs(pollData.end_date - pollData.created_date);
      const id = pollData._id;
      setTimeout(controller.closePoll, msDelay, id, makeCallback('_closePoll'))
    });

    socket.on('deletePoll', function(){
      controller.deletePoll(makeCallback('_deletePoll'));
    });

    socket.on('deleteAllPolls', function(){
      controller.deleteAllPolls(makeCallback('_deleteAllPolls'));
    });

    socket.on('getPoll', function(id){
      controller.getPoll(id, makeCallback('_getPoll'));
    });

    socket.on('getAllPolls', function(){
      controller.getAllPolls(makeCallback('_getAllPolls'));
    });

    socket.on('submitVotes', function(id, voteData){
      controller.submitVotes(id, voteData, function (err, val){
        if (err)
          socket.emit(emitName + 'Error', err);
        else
          io.sockets.in(room).emit('_getPoll', val);
      })
    });
  });
}

module.exports = setupIo;
