$(document).ready(function (){
    $('.dropdown').on('click', function(){
        $('.dropdown-menu').toggle();
    });

    $(window).on('click', function(event){
        if(!$(event.target).closest('.dropdown').length){
            $('.dropdown-menu').hide();
        }
    });
});