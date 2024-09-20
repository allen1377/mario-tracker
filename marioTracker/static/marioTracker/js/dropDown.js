$(document).ready(function (){
    $('.dropdown').on('click', function(){
        if (!($('.dropdown-menu').hasClass('dropDownHidden') || $('.dropdown-menu').hasClass('dropDownFlex'))){
            $('.dropdown-menu').addClass('dropDownFlex');
        }
        else if ($('.dropdown-menu').hasClass('dropDownHidden')){
            $('.dropdown-menu').removeClass('dropDownHidden').addClass('dropDownFlex');
        }
        else {
            $('.dropdown-menu').removeClass('dropDownFlex').addClass('dropDownHidden');
        }
    });

    $(window).on('click', function(event){
        if(!$(event.target).closest('.dropdown').length){
            if ($('.dropdown-menu').hasClass('dropDownFlex')){
                $('.downdown-menu').removeClass('dropDownFlex').addClass('dropDownHidden');
            }
        }
    });
});