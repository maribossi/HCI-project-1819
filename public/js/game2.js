var socket;
var r, g, b;

function setup() {
    createCanvas(800, 600);
    
    r = random(255);
    b = random(255);
    g = random(255);

    background(r,g,b);

    socket = io.connect('http://localhost:8081')
    socket.on('currentPlayers', showMainscreen);
}

function showMainscreen(data) {
    background(0);
    console.log("I am the main screen !!!")
    socket.on('playerDraw', newDrawing);
}


function draw() {


}

function newDrawing(data) {
    noStroke();
    fill(data.r, data.g, data.b);
    ellipse(data.x, data.y, 36, 36);
}

function mouseDragged() {

    // noStroke();
    // fill(r,g,b);
    // ellipse(mouseX, mouseY, 36,36);

    var data = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b
    }

    socket.emit('playerDraw', data);

}