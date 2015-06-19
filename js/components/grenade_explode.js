Crafty.c("GrenadeExplode", {

	init: function(){

		this.requires("2D");
		this.requires("DOM");
		this.requires("SpriteAnimation");
		this.requires("grenade_explode");

		this.reel("explode1", 500, 0, 0, 3);
		this.reel("explode2", 500, 0, 1, 3);
		this.reel("explode3", 500, 0, 2, 3);
		this.reel("explode4", 500, 0, 3, 4);
	}

});