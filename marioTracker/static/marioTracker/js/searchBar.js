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

        console.log("b4 adding: ", selectedPlayerIds.length);

        if ($('#selectedPlayers').find(`[data-player="${fullName}"]`).length === 0){
            $('#selectedPlayers').append(`
                <div class="selectedPlayer" data-id="${playerID}" data-player="${fullName}">
                    ${fullName} <span class="removePlayer">x</span>
                </div>
            `);
        }

        if(!selectedPlayerIds.includes(playerID)){
            if(selectedPlayerIds.length < 4){
                selectedPlayerIds.push(playerID);
            }
        }

        console.log("after adding: ", selectedPlayerIds.length);

    });

    $('.dropdown-menu').on('click', '.removePlayer', function() {
        var playerID = $(this).parent().data("id");
        console.log("Print all data: ", $(this));
        console.log("before removing: ", selectedPlayerIds.length, ", ", playerID);
        $(this).parent('.selectedPlayer').remove();

        selectedPlayerIds = selectedPlayerIds.filter(id => id !==  Number(playerID));
        console.log("after removing: ", selectedPlayerIds.length);
        console.log(selectedPlayerIds);
    });

    function submitRacers(){
        
    }
});