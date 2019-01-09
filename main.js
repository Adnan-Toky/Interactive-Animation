var w = window.innerWidth;
var h = window.innerHeight;
if(w > h){
    w = h-100;
    h = w;
}
if(w < 100){
    w = 360;
    h = 360;
}
h = w;

var x = w/2;
var y = w/2;
var r = 2;
var number = 500;
var v = 3;
var angle = Math.PI*2/number;
var balls = [];
var red = 255;
var green = 255;
var blue = 255;
var intv;

function colorChange(dr,dg,db){
    red -= dr;
    if(red < 10){
        red = 255;
        green -= dg;
        if(green < 10){
            green = 255;
            blue -= db;
            if(blue < 10){
                blue = 255;
                red = 255;
                green = 255;
            }
        }
    }
}

function ready(){
    balls = [];
    for(n = 0;n < number;n++){
        balls[n] = {
            bx:x,
            by:y,
            dx:v*Math.sin(n*angle),
            dy:v*Math.cos(n*angle)
        }
    }
}


var c = document.getElementById("myCanvas");
    c.height = w;
    c.width = w;
var ctx = c.getContext("2d");

function draw(){
    for(n = 0;n < number;n++){
        ctx.beginPath();
        ctx.arc(balls[n].bx+balls[n].dx,h-(balls[n].by+balls[n].dy),r,0,Math.PI*2);
        ctx.fillStyle = "rgb("+red+","+green+","+blue+")";
        ctx.fill();
        ctx.closePath();
        balls[n].bx += balls[n].dx;
        balls[n].by += balls[n].dy;
        if(balls[n].by < 0 || balls[n].by > h){
            balls[n].dy =- balls[n].dy;
        }
        if(balls[n].bx < 0 || balls[n].bx > w){
            balls[n].dx =- balls[n].dx;
        }
    }
}

function update(drc,dgc,dbc){
    number=document.getElementById("number").value;
    angle=Math.PI*2/number;
    r = document.getElementById("radius").value;
    v = document.getElementById("speed").value;
    ready();
    clearInterval(intv);
    intv = setInterval(function(){
        colorChange(drc,dgc,dbc);
        ctx.beginPath();
        ctx.rect(0,0,w,h);
        ctx.fillStyle = "rgba(0,0,0,.06)";
        ctx.fill();
        draw();
    },10)
}

window.onload = function(){
    setTimeout(function(){
        update(10,30,40);
    },50)
}
