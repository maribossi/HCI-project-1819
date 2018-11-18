var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { wsEngine: 'ws' });

var port = process.env.PORT || 8081;
app.set('port', port);

server.listen(app.get('port'), function () {
    console.log('----- SERVER STARTED -----');
});

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var players = {};

io.on('connection', function (socket) {

    players[socket.id] = {
        playerId: socket.id
    };
    console.log('a user connected ' + Object.keys(players).length);
    io.emit('connected', socket.id);

    socket.on('player login', function (data) {
        // we tell the client to execute 'new message'
        console.log('player cube selection for ' + data.nickname);
        players[socket.id] = {
            playerId: socket.id,
            nickname: data.nickname,
            avatar: data.avatar,
            selection: "none",
            points: 0
        };

        console.log('player login socket id ' + socket.id);
        io.emit('playerLogin', players);
    });

    socket.on('player cube selection', function (data) {
        // we tell the client to execute 'new message'
        
        console.log('player cube selection for ' + data.nickname);
        console.log('player cube selection for ' + data.selection);
        players[socket.id] = {
            playerId: socket.id,
            nickname: data.nickname,
            avatar: players[socket.id].avatar,
            selection: data.selection,
            points: players[socket.id].points
        };
        io.emit('playerCubeSelection', players);
    });

    socket.on('game started', function () {
        console.log('game started');
        io.emit('gameStarted', players);
    });

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
        // remove this player from our players object
        delete players[socket.id];
        console.log('user disconnected ' + Object.keys(players).length);
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });
});

server.listen(port, function () {
    console.log(`Listening on ${server.address().port}`);
  });

