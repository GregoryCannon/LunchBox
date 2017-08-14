var socketIo = require('socket.io');
var controller = require('../controllers/poll');


const setupIo = (server) => {
  var io = socketIo.listen(server);
  var connections = [], rooms = [];

  /* Given a string (e.g. _createPoll), makes a callback that emits either
   * '_createPoll' and the result, or '_createPollError' and the error object */
  const makeCallback = (emitName, socket) => (
    function (err, val){
      if (err)
        socket.emit(emitName + 'Error', err);
      else
        socket.emit(emitName, val);
    }
  );

  io.sockets.on('connection', function(socket){
    connections.push(socket)
    console.log("connected: %s sockets connected", connections.length );

    socket.on('disconnect', function() {
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect;
      console.log("disconnected: %s sockets left", connections.length);
    });

    const joinRoom = (room) => {
      if (!rooms.includes(room)) rooms.push(room);
      socket.join(room);
      io.sockets.in(room).emit('message', `welcome to the ${room} room!`);
    };

    socket.on('joinRoom', joinRoom);

    socket.on('createPoll', function(pollData){
      controller.createPoll(pollData, function(err, poll){
        if (err) {
          socket.emit('_createPollError', err);
        } else {
          joinRoom(poll._id)
          const msDelay = Math.abs(poll.endTime - new Date());
          setTimeout(controller.closePoll, msDelay, poll._id, makeCallback('_closePoll', socket))
          socket.emit('_createPoll', poll)
        }
      })
    });

    socket.on('deletePoll', function(id){
      controller.deletePoll(id, makeCallback('_deletePoll', socket));
    });

    socket.on('deleteAllPolls', function(){
      controller.deleteAllPolls(makeCallback('_deleteAllPolls', socket));
    });

    socket.on('getPoll', function(id){
      controller.getPoll(id, makeCallback('_getPoll', socket));
    });

    socket.on('getVoteTotals', function(pollId){
      controller.getVoteTotals(pollId, makeCallback('_getVoteTotals', socket));
    });

    socket.on('submitVotes', function(id, voteData){
      controller.submitVotes(id, voteData, function (err, poll){
        if (err){
          socket.emit('_submitVotesError', err);
        }
        else {
          socket.emit('_submitVotes', poll)
          const room = poll._id;
          io.sockets.in(room).emit('_getPoll', poll);
        }
      })
    });
  });
}

module.exports = setupIo;
