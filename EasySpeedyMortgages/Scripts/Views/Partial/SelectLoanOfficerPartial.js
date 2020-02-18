'option strict'


function JumpTo(key) {
    window.location.href = `/Home/DisplayOfficer?officerKey=${key}`;
}

function PopulateLoanOfficers() {
    var ddl = $('#divOfficers');

    $.get(
        "/Home/GetOfficersDropdown",
        function(data) {
            $.each(data, function (index, value) {
                ddl.append(CreateItem(value));
            });
        }
    );

    function CreateItem(data) {

        var imageFilename = data['image'];
        var nmlsNumber =    data['nmls_number'];
        var officerKey =    data['officer_key'];
        var officerName = data['officer_name'];
        var phone = data['PrimaryPhoneNumber'] === null ? '' : data['primary_phone_number'];

        return `
        <div class='officer-option-item' onclick="JumpTo('${officerKey}');">
            <img src='${layout_officerImageDir}${imageFilename}' class ='float-left officer-option-image' />
            <div class=''>
                <div class ='officer-option-name'>${officerName}</div>
                <small class ='officer-option-description'>
                    <div>${phone}</div>
                    <div>NMLS #${nmlsNumber}</div>
                </small>
            </div>
            <div class='clear-both'></div>
        </div>
            `;
    }
}


