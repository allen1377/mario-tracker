$(document).ready(function() {
    $('#startButton').on('click', function(event) {
        event.preventDefault();

        var link = $('#startLink').attr('href');
        var $image = $('#kart1');

        $image.css('animation', 'kartLeaving 2s ease-out, kartRunning 0.5s 3s infinite');

        $image.on('animationend', function(e) {
            if(e.originalEvent.animationName === "kartLeaving"){
                window.location.href = link;
                $image.css('animation', 'kartDriving 2s ease-out, kartRunning 0.5s 3s infinite');
            }
        });
    });
});