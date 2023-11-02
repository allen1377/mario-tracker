function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

const glassTallElements = document.querySelectorAll('.glassTall');

function applyRandomAnimation(element) {
    const randomDuration = getRandom(10, 25); // Change the range as needed
    const randomDelay = getRandom(0, 50); // Change the range as needed

    element.style.animationDuration = `${randomDuration}s`;
    element.style.animationDelay = `${randomDelay}s`;

}

// Apply random animations to each element with the class "glassTall"
glassTallElements.forEach((element) => {
    applyRandomAnimation(element);
});

