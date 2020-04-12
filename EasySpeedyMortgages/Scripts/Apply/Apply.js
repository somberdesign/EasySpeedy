'use strict';

const defaultStartPage = 'IncomeInfo'

var formValues = {};
var dynamicControlCounter = 0;

formValues['ddlStartAppState'] = 'fl';
formValues['ddlPropertyType'] = 'singleFamilyHome';
formValues['ddlLotSize'] = '10AcresOrLess';
formValues['ddlBuildingType'] = 'freestanding';
formValues['ddlPropertyStatus'] = 'existing';
formValues['ddlAdditionalLoan'] = 'no';
formValues['rbWhoIsApplying'] = 'Spouse';


$(function () {
    $('#txtStartAppEmailAddress').focus();

    AddInputEvents();

    // show the first page of the tab when clicked
    $('#applyTabs a[href="#divStartApp"]').click(function (e) { $('#divStartAppPage01').removeClass('hidden'); $('#divStartAppPage02').addClass('hidden'); });
    $('#applyTabs a[href="#aPersonalInfo"]').click(function (e) { $('#divPersonalInfoPage01').removeClass('hidden'); $('#divPersonalInfoPage02').addClass('hidden'); });

    $('.application-dependent').on('blur', function () {
        $.each(['txtDependent', 'txtCoapplicantDependent'], function (index, value) {
            formValues[value] = '';
            for (var i = 0; i < 6; i++) {
                if ($('#' + value + i.toString()).val().trim() > 0) {
                    formValues[value] += $('#' + value + i.toString()).val() + ' ';
                }
            }
            formValues[value] = formValues[value].trim();
        });

        formValues['txtDependent'] = formValues['txtDependent'].trim();
        formValues['txtCoapplicantDependent'] = formValues['txtCoapplicantDependent'].trim();
    });

    $('#chkDifferentMailingAddress').click(function () {
        if (this.checked) $('#divDifferentMailingAddress').removeClass('hidden');
        else $('#divDifferentMailingAddress').addClass('hidden')
    });
    $('#chkCoApplicantDifferentMailingAddress').click(function () {
        if (this.checked) $('#divCoApplicantDifferentMailingAddress').removeClass('hidden');
        else $('#divCoApplicantDifferentMailingAddress').addClass('hidden')
    });

    $('.application-asset-type').click(function () {
        var assetType = $(this)[0].id.substring(3);
        var div = $('#fs' + assetType);

        if (this.checked) {
            div.removeClass('hidden');
        }
        else {
            div.addClass('hidden');
            return;
        }

        switch (assetType) {
            case 'DepositAccounts':
                CreateDepositAccountControls(true);
                break;
            case 'RealEstate':
                CreateRealEstateControls();
                break;
            case 'Investments':
                CreateInvestmentAssetControls(true);
                break;
            case 'RetirementAccount':
            case 'Gift':
            case 'LifeInsurance':
            case 'borrowed':
            case 'other':
                // no dynamic controls
                break;
            default:
                console.log('switch fell through when assetType=' + assetType);
        }
    });

    $('.employment-type-borrower').click(function () {
        $('.employment-type-container-borrower').addClass('hidden');
        var rbVal = $("input[name='rblBorrowerEmployment']:checked").val().toLowerCase();
        switch (rbVal) {
            case "employment":
                $('#divBorrowerEmployment').removeClass('hidden');
                break;
            case "selfemployment":
                break;
            case "military":
                break;
            case "none":
                break;
            default:
                console.error(`Switch fell through when val = ${rbVal}`);
        }
    });

    Go(defaultStartPage);
    FillFormFields('frm' + defaultStartPage);
});



function ValidateAndGo(pageId) {
    switch (pageId) {
        case 'StartAppPage01':
            // no validation
            break;
        case 'StartAppPage02':
            if (!ValidateStartAppPage01()) return false;
            break;
        case 'PersonalInfoPage01':
            if (!ValidateStartAppPage02()) return false;
            break;
        case 'PersonalInfoPage02':
            if (!ValidatePersonalInfoPage01()) return false;
            break;
        case 'AssetInfo':
            if (!ValidatePersonalInfoPage02()) return false;
            break;
        case 'ExpensesInfo':
            if (!ValidateAssetInfo()) return false;
            break;
        case 'IncomeInfo':
            if (!ValidateExpensesInfo()) return false;
            break;
        case 'SubmitApp':
            if (!ValidateIncomeInfo()) return false;
            break;
        default:
            console.log(`switch fell through when pageId=${pageId}`);
            return false;
    }

    //console.log(`navigating to ${pageId}`);
    Go(pageId);
}

function Go(pageId) {

    switch (pageId) {
        case 'StartAppPage01':
            $('#aStartApp').tab('show');
            $('#divStartAppPage01').removeClass('hidden');
            $('#divStartAppPage02').addClass('hidden');
            window.scrollTo(0, 0);
            FillFormFields('frmStartAppPage01');
            break;
        case 'StartAppPage02':
            $('#aStartApp').tab('show');
            $('#divStartAppPage01').addClass('hidden');
            $('#divStartAppPage02').removeClass('hidden');
            window.scrollTo(0, 0);
            FillFormFields('frmStartAppPage02');
            break;
        case 'PersonalInfoPage01':
            $('#aPersonalInfo').tab('show');
            $('#divPersonalInfoPage01').removeClass('hidden');
            $('#divPersonalInfoPage02').addClass('hidden');
            if (typeof formValues['rbWhoIsApplying'] === 'undefined' || formValues['rbWhoIsApplying'] === 'Individual') $('#divCoApplicant').addClass('hidden'); else $('#divCoApplicant').removeClass('hidden');
            window.scrollTo(0, 0);
            FillFormFields('frmPersonalInfoPage01');
            break;
        case 'PersonalInfoPage02':
            $('#aPersonalInfo').tab('show');
            $('#divPersonalInfoPage01').addClass('hidden');
            $('#divPersonalInfoPage02').removeClass('hidden');
            if (typeof formValues['rbWhoIsApplying'] === 'undefined' || formValues['rbWhoIsApplying'] === 'Individual') $('#divCoApplicant').addClass('hidden'); else $('#fldCoApplicant').removeClass('hidden');
            window.scrollTo(0, 0);
            FillFormFields('frmPersonalInfoPage02');
            break;
        case 'AssetInfo':
            $('#aAssetInfo').tab('show');
            window.scrollTo(0, 0);
            FillFormFields('frmAssetInfo');
            break;
        case 'ExpensesInfo':
            $('#aExpensesInfo').tab('show');
            $('#fsExpense').removeClass('hidden');
            CreateExpenseControls();
            window.scrollTo(0, 0);
            FillFormFields('frmExpensesInfo');
            break;
        case 'IncomeInfo':
            $('#aIncomeInfo').tab('show');
            window.scrollTo(0, 0);
            FillFormFields('frmIncomeInfo');
            break;
		case 'SubmitApp':
			$('#aSubmitApp').tab('show');
			window.scrollTo(0, 0);
			FillFormFields('frmSubmitApp');
			break;
		}
    // $('#aPersonalInfo').tab('show');
    // $('#aPropertyInfo').tab('show');
    // $('#aLoanSelection').tab('show');
    // $('#aAssetInfo').tab('show');
    // $('#aExpensesInfo').tab('show');
    // $('#aIncomeInfo').tab('show');
    // $('#aSubmitApp').tab('show');

}

function AddInputEvents() {
    $('#txtStartAppDateOfBirth').off('change.datetimepicker').on('change.datetimepicker', function (ev) { formValues[$(this).attr('formkey')] = $(this).val(); });

    $('.radio-input, checkbox-input').off('click').click(function () {
        var c = $(this);
        formValues[c.attr('formkey')] = c.val();
    });

    $('.select-input').off('change').change(function () {
        formValues[$(this).attr('formkey')] = $(this).val();
    });

    $('.text-input').off('keyup blur').on('keyup blur', function () {
        formValues[$(this).attr('formkey')] = $(this).val();
    });

}


function CreateInvestmentAssetControls(createTitleRow) {
    if (typeof createTitleRow === 'undefined') createTitleRow = false;

    if (createTitleRow) {
        var titleRow = $('<div />')
            .addClass('row')
            .appendTo($('#fsInvestments'));
        $('<label />').addClass('')
            .text("Describe Investment")
            .appendTo(
                $('<div />').addClass('col-md-2')
                .appendTo(titleRow)
                );
        $('<label />').addClass('')
            .text("Net Value")
            .appendTo(
                $('<div />').addClass('col-md-2')
                .appendTo(titleRow)
                );
    }
    var topDiv = $('<div />', { id: 'divInvestmentAsset' + dynamicControlCounter.toString(), assetId: dynamicControlCounter.toString() })
        .addClass('row investment-asset')
        .appendTo($('#fsInvestments'));

    var nameDiv = $('<div />')
     .addClass('col-md-2 form-group')
     .appendTo(topDiv);
    $('<input />', { id: 'txtInvestmentAssetName' + dynamicControlCounter.toString(), name: 'txtInvestmentAssetName' + dynamicControlCounter.toString(), formkey: 'txtInvestmentAssetName' + dynamicControlCounter.toString() })
        .addClass('select-input form-control investments-control')
        .appendTo(nameDiv);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(nameDiv);

    var netValueDiv = $('<div />').addClass('col-md-2 form-group');
    $('<input />', { id: 'txtInvestmentAssetNetValue' + dynamicControlCounter.toString(), name: 'txtInvestmentAssetNetValue' + dynamicControlCounter.toString(), formkey: 'txtInvestmentAssetNetValue' + dynamicControlCounter.toString() })
        .addClass('select-input form-control investments-control')
        .appendTo(netValueDiv);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(netValueDiv);
    netValueDiv.appendTo(topDiv);

    var delDiv = $('<div />').addClass('col-md-1');
    $('<a />', { onclick: "$('#divInvestmentAsset" + dynamicControlCounter.toString() + "').remove();" })
        .addClass('btn btn-link')
        .text('delete')
        .appendTo(delDiv);
    delDiv.appendTo(topDiv);

    dynamicControlCounter++;
}

