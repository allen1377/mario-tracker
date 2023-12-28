// Function to calculate opacity based on position
function calculateOpacity(position, viewportSize, transitionSize) {
    const distanceToEdge = Math.min(position, viewportSize - position);
    const maxDistance = Math.min(viewportSize / 2, transitionSize / 2);
    const opacity = 1 - (distanceToEdge / maxDistance);
    return Math.max(0, opacity);
}

// Function to update opacity during animation
function updateOpacityDuringAnimation(element, viewportSize, transitionSize) {
    const moveCloudAnimation = (time) => {
        const position = element.getBoundingClientRect().left + element.clientWidth / 2;
        const opacity = calculateOpacity(position, viewportSize, transitionSize);
        element.style.opacity = opacity.toFixed(2);
        requestAnimationFrame(moveCloudAnimation);
    };

    requestAnimationFrame(moveCloudAnimation);
}

// Set up opacity updates for each cloud element
const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const transitionSize = 100; // Adjust as needed

updateOpacityDuringAnimation(document.querySelector('.cloud.x2'), viewportWidth, transitionSize);
updateOpacityDuringAnimation(document.querySelector('.cloud.x3'), viewportWidth, transitionSize);
updateOpacityDuringAnimation(document.querySelector('.cloud.x4'), viewportWidth, transitionSize);
updateOpacityDuringAnimation(document.querySelector('.cloud.x5'), viewportWidth, transitionSize);
