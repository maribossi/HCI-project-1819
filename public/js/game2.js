var socket;
var r,g,b;
function setup() {
    createCanvas(800, 600);
    background(51);

    r = random(255);
    b = random(255);
    g = random(255);

    socket = io.connect('http://localhost:8081')
    socket.on('playerDraw', newDrawing);
  }
  
  function draw() {
    
    
  }

  function newDrawing(data) {
    
    noStroke();
    fill(data.r,data.g,data.b);
    ellipse(data.x, data.y, 36,36);
    
    
  }
  
  function mouseDragged() {
    console.log('Sending ' + mouseX + ',' + mouseY);
    noStroke();
    fill(r,g,b);
    ellipse(mouseX, mouseY, 36,36);
    
    var data = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b
    }

    socket.emit('playerDraw', data);
    
  }