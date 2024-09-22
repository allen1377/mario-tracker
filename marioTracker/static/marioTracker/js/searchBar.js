$(document).ready(function() {
    $('#searchBar').on('keyup', function() {
        var searchTerm = $(this).val().toLowerCase();

        //console.log("Hello");
        $('.dropdown-menu li').each(function() {
            var firstName = $(this).data('firstName');
            var lastName = $(this).data('lastName');

            console.log("Search Term: ", searchTerm, ", firstName lastName: ", firstName, " ", lastName);
            if (firstName.includes(searchTerm) || lastName.includes(searchTerm)) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    });
});