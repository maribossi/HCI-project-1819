var express = require('express');
var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io').listen(server);

var server = require('http').createServer(app);
var io = require('socket.io')(server, { wsEngine: 'ws' });

app.set('port', process.env.PORT || 8081);

server.listen(app.get('port'), function () {
    console.log('----- SERVER STARTED -----');
});

var players = {};

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  // create a new player and add it to our players object
  players[socket.id] = {
    playerId: socket.id
  };
  console.log('a user connected ' + Object.keys(players).length);
  // send the players object only to the MAIN player screen
  if(Object.keys(players).length == 1){
    socket.emit('currentPlayers', players);
  }
    
    // update all other players of the new player
    //socket.broadcast.emit('newPlayer', players[socket.id]);
  
  
  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    // remove this player from our players object
    delete players[socket.id];
    console.log('user disconnected ' + Object.keys(players).length);
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });

  // // when a player moves, update the player data
  // socket.on('playerMovement', function (movementData) {
  //   players[socket.id].x = movementData.x;
  //   players[socket.id].y = movementData.y;
  //   players[socket.id].rotation = movementData.rotation;
  //   // emit a message to all players about the player that moved
  //   socket.broadcast.emit('playerMoved', players[socket.id]);
  // });
  
  socket.on('playerDraw', function (data) {
    console.log(data);
    socket.broadcast.emit('playerDraw', data);
  })
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});