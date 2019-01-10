class Introscreen {

    constructor() {
        this.bg;
    }

    drawBackground() {

        createCanvas(windowWidth, windowHeight);
        background(0, 35, 90);
        //image(this.bg, windowWidth - 1200, windowHeight - 700);
        var scale = windowWidth / this.bg.width;
        image(this.bg, 0, 0, windowWidth, this.bg.height * scale);


        //make the placeholders
        var posx = windowWidth / 2 - 430;
        var posy = windowHeight / 2 + 50;


        for (var i = 0; i < 4; i++) {

            noFill();
            stroke(255, 50);
            strokeWeight(1);
            rect(posx, posy, 200, 200);
            posx += 220;
        }

    }

    displayTitle(message) {

        fill(255);
        textAlign(CENTER);
        textSize(50);
        text(message, windowWidth / 2, windowHeight / 5.5);
    }

    displaySubtitle(message, ypos) {

        fill(255);
        textAlign(CENTER);
        textSize(30);
        text(message, windowWidth / 2, ypos);

    }

    display(bg, level) {

        console.log("has focus?? " + document.hasFocus())

        if(level > 1 && document.hasFocus()) level_sound.play();
        
        this.bg = bg;
        this.drawBackground();
        this.showText(level);


    }

    showText(level) {

        var dist = 100;
       
        if (level === 1) {
            this.displayTitle("Welcome to WE.screen!");
            this.displaySubtitle("Waiting for 4 players to join the game.", windowHeight / 5.5 + dist);
            this.displaySubtitle("When the game starts, walk to the middle of the room and click on the marker in AR.", windowHeight / 5.5 + dist + 50);
            this.displaySubtitle("Then search for pieces of the puzzle in the room and click on them.", windowHeight / 5.5 + dist + 100);
        }
        else if (level === 2) {
            var lvl = level - 1;
            this.displayTitle("Level " + lvl + " completed!");
            this.displaySubtitle("In the next level, you will make a red square with your team.", windowHeight / 5.5 + dist);
            this.displaySubtitle("Waiting for a player to start the next level.", windowHeight / 5.5 + dist + 70);
        }
        else if (level === 3) {
            var lvl = level - 1;
            this.displayTitle("Level " + lvl + " completed!");
            this.displaySubtitle("Next level team effort: Choose and make a green circle, square or diamond.", windowHeight / 5.5 + dist);
            this.displaySubtitle("Waiting for a player to start the next level.", windowHeight / 5.5 + dist + 70);
        }

        else if (level === 4) {
            var lvl = level - 1;
            this.displayTitle("Level " + lvl + " completed!");
            this.displaySubtitle("Next level team effort: Make a basic geometric shape.", windowHeight / 5.5 + dist);
            this.displaySubtitle("Waiting for a player to start the next level.", windowHeight / 5.5 + dist + 70);
        }
        else if (level === 5) {
            this.displayTitle("All levels completed!");
            this.displaySubtitle("End of the game.", windowHeight / 5.5 + dist);
        }


    }


    showAllPlayers(players, level) {

        this.drawBackground();
        this.showText(level);

        var posx = windowWidth / 2 - 430;
        var posy = windowHeight / 2 + 50;

        var colors = [[211, 42, 47], [245, 127, 34], [251, 190, 84], [98, 210, 159]];

        for (var i = 0; i < players.length; i++) {

            switch (players[i].avatar) {
                case "AvatarA":
                    fill(colors[0]);
                    break;
                case "AvatarB":
                    fill(colors[1]);
                    break;
                case "AvatarC":
                    fill(colors[2]);
                    break;
                case "AvatarD":
                    fill(colors[3]);
                    break;
            }
            rect(posx, posy, 200, 200);

            fill(255);
            textSize(28);
            textAlign(CENTER);
            text(players[i].nickname, posx + 100, posy + 110);

            posx += 220;
        }

    }



    removeAnim() {
        TweenMax.to(this, 2, { opacity: 0, onComplete: this.setReady });
    }

    setReady() {
        this.bg = null;
    }


}