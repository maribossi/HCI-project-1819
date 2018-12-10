var socket;
var r, g, b;

var bg;
var img1, img2, img3, img4, img5, img6;
var img1_cp, img2_cp, img3_cp, img4_cp, img5_cp, img6_cp;
var img1_sp, img2_sp, img3_sp, img4_sp, img5_sp, img6_sp;
var img1_rp, img2_rp, img3_rp, img4_rp, img5_rp, img6_rp;
var img2_rw, img3_rw, img2_sw, img3_sw, img2_cw, img3_cw;
var img1_sg, img2_sg, img3_sg, img4_sg, img5_sg, img6_sg;
var img1_rg, img2_rg, img3_rg, img4_rg, img5_rg, img6_rg;
var img1_cg, img2_cg, img3_cg, img4_cg, img5_cg, img6_cg;

var success_sound;
var level_sound;

const LEVEL_DURATION = 180;

var players = [];
var currentplayer = {};
var maxlevel = 4;
var currentlevel = 1;

var colors = [[211, 42, 47], [245, 127, 34], [251, 190, 84], [98, 210, 159]];


var introscreen;
var gamescreen;

//used in debugmode
var nicknames = ["PlayerA", "PlayerB", "PlayerC", "PlayerD"];
var avatars = ["AvatarA", "AvatarB", "AvatarC", "AvatarD"];

var selections_level1 = ["Back", "Front", "Left", "Right"];
var selections_level2 = ["SP-Back", "SP-Front", "SP-Left", "SP-Right"];

var selections_level3 = [["G1-Back", "G2-Back", "G4-Back", "G3-Back"],
["G1-Left", "G2-Left", "G4-Left", "G3-Left"],
["G1-Top", "G2-Top", "G4-Top", "G3-Top"]];

var selections_level4 = [["M1-Back", "M2-Back", "M4-Back", "M3-Back"],
["M1-Left", "M2-Left", "M4-Left", "M3-Left"],
["M1-Top", "M2-Top", "M4-Top", "M3-Top"],
["M4-Front", "M3-Front", "M2-Front", "M1-Front"],
["M4-Right", "M3-Right", "M2-Right", "M1-Right"],
["M4-Bottom", "M3-Bottom", "M2-Bottom", "M1-Bottom"]];

var s;
var m;
var py;
var px;
var positions;


var debugmode = true;
var gamestarted = false;


function preload() {
    success_sound = loadSound('../sound/select-cube-success.mp3');
    level_sound = loadSound('../sound/level-completed.mp3');
    bg = loadImage('../images/background_big.png');
    img1 = loadImage('../images/cube1.png');
    img2 = loadImage('../images/cube2.png');
    img3 = loadImage('../images/cube3.png');
    img4 = loadImage('../images/cube4.png');
    img5 = loadImage('../images/cube5.png');
    img6 = loadImage('../images/cube6.png');
    img1_cp = loadImage('../images/cp-cube1.png');
    img2_cp = loadImage('../images/cp-cube2.png');
    img3_cp = loadImage('../images/cp-cube3.png');
    img4_cp = loadImage('../images/cp-cube4.png');
    img5_cp = loadImage('../images/cp-cube5.png');
    img6_cp = loadImage('../images/cp-cube6.png');
    img1_sp = loadImage('../images/sp-cube1.png');
    img2_sp = loadImage('../images/sp-cube2.png');
    img3_sp = loadImage('../images/sp-cube3.png');
    img4_sp = loadImage('../images/sp-cube4.png');
    img5_sp = loadImage('../images/sp-cube5.png');
    img6_sp = loadImage('../images/sp-cube6.png');
    img1_rp = loadImage('../images/rp-cube1.png');
    img2_rp = loadImage('../images/rp-cube2.png');
    img3_rp = loadImage('../images/rp-cube3.png');
    img4_rp = loadImage('../images/rp-cube4.png');
    img5_rp = loadImage('../images/rp-cube5.png');
    img6_rp = loadImage('../images/rp-cube6.png');

    img1_cg = loadImage('../images/cg-cube1.jpg');
    img2_cg = loadImage('../images/cg-cube2.jpg');
    img3_cg = loadImage('../images/cg-cube3.jpg');
    img4_cg = loadImage('../images/cg-cube4.jpg');
    img5_cg = loadImage('../images/cg-cube5.jpg');
    img6_cg = loadImage('../images/cg-cube6.jpg');

    img1_rg = loadImage('../images/rg-cube1.jpg');
    img2_rg = loadImage('../images/rg-cube2.jpg');
    img3_rg = loadImage('../images/rg-cube3.jpg');
    img4_rg = loadImage('../images/rg-cube4.jpg');
    img5_rg = loadImage('../images/rg-cube5.jpg');
    img6_rg = loadImage('../images/rg-cube6.jpg');

    img1_sg = loadImage('../images/sg-cube1.jpg');
    img2_sg = loadImage('../images/sg-cube2.jpg');
    img3_sg = loadImage('../images/sg-cube3.jpg');
    img4_sg = loadImage('../images/sg-cube4.jpg');
    img5_sg = loadImage('../images/sg-cube5.jpg');
    img6_sg = loadImage('../images/sg-cube6.jpg');

    img2_rw = loadImage('../images/rw-cube2.jpg');
    img3_rw = loadImage('../images/rw-cube3.jpg');
    img2_sw = loadImage('../images/sw-cube2.jpg');
    img3_sw = loadImage('../images/sw-cube3.jpg');
    img2_cw = loadImage('../images/cw-cube2.jpg');
    img3_cw = loadImage('../images/cw-cube4.jpg');



}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 35, 90);
    frameRate(60);

    s = (windowHeight / 2.5);
    m = s / 50;
    //py = (windowHeight / 2) - s + m / 2;
    py = 100;
    //px = (windowWidth / 2) - s + m / 2;
    px = 500;
    positions = [[px, py], [px + s + m, py], [px, py + s + m], [px + s + m, py + s + m]];


    introscreen = new Introscreen();
    introscreen.display(bg, currentlevel);
    gamescreen = new Gamescreen(colors, nicknames, avatars, positions);

    socket = io.connect();
    socket.on('connected', function onServerConnected(data) {
        var index = Object.keys(data).length;
        var key = Object.keys(data)[index - 1];

        //only for testing from browser windows
        if (index === 1) {
        } else {

            var av = avatars[0].toString();


            if (key === socket.id) {

                currentplayer = {
                    playerId: socket.id,
                };

                if (debugmode && index < 6) {
                    currentplayer.avatar = avatars[index - 2];
                    currentplayer.nickname = nicknames[index - 2];
                    socket.emit("player login", currentplayer);
                }
            }
        }
    });

    socket.on('playerLogin', handlePlayerLoginOrLogout);
    socket.on('gameStarted', handleGameStarted);
    socket.on('playerCubeSelection', handleSocketEvent);
    socket.on('playerScoreUpdated', handleScoreUpdated);
    socket.on('levelCompleted', handleLevelCompleted);
    socket.on('gameCompleted', handleGameCompleted);
    socket.on('disconnect', handlePlayerLoginOrLogout);
}

