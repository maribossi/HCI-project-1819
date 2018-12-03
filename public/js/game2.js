var socket;
var r, g, b;

var bg;
var img1, img2, img3, img4, img5, img6;
var img1_cp, img2_cp, img3_cp, img4_cp, img5_cp, img6_cp;
var img1_sp, img2_sp, img3_sp, img4_sp, img5_sp, img6_sp;
var img1_rp, img2_rp, img3_rp, img4_rp, img5_rp, img6_rp;

var players = [];
var currentplayer = {};
var maxlevel = 3;
var currentlevel = 1;

var colors = [[211, 42, 47], [245, 127, 34], [251, 190, 84], [98, 210, 159]];


var introscreen;
var gamescreen;

//used in debugmode
var nicknames = ["PlayerA", "PlayerB", "PlayerC", "PlayerD"];
var avatars = ["AvatarA", "AvatarB", "AvatarC", "AvatarD"];
var selections = ["Back", "Front", "Left", "Right", "Top", "Bottom"];

var selections_level2 = [["CP-Back", "CP-Front", "CP-Left", "CP-Right"],
["SP-Back", "SP-Front", "SP-Left", "SP-Right"],
["RP-Back", "RP-Front", "RP-Left", "RP-Right"],
];

var positions = [[500, 100], [755, 100], [500, 355], [755, 355]];


var debugmode = true;
var gamestarted = false;


function preload() {
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
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 35, 90);

    introscreen = new Introscreen();
    introscreen.display(bg, currentlevel);
    gamescreen = new Gamescreen(colors, nicknames, avatars, selections, positions);

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

                console.log("/// currentplayer.avatar  ///" + currentplayer.avatar );
            }
        }
    });

    socket.on('playerLogin', handlePlayerLoginOrLogout);
    socket.on('gameStarted', handleGameStarted);
    socket.on('playerCubeSelection', handleSocketEvent);
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
}

function handleLevelCompleted(s_players) {

    gamestarted = false;
    introscreen.display(bg, currentlevel);
    introscreen.showAllPlayers(players, currentlevel);


}

function handleGameCompleted(s_players) {
    console.log("handleGameCompleted");
    gamestarted = false;
}

function draw() {
}
// this is used in debugmode - when playing from the browser
function keyPressed() {
    if (!debugmode) return;
    console.log("//// keyPressed ///= " + keyCode);


    switch (keyCode) {
        case 49: currentplayer.selection = selections[0]; break;
        case 50: currentplayer.selection = selections[1]; break;
        case 51: currentplayer.selection = selections[2]; break;
        case 52: currentplayer.selection = selections[3]; break;

        case 53: currentplayer.selection = selections_level2[0][0]; break;
        case 54: currentplayer.selection = selections_level2[0][1]; break;
        case 55: currentplayer.selection = selections_level2[0][2]; break;
        case 56: currentplayer.selection = selections_level2[0][3]; break;

        case 65: currentplayer.selection = selections_level2[1][0]; break;
        case 83: currentplayer.selection = selections_level2[1][1]; break;
        case 68: currentplayer.selection = selections_level2[1][2]; break;
        case 70: currentplayer.selection = selections_level2[1][3]; break;

        case 90: currentplayer.selection = selections_level2[2][0]; break;
        case 88: currentplayer.selection = selections_level2[2][1]; break;
        case 67: currentplayer.selection = selections_level2[2][2]; break;
        case 86: currentplayer.selection = selections_level2[2][3]; break;

        default: currentplayer.selection = "none"; break;
    }

    if (currentplayer.selection === "none") {
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
        updateGameScreen();
    }
}

function updatePlayers(s_players) {
    var i = 0;
    players = [];

    Object.keys(s_players).forEach(function (id) {
        //console.log("player id = " + id);
        
        if (s_players[id].nickname != undefined) {

            console.log("player avatar = " + s_players[id].avatar);


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
            //remove taken avatar form local list
            var index = avatars.indexOf(s_players[id].avatar);
            if (index > -1) {
                avatars.splice(index, 1);
            }
            

        }

    });

    // for (var i = 0; i < players.length; i++) {
    //     console.log("------------- avatars  --------- " + players[i].avatar);
    // }

    
}

function updateGameScreen() {

    gamescreen.display(bg, currentlevel);
    introscreen.removeAnim();

    gamescreen.update(players);

}

function updatePlayerPoints() {

    var count = 0;
    
    if (currentlevel == 1) {

        for (var i = 0; i < players.length; i++) {

            if (players[i].selection === selections[i]) {
                var p = players[i].points || 0;
                players[i].points = p + 1;
                count++;
            }
        }
    }
    else if (currentlevel == 2) {

        var sel1 = [];
        var sel2;

        for (var i = 0; i < players.length; i++) {
            sel1[i] = players[i].selection;
        }


        for (var j = 0; j < selections_level2.length; j++) {

            sel2 = selections_level2[j].toString();

            if (sel1.toString() === sel2) {
   
                for (var k = 0; k < players.length; k++) {

                    if (players[k].selection === selections_level2[j][k]) {
                        var p = players[k].points || 0;
                        players[k].points = p + 1;
                        count++;
                    }
                }

            }
        }

    }

    //for debugging
    // if (count == 1){
    //     gamestarted = false;
    //     socket.emit("level completed", players);
    // }

    if (count == 4) {
        gamestarted = false;
        setTimeout(gotoNextLevel, 3000);
    }
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

