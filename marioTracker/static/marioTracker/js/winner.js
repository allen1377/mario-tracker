finishButton = document.getElementById("finish");

function finishEvent(){
    slidesDiv = document.getElementById("slideshow-container");
    winnerDiv = document.getElementById("winner-container");
    slidesDiv.style.display = "none";
    winnerDiv.style.display = "flex";
}

finishButton.addEventListener("click", finishEvent);