$(document).ready(function () {
    $(".selectPlayerMultiple").select2({
        width: '80%',
        closeOnSelect: false,
        minimumSelectionLength: 3,
        maximumSelectionLength: 5,
        placeholder: 'Select 3-4 players',
    });
});

