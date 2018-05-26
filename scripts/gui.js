export function draw_gui(ctrl_pos, app)
{
	let line = new PIXI.Graphics();
	let ctrl_pos_txt = new PIXI.Text(ctrl_pos, {
		font: "35px Roboto Mono",
		fill: 0xffffff
	});
	
	ctrl_pos_txt.position.set(25, 25);
	line.lineStyle(2, 0xffffff, 1);
	line.moveTo(0, 100);
	line.lineTo(250, 100);
	line.lineTo(250, 0);
	line.x = 0;
	line.y = 0;
	app.stage.addChild(ctrl_pos_txt);
	app.stage.addChild(line);
}

export function draw_sector(sector, map_container)
{
	if (!sector)
		return;
	for (var i = 0; i < sector.map.length; i++) {
		var line = sector.map[i];
		var line_g = new PIXI.Graphics();
		line_g.lineStyle(1, 0xffffff, 1);
		line_g.moveTo(line[0].x, line[0].y);
		for (var j = 1; j < line.length; j++) {
			line_g.lineTo(line[j].x, line[j].y);
			console.log(line[j].x + ", " + line[j].y)
		}
		map_container.addChild(line_g);
	}
}

function draw_runway(runway, map_container, sector)
{
	let length = runway.length / sector.zoom_factor;
	let pos_a = runway.screen_pos;
	let angle_a = runway.heading;
	angle_a -= 90;
	if (angle_a > 360)
		angle_a %= 360;
	if (angle_a < 0)
		angle_a = 360 - angle_a;
	let AC = Math.cos(Math.radians(angle_a)) * length;
	let CB = Math.cos(Math.radians(180 - (angle_a + 90))) * length;
	let pos_b = {x: pos_a.x + AC, y: pos_a.y + CB};
	let line = new PIXI.Graphics();
	line.lineStyle(2, 0xffffff, 1);
	line.moveTo(pos_a.x, pos_a.y);
	line.lineTo(pos_b.x, pos_b.y);
	map_container.addChild(line);
}

export function draw_runways(map_container, sector)
{
	for (let i = 0; i < sector.runways.length; i++) {
		console.log("drawing runway " + sector.runways[i].name[0] + "/" + sector.runways[i].name[1]);
		draw_runway(sector.runways[i], map_container, sector);
	}
}