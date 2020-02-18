'use strict'


$(function () {

    $('#btnShortApplications').click(function () {

        $('.admin-div').hide();
        $('#divShortApplications').show();

        if ($.fn.dataTable.isDataTable($('#tblShortApplications'))) {
            $('#tblShortApplications').DataTable().ajax.reload();
        }
        else {
            $('#tblShortApplications').DataTable({
                ajax: {
                    url: '/Admin/GetShortApplications',
                    dataSrc: '',
                },
                columns: [{ data: 'id' }, { data: 'additional_cash' }, { data: 'household_income' }, { data: 'bankruptcy' }, { data: 'contact_time' }, { data: 'credit_history' }, { data: 'email_address' }, { data: 'employment_status' }, { data: 'fha_loan' }, { data: 'first_name' }, { data: 'foreclosure' }, { data: 'phone' }, { data: 'last_name' }, { data: 'late_payments' }, { data: 'lead_date' }, { data: 'lead_type' }, { data: 'loan_type' }, { data: 'loan_purpose' }, { data: 'military_service' }, { data: 'monthly_payments' }, { data: 'mortgage_balance_one' }, { data: 'mortgage_balance_two' }, { data: 'mortgage_rate_one' }, { data: 'mortgage_rate_two' }, { data: 'property_type' }, { data: 'property_address' }, { data: 'property_city' }, { data: 'property_use' }, { data: 'property_state' }, { data: 'property_value' }, { data: 'property_zip' }, { data: 'show_mtg2_loan_type' }, { data: 'site_owner_id' }, { data: 'alt_phone' }, { data: 'purchase_year' } ],
                language: {
                    search: 'Search:',
                },
                order: [[0, 'desc']]
            });
        }
    });


    $('#btnInitialBorrowerInfo').click(function () {
        $('.admin-div').hide();
        $('#divInitialBorrowerInfo').show();

        if ($.fn.dataTable.isDataTable($('#tblInitialBorrowerInfo'))) {
            $('#tblInitialBorrowerInfo').DataTable().ajax.reload();
        }
        else {
            $('#tblInitialBorrowerInfo').DataTable({
                ajax: {
                    url: '/Admin/GetInitialBorrowerInfo',
                    dataSrc: '',
                },
                columns: [
                    { data: 'id' },
                    { data: 'first_name' },
                    { data: 'last_name' },
                    { data: 'email' },
                    { data: 'phone_number' },
                    { data: 'loan_amount' },
                    { data: 'property_value' },
                    { data: 'loan_description' },
                    { data: 'quality_description' },
                    { data: 'officer_name' },
                    { data: 'created_dt_display' },
                ],
                language: {
                    search: 'Search:',
                },
                order: [[0, 'desc']]
            });
        }
    });


});