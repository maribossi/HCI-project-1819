var socket;
var r, g, b;

var bg;
var anim;
var img1, img2, img3, img4, img5, img6;
var players = [];
var currentplayer = {};
var currentlevel = 0;
var maxlevel = 2;

var introscreen;
var levelscreen;

//used in debugmode
var nicknames = ["Joost", "Marianne", "Pietje", "Puk"];
var avatars = ["AvatarA", "AvatarB", "AvatarC", "AvatarD"];
var selections = ["Back", "Front", "Left", "Right", "Top", "Bottom"];
var positions = [[500, 100], [755, 100], [500, 355], [755, 355]];

var ishost = false;
var debugmode = true;


function preload() {
    bg =  loadImage('../images/background.jpg');
    anim =  loadImage('../images/eye.png');
    img1 = loadImage('../images/cube1.png');
    img2 = loadImage('../images/cube2.png');
    img3 = loadImage('../images/cube3.png');
    img4 = loadImage('../images/cube4.png');
    img5 = loadImage('../images/cube5.png');
    img6 = loadImage('../images/cube6.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 35, 90);

    
    introscreen = new Introscreen();
    levelscreen = new Levelscreen();
    introscreen.display(bg, anim);

    socket = io.connect();
    socket.on('connected', function onServerConnected(data) {
        var index = Object.keys(data).length;
        var key = Object.keys(data)[index - 1];

        if (index === 1) {
            ishost = true;
            
        } else {
            //only for testing from browser windows
            if (key === socket.id) {

                currentplayer = {
                    playerId: socket.id,
                };

                if (debugmode && index < 6) {
                    currentplayer.nickname = nicknames[index - 2];
                    currentplayer.avatar = avatars[index - 2];
                    socket.emit("player login", currentplayer);
                }

            }
        }

    });

    socket.on('playerLogin', handleSocketEvent);
    socket.on('gameStarted', handleSocketEvent);
    socket.on('playerCubeSelection', handleSocketEvent);
    socket.on('levelCompleted', handleLevelCompleted);
    socket.on('gameCompleted', handleGameCompleted);
    socket.on('disconnect', handleSocketEvent);
}

function handleLevelCompleted(s_players) {
    console.log("handleLevelCompleted ");
    levelscreen.display(bg, anim);
}

function handleGameCompleted(s_players) {
    console.log("handleGameCompleted");
}

function draw() {
}

function keyPressed() {
    if (!debugmode) return;
    console.log("keyPressed = " + keyCode);


    switch (keyCode) {
        case 49:
            currentplayer.selection = selections[0];
            break;
        case 50:
            currentplayer.selection = selections[1];
            break;
        case 51:
            currentplayer.selection = selections[2];
            break;
        case 52:
            currentplayer.selection = selections[3];
            break;
        case 53:
            currentplayer.selection = selections[4];
            break;
        case 54:
            currentplayer.selection = selections[5];
            break;
        default:
            currentplayer.selection = "none";
            break;
    }

    socket.emit("player cube selection", currentplayer);
    //console.log("currentplayer.selection = " + currentplayer.selection);
}

function handleSocketEvent(s_players) {

    updatePlayers(s_players);
    updatePlayerPoints();
    updateGameScreen();
}

function updatePlayers(s_players) {
    var i = 0;
    players = [];

    Object.keys(s_players).forEach(function (id) {
        //console.log("player id = " + id);
        //console.log("player name = " + s_players[id].nickname);

        if (s_players[id].nickname != undefined) {

            players[i] = {
                playerId: s_players[id].playerId,
                nickname: s_players[id].nickname,
                avatar: s_players[id].avatar,
                selection: s_players[id].selection,
                points: s_players[id].points,
                position: positions[i]
            };
            i++;

            if (id === currentplayer.playerId) {
                currentplayer = {
                    playerId: s_players[id].playerId,
                    nickname: s_players[id].nickname,
                    avatar: s_players[id].avatar,
                    selection: s_players[id].selection,
                    points: s_players[id].points,
                    position: positions[i]
                }
            }
        }
    });

    console.log("------------- update players END --------- " + players.length);
}

function updateGameScreen() {

    background(0, 35, 90);
    image(bg, windowWidth-1200, windowHeight-700);
    introscreen.removeAnim();
    
    if(players.length >= 1)
    {
        ShowAssignmentGrid();
        ShowAssignmentText("Level 1: Make a circle");
    }

    var pos = 100;

    for (var i = 0; i < players.length; i++) {
        ShowPlayer(pos, players[i].nickname, players[i].avatar, players[i].points);
        ShowCubeSelection(i, players[i].nickname, players[i].avatar, players[i].selection);
        ShowPlayerInGrid(players[i].avatar, players[i].position);
        pos += 75;
    }
}

function updatePlayerPoints() {

    var count = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].selection === selections[i]) {
            var p = players[i].points || 0;
            players[i].points = p + 1;
            count ++;
        }
    }
    if(count == 4) {
        currentlevel ++;
        if(currentlevel == maxlevel){
            socket.emit("game completed", players);
            currentlevel = 0;
        } else {
            socket.emit("level completed", players);
        }
    }
}

function ShowAssignmentText(message) {

    fill(255);
    textSize(35);
    textAlign(LEFT);
    text(message, 500, 70);
}

function ShowBodyText(message) {

    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(message, windowWidth/2, windowHeight - 100);
}

function ShowAssignmentGrid() {

    fill(255, 255, 255, 50);
    noStroke();

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
            fill(247, 121, 63);
            rect(posx, posy, 30, 30);
            break;
        case "AvatarB":
            fill(38, 153, 191);
            rect(posx, posy, 30, 30);
            break;
        case "AvatarC":
            fill(188, 7, 37);
            rect(posx, posy, 30, 30);
            break;
        case "AvatarD":
            fill(19, 131, 98);
            rect(posx, posy, 30, 30);
            break;
    }
}

function ShowCubeSelection(index, playerName, playerAvatar, selection) {

    if (selection == "none") return;

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
    rect(0, posY, 400, 70);

    fill(255);
    textSize(30);
    textAlign(LEFT);
    text(playerName, 100, posY + 45);
    fill(255, 223, 60);
    text(points + " xp", 320, posY + 45);

    switch (playerAvatar) {
        case "AvatarA":
            fill(247, 121, 63);
            break;
        case "AvatarB":
            fill(38, 153, 191);
            break;
        case "AvatarC":
            fill(188, 7, 37);
            break;
        case "AvatarD":
            fill(19, 131, 98);
            break;
    }
    rect(0, posY, 70, 70);
}
