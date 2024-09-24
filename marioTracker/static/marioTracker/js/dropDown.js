$(document).ready(function (){
    $('.dropdown').on('click', function(){
        if (!($('.dropdown-menu').hasClass('dropDownHidden') || $('.dropdown-menu').hasClass('dropDownFlex'))){
            $('.dropdown-menu').addClass('dropDownFlex');
        }
        else if ($('.dropdown-menu').hasClass('dropDownHidden')){
            $('.dropdown-menu').removeClass('dropDownHidden').addClass('dropDownFlex');
        }
        else if ($('.dropdown-menu').hasClass('dropDownFlex')){
            $('.dropdown-menu').removeClass('dropDownFlex').addClass('dropDownHidden');
        }
    });

    $(window).on('click', function(event){
        if(!$(event.target).closest('.dropdown').length && $(event.target !== $('#searchBar'))){
            //console.log($(event.target !== $('#searchBar')));
            if ($('.dropdown-menu').hasClass('dropDownFlex')){
                $('.dropdown-menu').removeClass('dropDownFlex').addClass('dropDownHidden');
            }
        }
    });

    $('.dropdown-menu').on('click', function(event){
        event.stopPropagation();
    });
});