$(document).ready(function() {
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
        var fullName = firstName + ' ' + lastName;

        if ($('#selectedPlayers').find(`[data-player="${fullName}"]`).length === 0){
            $('#selectedPlayers').append(`
                <div class="selectedPlayer" data-player="${fullName}">
                    "${fullName}" <span class="removePlayer">x</span>
                </div>
            `);
        }
    });

    $(document).on('click', '.removePlayer', function() {
        $(this).parent('.selectedPlayer').remove();
    });
});