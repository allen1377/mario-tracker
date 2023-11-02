const totalStars = 30;
const staticStars = 15;
const growingStars = 10;
const movingStars = 5;
let animationID;

createStaticStars();
createGrowStars();
createMultMovingStars();

function randomNumber(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//create one star and use box-shadow to mimic multiple stars
function createStaticStars(){
    let i = 0;
    const starsDiv = document.getElementById('stars');
    const height = starsDiv.clientHeight /2;
    const width = starsDiv.clientWidth / 2;
    const star = document.createElement('div');

    star.className = 'staticStar';
    star.style.boxShadow = "1px 1px azure";
    for(i = 0; i < staticStars; i++){
        const horizontal = randomNumber(width, -width); //(max, min)
        const vertical = randomNumber(height, -height); 

        star.style.boxShadow = star.style.boxShadow + `, ${horizontal}px ${vertical}px azure`;
    }
    starsDiv.appendChild(star);
}

function createMultMovingStars() {
    const starsDiv = document.getElementById('stars');
    const height = starsDiv.clientHeight;
    const width = starsDiv.clientWidth;

    for (let i = 0; i < movingStars; i++) {
        createMovingStars(starsDiv, width, height);
    }
}

function createMovingStars(container, width, height) {
    const star = document.createElement('div');
    star.className = "dynamicStar";
    container.appendChild(star);

    let xCoord = randomNumber(width, 0);
    let yCoord = randomNumber(height, 0);
    let changeDirection = true;
    let speedX, speedY;

    let trailPositions = [];
    let trails = [];

    for(let i = 0; i < 7; i++){
        let trail = createTrailElement();
        trails.push(trail);
        container.appendChild(trail);
    }

    function createTrailElement() {
        let trail = document.createElement('div');
        trail.className = 'trail';
        container.appendChild(trail);
        return trail;
    }

    function updateTrailElements() {
        trailPositions.unshift({x: xCoord, y: yCoord});
        if(trailPositions.length > 7)
            trailPositions.pop();

        for(let i = 0; i < trailPositions.length; i++){
            const trail = trails[i];
            const pos = trailPositions[i];

            trail.style.left = pos.x + "px";
            trail.style.top = pos.y + "px";
        }
    }

    function updateTrailOpacity() {
        for(let i = 0; i < trailPositions.length; i++) {
            const trail = trails[i];
            trail.style.opacity = 1 - (i * 0.15);
        }
    }

    function starAnimation() {
        if(changeDirection){
            speedX = randomNumber(1, -1);
            if(speedX === 0)
                speedY = Math.random() < 0.5 ? -1 : 1;
            else
                speedY = randomNumber(1, -1);
            changeDirection = false;
        }

        updateTrailElements();

        xCoord += speedX;
        yCoord += speedY;


        star.style.left = xCoord + "px";
        star.style.top = yCoord + "px";

        if (xCoord > width || xCoord < 0 || yCoord > height || yCoord < 0) {
            trailPositions = [];

            xCoord = randomNumber(width, 0);
            yCoord = randomNumber(height, 0);
            star.style.left = xCoord + "px";
            star.style.top = yCoord + "px";
            changeDirection = true;
        }

        updateTrailOpacity();
        animationID = requestAnimationFrame(starAnimation);
    }

    animationID = requestAnimationFrame(starAnimation);
}

function createGrowStars(){
    let i = 0;
    const starsDiv = document.getElementById('stars');
    const height = starsDiv.clientHeight /2;
    const width = starsDiv.clientWidth / 2;

    for(i = 0; i < growingStars; i++){
        const horizontal = randomNumber(width, -width); //(max, min)
        const vertical = randomNumber(height, -height); 

        const star = document.createElement('div');

        star.className = 'growingStar';
        star.style.top = `${vertical}px`;
        star.style.left = `${horizontal}px`;

        starsDiv.appendChild(star);
        star.style.animationDelay = `${randomNumber(3, 1)}s`;
    }
}

// Attach an event listener for the "resize" event on the window object
window.addEventListener("resize", createStaticStars);
