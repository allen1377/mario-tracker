const spriteImage = document.getElementsByClassName("kart2");
const frameHeight = 40;
const totalFrames = 4;
let currentFrame = 0;

function animateSprite() {
    currentFrame = (currentFrame + 1) % totalFrames;
    const framePosition = -currentFrame * frameHeight;
    spriteImage[0].style.objectPosition = `0 ${framePosition}px`;

    requestAnimationFrame(animateSprite);
}

animateSprite();