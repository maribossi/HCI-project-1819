class Gamescreen {

    constructor(colors, nicknames, avatars, positions) {

        this.colors = colors;
        this.nicknames = nicknames;
        this.avatars = avatars;
        this.positions = positions;
        this.bg;

        this.secs = 0;
        this.duration;
        this.totaltime;

    }

    setDuration (dur) {
        this.totaltime = this.duration = dur;
    }

    draw() {


        // //
        var d = new Date();

        if (d.getSeconds() != this.secs) {
            this.secs = d.getSeconds();

            this.duration -= 1;
            if (this.duration >= 0) {
                
                push();
                translate(200, 540);
                fill(0, 35, 90);
                noStroke();
                rectMode(CENTER);
                ellipse(0, 0, 145);
            
                fill(255);
                noStroke();
                textSize(35);
                textAlign(CENTER);
                text(this.duration, 0, 10);

                var p_s = this.duration/this.totaltime + .001;
                noFill();
                stroke(255);
                strokeCap(SQUARE);
                strokeWeight(4);
                arc(0, 0, 140, 140, 0, p_s * 2 * PI);
                pop();
            }

        }

    }




    drawBackground() {

        createCanvas(windowWidth, windowHeight);
        background(0, 35, 90);
        var scale = windowWidth / this.bg.width;
        image(this.bg, 0, 0, windowWidth, this.bg.height * scale);

    }

    ShowAssignmentGrid() {

        fill(255, 255, 255, 50);
        noStroke();

        var sw = windowHeight / 2.5;

        for (var i = 0; i < positions.length; i++) {

            var posx = positions[i][0];
            var posy = positions[i][1];
            rect(posx, posy, sw, sw);
        }
    }


    display(bg, level) {

        this.bg = bg;
        this.drawBackground();
        this.showText(level);
        this.ShowAssignmentGrid();

    }

    displayTitle(message) {

        fill(255);
        textSize(35);
        textAlign(LEFT);
        text(message, 500, 70);
    }

    showText(level) {

        if (level === 1) {
            this.displayTitle("Level 1: Make a blue circle");

        }
        if (level === 2) {

            this.displayTitle("Level 2: Make a red square");

        }
        if (level === 3) {
            this.displayTitle("Level 3: Make a green circle, square or diamond");


        }
        if (level === 4) {
            this.displayTitle("Level 4: Make a basic geometric shape");
        }


    }


    update(players) {

        var pos = 100;

        for (var i = 0; i < players.length; i++) {
            this.ShowPlayer(pos, players[i].nickname, players[i].avatar, players[i].points);
            this.ShowCubeSelection(i, players[i].selection);
            this.ShowPlayerInGrid(players[i].avatar, players[i].position);
            pos += 75;
        }

    }

    ShowPlayer(posY, playerName, playerAvatar, points) {

        fill(255, 255, 255, 50);
        noStroke();
        rect(0, posY, 420, 70);

        fill(255);
        textSize(25);
        textAlign(LEFT);
        text(playerName, 90, posY + 45);
        fill(255, 223, 60);
        //text(points + " found", 300, posY + 45);

        if (points == 1) {
            text("Yeah!", 325, posY + 45);

        }


        switch (playerAvatar) {
            case "AvatarA":
                fill(this.colors[0]);
                break;
            case "AvatarB":
                fill(this.colors[1]);
                break;
            case "AvatarC":
                fill(this.colors[2]);
                break;
            case "AvatarD":
                fill(this.colors[3]);
                break;
        }
        rect(0, posY, 70, 70);
    }

    ShowCubeSelection(index, selection) {

        if (selection == "none") return;

        var posx = this.positions[index][0];
        var posy = this.positions[index][1];

        var img;
        switch (selection) {
            case "Back": img = img1; break;
            case "Front": img = img2; break;
            case "Left": img = img3; break;
            case "Right": img = img4; break;
            case "Top": img = img5; break;
            case "Bottom": img = img6; break;
            case "CP-Back": img = img1_cp; break;
            case "CP-Front": img = img2_cp; break;
            case "CP-Left": img = img3_cp; break;
            case "CP-Right": img = img4_cp; break;
            case "CP-Top": img = img5_cp; break;
            case "CP-Bottom": img = img6_cp; break;
            case "SP-Back": img = img1_sp; break;
            case "SP-Front": img = img2_sp; break;
            case "SP-Left": img = img3_sp; break;
            case "SP-Right": img = img4_sp; break;
            case "SP-Top": img = img5_sp; break;
            case "SP-Bottom": img = img6_sp; break;
            case "RP-Back": img = img1_rp; break;
            case "RP-Front": img = img2_rp; break;
            case "RP-Left": img = img3_rp; break;
            case "RP-Right": img = img4_rp; break;
            case "RP-Top": img = img5_rp; break;
            case "RP-Bottom": img = img6_rp; break;

            case "G1-Back": img = img1_cg; break;
            case "G2-Back": img = img2_cg; break;
            case "G3-Back": img = img4_cg; break;
            case "G4-Back": img = img3_cg; break;
            case "G1-Front": img = img6_cg; break;
            case "G2-Front": img = img5_cg; break;
            case "G3-Front": img = img6_cg; break;
            case "G4-Front": img = img5_cg; break;
            case "G1-Top": img = img1_rg; break;
            case "G2-Top": img = img2_rg; break;
            case "G3-Top": img = img4_rg; break;
            case "G4-Top": img = img3_rg; break;
            case "G1-Left": img = img3_sg; break;
            case "G2-Left": img = img4_sg; break;
            case "G3-Left": img = img1_sg; break;
            case "G4-Left": img = img2_sg; break;
            case "G1-Right": img = img6_sg; break;
            case "G2-Right": img = img5_sg; break;
            case "G3-Right": img = img6_sg; break;
            case "G4-Right": img = img5_sg; break;
            case "G1-Bottom": img = img6_rg; break;
            case "G2-Bottom": img = img5_rg; break;
            case "G3-Bottom": img = img6_rg; break;
            case "G4-Bottom": img = img5_rg; break;

            case "M1-Back": img = img1_rg; break;
            case "M2-Back": img = img2_rg; break;
            case "M3-Back": img = img3_rg; break;
            case "M4-Back": img = img4_rg; break;

            case "M1-Front": img = img5; break;
            case "M2-Front": img = img2_cw; break;
            case "M3-Front": img = img4_cw; break;
            case "M4-Front": img = img6; break;

            case "M1-Left": img = img1; break;
            case "M2-Left": img = img2; break;
            case "M3-Left": img = img3; break;
            case "M4-Left": img = img4; break;

            case "M1-Right": img = img5_sp; break;
            case "M2-Right": img = img2_sw; break;
            case "M3-Right": img = img3_sw; break;
            case "M4-Right": img = img6_sp; break;

            case "M1-Top": img = img1_sp; break;
            case "M2-Top": img = img2_sp; break;
            case "M3-Top": img = img3_sp; break;
            case "M4-Top": img = img4_sp; break;

            case "M1-Bottom": img = img5_rg; break;
            case "M2-Bottom": img = img2_rw; break;
            case "M3-Bottom": img = img3_rw; break;
            case "M4-Bottom": img = img6_rg; break;
        }



        if (img != null) {
            var sw = windowHeight / 2.5;
            image(img, posx, posy, sw, sw);
        }

    }

    ShowPlayerInGrid(playerAvatar, position) {

        var posx = position[0];
        var posy = position[1];


        switch (playerAvatar) {
            case "AvatarA":
                fill(this.colors[0]);
                rect(posx, posy, 30, 30);
                break;
            case "AvatarB":
                fill(this.colors[1]);
                rect(posx, posy, 30, 30);
                break;
            case "AvatarC":
                fill(this.colors[2]);
                rect(posx, posy, 30, 30);
                break;
            case "AvatarD":
                fill(this.colors[3]);
                rect(posx, posy, 30, 30);
                break;
        }

    }





}