function handlePlayerLoginOrLogout(s_players) {

    if (gamestarted) {
        handleSocketEvent(s_players);
    } else {
        updatePlayers(s_players);
        introscreen.showAllPlayers(players, currentlevel);
    }

}

function handleGameStarted(s_players) {

    console.log("handleGameStarted");
    gamestarted = true;
    updatePlayers(s_players);
    updateGameScreen();
    gamescreen.setDuration(LEVEL_DURATION);
}

function handleLevelCompleted(s_players) {
    gamestarted = false;
    gamescreen.setDuration(0);
    introscreen.display(bg, currentlevel);
    introscreen.showAllPlayers(players, currentlevel);
}

function handleGameCompleted(s_players) {
    gamestarted = false;
    introscreen.display(bg, 5);
    introscreen.showAllPlayers(players, 5);

}

function draw() {
    if(gamestarted){
        gamescreen.draw();
    }
    
}
// this is used in debugmode - when playing from the browser
function keyPressed() {
    if (!debugmode) return;

    console.log("//// keyPressed ///= " + keyCode);

    if (currentlevel === 4) {

        switch (keyCode) {
            case 49: currentplayer.selection = selections_level4[0][0]; break;
            case 50: currentplayer.selection = selections_level4[0][1]; break;
            case 51: currentplayer.selection = selections_level4[0][2]; break;
            case 52: currentplayer.selection = selections_level4[0][3]; break;

            case 53: currentplayer.selection = selections_level4[1][0]; break;
            case 54: currentplayer.selection = selections_level4[1][1]; break;
            case 55: currentplayer.selection = selections_level4[1][2]; break;
            case 56: currentplayer.selection = selections_level4[1][3]; break;

            case 57: currentplayer.selection = selections_level4[2][0]; break;
            case 58: currentplayer.selection = selections_level4[2][1]; break;
            case 59: currentplayer.selection = selections_level4[2][2]; break;
            case 60: currentplayer.selection = selections_level4[2][3]; break;

            case 65: currentplayer.selection = selections_level4[3][0]; break;
            case 83: currentplayer.selection = selections_level4[3][1]; break;
            case 68: currentplayer.selection = selections_level4[3][2]; break;
            case 70: currentplayer.selection = selections_level4[3][3]; break;

            case 71: currentplayer.selection = selections_level4[4][0]; break;
            case 72: currentplayer.selection = selections_level4[4][1]; break;
            case 74: currentplayer.selection = selections_level4[4][2]; break;
            case 75: currentplayer.selection = selections_level4[4][3]; break;

            case 76: currentplayer.selection = selections_level4[5][0]; break;
            case 186: currentplayer.selection = selections_level4[5][1]; break;
            case 222: currentplayer.selection = selections_level4[5][2]; break;
            case 220: currentplayer.selection = selections_level4[5][3]; break;


            default: currentplayer.selection = "none"; break;
        }

    } else {


        switch (keyCode) {
            case 49: currentplayer.selection = selections_level1[0]; break;
            case 50: currentplayer.selection = selections_level1[1]; break;
            case 51: currentplayer.selection = selections_level1[2]; break;
            case 52: currentplayer.selection = selections_level1[3]; break;

            case 53: currentplayer.selection = selections_level2[0]; break;
            case 54: currentplayer.selection = selections_level2[1]; break;
            case 55: currentplayer.selection = selections_level2[2]; break;
            case 56: currentplayer.selection = selections_level2[3]; break;

            case 65: currentplayer.selection = selections_level3[0][0]; break;
            case 83: currentplayer.selection = selections_level3[0][1]; break;
            case 68: currentplayer.selection = selections_level3[0][2]; break;
            case 70: currentplayer.selection = selections_level3[0][3]; break;

            case 71: currentplayer.selection = selections_level3[1][0]; break;
            case 72: currentplayer.selection = selections_level3[1][1]; break;
            case 74: currentplayer.selection = selections_level3[1][2]; break;
            case 75: currentplayer.selection = selections_level3[1][3]; break;

            case 76: currentplayer.selection = selections_level3[2][0]; break;
            case 186: currentplayer.selection = selections_level3[2][1]; break;
            case 222: currentplayer.selection = selections_level3[2][2]; break;
            case 220: currentplayer.selection = selections_level3[2][3]; break;

            default: currentplayer.selection = "none"; break;
        }
    }


    if (currentplayer.selection === "none" && gamestarted == false) {
        // the game is started from the browser in debug mode
        socket.emit("game started");
    }
    else socket.emit("player cube selection", currentplayer);
    //console.log("currentplayer.selection = " + currentplayer.selection);
}

