/**
 * Single Player state.
 *
 **/

var singlePlayer = function (game) {
	this.ui = {};
	this.bestScore = 0;
};

singlePlayer.prototype = {
	create: function () {
		// go straight to the game
		this.playNormalGame();
	},

	playNormalGame: function () {
		numberPlayers = 0;
    	menuMusic.fadeOut(2000);
    	var mode = new Normal(this.game);
		this.game.state.start("PreloadGame", true, false, mode);
	}

};
