let app = undefined;

WebFont.load({
	google: {
		families: ['Roboto Mono']
	},
	active:e=>{
		console.log("font loaded!");
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
	draw_gui("LFMT_GND");
}