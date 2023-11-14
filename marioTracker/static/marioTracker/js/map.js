let slideIndex = 0;
let skipAmount = 0;
let mapNumber = 1;
showSlides(slideIndex);

function plusSlides(n){
    mapNumber += n;
    showSlides(slideIndex += n);
}

function skipSlides(n){
    skipAmountCheck(skipAmount += n);
    mapNumber -= n;
    plusSlides(n);
}

function skipAmountCheck(n){
    if(n == 2){
        let skipElement = document.getElementsByClassName("skip");
        skipElement[0].style.display = "none";
    }
}

function showSlides(n){
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let mapNumText = document.getElementsByClassName("numbertext");
    if (mapNumber == 8){
        nextElem = document.getElementsByClassName("next");
        nextElem[0].style.display = "none";
        skipElem = document.getElementById("finish");
        skipElem.style.display = "block";
    }
    if(n < 0){
        slideIndex = slides.length;
    }
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    let index = slideIndex;
    slides[index].style.display = "block";
    mapNumText[index].textContent = "Map " + mapNumber;
    
}






