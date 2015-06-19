Crafty.c("Tank_explosion", {

	init: function(){
		this.requires("2D");
			this.requires("DOM");
			this.requires("tank_explosion");
		this.requires("SpriteAnimation");

		this.reel("tank_explosion", 400, 0, 3, 17);
		this.reel("tank_explosion2", 400, 0, 4, 17);

	}

});