function handleSocketEvent(s_players) {
    if (gamestarted) {
        updatePlayers(s_players);
        updatePlayerPoints();
        //updateGameScreen();
    }
}

function handleScoreUpdated(s_players) {
    if (gamestarted) {
        updatePlayers(s_players);
        updateGameScreen();

        var count = 0;
        for (var i = 0; i < players.length; i++) {
            count += players[i].points;
        }

        if (count == 4) {
            gamestarted = false;
            setTimeout(gotoNextLevel, 3000);
        }
    }

}

function updatePlayers(s_players) {
    var i = 0;
    players = [];

    Object.keys(s_players).forEach(function (id) {
        //console.log("player id = " + id);

        if (s_players[id].nickname != undefined) {

            players[i] = {
                playerId: s_players[id].playerId,
                nickname: s_players[id].nickname,
                avatar: avatars[i],
                selection: s_players[id].selection,
                points: s_players[id].points,
                position: positions[i]
            };

            if (id === currentplayer.playerId) {
                currentplayer = {
                    playerId: s_players[id].playerId,
                    nickname: s_players[id].nickname,
                    avatar: avatars[i],
                    selection: s_players[id].selection,
                    points: s_players[id].points,
                    position: positions[i]
                }
            }

            i++;
        }
    });

}

function updateGameScreen() {

    gamescreen.display(bg, currentlevel, 120);
    introscreen.removeAnim();
    gamescreen.update(players);

}

function updatePlayerPoints() {


    if (currentlevel == 1) {

        for (var i = 0; i < players.length; i++) {

            if (players[i].selection === selections_level1[i]) {
                if (players[i].points == 0) success_sound.play();
                players[i].points = 1;
            }
            else {
                players[i].points = 0;
            }
        }
    }
    else if (currentlevel == 2) {

        for (var i = 0; i < players.length; i++) {

            if (players[i].selection === selections_level2[i]) {
                if (players[i].points == 0) success_sound.play();
                players[i].points = 1;
            }
            else {
                players[i].points = 0;
            }
        }
    }
    else {

        var t_sels = [];
        var l_sels = [];

        if (currentlevel == 3) {
            t_sels = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            l_sels = selections_level3;

        } else {
            t_sels = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            l_sels = selections_level4;
        }


        for (var p = 0; p < players.length; p++) {
            var ps = players[p].selection;

            for (var i = 0; i < l_sels.length; i++) {

                for (var j = 0; j < l_sels[i].length; j++) {

                    var ts = l_sels[i][j];
                    if (ts === ps) {
                        t_sels[i][j] = 1;
                    }
                }
            }
        }

        var total = 0;

        //count the highest points
        for (var k = 0; k < t_sels.length; k++) {
            var sum = t_sels[k].reduce((a, b) => a + b, 0);

            if (sum > 1 && sum > total) {
                total = sum;
                for (var l = 0; l < t_sels[k].length; l++) {
                    if (players[l].points == 0 && t_sels[k][l] == 1) {
                        success_sound.play();
                        players[l].points = t_sels[k][l];
                    }
                }
            }
        }

    }


    socket.emit("player score updated", players);

}

function gotoNextLevel() {

    if (currentlevel == maxlevel) {
        socket.emit("game completed", players);
        currentlevel = 1;
    } else {
        currentlevel++;
        socket.emit("level completed", players);
    }
}

