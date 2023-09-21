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

// Add an event listener to execute code when the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByClassName("text");
    for (var i = 0; i < elements.length; i++) {
        let text = elements[i].innerText;
        console.log(text);
        let modifiedText = text.substring(0, text.indexOf("."));
        console.log(modifiedText);
        elements[i].innerText = modifiedText;
    }
});





