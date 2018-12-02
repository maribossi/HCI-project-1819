class Gamescreen {

    constructor(colors, nicknames, avatars, selections, positions) {

        this.colors = colors;
        this.nicknames = nicknames;
        this.avatars = avatars;
        this.selections = selections;
        this.positions = positions;
    }

    drawBackground() {

        createCanvas(windowWidth, windowHeight);
        background(0, 35, 90);
        image(this.bg, windowWidth - 1200, windowHeight - 700);

    }

    ShowAssignmentGrid() {

        fill(255, 255, 255, 50);
        noStroke();

        for (var i = 0; i < positions.length; i++) {

            var posx = positions[i][0];
            var posy = positions[i][1];
            rect(posx, posy, 250, 250);
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

            this.displayTitle("Level 2: Make a purple circle, square or rhombus");

        }
        if (level === 3) {
            this.displayTitle("This level does not work yet");

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

        console.log(" /// ShowPlayer /// " + points);
        fill(255, 255, 255, 50);
        noStroke();
        rect(0, posY, 420, 70);

        fill(255);
        textSize(25);
        textAlign(LEFT);
        text(playerName, 90, posY + 45);
        fill(255, 223, 60);
        //text(points + " found", 300, posY + 45);
        if(points > 0)text("Yeah!", 325, posY + 45);
        
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
        }

        if (img != null) {
            image(img, posx, posy);
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