let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex += n);
}

function currentSlides(n){
    showSlides(slideIndex = n);
}

function showSlides(n){
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length){
        slideIndex = 1;
    }
    if(n < 1){
        slideIndex = slides.length;
    }
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    let index = slideIndex - 1;
    slides[index].style.display = "block";
}

