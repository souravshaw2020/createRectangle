var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
var rect={};
var drag = false;
var color;
var mousePosition;

function resize() {
    ctx.canvas.width=canvas.clientWidth*4;
    ctx.canvas.height=canvas.clientHeight*4;
}

window.addEventListener('load', () => {
    resize();
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('dblclick', deleteRect, false);
});



function mouseDown(e) {
    rect.startX=e.pageX-this.offsetLeft;
    rect.startY=e.pageY-this.offsetTop;
    drag=true;
    color="rgb(" + Math.floor(Math.random()*200) + ","+Math.floor(Math.random()*200)+"," + Math.floor(Math.random()*200)+")";
}

function mouseUp() {
    drag=false;
}

function mouseMove(e) {
    if(drag) {
        rect.w=(e.pageX-this.offsetLeft)-rect.startX;
        rect.h=(e.pageY-this.offsetTop)-rect.startY;
        drawRect();
    }
}

function drawRect() {
    ctx.fillStyle=color;
    ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
}

function clearCanvas() {
    rect={};
    ctx.fillStyle='rgb(255,255,255)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function deleteRect(e) {
    mousePosition=canvas.getBoundingClientRect();
    var leftCanvas=((e.pageX-this.offsetLeft)-mousePosition.left)*(canvas.width/mousePosition.width);
    var topCanvas=((e.pageY-this.offsetTop)-mousePosition.top)*(canvas.height/mousePosition.height);
    ctx.clearRect(leftCanvas,topCanvas,canvas.width,canvas.height);
    console.log("delete");
}