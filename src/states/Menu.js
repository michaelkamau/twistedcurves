/**
 *  The Menu State
 *
 **/
var menu = function (game) {
    //TODO : Remove this stuff. Not needed for single player mode.
    maxPlayers = 7;
    keys = [
        Phaser.Keyboard.W,
        Phaser.Keyboard.P,
        Phaser.Keyboard.B,
        Phaser.Keyboard.Z,
        Phaser.Keyboard.M,
        Phaser.Keyboard.C,
        Phaser.Keyboard.R,
        Phaser.Keyboard.U,];
    menuMusic = null;
    this.ui = {};
    socialService = null;
};

menu.prototype = {
    create: function () {
        this.world.pivot.set(0, 0);
        this.world.angle = 0;

        this.scale.forceOrientation(true);

        if (changeColor) {
            chosenColor = this.game.rnd.integerInRange(0, bgColors.length - 1);
            colorHex = bgColors[chosenColor];
            colorHexDark = bgColorsDark[chosenColor];
            document.body.style.background = colorHex;
            this.stage.backgroundColor = colorHex;
            changeColor = false;
        }


        bgColor = Phaser.Color.hexToColor(colorHex);

        // why changing the background color again?
        //this.stage.backgroundColor = colorHex;
        //document.body.style.background = colorHex;

        if (!menuMusic && !mute) {
            menuMusic = this.add.audio('dream');
            menuMusic.loop = true;
            menuMusic.play();
        }
        else if (!menuMusic.isPlaying && !mute) {
            menuMusic.loop = true;
            menuMusic.play();
            menuMusic.volume = 1;
        }

        var ui = this.ui;

        //Game Title
        ui.title = this.add.text(0, 0, "twisted curves", {
            font: "200px dosis",
            fill: "#ffffff",
            align: "center"
        });
        ui.title.anchor.setTo(0.5, 0.5);

        // Remove unneeded buttons

        // loading prompt
        ui.loadingPrompt = this.add.sprite(0,0,"loading");
        this.game.physics.enable(ui.loadingPrompt, Phaser.Physics.ARCADE);
        ui.loadingPrompt.anchor.setTo(0.5,0.5);
        ui.loadingPrompt.scale.setTo(2);
        // give it an angular velocity
        ui.loadingPrompt.body.angularVelocity = 300;

        // play text
        ui.playText = this.game.make.text(0,0,"play",{
            font : "120px dosis",
            align : "center",
            fill : "#ffffff"
        });
        // create a bitmapData for this text
        ui.bmdPlayText = this.add.bitmapData( 250,250);
        this.game.cache.addBitmapData("bmdPlayText", ui.bmdPlayText);
        ui.bmdPlayText.draw(ui.playText);
        ui.bmdPlayText._anchor.setTo(0.5);
        //.bmdPlayText.text("play",w2,h2,"dosis","#ffffff");
        //ui.bmdPlayText.addToWorld();

        // Button from the bmdPlayText bitmapData
        ui.playButton =  this.add.button(0,0,this.cache.getBitmapData("bmdPlayText"));
        ui.playButton.anchor.setTo(0.5,0.5);
        ui.playButton.input.useHandCursor = true;
        clickButton(ui.playButton, this.singlePlayer, this);

        //Stats
        ui.statsButton = this.add.button(0, 0, "stats_button");
        ui.statsButton.anchor.setTo(0.5, 0.5);
        ui.statsButton.input.useHandCursor = true;
        clickButton(ui.statsButton, this.stats, this);

        //Audio
        if (mute) {
            ui.audioButton = this.add.button(0, 0, "audiooff_button");
            ui.audioButton.anchor.setTo(0.5, 0.5);
            ui.audioButton.input.useHandCursor = true;
        } else {
            ui.audioButton = this.add.button(0, 0, "audio_button");
            ui.audioButton.anchor.setTo(0.5, 0.5);
            ui.audioButton.input.useHandCursor = true;
        }

        clickButton(ui.audioButton, this.muteSound, this);

        this.scale.refresh();

        //Place the menu buttons and labels on their correct positions
        this.setPositions();
        
    },


    singlePlayer: function () {
        this.state.start("SinglePlayer", true, false);

    },

    leaderboard: function () {
        this.state.start("Leaderboards");
    },

    stats: function () {
        this.state.start("Stats");
    },

    muteSound: function () {
        var ui = this.ui;

        if (mute) {
            ui.audioButton.loadTexture('audio_button');
            //this.game.sound.mute = false;
            mute = false;
            if (!menuMusic) {
                menuMusic = this.add.audio('dream');
            }
            menuMusic.loop = true;
            menuMusic.play();
            menuMusic.volume = 1;
        } else {
            ui.audioButton.loadTexture('audiooff_button');
            //this.game.sound.mute = true;
            mute = true;
            if (menuMusic && menuMusic.isPlaying) {
                menuMusic.stop();
            }
        }
    },

    backPressed: function () {
        //exit game?
    },

    setPositions: function () {
        var ui = this.ui;

        ui.title.position.set(w2, h2 * 0.3);

        var wOrientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
        if (wOrientation == "portrait" && mobile) {
            ui.title.scale.set(0.8, 0.8);
        } else {
            ui.title.scale.set(1, 1);
        }

        // add the loading Prompt.
        ui.loadingPrompt.position.set(w2,h2);

        // add the playText.
        ui.playButton.position.set(w2+25,h2+50);

        ui.statsButton.position.set(1.6 * w2, 1.6 * h2);

        ui.audioButton.position.set(w2 / 4, 1.6 * h2);
    }

};