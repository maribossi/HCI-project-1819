var socket;
var r, g, b;

var img1, img2, img3, img4, img5, img6;
var players = [];
var nicknames = ["Joost", "Marianne", "Pietje", "Puk"];
var avatars = ["AvatarA", "AvatarB", "AvatarC", "AvatarD"];
var selections = ["Back", "Front", "Left", "Right", "Top", "Bottom"];
var positions = [[500, 100], [755, 100], [500, 355], [755, 355]];



function preload() {
    img1 = loadImage('../images/cube1.png');
    img2 = loadImage('../images/cube2.png');
    img3 = loadImage('../images/cube3.png');
    img4 = loadImage('../images/cube4.png');
    img5 = loadImage('../images/cube5.png');
    img6 = loadImage('../images/cube6.png');
}

function setup() {
    createCanvas(2560, 1600);

    background(0, 0, 51);

    for (var i = 0; i < 4; i++) {
        players[i] = {
            playerId: i,
            nickname: nicknames[i],
            avatar: avatars[i],
            selection: selections[i+1],
            position: positions[i],
            points: 0
        };
    }

    updatePlayerPoints();
    updateScreen();



    // socket = io.connect();
    // socket.on('connected', function onServerConnected(data) {
    //     if (data === socket.id) {
    //         console.log("this is me");
    //     } else {
    //         console.log("other client");
    //     }
    // });

    // socket.on('playerLogin', handleSocketEvent);
    // socket.on('gameStarted', handleSocketEvent);
    // socket.on('playerCubeSelection', handleSocketEvent);

}

function handleSocketEvent(s_players) {
    updatePlayers(s_players);
    updatePlayerPoints();
    updateScreen();
}


function updatePlayers(s_players) {
    var i = 0;
    Object.keys(s_players).forEach(function (id) {
        if (s_players[id].playerId === socket.id) {
        } else {

            console.log('player /// ' + s_players[id].nickname);
            if (s_players[id].nickname != undefined) {
                players[i] = {
                    playerId: i,
                    nickname: s_players[id].nickname,
                    avatar: s_players[id].avatar,
                    selection: s_players[id].selection,
                    points: s_players[id].points,
                    position: positions[i]
                };
                i++;
            }
        }
    });
}

function updateScreen() {
    background(0, 0, 51);

    ShowAssignmentText("Level 1: Make a circle");
    ShowAssignmentGrid();

    var pos = 100;
    for (var i = 0; i < players.length; i++) {
        ShowPlayer(pos, players[i].nickname, players[i].avatar, players[i].points);
        ShowCubeSelection(i, players[i].nickname, players[i].avatar, players[i].selection);
        ShowPlayerInGrid(players[i].avatar, players[i].position);
        pos += 85;
    }
}

function updatePlayerPoints() {

    for (var i = 0; i < players.length; i++) {
        if (players[i].selection === selections[i]) {
            var p = players[i].points;
            players[i].points = p + 1;
        }
    }

}


function ShowAssignmentText(message) {

    fill(255);
    textSize(35);
    text(message, 500, 70);
}

function ShowAssignmentGrid() {

    fill(255, 255, 255, 50);

    for (var i = 0; i < positions.length; i++) {

        var posx = positions[i][0];
        var posy = positions[i][1];
        rect(posx, posy, 250, 250);
    }

}

function ShowPlayerInGrid(playerAvatar, position) {

    var posx = position[0];
    var posy = position[1];


    switch (playerAvatar) {
        case "AvatarA":
            fill(255, 13, 192);
            rect(posx, posy, 30, 30);
            break;
        case "AvatarB":
            fill(15, 243, 64);
            rect(posx, posy, 30, 30);
            break;
        case "AvatarC":
            fill(11, 248, 234);
            rect(posx, posy, 30, 30);
            break;
        case "AvatarD":
            fill(11, 126, 248);
            rect(posx, posy, 30, 30);
            break;
    }
}

function ShowCubeSelection(index, playerName, playerAvatar, selection) {

    if (selection == "none") return;

    console.log("ShowCubeSelection " + selection);
    var posx = positions[index][0];
    var posy = positions[index][1];

    var img;
    switch (selection) {
        case "Back":
            img = img1;
            break;
        case "Front":
            img = img2;
            break;
        case "Left":
            img = img3;
            break;
        case "Right":
            img = img4;
            break;
        case "Top":
            img = img5;
            break;
        case "Bottom":
            img = img6;
            break;
    }



    if (img != null) {
        image(img, posx, posy);
    }

}


function ShowPlayer(posY, playerName, playerAvatar, points) {

    fill(255, 255, 255, 50);
    noStroke();
    rect(0, posY, 400, 80);

    fill(255);
    textSize(30);
    text(playerName, 100, posY + 50);
    fill(255, 223, 60);
    text(points + " xp", 320, posY + 50);

    switch (playerAvatar) {
        case "AvatarA":
            fill(255, 13, 192);
            break;
        case "AvatarB":
            fill(15, 243, 64);
            break;
        case "AvatarC":
            fill(11, 248, 234);
            break;
        case "AvatarD":
            fill(11, 126, 248);
            break;
    }
    rect(0, posY, 80, 80);
}
