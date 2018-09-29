var socket;
var r, g, b;
var x, y, z;
var xpos, ypos;


function setup() {
    createCanvas(800, 600);
    
    r = random(255);
    b = random(255);
    g = random(255);

    xpos = 400;
    ypos = 300;
    x = 0;
    y = 0;


    background(r,g,b);

    socket = io();
    socket.on('currentPlayers', showMainscreen);

}



function showMainscreen(data) {
    background(0);
    console.log("I am the main screen !!!")
    socket.on('playerDraw', newDrawing);
}


function draw() {
    
    //add/subract xpos and ypos
    xpos = xpos + x;
    ypos = ypos - y;

    // wrap ellipse if over bounds
    if(xpos > 800) { xpos = 0; }
    if(xpos < 0) { xpos = 800; }
    if(ypos > 600) { ypos = 0; }
    if(ypos < 0) { ypos = 600; }

    // draw ellipse
    fill(0);
    ellipse(xpos, ypos, 25, 25);

    var data = {
        x: xpos,
        y: ypos,
        r: r,
        g: g,
        b: b
    }

    socket.emit('playerDraw', data);
}

function newDrawing(data) {
    noStroke();
    fill(data.r, data.g, data.b);
    ellipse(data.x, data.y, 36, 36);
}

// function mouseDragged() {

//     noStroke();
//     fill(0);
//     ellipse(mouseX, mouseY, 36,36);

//     var data = {
//         x: mouseX,
//         y: mouseY,
//         r: r,
//         g: g,
//         b: b
//     }

//     socket.emit('playerDraw', data);

// }

// accelerometer Data
window.addEventListener('devicemotion', function(e) 
{
    console.log(" ///// devicemotion /////// " );
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z); 
});