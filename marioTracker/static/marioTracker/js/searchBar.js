$(document).ready(function() {
    var selectedPlayerIds = [];

    $('#searchBar').on('keyup', function() {
        var searchTerm = $(this).val().toLowerCase();
        
        //console.log("Hello");
        $('.dropdown-menu li').each(function() {
            var firstName = $(this).data('firstname').toLowerCase();
            var lastName = $(this).data('lastname').toLowerCase();
            
            if (firstName.includes(searchTerm) || lastName.includes(searchTerm)) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    });

    $('.dropdown-menu li').on('click', function(){
        var firstName = $(this).data('firstname');
        var lastName = $(this).data('lastname');
        var playerID = $(this).data('id');
        var fullName = firstName + ' ' + lastName;

        if ($('#selectedPlayers').find(`[data-player="${fullName}"]`).length === 0){
            $('#selectedPlayers').append(`
                <div class="selectedPlayer" data-id="${playerID}" data-player="${fullName}">
                    ${fullName} <span class="removePlayer">x</span>
                </div>
            `);
        }

        if(!selectedPlayerIds.includes(playerID)){
            if(!(selectedPlayerIds.length > 3)){
                selectedPlayerIds.push(playerID);
            }
            if(selectedPlayerIds.length === 3 || selectedPlayerIds.length === 4){
                console.log("Calling submitRacers method");
                submitRacers();
            }
        }
    });

    $('.dropdown-menu').on('click', '.removePlayer', function() {
        var playerID = $(this).parent().data("id");
        $(this).parent('.selectedPlayer').remove();

        selectedPlayerIds = selectedPlayerIds.filter(id => id !==  Number(playerID));
        if(selectedPlayerIds.length < 3)
            hideSubmitRacers();
    });

    function submitRacers(){
        console.log("In submitRacersMethod");
        $('#submitSelectedPlayers').removeClass('dropDownHidden').addClass('dropDownFlex');
        $('.ExistButton').css("display", "none");
    }

    function hideSubmitRacers(){
        console.log("In hide method");
        $('#submitSelectedPlayers').removeClass('dropDownFlex').addClass('dropDownHidden');
        $('.ExistButton').css('display', 'flex');
    }
});