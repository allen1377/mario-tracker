$(document).ready(function() {
    $('#statFormButton').click(function(e) {
        e.preventDefault();

        var formData = $('#winRecordForm').serialize();
    
        $.ajax({
            type: 'POST',
            url: '{% url "marioTracker:statsOrMap" %}',
            data: formData,
            succes: function(response) {
                $('#records').html(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});