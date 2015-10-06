
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
	  this.game.load.image("loading","assets/sprites/menu/loading.png");
	},

  	create: function () {
  		//this.game.add.plugin(Phaser.Plugin.Debug);

  	orientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";

  	if (Cocoon.Social.GameCenter.nativeAvailable) {
  		platform = "ios";
  	} else if (Cocoon.Social.GooglePlayGames.nativeAvailable) {
			platform = "android";
  	} else {
  		platform = "desktop";
  	}


  	w2 = this.game.world.width/2; h2 = this.game.world.height/2;

		//Background colors
		//[green, red, purple, blue]
		bgColors = ['#76b83d', '#cf5e4f', '#805296', '#4c99b9'];
		bgColorsDark = ['#3b5c1e', '#672f27', '#40294b', '#264c5c'];

		// TODO : Change this to appropriate values
		// leaderboards for the different kinds of game : Single Player :  modesLB[0]
		modesLB = ['CgkIr97_oIgHEAIQCQ', 'CgkIr97_oIgHEAIQCg', 'CgkIr97_oIgHEAIQCw'];

		chosenColor = this.game.rnd.integerInRange(0, 3);
		colorHex = bgColors[chosenColor];
		colorHexDark = bgColorsDark[chosenColor];
		document.body.style.background = colorHex;

		// the stage controls the root level display objects upon which everything is displayed.
		// the Stage --> The root of the display tree. Everything connected to the stage is rendered.
		this.stage.backgroundColor = colorHex;

		//Player colors
		//[red, blue, pink, green, brown, cyan, purple, yellow]
		colorPlayers = ['#eb1c1c','#4368e0','#f07dc1','#44c83a','#9e432e','#3dd6e0','#9339e0','#ebd90f'];

		this.game.forcesSingleUpdate = true;

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  // shows the entire display area, maintains the aspect ratio.
		this.scale.pageAlignHorizontally = true;
	 	this.scale.pageAlignVertically = true;
	 	this.scale.forceOrientation(true, false);
	 	this.scale.setResizeCallback(this.resize, this);

	  	this.physics.startSystem(Phaser.Physics.ARCADE);

	  	this.stage.smoothed = false; // diables texture smoothing. This is enabled by default.

		if (mobile) {
			Cocoon.App.exitCallback(
				function () {
					if (this.state.states[this.game.state.current].backPressed) {
						this.state.states[this.game.state.current].backPressed();
					}
					if (this.state.current == "Menu") {
						return true;
					} else {
						return false;
					}
				}.bind(this)
			);
		}

		this.state.start("PreloadMenu");
	},

	resize: function () {
		if ((this.state.current != 'GameMananger') && (this.state.current != 'PreloadMenu') && (this.state.current != 'PreloadGame')) {
			orientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
			var winW = window.innerWidth;
			var winH = window.innerHeight;
			var winRatio = winW/winH;
			var height = Math.round(Math.sqrt(baseArea/winRatio));
			var width =  Math.round(winRatio*height);

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

			w2 = this.game.world.width/2;
			h2 = this.game.world.height/2;

			if (this.state.states[this.game.state.current].setPositions) {
				this.state.states[this.game.state.current].setPositions();
			}
		}
  	}
  	
};