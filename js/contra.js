var contra = {
	initialize: function(){
		Crafty.init(600, 600);
		Crafty.pixelart(true);

    	Crafty.sprite(32, 32, "images/player_sprite.png", {
			'solder': [0, 0]
		});

		Crafty.sprite(32, 36, "images/solder.png", {
			'enemy': [2, 0]
		});

		Crafty.sprite(64, 64, "images/trees.png", {
			'tree': [0, 0]
		});

		Crafty.sprite(32, 32, "images/stump.png", {
			'stump': [0, 0]
		});

		Crafty.sprite(85, 160, "images/E-100.png",{
			'tank1': [0, 0]
		});

		Crafty.sprite("images/fence.png",{
			'fence10': [200, 310, 20, 110],
			'fence11': [200, 270, 100, 30]
		});

		Crafty.sprite(85, 150, "images/tower.png",{
			'tower': [0, 0]
		});

		Crafty.sprite(200, 80, "images/jeep.png",{
			'jeep': [0, 0]
		});

		Crafty.sprite(30, 30, "images/grenade.png",{
			'grenade': [0, 0]
		});

		Crafty.sprite(64, 64, "images/explode.png",{
			'grenade_explode': [0, 0]
		});

		Crafty.sprite(100, 100, "images/particle_sprites.png",{
			'particle_explosion': [0, 0]
		});

		Crafty.sprite(24, 24, "images/tank_key.png",{
			'tank_key': [0, 0]
		});

		Crafty.sprite(64, 64, "images/blood.png",{
			'blood': [0, 0]
		});

		Crafty.sprite(62, 37, "images/broken_tree.png",{
			'broken_tree': [0, 0]
		});

		Crafty.sprite(32, 32, "images/bullets.png",{
			'shell': [0, 4]
		});

		Crafty.sprite(40, 40, "images/particle_large.png",{
			'particle_large': [0, 0]
		});

		Crafty.sprite(64, 64, "images/explosions.png",{
			'tank_explosion': [0, 3]
		});

		Crafty.audio.add("basic", "sounds/wargame.mp3");
		Crafty.audio.add("walk", "sounds/walk.wav");
		Crafty.audio.add("hole", "sounds/hole.ogg");
		Crafty.audio.add("explode", "sounds/explode.mp3");
		Crafty.audio.add("krik", "sounds/krik.mp3");
		Crafty.audio.add("wood", "sounds/wood.mp3");
		Crafty.audio.add("shoot_tank", "sounds/shoot_tank.mp3");

		Crafty.audio.maxChannels = 20;
		Crafty.audio.setChannels(20);

    	Crafty.scene("level1");
	}
};
