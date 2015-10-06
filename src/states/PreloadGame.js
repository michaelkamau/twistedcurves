var preloadGame = function (game) {
    this.mode = null;
};

preloadGame.prototype = {
    init: function (mode) {
        this.mode = mode;
    },

    preload: function () {
        this.scale.forceOrientation(true); // forcing the landscape orientation.
        var wOrientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
        if (wOrientation == "portrait") {
            Cocoon.Device.setOrientation(Cocoon.Device.Orientations.PORTRAIT);
        } else {
            Cocoon.Device.setOrientation(Cocoon.Device.Orientations.LANDSCAPE);
        }

        var loadingBar = this.add.sprite(w2, h2, "loading");
        this.game.physics.enable(loadingBar, Phaser.Physics.ARCADE);
        loadingBar.anchor.setTo(0.5, 0.5);
        loadingBar.body.angularVelocity = 200;
        this.game.physics.arcade.velocityFromAngle(loadingBar.angle, 300 * this.speed, loadingBar.body.velocity);

        // Why? Why call the preload function explicitly?
        if (this.state.preload) {
            this.state.preload();
        }

        // TODO : Remove assets that are not used.
        //Load all stuf from game
        this.game.load.image('crown','assets/crown.png');
        this.game.load.image('score', 'assets/sprites/menu/score-general.png');
        this.game.load.image('pauseButton', 'assets/sprites/menu/pause.png');
        this.game.load.image('screenshotButton', 'assets/sprites/menu/screenshot.png');
        this.game.load.image('winner', 'assets/sprites/menu/winner.png');
        this.game.load.image('touch', 'assets/sprites/menu/touch.png');
        this.game.load.image('overlay', 'assets/overlay.png');
        // audio
        this.game.load.audio('move0', 'assets/sfx/zap1.mp3');
        this.game.load.audio('move1', 'assets/sfx/zap2.mp3');
        this.game.load.audio('kill', 'assets/sfx/kill.ogg');
        this.game.load.audio('sfx_collect0', 'assets/sfx/collect0.ogg');

        this.mode.preload();

    },

    create: function () {
        // start the GameManager state. Clear the game world display,
        this.game.state.start("GameMananger", true, false, this.mode);
    },

    update: function () {
        // wait for all the audio files to be decoded
        if (this.cache.isSoundDecoded("move0") &&
            this.cache.isSoundDecoded("move1") &&
            this.cache.isSoundDecoded("kill") &&
            this.cache.isSoundDecoded("sfx_collect0")){
            // start the GameManager state.
            // clear all game world
            // clear cache.
            // pass on the correct mode.
            this.state.start("GameMananger",true,false,this.mode);
        }
    }

};