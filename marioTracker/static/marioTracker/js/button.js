statButton = document.getElementById("statReturn");
toStatsButton = document.getElementById("stat");
toRaceButton = document.getElementById("race");
raceButton = document.getElementById("playerReturn");


function statReturn(){
    let statSpace = document.getElementById("statBackground");
    let cardOne = document.getElementById("racing");
    let cardTwo = document.getElementById("stats");

    statSpace.classList.remove("statAnimated");
    cardOne.classList.remove("cardOneAnimation");
    cardTwo.classList.remove("cardTwoAnimation");
    cardOne.classList.remove("cardOneAnimation2");
    statSpace.classList.remove("statAnimated2");
    cardTwo.classList.remove("cardTwoAnimation2");

    // Adding a small delay to re-trigger the animation
    setTimeout(function() {
        statSpace.classList.add("statAnimated");
        cardOne.classList.add("cardOneAnimation");
        cardTwo.classList.add("cardTwoAnimation");
    }, 100);

    function handleAnimationEnd() {
        statSpace.style.display = "none";
        cardOne.style.display = "flex";
        cardTwo.style.display = "flex";

        setDisplayFlexRecursive(cardOne);
        setDisplayFlexRecursive(cardTwo);

        statSpace.removeEventListener("animationend", handleAnimationEnd);
    }

    statSpace.addEventListener("animationend", handleAnimationEnd);
}

function playerReturn(){
    let raceSpace = document.getElementById("raceBackground");
    let cardOne = document.getElementById("racing");
    let cardTwo = document.getElementById("stats");

    raceSpace.classList.remove("statAnimated");
    cardOne.classList.remove("cardOneAnimation");
    cardTwo.classList.remove("cardTwoAnimation");
    cardOne.classList.remove("cardOneAnimation2");
    raceSpace.classList.remove("statAnimated2");
    cardTwo.classList.remove("cardTwoAnimation2");

    // Adding a small delay to re-trigger the animation
    setTimeout(function() {
        raceSpace.classList.add("statAnimated");
        cardOne.classList.add("cardOneAnimation");
        cardTwo.classList.add("cardTwoAnimation");
    }, 100);

    function handleAnimationEnd() {
        raceSpace.style.display = "none";
        cardOne.style.display = "flex";
        cardTwo.style.display = "flex";

        setDisplayFlexRecursive(cardOne);
        setDisplayFlexRecursive(cardTwo);

        raceSpace.removeEventListener("animationend", handleAnimationEnd);
    }

    raceSpace.addEventListener("animationend", handleAnimationEnd);
}

function setDisplayFlexRecursive(element) {
    // Set the current element to display as flex
    if ((element.matches('.dropdown-menu'))){
        return;
    }
    
        element.style.display = "flex";
    

    // Iterate through each child element and call the function recursively
    Array.from(element.children).forEach(function(child) {
        setDisplayFlexRecursive(child); // Recursively call for grandchildren and further descendants
    });
}

function toStatFunction(){
    let statSpace = document.getElementById("statBackground");
    let cardOne = document.getElementById("racing");
    let cardTwo = document.getElementById("stats");

    cardOne.classList.remove("cardOneAnimation2");
    statSpace.classList.remove("statAnimated2");
    cardTwo.classList.remove("cardTwoAnimation2");
    statSpace.classList.remove("statAnimated");
    cardOne.classList.remove("cardOneAnimation");
    cardTwo.classList.remove("cardTwoAnimation");

    setTimeout(function() {
        statSpace.classList.add("statAnimated2");
        cardOne.classList.add("cardOneAnimation2");
        cardTwo.classList.add("cardTwoAnimation2");
    }, 100);

    function handleAnimationEnd(){
        statSpace.style.display = "flex";
        cardOne.style.display = "none";
        cardTwo.style.display = "none";

        setDisplayFlexRecursive(statSpace);

        var recordArea = document.getElementById("records");
        recordArea.innerText="";

        cardTwo.removeEventListener("animationend", handleAnimationEnd);
    }
    
    cardTwo.addEventListener("animationend", handleAnimationEnd);
}

function toPlayerFunction(){
    let raceSpace = document.getElementById("raceBackground");
    let cardOne = document.getElementById("racing");
    let cardTwo = document.getElementById("stats");

    cardOne.classList.remove("cardOneAnimation2");
    raceSpace.classList.remove("statAnimated2");
    cardTwo.classList.remove("cardTwoAnimation2");
    raceSpace.classList.remove("statAnimated");
    cardOne.classList.remove("cardOneAnimation");
    cardTwo.classList.remove("cardTwoAnimation");

    setTimeout(function() {
        raceSpace.classList.add("statAnimated2");
        cardOne.classList.add("cardOneAnimation2");
        cardTwo.classList.add("cardTwoAnimation2");
    }, 100);

    function handleAnimationEnd(){
        raceSpace.style.display = "flex";
        cardOne.style.display = "none";
        cardTwo.style.display = "none";

        setDisplayFlexRecursive(raceSpace);

        cardTwo.removeEventListener("animationend", handleAnimationEnd);
    }
    
    cardTwo.addEventListener("animationend", handleAnimationEnd);
}

statButton.addEventListener("click", statReturn);
toStatsButton.addEventListener("click", toStatFunction);
toRaceButton.addEventListener("click", toPlayerFunction);
raceButton.addEventListener("click", playerReturn);
