// Gets window height & width
var w = window.innerWidth;
var h = window.innerHeight;
// Makes canvas height & width equal
if(w > h){
    w = h-100;
    h = w;
}
if(w < 100){
    w = 360;
    h = 360;
}
h = w;

var x = w/2; // Center-X of canvas
var y = w/2; // Center-Y of canvas
var r = 2; // Radius of balls
var number = 500; // Number of balls
var v = 3; // Velocity of balls
var angle = Math.PI*2/number; // Angle between two ball's path
var balls = []; // Ball's container
var red = 255; // Color red
var green = 255; // Color green
var blue = 255; // Color blue
var intv; // Interval

// Changes the color style
// dr -> red color's changing rate, dg -> green color's changing rate, db -> blue color's changing rate
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

// Prepares ball's data
function ready(){
    balls = [];
    for(n = 0;n < number;n++){
        balls[n] = {
            bx:x, // Ball's position-X
            by:y, // Ball's position-Y
            dx:v*Math.sin(n*angle), // Changing rate of bx
            dy:v*Math.cos(n*angle) // Changing rate of by
        }
    }
}

// Gets canvas element
var c = document.getElementById("myCanvas");
// Sets canvas height & width
c.height = w;
c.width = w;
var ctx = c.getContext("2d"); // Gets canvas context

// Draws balls
function draw(){
    for(n = 0;n < number;n++){
        ctx.beginPath();
        ctx.arc(balls[n].bx+balls[n].dx,h-(balls[n].by+balls[n].dy),r,0,Math.PI*2); // Draws round ball
        ctx.fillStyle = "rgb("+red+","+green+","+blue+")"; // Sets ball's color
        ctx.fill();
        ctx.closePath();
        balls[n].bx += balls[n].dx; // Makes change to ball's x position
        balls[n].by += balls[n].dy; // Makes change to ball's y position
        if(balls[n].by < 0 || balls[n].by > h){
            balls[n].dy =- balls[n].dy; // Changes ball's direction if reaches at top or bottom
        }
        if(balls[n].bx < 0 || balls[n].bx > w){
            balls[n].dx =- balls[n].dx; // Changes ball's direction if reaches at left or right
        }
    }
}

// Updates animation data by user input
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

// Initializes animation after loading the page
window.onload = function(){
    setTimeout(function(){
        update(10,30,40);
    },50)
}