function CreateDepositAccountControls(createTitleRow) {
    if (typeof createTitleRow === 'undefined') createTitleRow = false;


    if (createTitleRow) {
        var titleRow = $('<div />').addClass('row').appendTo($('#fsDepositAccounts'));
        $('<label />').addClass('')
            .text("Institution Name")
            .appendTo(
                $('<div />').addClass('col-md-2')
                .appendTo(titleRow)
                );
        $('<label />').addClass('')
            .text("Type of Account")
            .appendTo(
                $('<div />').addClass('col-md-2')
                .appendTo(titleRow)
                );
        $('<label />').addClass('')
            .text("Balance")
            .appendTo(
                $('<div />').addClass('col-md-2')
                .appendTo(titleRow)
                );
    }
    var topDiv = $('<div />', { id: 'divDepositAccount' + dynamicControlCounter.toString(), assetId: dynamicControlCounter.toString() }).addClass('row liquid-asset');

    var nameDiv = $('<div />').addClass('col-md-2 form-group');
    $('<input />', { id: 'txtDepositAccountName' + dynamicControlCounter.toString(), name: 'txtDepositAccountName' + dynamicControlCounter.toString(), formkey: 'txtDepositAccountName' + dynamicControlCounter.toString() })
        .addClass('text-input form-control deposit-account-control')
        .appendTo(nameDiv);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(nameDiv);
    nameDiv.appendTo(topDiv);

    var typeDiv = $('<div />').addClass('col-md-2 form-group')
        .appendTo(topDiv);
    var typeCtl = $('<select />', { id: 'ddlDepositAccountAccountType' + dynamicControlCounter.toString(), name: 'ddlDepositAccountAccountType' + dynamicControlCounter.toString(), formkey: 'ddlDepositAccountAccountType' + dynamicControlCounter.toString() }).addClass('select-input form-control')
        .addClass('select-input form-control deposit-account-control');
    $('<option />', { value: "", selected: 'selected', text: 'Account Type' }).appendTo(typeCtl);
    $('<option />', { value: "checking", text: 'Checking' }).appendTo(typeCtl);
    $('<option />', { value: "savings", text: 'Savings' }).appendTo(typeCtl);
    typeCtl.appendTo(typeDiv);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Select one')
        .appendTo(typeDiv);

    var balDiv = $('<div />').addClass('col-md-2 form-group');
    $('<input />', { id: 'txtDepositAccountBalance' + dynamicControlCounter.toString(), name: 'txtDepositAccountBalance' + dynamicControlCounter.toString(), formkey: 'txtDepositAccountBalance' + dynamicControlCounter.toString() })
        .addClass('text-input form-control deposit-account-control')
        .appendTo(balDiv);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(balDiv);
    balDiv.appendTo(topDiv);

    var delDiv = $('<div />').addClass('col-md-1');
    $('<a />', { onclick: "$('#divDepositAccount" + dynamicControlCounter.toString() + "').remove();" })
        .addClass('btn btn-link')
        .text('delete')
        .appendTo(delDiv);
    delDiv.appendTo(topDiv);

    topDiv.appendTo($('#fsDepositAccounts'));
    AddInputEvents();
    dynamicControlCounter++;

}

