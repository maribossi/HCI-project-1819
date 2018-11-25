class Levelscreen {

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
        text("Level completed!", windowWidth / 2, 100);

        textSize(20);
        text("Waiting for a player to start the next level ..", windowWidth / 2, windowHeight - 100);
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