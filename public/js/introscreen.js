class Introscreen {

    constructor() {
        this.bg;

        
       
    }

    drawBackground() {

        createCanvas(windowWidth, windowHeight);
        background(0, 35, 90);
        image(this.bg, windowWidth - 1200, windowHeight - 700);

        //make the placeholders
        var posx = windowWidth/2 - 560;
        var posy = windowHeight/4;

        
        for (var i = 0; i < 4; i++) {

            noFill();
            stroke(255, 50);
            strokeWeight(1);
            rect(posx, posy, 250, 250);
            posx += 280;
        }

    }

    displayTitle(message) {

        fill(255);
        textAlign(CENTER);
        textSize(50);
        text(message, windowWidth / 2, windowHeight/5.5);
    }

    displaySubtitle(message, ypos) {

        fill(255);
        textAlign(CENTER);
        textSize(18);
        text(message, windowWidth / 2, ypos);

    }

    display(bg, level) {

        this.bg = bg;
        this.drawBackground();
        this.showText(level);
    }

    showText(level) {

        var dist = 380;

        if(level === 1)
        {
            this.displayTitle("Welcome to WE.Screen!");
            this.displaySubtitle("Waiting for 4 players to join the game.", windowHeight/5.5+dist);
            this.displaySubtitle("To play this game collect pieces of a puzzle by sarching the room in AR.", windowHeight/5.5+dist+50);
        }
        if(level === 2)
        {
            
            this.displayTitle("Level 1 completed!");
            this.displaySubtitle("Waiting for a player to start the next level.", windowHeight/5.5+dist);
        }
        if(level === 3)
        {
            this.displayTitle("Level 2 completed!");
            this.displaySubtitle("End of the game.", wwindowHeight/5.5+dist);
        }
    }


    showAllPlayers(players, level) {

        this.drawBackground();
        this.showText(level);

        var posx = windowWidth/2 - 560;
        var posy = windowHeight/4;


        var colors = [[211, 42, 47],[245, 127, 34],[251, 190, 84],[98, 210, 159]];


        for (var i = 0; i < players.length; i++) {

            console.log("showAllPlayers avatar = " + players[i].avatar);


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
            rect(posx, posy, 250, 250);

            fill(255);
            textSize(30);
            textAlign(CENTER);
            text(players[i].nickname, posx + 125, posy + 135);

            posx += 280;
        }

    }



    removeAnim() {
        TweenMax.to(this, 2, { opacity: 0, onComplete: this.setReady });
    }

    setReady() {
        this.bg = null;
    }


}