function CreateExpenseControls() {
    var topDiv = $('<div />', { id: 'divExpense' + dynamicControlCounter.toString(), assetId: dynamicControlCounter.toString() })
        .addClass('')
        .appendTo($('#fsExpense'));


    var LenderDiv = $('<div />', { id: 'divLender' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .appendTo(topDiv);
    var LenderdivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(LenderDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("Lender")
        .appendTo(LenderdivLabel);

    var LenderInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(LenderDiv);
    $('<input />', { type: 'text', id: 'txtLender' + dynamicControlCounter.toString(), formkey: 'txtLender' + dynamicControlCounter.toString() })
        .addClass('text-input form-control expense-control')
        .appendTo(LenderInputRow);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(LenderInputRow);
    $('<a />', { onclick: "$('#divExpense" + dynamicControlCounter.toString() + "').remove();" })
        .addClass('btn btn-link')
        .text('delete')
        .appendTo(
            $('<div />')
                .addClass('col-md-1')
                .appendTo(LenderDiv)
        );

    var CityDiv = $('<div />', { id: 'divAccountNumber' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .appendTo(topDiv);
    var CitydivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(CityDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("Account Number")
        .appendTo(CitydivLabel);

    var CityInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(CityDiv);
    $('<input />', { type: 'text', id: 'txtAccountNumber' + dynamicControlCounter.toString(), formkey: 'txtAccountNumber' + dynamicControlCounter.toString() })
        .addClass('text-input form-control expense-control')
        .appendTo(CityInputRow);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(CityInputRow);

    var TypeDiv = $('<div />', { id: 'divExpenseType' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .appendTo(topDiv);
    var TypedivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(TypeDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("Expense Type")
        .appendTo(TypedivLabel);
    var TypeInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(TypeDiv);
    var ddl = $('<select />', { id: 'ddlExpenseType' + dynamicControlCounter.toString(), class: 'select-input form-control expense-control', formkey: 'ddlExpenseType' + dynamicControlCounter.toString() })
        .appendTo(TypeInputRow);
    var items = [['Select', ''], ['Loan', 'loan'], ['Lease', 'lease'], ['Credit Card', 'creditcard'], ['Due-in-Full Charge', 'dueinfull'], ['Other', 'other']];
    $.each(items, function (i, v) {
        if (v[1].toLowerCase() === '')
            $('<option />', { selected: 'selected', text: v[0], value: v[1] })
                .appendTo(ddl);
        else
            $('<option />', { text: v[0], value: v[1] })
                .appendTo(ddl);
    });
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Select one')
        .appendTo(TypeInputRow);

    var ApproximateBalanceDiv = $('<div />', { id: 'divExpenseApproximateBalance' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .appendTo(topDiv);
    var ApproximateBalancedivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(ApproximateBalanceDiv);
    $('<label />')
         .addClass('control-label application-textbox-label')
         .text("Approximate Balance")
         .appendTo(ApproximateBalancedivLabel);

    var ApproximateBalanceInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(ApproximateBalanceDiv);
    $('<input />', { type: 'text', id: 'txtExpenseApproximateBalance' + dynamicControlCounter.toString(), formkey: 'txtExpenseApproximateBalance' + dynamicControlCounter.toString() })
        .addClass('text-input form-control expense-control')
        .appendTo(ApproximateBalanceInputRow);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(ApproximateBalanceInputRow);

    var MortgagesDiv = $('<div />', { id: 'divPayingInFull' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .css('margin-bottom', '15px')
        .appendTo(topDiv);
    var MortgagesdivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(MortgagesDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("Paying in full with this loan?")
        .appendTo(MortgagesdivLabel);

    var MortgagesInputRow = $('<div />')
        .addClass('col-md-3')
        .css('border-bottom', 'solid 2px ' + layout_htmlColorHr)
        .css('padding-bottom', '15px')
        .appendTo(MortgagesDiv);

    var ddlMortgages = $('<select />', { id: 'ddlPayingInFull' + dynamicControlCounter, class: 'select-input form-control expense-control', formkey: 'ddlPayingInFull' + dynamicControlCounter })
        .appendTo(MortgagesInputRow);
    $('<option />', { selected: 'selected', text: 'Select', value: '' }).appendTo(ddlMortgages);
    $('<option />', { text: 'Yes', value: 'yes' }).appendTo(ddlMortgages);
    $('<option />', { text: 'No', value: 'no' }).appendTo(ddlMortgages);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Select One')
        .appendTo(MortgagesInputRow);

    AddInputEvents();
    dynamicControlCounter++;
}

function CreateIncomeControls(applicantType, employmentType, counterValue, employmentTypeContainerName) {
    //console.log(`CreateIncomeControls(${applicantType}, ${employmentType},  ${counterValue})`);
    $('#' + employmentTypeContainerName).remove();
    switch (employmentType.toLowerCase()) {
        case 'employment':
            CreateIncomeEmploymentControls(applicantType, counterValue);
            break;
        case 'self':
            CreateIncomeSelfEmploymentControls(applicantType, counterValue);
            break;
        case 'military':
            CreateIncomeMilitaryControls(applicantType, counterValue);
            break;
    }
}

function CreateIncomeEmploymentControls(applicantType, counterValue) {
    function GetId(prefix, description) { return prefix + 'Income' + applicantType.charAt(0).toUpperCase() + applicantType.toLowerCase().slice(1) + description + counterValue.toString(); }

    function CreateTimePeriodDropdown(id, selectedValue, additionalClasses) {
        if (typeof additionalClasses === 'undefined') additionalClasses = '';

        var ddl = $('<select />', { id: id, class: 'select-input form-control income-time-period-dropdown' + additionalClasses, formkey: id });
        var states = [['Time Period', ''], ['Annually', 'annually'], ['Monthly', 'monthly'], ['Weekly', 'weekly'], ['Biweekly', 'biweekly'], ['Bimonthly', 'bimonthly']];

        $.each(states, function (i, v) {
            if (selectedValue !== undefined && v[1] !== undefined && v[1].toLowerCase() === selectedValue.toLowerCase()) {
                formValues[id] = selectedValue;
                $('<option />', { selected: 'selected', text: v[0], value: v[1] }).appendTo(ddl);
            }
            else
                $('<option />', { text: v[0], value: v[1] }).appendTo(ddl);
        });

        return ddl;

    }


    var topDivName = 'divIncome' + applicantType.charAt(0).toUpperCase() + applicantType.toLowerCase().slice(1) + 'Controls' + counterValue;
    //console.log(`n = ${topDivName}`);
    var topDiv = $('<div />', { id: topDivName } ).appendTo('#fsBorrowerIncome');

    var divName = $('<div />', { id: GetId('div', 'Name'), class: 'row form-group' }).appendTo(topDiv);
    var divNameLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divName);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Employer Name' }).appendTo(divNameLabel);
    var divNameInput = $('<div />', { class: 'col-md-7' }).appendTo(divName);
    $('<input />', { type: 'text', id: GetId('txt', 'Name'), name: GetId('txt', 'Name'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Name') }).appendTo(divNameInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divNameInput);
    $('<a />', { onclick: "$('#' + topDivName).remove();" })
    $('<div />', { class: 'col-md-2' }).appendTo(divName)
        .addClass('btn btn-link')
        .text('delete')
        .click(function () { $('#' + topDivName).remove(); })
        ;


    var divPhone = $('<div />', { id: GetId('div', 'Phone'), class: 'row form-group' }).appendTo(topDiv);
    var divPhoneLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divPhone);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Phone' }).appendTo(divPhoneLabel);
    var divPhoneInput = $('<div />', { class: 'col-md-9' }).appendTo(divPhone);
    $('<input />', { type: 'text', id: GetId('txt', 'Phone'), name: GetId('txt', 'Phone'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Phone') }).appendTo(divPhoneInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divPhoneInput);

    var divAddress = $('<div />', { id: GetId('div', 'Address'), class: 'row form-group' }).appendTo(topDiv);
    var divAddressLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divAddress);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Address' }).appendTo(divAddressLabel);
    var divAddressInput = $('<div />', { class: 'col-md-9' }).appendTo(divAddress);
    $('<input />', { type: 'text', id: GetId('txt', 'Address'), name: GetId('txt', 'Address'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Address') }).appendTo(divAddressInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divAddressInput);

    var divCity = $('<div />', { id: GetId('div', 'City'), class: 'row form-group' }).appendTo(topDiv);
    var divCityLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divCity);
    $('<label />', { class: 'control-label application-textbox-label', text: 'City' }).appendTo(divCityLabel);
    var divCityInput = $('<div />', { class: 'col-md-9' }).appendTo(divCity);
    $('<input />', { type: 'text', id: GetId('txt', 'City'), name: GetId('txt', 'City'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'City') }).appendTo(divCityInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divCityInput);

    var divState = $('<div />', { id: GetId('div', 'State'), class: 'row form-group' }).appendTo(topDiv);
    var divStateLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divState);
    $('<label />', { class: 'control-label application-textbox-label', text: 'State' }).appendTo(divStateLabel);
    var divStateInput = $('<div />', { class: 'col-md-9' }).appendTo(divState);
    CreateStateDropdown(GetId('ddl', 'State'), 'fl', 'select-input form-control').appendTo(divStateInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divStateInput);

    var divZip = $('<div />', { id: GetId('div', 'Zip'), class: 'row form-group' }).appendTo(topDiv);
    var divZipLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divZip);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Zip' }).appendTo(divZipLabel);
    var divZipInput = $('<div />', { class: 'col-md-9' }).appendTo(divZip);
    $('<input />', { type: 'text', id: GetId('txt', 'Zip'), name: GetId('txt', 'Zip'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Zip') }).appendTo(divZipInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divZipInput);

    var divPosition = $('<div />', { id: GetId('div', 'Position'), class: 'row form-group' }).appendTo(topDiv);
    var divPositionLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divPosition);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Position/Title' }).appendTo(divPositionLabel);
    var divPositionInput = $('<div />', { class: 'col-md-9' }).appendTo(divPosition);
    $('<input />', { type: 'text', id: GetId('txt', 'Position'), name: GetId('txt', 'Position'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Position') }).appendTo(divPositionInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divPositionInput);

    var divLength = $('<div />', { id: GetId('div', 'Length'), class: 'row form-group' }).appendTo(topDiv);
    var divLengthLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divLength);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Employment Length' }).appendTo(divLengthLeft);

    var divLengthRight = $('<div />', { class: 'col-md-9' }).appendTo(divLength);
    var divLengthYearsInput = $('<div />', { class: 'col-md-1' }).appendTo(divLengthRight);
    $('<input />', { type: 'number', id: GetId('txt', 'YearsLength'), name: GetId('txt', 'YearsLength'), class: 'text-input form-control small-input income-required-control', formkey: GetId('txt', 'YearsLength') }).appendTo(divLengthYearsInput);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Years' }).appendTo(divLengthYearsInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divLengthYearsInput);

    var divLengthMonthsInput = $('<div />', { class: 'col-md-1 col-md-offset-1' }).appendTo(divLengthRight);
    $('<input />', { type: 'number', id: GetId('txt', 'MonthsLength'), name: GetId('txt', 'MonthsLength'), class: 'text-input form-control small-input income-required-control', formkey: GetId('txt', 'MonthsLength') }).appendTo(divLengthMonthsInput);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Months' }).appendTo(divLengthMonthsInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divLengthMonthsInput);


    var divYearsInPosition = $('<div />', { id: GetId('div', 'YearsInPosition'), class: 'row form-group' }).appendTo(topDiv);
    var divYearsInPositionLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divYearsInPosition);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Years in Profession' }).appendTo(divYearsInPositionLabel);
    var divYearsInPositionInput = $('<div />', { class: 'col-md-9' }).appendTo(divYearsInPosition);
    $('<input />', { type: 'number', id: GetId('txt', 'YearsInPosition'), name: GetId('txt', 'YearsInPosition'), class: 'text-input form-control small-input income-required-control', formkey: GetId('txt', 'YearsInPosition') }).appendTo(divYearsInPositionInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divYearsInPositionInput);

    var textBoxId = GetId('txt', 'BaseIncome');
    var divBaseIncome = $('<div />', { id: GetId('div', 'BaseIncome'), class: 'row form-group' }).appendTo(topDiv);
    var divBaseIncomeLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divBaseIncome);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Base Income' }).appendTo(divBaseIncomeLeft);
    var divBaseIncomeRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divBaseIncome);
    var divBaseIncomeValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divBaseIncomeRight);
    $('<input />', { type: 'number', id: textBoxId, name: GetId('txt', 'BaseIncome'), class: 'text-input form-control income-amount-control', formkey: GetId('txt', 'BaseIncome') }).appendTo(divBaseIncomeValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divBaseIncomeRight);
    var divBaseIncomePeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divBaseIncomeRight);
    CreateTimePeriodDropdown('ddl' + textBoxId).appendTo(divBaseIncomePeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divBaseIncomeRight);

    textBoxId = GetId('txt', 'Overtime');
    var divOvertime = $('<div />', { id: GetId('div', 'Overtime'), class: 'row form-group' }).appendTo(topDiv);
    var divOvertimeLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divOvertime);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Overtime' }).appendTo(divOvertimeLeft);
    var divOvertimeRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divOvertime);
    var divOvertimeValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divOvertimeRight);
    $('<input />', { type: 'number', id: textBoxId, name: GetId('txt', 'Overtime'), class: 'text-input form-control income-amount-control', formkey: GetId('txt', 'Overtime') }).appendTo(divOvertimeValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divOvertimeRight);
    var divOvertimePeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divOvertimeRight);
    CreateTimePeriodDropdown('ddl' + textBoxId).appendTo(divOvertimePeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divOvertimeRight);

    textBoxId = GetId('txt', 'Bonus');
    var divBonus = $('<div />', { id: GetId('div', 'Bonus'), class: 'row form-group' }).appendTo(topDiv);
    var divBonusLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divBonus);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Bonus' }).appendTo(divBonusLeft);
    var divBonusRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divBonus);
    var divBonusValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divBonusRight);
    $('<input />', { type: 'number', id: textBoxId, name: GetId('txt', 'Bonus'), class: 'text-input form-control income-amount-control', formkey: GetId('txt', 'Bonus') }).appendTo(divBonusValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divBonusRight);
    var divBonusPeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divBonusRight);
    CreateTimePeriodDropdown('ddl' + textBoxId).appendTo(divBonusPeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divBonusRight);

    textBoxId = GetId('txt', 'Commission');
    var divCommission = $('<div />', { id: GetId('div', 'Commission'), class: 'row form-group' }).appendTo(topDiv);
    var divCommissionLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divCommission);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Commission' }).appendTo(divCommissionLeft);
    var divCommissionRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divCommission);
    var divCommissionValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divCommissionRight);
    $('<input />', { type: 'number', id: textBoxId, name: GetId('txt', 'Commission'), class: 'text-input form-control income-amount-control', formkey: GetId('txt', 'Commission') }).appendTo(divCommissionValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divCommissionRight);
    var divCommissionPeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divCommissionRight);
    CreateTimePeriodDropdown('ddl' + textBoxId).appendTo(divCommissionPeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divCommissionRight);

    AddInputEvents();
    dynamicControlCounter++;
}

function CreateIncomeMilitaryControls(applicantType, counterValue) {
    function GetId(prefix, description) { return prefix + 'IncomeMilitary' + applicantType.charAt(0).toUpperCase() + applicantType.toLowerCase().slice(1) + description + counterValue.toString(); }

    function CreateMilitaryBranchDropdown(id, selectedValue, additionalClasses) {
        if (typeof additionalClasses === 'undefined') additionalClasses = '';
    
        var ddl = $('<select />', { id: id, class: 'select-input form-control ' + additionalClasses, formkey: id });
        var states = [ ['Select', ''], ['Air Force', 'airforce'], ['Army', 'army'], ['Marines', 'marines'], ['Navy', 'navy'], ];
    
        $.each(states, function(i, v) {
            if (selectedValue !== undefined && v[1] !== undefined && v[1].toLowerCase() === selectedValue.toLowerCase()) {
                formValues[id] = selectedValue;
                $('<option />', { selected: 'selected', text: v[0], value: v[1]}).appendTo(ddl);
            }
            else
            $('<option />', { text: v[0], value: v[1]}).appendTo(ddl);
        });
    
        return ddl;
    
    }
    function CreateTimePeriodDropdown(id, selectedValue, additionalClasses) {
        if (typeof additionalClasses === 'undefined') additionalClasses = '';
    
        var ddl = $('<select />', { id: id, class: 'select-input form-control ' + additionalClasses, formkey: id });
        var states = [ ['Time Period', ''], ['Annually', 'annually'], ['Monthly', 'monthly'], ['Weekly', 'weekly'], ['Biweekly', 'biweekly'], ['Bimonthly', 'bimonthly'] ];
    
        $.each(states, function(i, v) {
            if (selectedValue !== undefined && v[1] !== undefined && v[1].toLowerCase() === selectedValue.toLowerCase()) {
                formValues[id] = selectedValue;
                $('<option />', { selected: 'selected', text: v[0], value: v[1]}).appendTo(ddl);
            }
            else
            $('<option />', { text: v[0], value: v[1]}).appendTo(ddl);
        });
    
        return ddl;
    
    }
    
    var borrowerType = applicantType.charAt(0).toUpperCase() + applicantType.toLowerCase().slice(1);
    var n = 'divIncomeMilitary' + borrowerType + 'Controls' + counterValue;
    console.log(`n = ${n}`);
    var topDiv = $('<div />', { id: n}).appendTo($('#fs' + borrowerType + 'Income'));

    
    var divBranch = $('<div />', { id: GetId('div', 'Branch'), class: 'row form-group' }).appendTo(topDiv);
    var divBranchLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divBranch);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Branch' }).appendTo(divBranchLabel);
    var divBranchInput = $('<div />', { class: 'col-md-9' }).appendTo(divBranch);
    CreateMilitaryBranchDropdown(GetId('rb', 'Branch'), '').appendTo(divBranchInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divBranchInput);


    var divRank = $('<div />', { id: GetId('div', 'Rank'), class: 'row form-group' }).appendTo(topDiv);
    var divRankLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divRank);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Rank' }).appendTo(divRankLabel);
    var divRankInput = $('<div />', { class: 'col-md-9' }).appendTo(divRank);
    $('<input />', { type: 'text', id: GetId('txt', 'Rank'), Rank: GetId('txt', 'Rank'), class: 'text-input form-control', formkey: GetId('txt', 'Rank')}).appendTo(divRankInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divRankInput);

    var divPhone = $('<div />', { id: GetId('div', 'Phone'), class: 'row form-group' }).appendTo(topDiv);
    var divPhoneLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divPhone);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Phone' }).appendTo(divPhoneLabel);
    var divPhoneInput = $('<div />', { class: 'col-md-9' }).appendTo(divPhone);
    $('<input />', { type: 'text', id: GetId('txt', 'Phone'), name: GetId('txt', 'Phone'), class: 'text-input form-control', formkey: GetId('txt', 'Phone')}).appendTo(divPhoneInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divPhoneInput);


    var divLength = $('<div />', { id: GetId('div', 'Length'), class: 'row form-group' }).appendTo(topDiv);
    var divLengthLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divLength);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Employment Length' }).appendTo(divLengthLeft);
    
    var divLengthRight = $('<div />', { class: 'col-md-9' }).appendTo(divLength);
    var divLengthYearsInput = $('<div />', { class: 'col-md-1' }).appendTo(divLengthRight);
    $('<input />', { type: 'number', id: GetId('txt', 'YearsLength'), name: GetId('txt', 'YearsLength'), class: 'text-input form-control small-input', formkey: GetId('txt', 'YearsLength')}).appendTo(divLengthYearsInput);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Years' }).appendTo(divLengthYearsInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divLengthYearsInput);
   
    var divLengthMonthsInput = $('<div />', { class: 'col-md-1 col-md-offset-1' }).appendTo(divLengthRight);
    $('<input />', { type: 'number', id: GetId('txt', 'MonthsLength'), name: GetId('txt', 'MonthsLength'), class: 'text-input form-control small-input', formkey: GetId('txt', 'MonthsLength')}).appendTo(divLengthMonthsInput);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Months' }).appendTo(divLengthMonthsInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divLengthMonthsInput);



    
    var divMilitaryBasePay = $('<div />', { id: GetId('div', 'MilitaryBasePay'), class: 'row form-group' }).appendTo(topDiv);
    var divMilitaryBasePayLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divMilitaryBasePay);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Military Base Pay' }).appendTo(divMilitaryBasePayLeft);
    var divMilitaryBasePayRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divMilitaryBasePay);
    var divMilitaryBasePayValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divMilitaryBasePayRight);
    $('<input />', { type: 'number', id: GetId('txt', 'MilitaryBasePay'), name: GetId('txt', 'MilitaryBasePay'), class: 'text-input form-control', formkey: GetId('txt', 'MilitaryBasePay')}).appendTo(divMilitaryBasePayValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divMilitaryBasePayRight);
    var divMilitaryBasePayPeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divMilitaryBasePayRight);
    CreateTimePeriodDropdown(GetId('ddl', 'MilitaryBasePay')).appendTo(divMilitaryBasePayPeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divMilitaryBasePayRight);

    var divRationsAllowance = $('<div />', { id: GetId('div', 'RationsAllowance'), class: 'row form-group' }).appendTo(topDiv);
    var divRationsAllowanceLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divRationsAllowance);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Rations Allowance (BAS)' }).appendTo(divRationsAllowanceLeft);
    var divRationsAllowanceRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divRationsAllowance);
    var divRationsAllowanceValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divRationsAllowanceRight);
    $('<input />', { type: 'number', id: GetId('txt', 'RationsAllowance'), name: GetId('txt', 'RationsAllowance'), class: 'text-input form-control', formkey: GetId('txt', 'RationsAllowance')}).appendTo(divRationsAllowanceValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divRationsAllowanceRight);
    var divRationsAllowancePeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divRationsAllowanceRight);
    CreateTimePeriodDropdown(GetId('ddl', 'RationsAllowance')).appendTo(divRationsAllowancePeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divRationsAllowanceRight);

    var divFlightPay = $('<div />', { id: GetId('div', 'FlightPay'), class: 'row form-group' }).appendTo(topDiv);
    var divFlightPayLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divFlightPay);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Flight Pay' }).appendTo(divFlightPayLeft);
    var divFlightPayRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divFlightPay);
    var divFlightPayValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divFlightPayRight);
    $('<input />', { type: 'number', id: GetId('txt', 'FlightPay'), name: GetId('txt', 'FlightPay'), class: 'text-input form-control', formkey: GetId('txt', 'FlightPay')}).appendTo(divFlightPayValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divFlightPayRight);
    var divFlightPayPeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divFlightPayRight);
    CreateTimePeriodDropdown(GetId('ddl', 'FlightPay')).appendTo(divFlightPayPeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divFlightPayRight);

    var divHazardPay = $('<div />', { id: GetId('div', 'HazardPay'), class: 'row form-group' }).appendTo(topDiv);
    var divHazardPayLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divHazardPay);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Hazard Pay' }).appendTo(divHazardPayLeft);
    var divHazardPayRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divHazardPay);
    var divHazardPayValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divHazardPayRight);
    $('<input />', { type: 'number', id: GetId('txt', 'HazardPay'), name: GetId('txt', 'HazardPay'), class: 'text-input form-control', formkey: GetId('txt', 'HazardPay')}).appendTo(divHazardPayValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divHazardPayRight);
    var divHazardPayPeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divHazardPayRight);
    CreateTimePeriodDropdown(GetId('ddl', 'HazardPay')).appendTo(divHazardPayPeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divHazardPayRight);

    var divClothingAllowance = $('<div />', { id: GetId('div', 'ClothingAllowance'), class: 'row form-group' }).appendTo(topDiv);
    var divClothingAllowanceLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divClothingAllowance);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Clothing Allowance' }).appendTo(divClothingAllowanceLeft);
    var divClothingAllowanceRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divClothingAllowance);
    var divClothingAllowanceValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divClothingAllowanceRight);
    $('<input />', { type: 'number', id: GetId('txt', 'ClothingAllowance'), name: GetId('txt', 'ClothingAllowance'), class: 'text-input form-control', formkey: GetId('txt', 'ClothingAllowance')}).appendTo(divClothingAllowanceValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divClothingAllowanceRight);
    var divClothingAllowancePeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divClothingAllowanceRight);
    CreateTimePeriodDropdown(GetId('ddl', 'ClothingAllowance')).appendTo(divClothingAllowancePeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divClothingAllowanceRight);

    var divPropPay = $('<div />', { id: GetId('div', 'PropPay'), class: 'row form-group' }).appendTo(topDiv);
    var divPropPayLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divPropPay);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Flight Pay' }).appendTo(divPropPayLeft);
    var divPropPayRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divPropPay);
    var divPropPayValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divPropPayRight);
    $('<input />', { type: 'number', id: GetId('txt', 'PropPay'), name: GetId('txt', 'PropPay'), class: 'text-input form-control', formkey: GetId('txt', 'PropPay')}).appendTo(divPropPayValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divPropPayRight);
    var divPropPayPeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divPropPayRight);
    CreateTimePeriodDropdown(GetId('ddl', 'PropPay')).appendTo(divPropPayPeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divPropPayRight);

    var divOverseasPay = $('<div />', { id: GetId('div', 'OverseasPay'), class: 'row form-group' }).appendTo(topDiv);
    var divOverseasPayLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divOverseasPay);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Hazard Pay' }).appendTo(divOverseasPayLeft);
    var divOverseasPayRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divOverseasPay);
    var divOverseasPayValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divOverseasPayRight);
    $('<input />', { type: 'number', id: GetId('txt', 'OverseasPay'), name: GetId('txt', 'OverseasPay'), class: 'text-input form-control', formkey: GetId('txt', 'OverseasPay')}).appendTo(divOverseasPayValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divOverseasPayRight);
    var divOverseasPayPeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divOverseasPayRight);
    CreateTimePeriodDropdown(GetId('ddl', 'OverseasPay')).appendTo(divOverseasPayPeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divOverseasPayRight);

    var divCombatPay = $('<div />', { id: GetId('div', 'CombatPay'), class: 'row form-group' }).appendTo(topDiv);
    var divCombatPayLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divCombatPay);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Combat Pay' }).appendTo(divCombatPayLeft);
    var divCombatPayRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divCombatPay);
    var divCombatPayValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divCombatPayRight);
    $('<input />', { type: 'number', id: GetId('txt', 'CombatPay'), name: GetId('txt', 'CombatPay'), class: 'text-input form-control', formkey: GetId('txt', 'CombatPay')}).appendTo(divCombatPayValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divCombatPayRight);
    var divCombatPayPeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divCombatPayRight);
    CreateTimePeriodDropdown(GetId('ddl', 'CombatPay')).appendTo(divCombatPayPeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divCombatPayRight);

    var divHousingAllowance = $('<div />', { id: GetId('div', 'HousingAllowance'), class: 'row form-group' }).appendTo(topDiv);
    var divHousingAllowanceLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divHousingAllowance);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Housing Allowance (BAH)' }).appendTo(divHousingAllowanceLeft);
    var divHousingAllowanceRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divHousingAllowance);
    var divHousingAllowanceValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divHousingAllowanceRight);
    $('<input />', { type: 'number', id: GetId('txt', 'HousingAllowance'), name: GetId('txt', 'HousingAllowance'), class: 'text-input form-control', formkey: GetId('txt', 'HousingAllowance')}).appendTo(divHousingAllowanceValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divHousingAllowanceRight);
    var divHousingAllowancePeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divHousingAllowanceRight);
    CreateTimePeriodDropdown(GetId('ddl', 'HousingAllowance')).appendTo(divHousingAllowancePeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divHousingAllowanceRight);



}
function CreateIncomeSelfEmploymentControls(applicantType, counterValue) {
    function GetId(prefix, description) { return prefix + 'IncomeSelfEmployment' + applicantType.charAt(0).toUpperCase() + applicantType.toLowerCase().slice(1) + description + counterValue.toString(); }

    function CreateTimePeriodDropdown(id, selectedValue, additionalClasses, borrowerType) {
        if (typeof additionalClasses === 'undefined') additionalClasses = '';
    
        var ddl = $('<select />', { id: id, class: 'select-input form-control ' + additionalClasses, formkey: id });
        var states = [ ['Time Period', ''], ['Annually', 'annually'], ['Monthly', 'monthly'], ['Weekly', 'weekly'], ['Biweekly', 'biweekly'], ['Bimonthly', 'bimonthly'] ];
    
        $.each(states, function(i, v) {
            if (selectedValue !== undefined && v[1] !== undefined && v[1].toLowerCase() === selectedValue.toLowerCase()) {
                formValues[id] = selectedValue;
                $('<option />', { selected: 'selected', text: v[0], value: v[1]}).appendTo(ddl);
            }
            else
            $('<option />', { text: v[0], value: v[1]}).appendTo(ddl);
        });
    
        return ddl;
    }
    
    var borrowerType = applicantType.charAt(0).toUpperCase() + applicantType.toLowerCase().slice(1);
    var topDivName = 'divIncomeSelfEmployment' + borrowerType + 'Controls' + counterValue;
    var topDiv = $('<div />', { id: topDivName}).appendTo($('#fs' + borrowerType + 'Income'));
    
    var divName = $('<div />', { id: GetId('div', 'BusinessName'), class: 'row form-group' }).appendTo(topDiv);
    var divNameLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divName);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Business Name' }).appendTo(divNameLabel);
    var divNameInput = $('<div />', { class: 'col-md-7' }).appendTo(divName);
    $('<input />', { type: 'text', id: GetId('txt', 'BusinessName'), name: GetId('txt', 'BusinessName'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Name')}).appendTo(divNameInput);
	$('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divNameInput);
	$('<div />', { class: 'col-md-2' }).appendTo(divName)
		.addClass('btn btn-link text-left')
		.text('delete')
		.click(function () { $('#' + topDivName).remove(); });


    var divPhone = $('<div />', { id: GetId('div', 'Phone'), class: 'row form-group' }).appendTo(topDiv);
    var divPhoneLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divPhone);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Phone' }).appendTo(divPhoneLabel);
    var divPhoneInput = $('<div />', { class: 'col-md-9' }).appendTo(divPhone);
    $('<input />', { type: 'text', id: GetId('txt', 'Phone'), name: GetId('txt', 'Phone'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Phone')}).appendTo(divPhoneInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divPhoneInput);

    var divAddress = $('<div />', { id: GetId('div', 'Address'), class: 'row form-group' }).appendTo(topDiv);
    var divAddressLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divAddress);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Address' }).appendTo(divAddressLabel);
    var divAddressInput = $('<div />', { class: 'col-md-9' }).appendTo(divAddress);
    $('<input />', { type: 'text', id: GetId('txt', 'Address'), name: GetId('txt', 'Address'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Address')}).appendTo(divAddressInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divAddressInput);

    var divCity = $('<div />', { id: GetId('div', 'City'), class: 'row form-group' }).appendTo(topDiv);
    var divCityLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divCity);
    $('<label />', { class: 'control-label application-textbox-label', text: 'City' }).appendTo(divCityLabel);
    var divCityInput = $('<div />', { class: 'col-md-9' }).appendTo(divCity);
    $('<input />', { type: 'text', id: GetId('txt', 'City'), name: GetId('txt', 'City'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'City')}).appendTo(divCityInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divCityInput);

    var divState = $('<div />', { id: GetId('div', 'State'), class: 'row form-group' }).appendTo(topDiv);
    var divStateLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divState);
    $('<label />', { class: 'control-label application-textbox-label', text: 'State' }).appendTo(divStateLabel);
    var divStateInput = $('<div />', { class: 'col-md-9' }).appendTo(divState);
    CreateStateDropdown(GetId('ddl', 'State'), 'fl', 'select-input form-control').appendTo(divStateInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divStateInput);

    var divZip = $('<div />', { id: GetId('div', 'Zip'), class: 'row form-group' }).appendTo(topDiv);
    var divZipLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divZip);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Zip' }).appendTo(divZipLabel);
    var divZipInput = $('<div />', { class: 'col-md-9' }).appendTo(divZip);
    $('<input />', { type: 'text', id: GetId('txt', 'Zip'), name: GetId('txt', 'Zip'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Zip')}).appendTo(divZipInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divZipInput);

    var divPosition = $('<div />', { id: GetId('div', 'Position'), class: 'row form-group' }).appendTo(topDiv);
    var divPositionLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divPosition);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Position/Title' }).appendTo(divPositionLabel);
    var divPositionInput = $('<div />', { class: 'col-md-9' }).appendTo(divPosition);
    $('<input />', { type: 'text', id: GetId('txt', 'Position'), name: GetId('txt', 'Position'), class: 'text-input form-control income-required-control', formkey: GetId('txt', 'Position')}).appendTo(divPositionInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divPositionInput);

    var divLength = $('<div />', { id: GetId('div', 'Length'), class: 'row form-group' }).appendTo(topDiv);
    var divLengthLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divLength);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Employment Length' }).appendTo(divLengthLeft);
    
    var divLengthRight = $('<div />', { class: 'col-md-9' }).appendTo(divLength);
    var divLengthYearsInput = $('<div />', { class: 'col-md-1' }).appendTo(divLengthRight);
    $('<input />', { type: 'number', id: GetId('txt', 'YearsLength'), name: GetId('txt', 'YearsLength'), class: 'text-input form-control small-input income-required-control text-input-integer', formkey: GetId('txt', 'YearsLength')}).appendTo(divLengthYearsInput);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Years' }).appendTo(divLengthYearsInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divLengthYearsInput);
   
    var divLengthMonthsInput = $('<div />', { class: 'col-md-1 col-md-offset-1' }).appendTo(divLengthRight);
    $('<input />', { type: 'number', id: GetId('txt', 'MonthsLength'), name: GetId('txt', 'MonthsLength'), class: 'text-input form-control small-input income-required-control text-input-integer', formkey: GetId('txt', 'MonthsLength')}).appendTo(divLengthMonthsInput);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Months' }).appendTo(divLengthMonthsInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divLengthMonthsInput);


    var divYearsInPosition = $('<div />', { id: GetId('div', 'YearsInPosition'), class: 'row form-group' }).appendTo(topDiv);
    var divYearsInPositionLabel = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divYearsInPosition);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Years in Profession' }).appendTo(divYearsInPositionLabel);
    var divYearsInPositionInput = $('<div />', { class: 'col-md-9' }).appendTo(divYearsInPosition);
    $('<input />', { type: 'number', id: GetId('txt', 'YearsInPosition'), name: GetId('txt', 'YearsInPosition'), class: 'text-input form-control small-input income-required-control text-input-integer', formkey: GetId('txt', 'YearsInPosition')}).appendTo(divYearsInPositionInput);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divYearsInPositionInput);

    
    var divBaseIncome = $('<div />', { id: GetId('div', 'BaseIncome'), class: 'row form-group' }).appendTo(topDiv);
    var divBaseIncomeLeft = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divBaseIncome);
    $('<label />', { class: 'control-label application-textbox-label', text: 'Base Income' }).appendTo(divBaseIncomeLeft);
    var divBaseIncomeRight = $('<div />', { class: 'col-md-9 text-right' }).appendTo(divBaseIncome);
    var divBaseIncomeValue = $('<div />', { class: 'col-md-2 text-right' }).appendTo(divBaseIncomeRight);
    $('<input />', { type: 'number', id: GetId('txt', 'BaseIncome'), name: GetId('txt', 'BaseIncome'), class: 'text-input form-control', formkey: GetId('txt', 'BaseIncome')}).appendTo(divBaseIncomeValue);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divBaseIncomeRight);
    var divBaseIncomePeriod = $('<div />', { class: 'col-md-3 text-right' }).appendTo(divBaseIncomeRight);
    CreateTimePeriodDropdown(GetId('ddl', 'BaseIncome')).appendTo(divBaseIncomePeriod);
    $('<div />', { class: 'invalid-feedback hidden text-danger' }).text('Required').appendTo(divBaseIncomeRight);

}

function CreateIncomeTypeControls(applicantType) {
    var containerName = 'div' + applicantType.charAt(0).toUpperCase() + applicantType.toLowerCase().slice(1) + 'Income' + dynamicControlCounter;
    var container = $('<div />', { id: containerName }).appendTo('#fsBorrowerIncome');

    var divEmploymentEmploymentRow = $('<div />', { class: 'row' }).appendTo(container);
    var divEmploymentEmployment = $('<div />', { class: 'col-md-5 col-md-offset-3' }).appendTo(divEmploymentEmploymentRow);
    var lblEmploymentEmployment = $('<label />', { id: 'lbl' + applicantType + 'EmploymentEmployment' + dynamicControlCounter.toString(), class: 'radio-inline control-label', text: 'Employment', for: 'rad' + applicantType + 'EmploymentEmployment' + dynamicControlCounter.toString() }).appendTo(divEmploymentEmployment);
    $('<input />', { id: 'rad' + applicantType + 'EmploymentEmployment' + dynamicControlCounter.toString(), type: 'radio', name: applicantType + 'EmploymentType', formkey: 'rbl' + applicantType + 'Employment' + dynamicControlCounter.toString(), value: 'employment', class: 'radio-input radio employment-type employment-type-' + applicantType.toLowerCase() + ' employment-dynamic-radio' }).appendTo(lblEmploymentEmployment);

    var divEmploymentSelfRow = $('<div />', { class: 'row' }).appendTo(container);
    var divEmploymentSelf = $('<div />', { class: 'col-md-5 col-md-offset-3' }).appendTo(divEmploymentSelfRow);
    var lblEmploymentSelf = $('<label />', { id: 'lbl' + applicantType + 'EmploymentSelf' + dynamicControlCounter.toString(), class: 'radio-inline control-label', text: 'Self Employment', for: 'rad' + applicantType + 'EmploymentSelf' + dynamicControlCounter.toString() }).appendTo(divEmploymentSelf);
    $('<input />', { value: 'self', id: 'rad' + applicantType + 'EmploymentSelf' + dynamicControlCounter.toString(), type: 'radio', name: applicantType + 'EmploymentType', formkey: 'rbl' + applicantType + 'Employment' + dynamicControlCounter.toString(), class: 'radio-input radio employment-type employment-type-' + applicantType.toLowerCase() + ' employment-dynamic-radio' }).appendTo(lblEmploymentSelf);

    var divEmploymentMilitaryRow = $('<div />', { class: 'row' }).appendTo(container);
    var divEmploymentMilitary = $('<div />', { class: 'col-md-5 col-md-offset-3' }).appendTo(divEmploymentMilitaryRow);
    var lblEmploymentMilitary = $('<label />', { id: 'lbl' + applicantType + 'EmploymentMilitary' + dynamicControlCounter.toString(), class: 'radio-inline control-label', text: 'Active Duty Military', for: 'rad' + applicantType + 'EmploymentMilitary' + dynamicControlCounter.toString() }).appendTo(divEmploymentMilitary);
    $('<input />', { value: 'military', id: 'rad' + applicantType + 'EmploymentMilitary' + dynamicControlCounter.toString(), type: 'radio', name: applicantType + 'EmploymentType', formkey: 'rbl' + applicantType + 'Employment' + dynamicControlCounter.toString(), class: 'radio-input radio employment-type employment-type-' + applicantType.toLowerCase() + ' employment-dynamic-radio' }).appendTo(lblEmploymentMilitary);

    var divEmploymentNoneRow = $('<div />', { class: 'row' }).appendTo(container);
    var divEmploymentNone = $('<div />', { class: 'col-md-5 col-md-offset-3' }).appendTo(divEmploymentNoneRow);
    var lblEmploymentNone = $('<label />', { id: 'lbl' + applicantType + 'EmploymentNone', class: 'radio-inline control-label', text: 'I do not have employment income', for: 'rad' + applicantType + 'EmploymentNone' + dynamicControlCounter.toString() }).appendTo(divEmploymentNone);
    $('<input />', { value: 'self', id: 'rad' + applicantType + 'EmploymentNone' + dynamicControlCounter.toString(), type: 'radio', name: applicantType + 'EmploymentType', formkey: 'rbl' + applicantType + 'Employment' + dynamicControlCounter.toString(), class: 'radio-input radio employment-type employment-type-' + applicantType.toLowerCase() + ' employment-dynamic-radio' }).appendTo(lblEmploymentNone);

    $('<div />', { id: 'divIncome' + applicantType.charAt(0).toUpperCase() + applicantType.toLowerCase().slice(1) + 'Controls' + dynamicControlCounter.toString() }).appendTo(container);

    var counterValue = dynamicControlCounter;
    $('#rad' + applicantType + 'EmploymentEmployment' + dynamicControlCounter.toString()).click(function () { CreateIncomeControls(applicantType.toLowerCase(), 'employment', counterValue, containerName) });
    $('#rad' + applicantType + 'EmploymentSelf' + dynamicControlCounter.toString()).click(function () { CreateIncomeControls(applicantType.toLowerCase(), 'self', counterValue, containerName) });
    $('#rad' + applicantType + 'EmploymentMilitary' + dynamicControlCounter.toString()).click(function () { CreateIncomeControls(applicantType.toLowerCase(), 'military', counterValue, containerName) });
    $('#rad' + applicantType + 'EmploymentNone' + dynamicControlCounter.toString()).click(function () { CreateIncomeControls(applicantType.toLowerCase(), 'none', counterValue, containerName) });


    $('.employment-dynamic-radio').css({ marginTop: '-=3px' }); // radio buttons coming in one line down
    dynamicControlCounter++;
    return containerName;
}

function CreateRealEstateControls() {
    var topDiv = $('<div />', { id: 'divRealEstate' + dynamicControlCounter.toString(), assetId: dynamicControlCounter.toString() })
        .addClass('real-estate-asset')
        .appendTo($('#fsRealEstate'));

    var AddressDiv = $('<div />', { id: 'divRealEstateAddress' + dynamicControlCounter.toString() })
    .addClass('row form-group')
    .appendTo(topDiv);
    var AddressdivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(AddressDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("Address")
        .appendTo(AddressdivLabel);

    var AddressInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(AddressDiv);
    $('<input />', { type: 'text', id: 'txtRealEstateAddress' + dynamicControlCounter.toString(), formkey: 'txtRealEstateAddress' + dynamicControlCounter.toString() })
        .addClass('text-input form-control real-estate-control')
        .appendTo(AddressInputRow);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(AddressInputRow);
    $('<a />', { onclick: "$('#divRealEstate" + dynamicControlCounter.toString() + "').remove();" })
        .addClass('btn btn-link')
        .text('delete')
        .appendTo(
            $('<div />')
                .addClass('col-md-1')
                .appendTo(AddressDiv)
        );

    var CityDiv = $('<div />', { id: 'divRealEstateCity' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .appendTo(topDiv);
    var CitydivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(CityDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("City")
        .appendTo(CitydivLabel);

    var CityInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(CityDiv);
    $('<input />', { type: 'text', id: 'txtRealEstateCity' + dynamicControlCounter.toString(), formkey: 'txtRealEstateCity' + dynamicControlCounter.toString() })
        .addClass('text-input form-control real-estate-control')
        .appendTo(CityInputRow);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(CityInputRow);

    var StateDiv = $('<div />', { id: 'divRealEstateState' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .appendTo(topDiv);
    var StatedivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(StateDiv);

    var StateInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(StateDiv);
    CreateStateDropdown('ddlRealEstateState' + dynamicControlCounter.toString(), 'fl', 'real-estate-control')
        .appendTo(StateInputRow);
    FormData['ddlRealEstateState' + dynamicControlCounter.toString()] = 'fl';
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Select one')
        .appendTo(StateInputRow);

    var EstimatedValueDiv = $('<div />', { id: 'divRealEstateEstimatedValue' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .appendTo(topDiv);
    var EstimatedValuedivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(EstimatedValueDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("Estimated Value")
        .appendTo(EstimatedValuedivLabel);

    var EstimatedValueInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(EstimatedValueDiv);
    $('<input />', { type: 'text', id: 'txtRealEstateEstimatedValue' + dynamicControlCounter.toString(), formkey: 'txtRealEstateEstimatedValue' + dynamicControlCounter.toString() })
        .addClass('text-input form-control real-estate-control')
        .appendTo(EstimatedValueInputRow);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(EstimatedValueInputRow);

    var EstimatedProceedsDiv = $('<div />', { id: 'divRealEstateEstimatedProceeds' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .appendTo(topDiv);
    var EstimatedProceedsdivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(EstimatedProceedsDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("Estimated Proceeds from Sale")
        .appendTo(EstimatedProceedsdivLabel);

    var EstimatedProceedsInputRow = $('<div />')
        .addClass('col-md-3')
        .appendTo(EstimatedProceedsDiv);
    $('<input />', { type: 'text', id: 'txtRealEstateEstimatedProceeds' + dynamicControlCounter.toString(), formkey: 'txtRealEstateEstimatedProceeds' + dynamicControlCounter.toString() })
        .addClass('text-input form-control real-estate-control')
        .appendTo(EstimatedProceedsInputRow);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Required')
        .appendTo(EstimatedProceedsInputRow);

    var MortgagesDiv = $('<div />', { id: 'divRealEstateMortgages' + dynamicControlCounter.toString() })
        .addClass('row form-group')
        .css('margin-bottom', '15px')
        .appendTo(topDiv);
    var MortgagesdivLabel = $('<div />')
        .addClass('col-md-3 text-right')
        .appendTo(MortgagesDiv);
    $('<label />')
        .addClass('control-label application-textbox-label')
        .text("Do you have any mortgages on this property")
        .appendTo(MortgagesdivLabel);

    var MortgagesInputRow = $('<div />')
        .addClass('col-md-3')
        .css('border-bottom', 'solid 2px ' + layout_htmlColorHr)
        .css('padding-bottom', '15px')
        .appendTo(MortgagesDiv);

    var ddlMortgages = $('<select />', { id: 'ddlRealEstateMortgages' + dynamicControlCounter, class: 'select-input form-control real-estate-control', formkey: 'ddlRealEstateMortgages' + dynamicControlCounter })
        .appendTo(MortgagesInputRow);
    $('<option />', { selected: 'selected', text: 'Select', value: '' }).appendTo(ddlMortgages);
    $('<option />', { text: 'Yes', value: 'yes' }).appendTo(ddlMortgages);
    $('<option />', { text: 'No', value: 'no' }).appendTo(ddlMortgages);
    $('<div />')
        .addClass('invalid-feedback hidden text-danger')
        .text('Select One')
        .appendTo(MortgagesInputRow);

    AddInputEvents();
    dynamicControlCounter++;
}

function CreateStateDropdown(id, selectedValue, additionalClasses) {
    if (typeof additionalClasses === 'undefined') additionalClasses = '';

    var ddl = $('<select />', { id: id, class: 'select-input form-control ' + additionalClasses, formkey: id });
    var states = [['State', ''], ['Alabama', 'al'], ['Alaska', 'ak'], ['Arizona', 'az'], ['Arkansas', 'ar'], ['California', 'ca'], ['Colorado', 'co'], ['Connecticut', 'ct'], ['Delaware', 'de'], ['Florida', 'fl'], ['Georgia', 'ga'], ['Hawaii', 'hi'], ['Idaho', 'id'], ['Illinois', 'il'], ['Indiana', 'in'], ['Iowa', 'ia'], ['Kansas', 'ks'], ['Kentucky', 'ky'], ['Louisiana', 'la'], ['Maine', 'me'], ['Maryland', 'md'], ['Massachusetts', 'ma'], ['Michigan', 'mi'], ['Minnesota', 'mn'], ['Mississippi', 'ms'], ['Missouri', 'mo'], ['Montana', 'mt'], ['Nebraska', 'ne'], ['Nevada', 'nv'], ['New Hampshire', 'nh'], ['New Jersey', 'nj'], ['New Mexico', 'nm'], ['New York', 'ny'], ['North Carolina', 'nc'], ['North Dakota', 'nd'], ['Ohio', 'oh'], ['Oklahoma', 'ok'], ['Oregon', 'or'], ['Pennsylvania', 'pa'], ['Rhode Island', 'ri'], ['South Carolina', 'sc'], ['South Dakota', 'sd'], ['Tennessee', 'tn'], ['Texas', 'tx'], ['Utah', 'ut'], ['Vermont', 'vt'], ['Virginia', 'va'], ['Washington', 'wa'], ['West Virginia', 'wv'], ['Wisconsin', 'wi'], ['Wyoming', 'wy']];

    $.each(states, function (i, v) {
        if (v[1].toLowerCase() === selectedValue.toLowerCase()) {
            formValues[id] = selectedValue;
            $('<option />', { selected: 'selected', text: v[0], value: v[1] }).appendTo(ddl);
        }
        else
            $('<option />', { text: v[0], value: v[1] }).appendTo(ddl);
    });

    return ddl;

}

function FillFormFields(formName) {
    var filledFields = [];

    $('#' + formName + ' .form-control').each(function (i) {
        var ctrl = $(this);
        var name = ctrl.attr('name');

        if (filledFields.includes(name)) return true;
        filledFields.push(name);
        if (typeof formValues[name] === 'undefined') return true;

        switch (ctrl.attr('type')) {
            case 'date':
                ctrl[0].value = formValues[name];
                break;
            case 'radio':
                $('#' + formValues[name]).prop('checked', true);
                break;
            default: // text, email
                console.log(`name=${name}, type=${ctrl.attr('type')}`);
                ctrl.val(formValues[name]);
                break;
        }
    });
}

function ValidateAssetInfo() {

    $('#frmAssetInfo .form-group').removeClass('has-error');
    $('#frmAssetInfo .invalid-feedback').addClass('hidden');

    var isValid = true;
    if (typeof formValues['ddlOtherRealEstate'] === 'undefined' || formValues['ddlOtherRealEstate'].length === 0) { isValid = false; $('#divOtherRealEstate').addClass('has-error'); $('#divOtherRealEstate .invalid-feedback').removeClass('hidden'); }

    if ($('#chkDepositAccounts').prop('checked')) {
        $('.deposit-account-control').each(function (i, obj) {
            var controlId = obj.id
            if (typeof formValues[controlId] === 'undefined' || formValues[controlId].length === 0) { isValid = false; $('#' + controlId).closest('div').addClass('has-error'); $('#' + controlId).siblings('.invalid-feedback').removeClass('hidden'); }
        });
    }

    if ($('#chkRealEstate').prop('checked')) {
        $('.real-estate-control').each(function (i, obj) {
            var controlId = obj.id
            if (typeof formValues[controlId] === 'undefined' || formValues[controlId].length === 0) { isValid = false; $('#' + controlId).closest('div').addClass('has-error'); $('#' + controlId).siblings('.invalid-feedback').removeClass('hidden'); }
        });
    }

    if ($('#chkInvestments').prop('checked')) {
        $('.investments-control').each(function (i, obj) {
            var controlId = obj.id
            if (typeof formValues[controlId] === 'undefined' || formValues[controlId].length === 0) { isValid = false; $('#' + controlId).closest('div').addClass('has-error'); $('#' + controlId).siblings('.invalid-feedback').removeClass('hidden'); }
        });
    }

    if ($('#chkRetirementAccount').prop('checked')) {
        if (typeof formValues['txtRetirementAmount'] === 'undefined' || formValues['txtRetirementAmount'].length === 0) { isValid = false; $('#divRetirementAmount').addClass('has-error'); $('#divRetirementAmount .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['ddlRetirementRepay'] === 'undefined' || formValues['ddlRetirementRepay'].length === 0) { isValid = false; $('#divRetirementRepay').addClass('has-error'); $('#divRetirementRepay .invalid-feedback').removeClass('hidden'); }
    }

    if ($('#chkGift').prop('checked')) {
        if (typeof formValues['txtGiftAmount'] === 'undefined' || formValues['txtGiftAmount'].length === 0) { isValid = false; $('#divGiftAmount').addClass('has-error'); $('#divGiftAmount .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtGiftName'] === 'undefined' || formValues['txtGiftName'].length === 0) { isValid = false; $('#divGiftName').addClass('has-error'); $('#divGiftName .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtGiftAddress'] === 'undefined' || formValues['txtGiftAddress'].length === 0) { isValid = false; $('#divGiftAddress').addClass('has-error'); $('#divGiftAddress .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtGiftCity'] === 'undefined' || formValues['txtGiftCity'].length === 0) { isValid = false; $('#divGiftCity').addClass('has-error'); $('#divGiftCity .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['ddlGiftState'] === 'undefined' || formValues['ddlGiftState'].length === 0) { isValid = false; $('#divGiftState').addClass('has-error'); $('#divGiftState .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtGiftZip'] === 'undefined' || formValues['txtGiftZip'].length === 0) { isValid = false; $('#divGiftZip').addClass('has-error'); $('#divGiftZip .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtGiftPhone'] === 'undefined' || formValues['txtGiftPhone'].length === 0) { isValid = false; $('#divGiftPhone').addClass('has-error'); $('#divGiftPhone .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtGiftRelationship'] === 'undefined' || formValues['txtGiftRelationship'].length === 0) { isValid = false; $('#divGiftRelationship').addClass('has-error'); $('#divGiftRelationship .invalid-feedback').removeClass('hidden'); }
    }

    if ($('#chkLifeInsurance').prop('checked')) {
        if (typeof formValues['txtLifeInsuranceAmount'] === 'undefined' || formValues['txtLifeInsuranceAmount'].length === 0) { isValid = false; $('#divLifeInsuranceAmount').addClass('has-error'); $('#divLifeInsuranceAmount .invalid-feedback').removeClass('hidden'); }
    }

    if ($('#chkBorrowed').prop('checked')) {
        if (typeof formValues['txtBorrowedAmount'] === 'undefined' || formValues['txtBorrowedAmount'].length === 0) { isValid = false; $('#divBorrowedAmount').addClass('has-error'); $('#divBorrowedAmount .invalid-feedback').removeClass('hidden'); }
    }

    if ($('#chkOther').prop('checked')) {
        if (typeof formValues['txtStocksBondsAmount'] === 'undefined' || formValues['txtStocksBondsAmount'].length === 0) { isValid = false; $('#divStocksBondsAmount').addClass('has-error'); $('#divStocksBondsAmount .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtRetirementAccountsAmount'] === 'undefined' || formValues['txtRetirementAccountsAmount'].length === 0) { isValid = false; $('#divRetirementAccountsAmount').addClass('has-error'); $('#divRetirementAccountsAmount .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtOtherNonRealEstateAmount'] === 'undefined' || formValues['txtOtherNonRealEstateAmount'].length === 0) { isValid = false; $('#divOtherNonRealEstateAmount').addClass('has-error'); $('#divOtherNonRealEstateAmount .invalid-feedback').removeClass('hidden'); }
    }

    return isValid;
}

function ValidateExpensesInfo() {
    var isValid = true;

    $('#frmExpensesInfo div').removeClass('has-error');
    $('#frmExpensesInfo .invalid-feedback').addClass('hidden');

    $('.expense-control').each(function (i, obj) {
        var controlId = obj.id
        if (typeof formValues[controlId] === 'undefined' || formValues[controlId].length === 0) { isValid = false; $('#' + controlId).closest('div').addClass('has-error'); $('#' + controlId).siblings('.invalid-feedback').removeClass('hidden'); }
    });

    return isValid;
}
function ValidateIncomeInfo() {
    var isValid = true;

    $('#frmIncomeInfo div').removeClass('has-error');
    $('#frmIncomeInfo .invalid-feedback').addClass('hidden');

    $('.income-required-control').each(function (i, obj) {
        var controlId = obj.id
        if (typeof formValues[controlId] === 'undefined' || formValues[controlId].length === 0) {
            isValid = false;
            $('#' + controlId).closest('div').addClass('has-error'); $('#' + controlId).siblings('.invalid-feedback').removeClass('hidden');
		}
		if ($('#' + controlId).hasClass('text-input-integer'))
    });

    $('.income-amount-control').each (function(i, obj) {
        var textId = obj.id;
        var ddlId = 'ddl' + textId;
        console.log(`Looking at ${textId}. formValues[${textId}] = ${formValues[textId]}`);
        if (typeof formValues[textId] !== 'undefined' && formValues[textId].length > 0
            && (typeof formValues[ddlId] === 'undefined' || formValues[ddlId].length === 0)
        ) {
            $('#' + ddlId).closest('div').addClass('has-error'); 
            $('#' + ddlId).siblings('.invalid-feedback').removeClass('hidden');
        }
        if ((typeof formValues[textId] === 'undefined' || formValues[textId].length === 0)
            && typeof formValues[ddlId] !== 'undefined' && formValues[ddlId].length > 0
        ) {
            $('#' + textId).closest('div').addClass('has-error'); 
            $('#' + textId).siblings('.invalid-feedback').removeClass('hidden');
        }
    });
    return isValid;
}

function ValidatePersonalInfoPage01() {
    var isValid = true;
    var isCoApplicant = typeof formValues['rbWhoIsApplying'] != 'undefined' && formValues['rbWhoIsApplying'] !== 'Individually';
    $('#frmPersonalInfoPage01 div').removeClass('has-error');
    $('#frmPersonalInfoPage01 .invalid-feedback').addClass('hidden');

    if (typeof formValues['txtSocialSecurity'] === 'undefined' || formValues['txtSocialSecurity'].length === 0) { isValid = false; $('#divSocialSecurity').addClass('has-error'); $('#divSocialSecurity .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtFirstName'] === 'undefined' || formValues['txtFirstName'].length === 0) { isValid = false; $('#divFirstName').addClass('has-error'); $('#divFirstName .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtMiddleName'] === 'undefined' || formValues['txtMiddleName'].length === 0) { isValid = false; $('#divMiddleName').addClass('has-error'); $('#divMiddleName .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtLastName'] === 'undefined' || formValues['txtLastName'].length === 0) { isValid = false; $('#divLastName').addClass('has-error'); $('#divLastName .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['ddlNameSuffix'] === 'undefined' || formValues['ddlNameSuffix'].length === 0) { isValid = false; $('#divNameSuffix').addClass('has-error'); $('#divNameSuffix .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['ddlMaritalStatus'] === 'undefined' || formValues['ddlMaritalStatus'].length === 0) { isValid = false; $('#divMaritalStatus').addClass('has-error'); $('#divMaritalStatus .invalid-feedback').removeClass('hidden'); }

    if (isCoApplicant && (typeof formValues['txtCoapplicantSocialSecurity'] === 'undefined' || formValues['txtCoapplicantSocialSecurity'].length === 0)) { isValid = false; $('#divCoapplicantSocialSecurity').addClass('has-error'); $('#divCoapplicantSocialSecurity .invalid-feedback').removeClass('hidden'); }
    if (isCoApplicant && (typeof formValues['txtCoapplicantFirstName'] === 'undefined' || formValues['txtCoapplicantFirstName'].length === 0)) { isValid = false; $('#divCoapplicantFirstName').addClass('has-error'); $('#divCoapplicantFirstName .invalid-feedback').removeClass('hidden'); }
    if (isCoApplicant && (typeof formValues['txtCoapplicantMiddleName'] === 'undefined' || formValues['txtCoapplicantMiddleName'].length === 0)) { isValid = false; $('#divCoapplicantMiddleName').addClass('has-error'); $('#divCoapplicantMiddleName .invalid-feedback').removeClass('hidden'); }
    if (isCoApplicant && (typeof formValues['txtCoapplicantLastName'] === 'undefined' || formValues['txtCoapplicantLastName'].length === 0)) { isValid = false; $('#divCoapplicantLastName').addClass('has-error'); $('#divCoapplicantLastName .invalid-feedback').removeClass('hidden'); }
    if (isCoApplicant && (typeof formValues['ddlCoapplicantNameSuffix'] === 'undefined' || formValues['ddlCoapplicantNameSuffix'].length === 0)) { isValid = false; $('#divCoapplicantNameSuffix').addClass('has-error'); $('#divCoapplicantNameSuffix .invalid-feedback').removeClass('hidden'); }
    if (isCoApplicant && (typeof formValues['ddlCoapplicantMaritalStatus'] === 'undefined' || formValues['ddlCoapplicantMaritalStatus'].length === 0)) { isValid = false; $('#divCoapplicantMaritalStatus').addClass('has-error'); $('#divCoapplicantMaritalStatus .invalid-feedback').removeClass('hidden'); }



    return isValid;
}

function ValidatePersonalInfoPage02() {
    var isValid = true;
    var isCoApplicant = typeof formValues['rbWhoIsApplying'] != 'undefined' && formValues['rbWhoIsApplying'] !== 'Individually';
    $('#frmPersonalInfoPage02 div').removeClass('has-error');
    $('#frmPersonalInfoPage02 .invalid-feedback').addClass('hidden');


    if (typeof formValues['txtResidenceStreet'] === 'undefined' || formValues['txtResidenceStreet'].length === 0) { isValid = false; $('#divResidenceStreet').addClass('has-error'); $('#divResidenceStreet .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtResidenceCity'] === 'undefined' || formValues['txtResidenceCity'].length === 0) { isValid = false; $('#divResidenceCity').addClass('has-error'); $('#divResidenceCity .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtResidenceCountry'] === 'undefined' || formValues['txtResidenceCountry'].length === 0) { isValid = false; $('#divResidenceCountry').addClass('has-error'); $('#divResidenceCountry .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['ddlResidenceState'] === 'undefined' || formValues['ddlResidenceState'].length === 0) { isValid = false; $('#divResidenceState').addClass('has-error'); $('#divResidenceState .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtResidenceZipCode'] === 'undefined' || formValues['txtResidenceZipCode'].length === 0) { isValid = false; $('#divResidenceZipCode').addClass('has-error'); $('#divResidenceZipCode .invalid-feedback').removeClass('hidden'); }
    if ($('#chkDifferentMailingAddress').checked) {
        if (typeof formValues['txtMailingStreet'] === 'undefined' || formValues['txtMailingStreet'].length === 0) { isValid = false; $('#divMailingStreet').addClass('has-error'); $('#divMailingStreet .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtMailingCity'] === 'undefined' || formValues['txtMailingCity'].length === 0) { isValid = false; $('#divMailingCity').addClass('has-error'); $('#divMailingCity .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['ddlMailingState'] === 'undefined' || formValues['ddlMailingState'].length === 0) { isValid = false; $('#divMailingState').addClass('has-error'); $('#divMailingState .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtMailingZipCode'] === 'undefined' || formValues['txtMailingZipCode'].length === 0) { isValid = false; $('#divMailingZipCode').addClass('has-error'); $('#divMailingZipCode .invalid-feedback').removeClass('hidden'); }
    }
    if (typeof formValues['txtPrimaryPhone'] === 'undefined' || formValues['txtPrimaryPhone'].length === 0) { isValid = false; $('#divPrimaryPhone').addClass('has-error'); $('#divPrimaryPhone .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtSecondaryPhone'] === 'undefined' || formValues['txtSecondaryPhone'].length === 0) { isValid = false; $('#divSecondaryPhone').addClass('has-error'); $('#divSecondaryPhone .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['rbOwnershipStatus'] === 'undefined' || formValues['rbOwnershipStatus'].length === 0) { isValid = false; $('#divOwnershipStatus').addClass('has-error'); $('#divOwnershipStatus .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtYearsAtAddress'] === 'undefined' || formValues['txtYearsAtAddress'].length === 0) { isValid = false; $('#divYearsAtAddress').addClass('has-error'); $('#divYearsAtAddress .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtMonthsAtAddress'] === 'undefined' || formValues['txtMonthsAtAddress'].length === 0) { isValid = false; $('#divMonthsAtAddress').addClass('has-error'); $('#divMonthsAtAddress .invalid-feedback').removeClass('hidden'); }

    if (isCoApplicant) {
        if (typeof formValues['txtCoApplicantResidenceStreet'] === 'undefined' || formValues['txtCoApplicantResidenceStreet'].length === 0) { isValid = false; $('#divCoApplicantResidenceStreet').addClass('has-error'); $('#divCoApplicantResidenceStreet .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtCoApplicantResidenceCity'] === 'undefined' || formValues['txtCoApplicantResidenceCity'].length === 0) { isValid = false; $('#divCoApplicantResidenceCity').addClass('has-error'); $('#divCoApplicantResidenceCity .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtCoApplicantResidenceCountry'] === 'undefined' || formValues['txtCoApplicantResidenceCountry'].length === 0) { isValid = false; $('#divCoApplicantResidenceCountry').addClass('has-error'); $('#divCoApplicantResidenceCountry .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['ddlCoApplicantResidenceState'] === 'undefined' || formValues['ddlCoApplicantResidenceState'].length === 0) { isValid = false; $('#divCoApplicantResidenceState').addClass('has-error'); $('#divCoApplicantResidenceState .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtCoApplicantResidenceZipCode'] === 'undefined' || formValues['txtCoApplicantResidenceZipCode'].length === 0) { isValid = false; $('#divCoApplicantResidenceZipCode').addClass('has-error'); $('#divCoApplicantResidenceZipCode .invalid-feedback').removeClass('hidden'); }
        if ($('#chkCoApplicantDifferentMailingAddress').checked) {
            if (typeof formValues['txtCoApplicantMailingStreet'] === 'undefined' || formValues['txtCoApplicantMailingStreet'].length === 0) { isValid = false; $('#divCoApplicantMailingStreet').addClass('has-error'); $('#divCoApplicantMailingStreet .invalid-feedback').removeClass('hidden'); }
            if (typeof formValues['txtCoApplicantMailingCity'] === 'undefined' || formValues['txtCoApplicantMailingCity'].length === 0) { isValid = false; $('#divCoApplicantMailingCity').addClass('has-error'); $('#divCoApplicantMailingCity .invalid-feedback').removeClass('hidden'); }
            if (typeof formValues['ddlCoApplicantMailingState'] === 'undefined' || formValues['ddlCoApplicantMailingState'].length === 0) { isValid = false; $('#divCoApplicantMailingState').addClass('has-error'); $('#divCoApplicantMailingState .invalid-feedback').removeClass('hidden'); }
            if (typeof formValues['txtCoApplicantMailingZipCode'] === 'undefined' || formValues['txtCoApplicantMailingZipCode'].length === 0) { isValid = false; $('#divCoApplicantMailingZipCode').addClass('has-error'); $('#divCoApplicantMailingZipCode .invalid-feedback').removeClass('hidden'); }
        }
        if (typeof formValues['txtCoApplicantPrimaryPhone'] === 'undefined' || formValues['txtCoApplicantPrimaryPhone'].length === 0) { isValid = false; $('#divCoApplicantPrimaryPhone').addClass('has-error'); $('#divCoApplicantPrimaryPhone .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtCoApplicantSecondaryPhone'] === 'undefined' || formValues['txtCoApplicantSecondaryPhone'].length === 0) { isValid = false; $('#divCoApplicantSecondaryPhone').addClass('has-error'); $('#divCoApplicantSecondaryPhone .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['rbCoApplicantOwnershipStatus'] === 'undefined' || formValues['rbCoApplicantOwnershipStatus'].length === 0) { isValid = false; $('#divCoApplicantOwnershipStatus').addClass('has-error'); $('#divCoApplicantOwnershipStatus .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtCoApplicantYearsAtAddress'] === 'undefined' || formValues['txtCoApplicantYearsAtAddress'].length === 0) { isValid = false; $('#divCoApplicantYearsAtAddress').addClass('has-error'); $('#divCoApplicantYearsAtAddress .invalid-feedback').removeClass('hidden'); }
        if (typeof formValues['txtCoApplicantMonthsAtAddress'] === 'undefined' || formValues['txtCoApplicantMonthsAtAddress'].length === 0) { isValid = false; $('#divCoApplicantMonthsAtAddress').addClass('has-error'); $('#divCoApplicantMonthsAtAddress .invalid-feedback').removeClass('hidden'); }
    }

    return isValid;
}

function ValidateStartAppPage01() {
    var isValid = true;
    $('#frmStartAppPage01 :input, div').removeClass('has-error');
    $('.email-inv-feedback').addClass('hidden');

    // keep these three together in this order
    if (typeof formValues['txtStartAppEmailAddress'] === 'undefined' || formValues['txtStartAppEmailAddress'].length === 0) { isValid = false; $('#divStartAppEmailAddress').addClass('has-error'); $('#divStartAppEmailAddress .invalid-feedback').removeClass('hidden'); $('#divEmailAddressRequired').removeClass('hidden'); }
    if (typeof formValues['txtStartAppConfirmEmailAddress'] === 'undefined' || formValues['txtStartAppConfirmEmailAddress'].length === 0) { isValid = false; $('#divStartAppConfirmEmailAddress').addClass('has-error'); $('#divStartAppConfirmEmailAddress .invalid-feedback').removeClass('hidden'); $('#divConfirmEmailAddressRequired').removeClass('hidden'); }
    if (isValid && $('#txtStartAppEmailAddress').val() != $('#txtStartAppConfirmEmailAddress').val()) { isValid = false; $('#divStartAppEmailAddress, #divStartAppConfirmEmailAddress').addClass('has-error'); $('.email-addresses-dont-match').removeClass('hidden'); }

    if (typeof formValues['txtStartAppDateOfBirth'] === 'undefined' || formValues['txtStartAppDateOfBirth'].length === 0) { isValid = false; $('#divStartAppDateOfBirth').addClass('has-error'); $('#txtStartAppDateOfBirth + .invalid-feedback').removeClass('hidden'); };
    if (typeof formValues['rbLoanType'] === 'undefined' || formValues['rbLoanType'].length === 0) { isValid = false; $('#divLoanType').addClass('has-error'); $('#divLoanType .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['rbWhoIsApplying'] === 'undefined' || formValues['rbWhoIsApplying'].length === 0) { isValid = false; $('#divWhoIsApplying').addClass('has-error'); $('#divWhoIsApplying .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['rbPropertyUse'] === 'undefined' || formValues['rbPropertyUse'].length === 0) { isValid = false; $('#divPropertyUse').addClass('has-error'); $('#divPropertyUse .invalid-feedback').removeClass('hidden'); }

    return isValid;
}

function ValidateStartAppPage02() {
    var isValid = true;
    $('.form-group').removeClass('has-error');
    $('.invalid-feedback').addClass('hidden');

    if (typeof formValues['ddlStartAppState'] === 'undefined' || formValues['ddlStartAppState'].length === 0) { isValid = false; $('#divStartAppState').addClass('has-error'); $('#divStartAppState .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['ddlStartAppCounty'] === 'undefined' || formValues['ddlStartAppCounty'].length === 0) { isValid = false; $('#divStartAppCounty').addClass('has-error'); $('#divStartAppCounty .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtPurchasePrice'] === 'undefined' || formValues['txtPurchasePrice'].length === 0) { isValid = false; $('#divStartAppPurchasePrice').addClass('has-error'); $('#divStartAppPurchasePrice .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtLoanAmount'] === 'undefined' || formValues['txtLoanAmount'].length === 0) { isValid = false; $('#divStartAppLoanAmount').addClass('has-error'); $('#divStartAppLoanAmount .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['txtEstimatedClosingDate'] === 'undefined' || formValues['txtEstimatedClosingDate'].length === 0) { isValid = false; $('#divStartAppEstimatedClosingDate').addClass('has-error'); $('#divStartAppEstimatedClosingDate .invalid-feedback').removeClass('hidden'); }

    if (typeof formValues['ddlPropertyType'] === 'undefined' || formValues['ddlPropertyType'].length === 0) { isValid = false; $('#divStartAppPropertyType').addClass('has-error'); $('#divStartAppPropertyType .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['ddlLotSize'] === 'undefined' || formValues['ddlLotSize'].length === 0) { isValid = false; $('#divStartAppLotSize').addClass('has-error'); $('#divStartAppLotSize .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['ddlBuildingType'] === 'undefined' || formValues['ddlBuildingType'].length === 0) { isValid = false; $('#divStartAppBuildingType').addClass('has-error'); $('#divStartAppBuildingType .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['ddlPropertyStatus'] === 'undefined' || formValues['ddlPropertyStatus'].length === 0) { isValid = false; $('#divStartAppPropertyStatus').addClass('has-error'); $('#divStartAppPropertyStatus .invalid-feedback').removeClass('hidden'); }
    if (typeof formValues['ddlAdditionalLoan'] === 'undefined' || formValues['ddlAdditionalLoan'].length === 0) { isValid = false; $('#divStartAppAdditionalLoan').addClass('has-error'); $('#divStartAppAdditionalLoan .invalid-feedback').removeClass('hidden'); }

    return isValid;
}

