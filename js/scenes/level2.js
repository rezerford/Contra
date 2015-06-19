Crafty.scene("level2", function()
{
	Crafty.background("#000");
    //Load a background map
    var worldBkg = Crafty.e("2D, DOM, Image");      
    worldBkg.attr({  w: (mapWidth + 100), h: (mapHeight + 100), x: 0, y: 0  })
    worldBkg.image("images/show_bkg.jpg", "repeat");   

	//Draw tank
	Crafty.e("Tank1").attr({
		x: 150,
		y: 340,
		rotation: -90
	});

	solder = Crafty.e("Solder").attr({
		x: 15,
		y: 15,
		_hasKey: false
	});
	
	for(var i = 0; i < 10; i += 1){

		var treeX = Math.round(Math.random() * (mapWidth - 350));
		var treeY = Math.round(Math.random() * mapHeight);

		Crafty.e("2D, DOM, Sprite, tree").attr({
			x: treeX + 30,
			y: treeY + 30
		}).sprite(3, 1);

		var treeX = Math.round(Math.random() * (mapWidth - 350));
		var treeY = Math.round(Math.random() * mapHeight);

		Crafty.e("2D, DOM, Sprite, tree").attr({
			x: treeX + 30,
			y: treeY + 30
		}).sprite(4, 1);
	}
	
	Crafty.audio.play("basic", -1, 0.5);
});