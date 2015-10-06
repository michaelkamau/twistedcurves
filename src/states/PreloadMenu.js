var preloadMenu = function (game) {
	this.ready = false;
};

preloadMenu.prototype = {
	preload: function () {
		var wOrientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";

		// add the loading sprite at the center of the screem.
	    this.loadingBar = this.add.sprite(w2,h2,"loading");

        // add some loading text
        this.loadingText = this.add.text(w2-300,h2+150,"loading...", {
            font : "150px dosis",
            align : "center",
            fill : "#ffffff"
        });
        this.loadingBar.anchor.setTo(0.5);

	    this.game.physics.enable(this.loadingBar, Phaser.Physics.ARCADE);
	    this.loadingBar.anchor.setTo(0.5,0.5); // origin is at the center if the loadingBar.
	    this.loadingBar.body.angularVelocity = 600; // speed of rotation in radians per sec.

	    // loadingBar.angle --> the rotation of the loadingBar from its original orientation in degrees.
	    // 
		//this.game.physics.arcade.velocityFromAngle(this.loadingBar.angle, 3*this.speed, this.loadingBar.body.velocity);
    	//Load all stuf from menu


    	// use a growing sprite.
    	// this.load.setPreloadSprite(loadingBar);

        // TODO : Remove unnecessary assets
  		this.game.load.image("login_button","assets/sprites/menu/login.png");
		this.game.load.image("audio_button","assets/sprites/menu/audio.png");
		this.game.load.image("audiooff_button","assets/sprites/menu/audiooff.png");
		this.game.load.image("multiplayer_button","assets/sprites/menu/multiplayer.png");
		this.game.load.image("setkeys_button","assets/sprites/menu/setkeys.png");
		this.game.load.image("leaderboard_button","assets/sprites/menu/leaderboard.png");
		this.game.load.image("singleplayer_button","assets/sprites/menu/singleplayer.png");
		this.game.load.image("stats_button","assets/sprites/menu/stats.png");
		this.game.load.image("fullscreen_button","assets/sprites/menu/fullscreen.png");
		this.game.load.image("sp_score","assets/sprites/menu/score.png");
		this.game.load.image("back_button","assets/sprites/menu/back.png");
		this.game.load.image("accept_button","assets/sprites/menu/accept.png");
		this.game.load.image("number_players","assets/sprites/menu/numberPlayers.png");
		this.game.load.image("number_mod","assets/sprites/menu/numberMod.png");
		this.game.load.image("set_players","assets/sprites/menu/setPlayers.png");
		this.game.load.image("key_button","assets/sprites/menu/key.png");
		this.game.load.image("player_select","assets/sprites/menu/playerSelect.png");
		this.game.load.image("exit_button","assets/sprites/menu/exit.png");
		this.game.load.image("donate_button","assets/sprites/menu/donate.png");
		this.game.load.image("resume_button","assets/sprites/menu/resume.png");
		this.game.load.image("collecting_button","assets/sprites/menu/collecting.png");
		this.game.load.image("endless_button","assets/sprites/menu/endless.png");
		this.game.load.image("oldSchool_button","assets/sprites/menu/oldSchool.png");
		this.game.load.image("restart_button","assets/sprites/menu/restart.png");
		this.game.load.image("deaths-stats","assets/sprites/menu/deaths-stats.png");	
		this.game.load.image("old-stats","assets/sprites/menu/old-stats.png");	
		this.game.load.image("score-stat","assets/sprites/menu/score-stat.png");
		this.game.load.image("total-stats","assets/sprites/menu/total-stats.png");
		this.game.load.image("aux-stat","assets/sprites/menu/aux-stat.png");
		this.game.load.image("survScore-stat","assets/sprites/menu/endless-stat.png");
		this.game.load.audio('dream', 'assets/music/dream.ogg');

	},

  	create: function () {
 	// 	if (!mobile) {
		// 	this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
		// 		this.game.state.start("Menu");
		// 	}, this);
		// } else {
		// 	this.game.state.start("Menu");
		// }
		this.loadingBar.body.angularVelocity = -300;
	},


	update: function(){
		// wait for the audio files to be decoded.
		if (this.cache.isSoundDecoded('dream') && this.ready == false){
			// load the next state -- Menu
			this.ready = true;
			this.state.start('Menu');
		}

	}

};