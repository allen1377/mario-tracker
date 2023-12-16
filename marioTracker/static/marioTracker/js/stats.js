$(document).ready(function() {

    var formAction = $('#winRecordForm').attr('action');
    $('#statFormButton').click(function(e) {
        e.preventDefault();

        var formData = $('#winRecordForm').serialize();
        formData += '&action=win_record_submit';
    
        $.ajax({
            type: 'POST',
            url: formAction,
            data: formData,
            success: function(response) {
                var wins = response.wins;
                var totalNum = response.totalWins;

                var recordsElement = $('#records');
                recordsElement.empty();

                var table = $('<table border="1">');

                var tableHeader = $('<thead>');
                var headerRow = $('<tr>');
                var th1 = $('<th>').text('Champion');
                headerRow.append(th1);
                var th2 = $('<th>').text('Date');
                headerRow.append(th2);
                tableHeader.append(headerRow);
                table.append(tableHeader);
                
                var tableBody = $('<tbody>');
                wins.forEach(function(win) {
                    var tableRow = $('<tr>');
                    var tdName = $('<td>').text(win.winner);
                    var tdDate = $('<td>').text(win.date);
                    tableRow.append(tdName);
                    tableRow.append(tdDate);
                    tableBody.append(tableRow);
                });
                table.append(tableBody);


                var totalWins = $('<h2>').text('Total Wins: ' + totalNum);

                recordsElement.append(table);
                recordsElement.append(totalWins);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});