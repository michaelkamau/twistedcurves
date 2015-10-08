var stats = function (game) {
    this.ui = {};
};

stats.prototype = {
    create: function () {
        var ui = this.ui;

        // the high score label
        ui.title = this.game.add.text(0, 0, "high score", {
            font: "200px dosis",
            fill: "#ffffff",
            align: "center"
        });
        ui.title.anchor.setTo(0.5, 0.5);

        // high score recorded so far
        ui.highScore = this.game.add.sprite(0, 0, 'score-stat');
        ui.highScore.anchor.setTo(0.5, 0.5);
        ui.highScore.alpha = 0.7;
        ui.highScoretext = this.game.add.text(0, 0, localStorage.getItem("highScore"), {
            font: "80px dosis",
            fill: colorHex,
            align: "center"
        });
        ui.highScoretext.anchor.setTo(0.5, 0.5);
        if (localStorage.getItem("highScore") == null) {
            ui.highScoretext.text = "0";
        }


        ui.totalBalls = this.game.add.sprite(0, 0, 'total-stats');
        ui.totalBalls.anchor.setTo(0.5, 0.5);
        ui.totalBalls.alpha = 0.7;
        ui.totalBallsText = this.game.add.text(0, 0, localStorage.getItem("ballsScore"), {
            font: "60px dosis",
            fill: colorHex,
            align: "center"
        });
        ui.totalBallsText.anchor.setTo(0.5, 0.5);
        if (localStorage.getItem("ballsScore") == null) {
            ui.totalBallsText.text = "0";
        }

        ui.statsDeaths = this.game.add.sprite(0, 0, 'deaths-stats');
        ui.statsDeaths.anchor.setTo(0.5, 0.5);
        ui.statsDeaths.alpha = 0.7;
        ui.textDeaths = this.game.add.text(0, 0, localStorage.getItem("deathScore"), {
            font: "60px dosis",
            fill: colorHex,
            align: "center"
        });
        ui.textDeaths.anchor.setTo(0.5, 0.5);
        if (localStorage.getItem("deathScore") == null) {
            ui.textDeaths.text = "0";
        }

        //back button
        ui.backButton = this.game.add.button(0, 0, "back_button");
        ui.backButton.anchor.setTo(0.5, 0.5);
        ui.backButton.input.useHandCursor = true;
        clickButton(ui.backButton, this.backPressed, this);

        //Place the menu buttons and labels on their correct positions
        this.setPositions();

        this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.backPressed, this);
    },

    backPressed: function () {
        this.game.state.start("Menu");
    },

    setPositions: function () {
        var ui = this.ui;

        ui.title.position.set(w2, h2 * 0.3);

        var wOrientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
        if (wOrientation == "portrait" && mobile) {
            ui.title.scale.set(0.7, 0.7);
        } else {
            ui.title.scale.set(1, 1);
        }
        ui.highScore.position.set(w2, h2);
        ui.highScoretext.position.set(w2 + 40, h2);

        ui.totalBalls.position.set(w2 * 0.4, h2 + 75);
        ui.totalBallsText.position.set(w2 * 0.4 + 30, h2 + 75);

        ui.statsDeaths.position.set(w2 * 1.6, h2 + 75);
        ui.textDeaths.position.set(w2 * 1.6 + 36, h2 + 75);


        ui.highScore.scale.set(1.5, 1.5);
        ui.highScoretext.scale.set(1.5, 1.5);


        ui.totalBallsText.scale.set(0.7, 0.7);
        ui.totalBalls.scale.set(0.7, 0.7);

        ui.statsDeaths.scale.set(0.7, 0.7);
        ui.textDeaths.scale.set(0.7, 0.7);


        ui.backButton.position.set(w2 / 2, 1.6 * h2);
        ui.backButton.scale.set(2,2);
    }

};