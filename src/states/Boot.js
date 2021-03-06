// The Boot state
var boot = function (game) {
    playCounter = 0;
    w2 = 0;
    h2 = 0;
    changeColor = false;  // tracks if color has been changed in the previous running instance.
    mute = false;
    firstTime = true;
    iapDone = false;
};

boot.prototype = {

    preload: function () {
        this.game.load.image("loading", "assets/sprites/menu/loading.png");
    },

    create: function () {
        //this.game.add.plugin(Phaser.Plugin.Debug);

        orientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";

        // determine the platform
        if (Phaser.Device.android)
            platform = "android";
        else if (Phaser.Device.windowsPhone)
            platform = "windowsPhone";
        else if (Phaser.Device.desktop)
            platform = "desktop";

        w2 = this.game.world.width / 2;
        h2 = this.game.world.height / 2;

        //Background colors
        // NOTE: These are actually BRIGHT colors
        bgColorsDark = ["#BBEC7A",
            "#E19CD4",
            "#69D2D1",
            "#F3A07F",
            "#EABA55",
            "#A3B9EA",
            "#4FE7B8",
            "#A5DC9D",
            "#E6C0D1",
            "#C8C772",
            "#DFE35F",
            "#7EEA95",
            "#9BD7EE",
            "#DFB677",
            "#BAE4DB",
            "#EFA3B1",
            "#8FC6A6",
            "#4DD7F4",
            "#93C971",
            "#D6E89E",
            "#98E9C0",
            "#DFCAEF",
            "#E2B8F2",
            "#4DD5C2",
            "#70F3EB",
            "#C2C1D7",
            "#94C0CB",
            "#E7AFD8"];

        // And these are DARK nice colors !
        bgColors = ["#2F4E2D",
            "#845269",
            "#426B7E",
            "#855637",
            "#3B3B40",
            "#706827",
            "#413219",
            "#65664C",
            "#974E4C",
            "#285755",
            "#64332A",
            "#502F37",
            "#7E5E5D",
            "#5C6366",
            "#6D5C79",
            "#447044",
            "#67562D",
            "#316B57",
            "#586630",
            "#3F4257",
            "#444627",
            "#274B58",
            "#2B4434",
            "#1B3435",
            "#775922",
            "#5D3D26",
            "#7A4743",
            "#5C4344"];

        // TODO : Change this to appropriate values
        // leaderboards for the different kinds of game : Single Player :  modesLB[0]
        modesLB = ['CgkIr97_oIgHEAIQCQ', 'CgkIr97_oIgHEAIQCg', 'CgkIr97_oIgHEAIQCw'];

        chosenColor = this.game.rnd.integerInRange(0, bgColors.length - 1);
        colorHex = bgColors[chosenColor];
        colorHexDark = bgColorsDark[chosenColor];
        document.body.style.background = colorHex;

        // the stage controls the root level display objects upon which everything is displayed.
        // the Stage --> The root of the display tree. Everything connected to the stage is rendered.
        this.stage.backgroundColor = colorHex;

        //Player colors
        //[red, blue, pink, green, brown, cyan, purple, yellow]
        colorPlayers = ['#eb1c1c', '#4368e0', '#f07dc1', '#44c83a', '#9e432e', '#3dd6e0', '#9339e0', '#ebd90f'];

        this.game.forcesSingleUpdate = true;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  // shows the entire display area, maintains the aspect ratio.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.scale.setResizeCallback(this.resize, this);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.smoothed = false; // diables texture smoothing. This is enabled by default.

        this.state.start("PreloadMenu");
    },

    resize: function () {
        if ((this.state.current != 'GameMananger') && (this.state.current != 'PreloadMenu') && (this.state.current != 'PreloadGame')) {
            orientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
            var winW = window.innerWidth;
            var winH = window.innerHeight;
            var winRatio = winW / winH;
            var height = Math.round(Math.sqrt(baseArea / winRatio));
            var width = Math.round(winRatio * height);

            var game = this.game;

            game.width = width;
            game.height = height;
            game.canvas.width = width;
            game.canvas.height = height;
            game.renderer.resize(width, height);

            this.stage.width = width;
            this.stage.height = height;

            this.scale.width = width;
            this.scale.height = height;

            this.world.setBounds(0, 0, width, height);

            this.camera.setSize(width, height); //  the size of the view rectangle.
            this.camera.setBoundsToWorld(); // update the camera bounds to match the game world. I think the previus method is unnecessary.
            this.scale.refresh();

            w2 = this.game.world.width / 2;
            h2 = this.game.world.height / 2;

            if (this.state.states[this.game.state.current].setPositions) {
                this.state.states[this.game.state.current].setPositions();
            }
        }
    }

};