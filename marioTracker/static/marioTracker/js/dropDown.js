$(document).ready(function (){
    $('.dropdown').on('click', function(){
        console.log("Passes dropdown function--------------")
        if (!($('.dropdown-menu').hasClass('dropDownHidden') || $('.dropdown-menu').hasClass('dropDownFlex'))){
            $('.dropdown-menu').addClass('dropDownFlex');
            console.log("First If")
        }
        else if ($('.dropdown-menu').hasClass('dropDownHidden')){
            $('.dropdown-menu').removeClass('dropDownHidden').addClass('dropDownFlex');
            console.log("Second If")
        }
        else if ($('.dropdown-menu').hasClass('dropDownFlex')){
            $('.dropdown-menu').removeClass('dropDownFlex').addClass('dropDownHidden');
            console.log("Else: ", $(this));
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