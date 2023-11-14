window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);

var canvas, ctx, width, height, particles = [],
    probability = 0.05, xPoint, yPoint;

function onLoad(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();

    window.requestAnimationFrame(updateWorld);
}

function resizeCanvas(){
    if(!!canvas){
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
}

function updateWorld(){
    update();
    paint();
    window.requestAnimationFrame();
}

function update(){
    if(particles.length < 500 && Math.random() < probability){
        createFirework();
    }
    var alive = [];
    for(var i = 0; i < particles.length; i++){
        if(particles[i].move()){
            alive.push(particles[i]);
        }
    }
    particles = alive;
}

function paint() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.globalCompositeOperation = 'lighter';
    for(var i = 0; i < particles.length; i++){
        particles[i].draw(ctx);
    }
}

function createFirework() {
    xPoint = Math.random()*(width - 200) + 100;
    yPoint = Math.random()*(width - 200) + 100;
    var nFire = Math.random() * 50 + 100;
    var c = "rgb("+(~~(Math.random()*200 + )
}