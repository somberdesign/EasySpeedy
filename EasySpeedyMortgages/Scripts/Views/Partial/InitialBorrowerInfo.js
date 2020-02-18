'option strict'

function InsertInitialBorrower() {
    $.post(
        '/InitialBorrower/InsertInitialBorrower',
        {
            CreditQualityId: $('#CreditQualityId').val(),
            Email: $('#Email').val(),
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val(),
            LoanAmount: $('#LoanAmount').val(),
            LoanTypeId: $('#LoanTypeId').val(),
            PhoneNumber: $('#PhoneNumber').val(),
            PropertyValue: $('#PropertyValue').val(),
            ReferringOfficerId: $('#hidReferringOfficerId').val()
        },
        function(data) {
            var url = '/HomePurchase/Complete/' + (data == true ? 1 : 0).toString();
            document.location.href = url;
        }
    );
}
