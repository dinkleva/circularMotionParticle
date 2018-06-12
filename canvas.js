var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');



var mouse = {
	x:undefined,
	y:undefined
};
addEventListener('mousemove',function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

//utility function
function RandomValueRange(x,y){

	return x+Math.random()*y;
}

function randomColor(){

	return colors[Math.floor(Math.random()*6)];
}

var colors = [

	'red',
	'green',
	'blue',
	'magenta',
	'pink',
	'grey',
	'orange'
];

function Ball (x,y,r,color) {

	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
	this.radians = Math.random()*Math.PI*2;
	this.speed = 0.07;
	this.distance = RandomValueRange(50,120);
	
	
	this.update = function(){
		const lastPoint = {x:this.x,y:this.y};


		this.radians += this.speed;
		this.x = x + Math.cos(this.radians)* this.distance;
		this.y = y + Math.sin(this.radians)*this.distance;
		
		

		this.draw(lastPoint);
	};

	this.draw = function(lastPoint){
		c.beginPath();
		c.strokeStyle = this.color;
		c.lineWidth = this.r;
		c.moveTo(lastPoint.x,lastPoint.y);
		c.lineTo(this.x,this.y);
		c.stroke();
		c.closePath();
	}
}

var ball = [];

function init(){
	ball = [];

	for(var i=0;i<100;i++){
		var x = canvas.width/2;
		var y = canvas.height/2;
		var r = RandomValueRange(1,4);
		var color = randomColor();
		ball.push(new Ball(x,y,r,color));
	}
}


function animate(){
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(255,255,255,0.5)';
	c.fillRect(0,0,canvas.width,canvas.height);
	
	ball.forEach(i=>{
		i.update();
	});

}

init();
animate();