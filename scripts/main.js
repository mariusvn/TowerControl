import {draw_gui, draw_sector, draw_runways} from './gui.js';

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
		draw_sector(sector, map_container);
		console.log(json);
		draw_runways(map_container, sector);
		console.log("Sector loaded!");
		createDragAndDropFor(map_container);
	})
}

function init()
{
	start_pixijs();
	load_sector("LFMT");
	draw_gui("LFMT_GND", app);
}