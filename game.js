var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var fg = new Image();
var gap = 90;
//птица местоположение
var xPos = 10;
var yPos = 150;
var grav = 1.5;
var score = 0;



bird.src = "IMG/bird5.png";
bg.src = "IMG/back6.jpg";
pipeUp.src = "IMG/pipeUp.png";
pipeBottom.src = "IMG/pipedno.png";
fg.src = "IMG/dno.png"

//птица прыжок
document.addEventListener("keydown", moveUp);
function moveUp(){
    yPos -= 30;
}

var pipe = [];

pipe[0] = {
  x : cvs.width,
  y : 0
}



function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
       
        pipe[i].x--;
      
        if(pipe[i].x == 125) {
            pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
            }
             // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x
    && xPos <= pipe[i].x + pipeUp.width
    && (yPos <= pipe[i].y + pipeUp.height
    || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
        location.reload(); 
    } 
        if(pipe[i].x == 5) {
        score++;
        }
        
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos)
    yPos += grav;

    ctx.fillStyle = "white";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;