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
    io.emit('connected', players);

    socket.on('join', function () {
        console.log('///// player joined ///////');
        io.to(socket.id).emit('joined');
    });

    socket.on('player login', function (data) {
        // we tell the client to execute 'new message'
        players[socket.id] = {
            playerId: socket.id,
            nickname: data.nickname,
            selection: "none",
            points: 0
        };

        console.log('player login socket id ' + socket.id);
        io.emit('playerLogin', players);
    });

    socket.on('player score updated', function (data) {
        // we tell the client to execute 'new message']
        

        for(var i = 0; i < data.length; i++)
        {
            var pId = data[i].playerId;
            players[pId] = {
                playerId: data[i].playerId,
                nickname: data[i].nickname,
                selection: data[i].selection,
                points: data[i].points
            };

            console.log('///// player score updated //////' + data[i].points);
        }
        
        io.emit('playerScoreUpdated', players);
    });

    socket.on('player cube selection', function (data) {
        // we tell the client to execute 'new message']

        players[socket.id] = {
            playerId: socket.id,
            nickname: data.nickname,
            selection: data.selection,
            points: players[socket.id].points
        };
        io.emit('playerCubeSelection', players);
    });

    socket.on('game started', function () {
        console.log('game started');
        io.emit('gameStarted', players);
    });

    socket.on('game completed', function () {
        console.log('game completed');
        currentlevel = 1;
        io.emit('gameCompleted', players);
    });

    socket.on('level completed', function (data) {

        
        for(var i = 0; i < data.length; i++)
        {
            var pId = data[i].playerId;
            players[pId] = {
                playerId: data[i].playerId,
                nickname: data[i].nickname,
                selection: "none",
                points: 0
                //points: data[i].points
            };
        }
        
        io.emit('levelCompleted', players);
    });

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
        // remove this player from our players object
        delete players[socket.id];
        console.log('user disconnected ' + Object.keys(players).length);
        // emit a message to all players to remove this player
        io.emit('disconnect', players);
    });
});

server.listen(port, function () {
    console.log(`Listening on ${server.address().port}`);
  });

