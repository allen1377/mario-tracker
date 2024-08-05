document.getElementById('startButton').addEventListener('click', function(event) {
    var button = event.target;
    var image = document.getElementsByClassName('kart1')[0];

    //alert("Passed")
    event.preventDefault();

    image.style.animation = "kartLeaving 1.25s ease-out, kartRunning 0.5s 3s infinite";

    image.addEventListener('animationend', function(e) {
        if(e.animationName === "kartLeaving") {
            window.location.href = button.getAttribute('data-href');
        }
    }, { once: true });
});