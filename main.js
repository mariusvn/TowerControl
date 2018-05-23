let app = undefined;		//PIXIJS
let map_container = undefined;	//map content holder (PIXI container)
let sector = undefined;		//json map content
let drag = false;		//is draggin'

WebFont.load({
	google: {
		families: ['Roboto Mono']
	},
	active:e=>{
		init();
	}
});

Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
};

function createDragAndDropFor(target){
	target.interactive = true;
	$("canvas").mousedown(function(){
		console.log("mousedown");
		drag = target; 
	})
	$("canvas").mouseup(function(){
		drag = false;
	})
	target.on("mousemove", function(e){
		if(drag){
			drag.position.x += e.data.originalEvent.movementX;
			drag.position.y += e.data.originalEvent.movementY;
		}
	})
}

function start_pixijs()
{
	let type = "WebGL";
	if (!PIXI.utils.isWebGLSupported) {
		type = "canvas";
	}
	PIXI.utils.sayHello(type);
	app = new PIXI.Application({
		width: window.innerWidth,
		height: window.innerHeight - 4, 
		transparent: true
	});
	window.addEventListener("resize", function() {
		app.renderer.resize(window.innerWidth, window.innerHeight - 4);
	})
	document.body.appendChild(app.view);
	map_container = new PIXI.Container();
	app.stage.addChild(map_container);
}

function load_sector(airport_icao)
{
	console.log("loading sector ...");
	$.getJSON('Sectors/' + airport_icao + '.json', function(json) {
		sector = json;
		draw_sector();
		console.log(json);
		draw_runways();
		console.log("Sector loaded!");
		createDragAndDropFor(map_container);
	})
}

function draw_sector()
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

function draw_runway(runway)
{
	let length = runway.length / 12;
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

function draw_runways()
{
	for (let i = 0; i < sector.runways.length; i++) {
		console.log("drawing runway " + sector.runways[i].name[0] + "/" + sector.runways[i].name[1]);
		draw_runway(sector.runways[i]);
	}
}

function draw_gui(ctrl_pos)
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

function init()
{
	start_pixijs();
	load_sector("LFMT");
	draw_gui("LFMT_GND");
}