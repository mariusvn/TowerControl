let app = undefined;
let map_container = undefined;
let sector = undefined;

WebFont.load({
	google: {
		families: ['Roboto Mono']
	},
	active:e=>{
		init();
	}
});


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
	$.getJSON('Sectors/' + airport_icao + '.json', function(json) {
		sector = json;
		draw_sector();
		console.log(json);
	})
}

function draw_sector()
{
	console.log("draw sectors");
	if (!sector)
		return;
	console.log("there is sector");
	for (var i = 0; i < sector.map.length; i++) {
		console.log("line");
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
	load_sector("LFMT");
	start_pixijs();
	draw_gui("LFMT_GND");
}