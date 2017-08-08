var socketIo = require('socket.io');

const setupIo = (app, server) => {
  var io = socketIo.listen(server);

  var connections = [];
  var ids = [];
  var rooms = [];
  var title = 'The Best Title';

  io.sockets.on('connection', function(socket){
    connections.push(socket)
    console.log("Connected: %s sockets connected- ", connections.length );

    socket.on('requestId', function() {
      ids.push(ids.length);
      console.log('New ID requested');
      socket.emit('idResponse', ids[ids.length - 1]);
    })

    socket.on('joinRoom', function(room) {
      rooms.push(room);
      socket.join(room);
      io.sockets.in(room).emit('message', `Welcome to the ${room} room!`);
    })

    socket.on('disconnect', function() {
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect;
      console.log("Disconnected: %s sockets left.", connections.length);
    });
  });
}

module.exports = setupIo;
