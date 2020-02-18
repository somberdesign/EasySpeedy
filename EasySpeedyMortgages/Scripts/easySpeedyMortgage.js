'use strict'

var ESM_BACKGROUND_VALIDATION_COLOR = '#FE3010';

function PopulateHomePriceDropdown(ddl, start, end) {
    var val = '';

    ddl.append($('<option value="Less than ' + FormatCurrency(start*10000) + '">Less than ' + FormatCurrency(start*10000) + '</option>'));
    for (var i = start; i < end; i++) {
        val = FormatCurrency((i*10000)+1) + ' - ' + FormatCurrency((i+1)*10000);
        ddl.append(
            $('<option></option>')
            .val(val)
            .html(val)
        );
    }
    ddl.append($('<option value="' + FormatCurrency((end*10000)+1) + '+">' + FormatCurrency((end*10000)+1) + '+</option>'));
}

function PopulateMortgageRateDropdown(ddl, start, end) {
    var val = '';

    ddl.append($('<option value="Less than ' + start.toFixed(3) + '%">Less than ' + start.toFixed(3) + '%</option>'));
    for (var i = start; i < end; i=i+0.25) {
        val = i.toFixed(3) + '%';
        ddl.append(
            $('<option></option>')
            .val(val)
            .html(val)
        );
    }
    ddl.append($('<option value="More than ' + end.toFixed(3) + '%">' + end.toFixed(3) + '%</option>'));

}

function FormatCurrency(num) {
    var len = num.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).length;
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).substring(0, len - 3);
}
