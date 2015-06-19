Crafty.scene("level1", function()
{
	Crafty.background("#000");
    //Load a background map
    var worldBkg = Crafty.e("2D, DOM, Image");      
    worldBkg.attr({  w: (mapWidth + 100), h: (mapHeight + 100), x: 0, y: 0  })
    worldBkg.image("images/show_bkg.jpg", "repeat");   

	solder = Crafty.e("Solder").attr({
		x: 15,
		y: 15,
		_hasKey: true
	});
	
	for(var i = 0; i < 300; i += 1){

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
	
	//Draw stumps
	for(var i = 0; i < 50; i += 1){
		var sX = Math.round(Math.random() * (mapWidth - 350));
		var sY = Math.round(Math.random() * mapHeight);

		Crafty.e("Stump").attr({
			x: sX + 30,
			y: sY + 30
		});
	}

	//Draw tank
	Crafty.e("Tank1").attr({
		x: mapWidth - 3200,
		y: 340
	});

	//Draw fence
	var fenceY = 0;
	for(var n = 0; n < 3; n += 1){
		Crafty.e("2D, DOM, Sprite, fence10").attr({
			x: mapWidth - 250,
			y: fenceY
		});
		fenceY += 95;
	}

	Crafty.e("2D, DOM, Sprite, fence11").attr({
		x: mapWidth - 250,
		y: fenceY
	});

	Crafty.e("2D, DOM, Sprite, fence11").attr({
		x: mapWidth - 155,
		y: fenceY
	});

	fenceY += 30;
	for(var n = 0; n < 2; n += 1){
		Crafty.e("2D, DOM, Sprite, fence10").attr({
			x: mapWidth - 75,
			y: fenceY
		});
		fenceY += 95;
	}

	Crafty.e("2D, DOM, Sprite, fence11").attr({
		x: mapWidth - 155,
		y: fenceY
	});

	Crafty.e("2D, DOM, Sprite, fence11").attr({
		x: mapWidth - 250,
		y: fenceY
	});

	fenceY += 30;
	for(var n = 0; n < 22; n += 1){
		Crafty.e("2D, DOM, Sprite, fence10").attr({
			x: mapWidth - 250,
			y: fenceY
		});
		fenceY += 95;
	}

	//Draw tower
	Crafty.e("Tower").attr({
		x: mapWidth - 200,
		y: 600
	});

	Crafty.e("Tower").attr({
		x: mapWidth - 200,
		y: 1800
	});

	//Draw Jeep
	var jeepY = 800;
	for(var n = 0; n < 6; n += 1){

		offset = Math.random() * 50;
		Crafty.e("Jeep").attr({
			x: mapWidth - 160 - offset,
			y: jeepY
		});

		jeepY += 90;
	}

	var jeepY = 1900;
	for(var n = 0; n < 6; n += 1){

		offset = Math.random() * 50;
		Crafty.e("Jeep").attr({
			x: mapWidth - 160 - offset,
			y: jeepY
		});

		jeepY += 90;
	}

	//Draw enemies
	Crafty.e("Enemy").attr({x: mapWidth - 400, y: mapHeight - 250, _hasKey: false});
	Crafty.e("Enemy").attr({x: mapWidth - 350, y: mapHeight - 850, _hasKey: true});
	Crafty.e("Enemy").attr({x: mapWidth - 450, y: mapHeight - 1350, _hasKey: false});
	Crafty.e("Enemy").attr({x: mapWidth - 450, y: mapHeight - 1650, _hasKey: false});

	Crafty.audio.play("basic", -1, 0.5);
});