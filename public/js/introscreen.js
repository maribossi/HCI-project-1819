class Introscreen {

    constructor() {
    }


    display(bg, ima) {

        this.bg = bg;
        this.img = ima;

        createCanvas(windowWidth, windowHeight);
        background(0, 35, 90);

        image(this.bg, windowWidth - 1200, windowHeight - 700);
        image(this.img, (windowWidth - this.img.width) / 2, (windowHeight - this.img.height) / 2);

        fill(255);
        textAlign(CENTER);
        textSize(35);
        text("Welcome to WE.Screen!", windowWidth / 2, 100);

        textSize(20);
        text("Waiting for 4 players to join the game...", windowWidth / 2, windowHeight - 100);
    }

    update() {
        //todo draw animation here


    }

    removeAnim() {
        TweenMax.to(this, 2, { opacity: 0, onComplete: this.setReady });
    }

    setReady() {
        this.bg = this.img = null;
    }

}