$(document).ready(function() {
    var $image = $('.kart1');

    function startAnimation() {
        $image.addClass('leaving');

        $image.one('animationend', function(e) {
            if(e.originalEvent.animationName === 'kartLeaving') {
                var link = $('#startLink').attr('href');
                window.location.href = link;
            }
        });
    }

     $('#startButton').on('click', function(event) {
        event.preventDefault();
        startAnimation();
    });

    $(window).on('pageshow', function() {
        $image.removeClass('leaving');
    })
});