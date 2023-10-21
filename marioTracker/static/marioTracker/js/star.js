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
    star.style.backgroundColor = "Red";
    container.appendChild(star);

    let xCoord = randomNumber(width, 0);
    let yCoord = randomNumber(height, 0);
    let changeDirection = true;
    let speedX, speedY;

    let trailPositions = [];

    function createTrailElement() {
        let trail = document.createElement('div');
        trail.className = 'trail';
        container.appendChild(trail);
        return trail;
    }

    function updateTrailElements() {
        const trail = createTrailElement(); 
        console.log("UpdateTrailElements (B4): ", xCoord, yCoord, trail);
        trail.style.left = xCoord - speedX + "px";
        trail.style.top = yCoord - speedY + "px";
        trailPositions.unshift({x: xCoord, y: yCoord, trail: trail});
        if(trailPositions.length > 7)
            container.removeChild(trailPositions.pop().trail);
    }

    function updateTrailOpacity() {
        for(let i = 0; i < trailPositions.length; i++) {
            const trailData = trailPositions[i];
            //console.log("Iteration: ", i, ", Data: ", trailData.x, trailData.y, trailData.trail);
            trailData.trail.style.opacity = 1;
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

        console.log("Speed x, y", speedX, speedY);
        xCoord += speedX;
        yCoord += speedY;

        console.log("after: ", xCoord, yCoord);

        star.style.left = xCoord + "px";
        star.style.top = yCoord + "px";
        updateTrailElements();

        if (xCoord > width || xCoord < 0 || yCoord > height || yCoord < 0) {
            alert("Threshold reached", animationID);
            
            for(let i = 0; i < trailPositions.length; i++){
                container.removeChild(trailPositions[i].trail);
            }
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
