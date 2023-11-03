buttonElement = document.getElementById("statReturn");

function statReturn(){
    statSpace = document.getElementById("statBackground");
    cardOne = document.getElementById("racing");
    cardTwo = document.getElementById("stats");

    statSpace.classList.remove("statAnimated");
    cardOne.classList.remove("cardOneAnimation");
    cardTwo.classList.remove("cardTwoAnimation");
    // This will remove the class if it's already added.

    // Adding a small delay to re-trigger the animation
    setTimeout(function() {
        statSpace.classList.add("statAnimated");
        cardOne.classList.add("cardOneAnimation");
        cardTwo.classList.add("cardTwoAnimation");
    }, 100);

    statSpace.addEventListener("animationend", function(){
        statSpace.style.display = "none";
        cardOne.style.display = "block";
        cardTwo.style.display = "block";
    });
}

buttonElement.addEventListener("click", statReturn);