'use strict'

var wizardStep = 0;
var REFINANCE_PROPERTYTYPE = wizardStep++;
var REFINANCE_PROPERTYUSE = wizardStep++;
var REFINANCE_CREDIT = wizardStep++;
var REFINANCE_MILITARYSERVICE = wizardStep++;
var REFINANCE_YOURNEEDS = wizardStep++;
var REFINANCE_ABOUTYOURSELF = wizardStep++;
var REFINANCE_PROPERTYZIP = wizardStep++;
var REFINANCE_CONTACTINFO = wizardStep++;

wizardStep = 0;
var PURCHASE_PROPERTYTYPE = wizardStep++;
var PURCHASE_PROPERTYUSE = wizardStep++;
var PURCHASE_CREDITHISTORY = wizardStep++;
var PURCHASE_FOUNDAHOME = wizardStep++;
var PURCHASE_DOWNPAYMENT = wizardStep++;
var PURCHASE_MILITARYSERVICE = wizardStep++;
var PURCHASE_BUYWITHIN = wizardStep++;
var PURCHASE_ABOUTYOURSELF = wizardStep++;
var PURCHASE_PROPERTYZIP = wizardStep++;
var PURCHASE_CONTACTINFORMATION = wizardStep++;

wizardStep = 0;
var EQUITY_PROPERTYTYPE = wizardStep++;
var EQUITY_PROPERTYUSE = wizardStep++;
var EQUITY_CREDITHISTORY = wizardStep++;
var EQUITY_MILITARYSERVICE = wizardStep++;
var EQUITY_ABOUTYOURSELF = wizardStep++;
var EQUITY_PROPERTYZIP = wizardStep++;
var EQUITY_CONTACTINFORMATION = wizardStep++;


var frmRefinance = $('#frmHomeRefinance');
var frmHomePurchase = $('#frmHomePurchase');
var frmHomeEquity = $('#frmHomeEquity');

var formValues = {};

function SaveWizard() {
    $.post(
        '/HomePurchase/SaveWizard',
        {
            loan_type: formValues['loan-type'],
            property_type: formValues['property-type'],
            property_use: formValues['property-use'],
            credit_history: formValues['credit-history'],
            military_service: formValues['military-service'],
            loan_purpose: formValues['loan-purpose'],
            property_value: formValues['property-value'],
            mortgage_balance_one: formValues['mortgage-balance-one'],
            mortgage_rate_one: formValues['mortgage-rate-one'],
            mortgage_balance_two: formValues['mortgage-balance-two'],
            mortgage_rate_two: formValues['mortgage-rate-two'],
            late_payments: formValues['late-payments'],
            household_income: formValues['household-income'],
            foreclosure: formValues['foreclosure'],
            employment_status: formValues['employment-status'],
            fha_loan: formValues['fha-loan'],
            monthly_payments: formValues['monthly-payments'],
            bankruptcy: formValues['bankruptcy'],
            property_address: formValues['property-address'],
            property_zip: formValues['property-zip'],
            property_city: formValues['property-city'],
            property_state: formValues['property-state'],
            contact_time: formValues['contact-time'],
            first_name: formValues['first-name'],
            last_name: formValues['last-name'],
            email_address: formValues['email-address'],
            phone: formValues['phone'],
            lead_type: formValues['lead-type'],
            lead_date: moment().format('YYYY-MM-DD HH:mm'),
            alt_phone: formValues['alt-phone'],
            purchase_year: formValues['purchase-year'],
        },
        function (data) {
            var url = '/HomePurchase/Complete/' + (data == true ? 1 : 0).toString();
            document.location.href = url;
        }
    )};


$(function () {


    frmRefinance.steps({
        headerTag: 'h3',
        bodyTag: 'section',
        transitionEffect: 'slideLeft',

        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; } // Always allow previous action even if the current form is not valid!

            switch (currentIndex) {
                case REFINANCE_PROPERTYTYPE:
                    return (typeof formValues['property-type'] !== 'undefined' && formValues['property-type'].length > 0);
                case REFINANCE_PROPERTYUSE:
                    return (typeof formValues['property-use'] !== 'undefined' && formValues['property-use'].length > 0);
                case REFINANCE_CREDIT:
                    return (typeof formValues['credit-history'] !== 'undefined' && formValues['credit-history'].length > 0);
                case REFINANCE_MILITARYSERVICE:
                    return (typeof formValues['military-service'] !== 'undefined' && formValues['military-service'].length > 0);
                case REFINANCE_YOURNEEDS:
                    var isValid = true;
                    var secondMortgage = $('#RefinanceShowMtg2LoanType').val() === 'yes';

                    if (typeof formValues['loan-purpose'] === 'undefined' || formValues['loan-purpose'].length == 0) {
                        $('#RefinanceLoanPurpose ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['property-value'] === 'undefined' || formValues['property-value'].length == 0) {
                        $('#RefinancePropertyValue ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['mortgage-balance-one'] === 'undefined' || formValues['mortgage-balance-one'].length == 0) {
                        $('#RefinanceFirstBalance ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['mortgage-rate-one'] === 'undefined' || formValues['mortgage-rate-one'].length == 0) {
                        $('#RefinanceFirstRate ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if ($('#RefinanceShowMtg2LoanType').val().length > 3) {
                        $('#RefinanceShowmtg2loantype ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['mortgage-balance-two'] === 'undefined' || formValues['mortgage-balance-two'].length == 0) {
                        $('#RefinanceSecondBalance ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['mortgage-rate-two'] === 'undefined' || formValues['mortgage-rate-two'].length == 0) {
                        $('#RefinanceSecondRate ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }

                    return isValid;
                case REFINANCE_ABOUTYOURSELF:
                    var isValid = true;

                    if (typeof formValues['late-payments'] === 'undefined' || formValues['late-payments'].length == 0) {
                        $('#RefinanceLatePayments ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['foreclosure'] === 'undefined' || formValues['foreclosure'].length == 0) {
                        $('#RefinanceForeclosure ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['fha-loan'] === 'undefined' || formValues['fha-loan'].length == 0) {
                        $('#RefinanceFhaLoan ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['bankruptcy'] === 'undefined' || formValues['bankruptcy'].length == 0) {
                        $('#RefinanceBankruptcy ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['household-income'] === 'undefined' || formValues['household-income'].length == 0) {
                        $('#RefinanceHouseholdIncome ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['employment-status'] === 'undefined' || formValues['employment-status'].length == 0) {
                        $('#RefinanceEmploymentStatus ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['monthly-payments'] === 'undefined' || formValues['monthly-payments'].length == 0) {
                        $('#RefinanceMonthlyPayments ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }


                    return isValid;
                case REFINANCE_PROPERTYZIP:
                    return true;
                default:
                    console.warn(`Case fell through when currentIndex = ${currentIndex}`);
                    return false;
            }
        },

        onStepChanged: function (event, currentIndex, priorIndex) {
        },
        onFinishing: function (event, currentIndex) {
            var isValid = true;

            if (typeof formValues['contact-time'] === 'undefined' || formValues['contact-time'].length == 0) {
                $('#RefinanceContactTime').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['first-name'] === 'undefined' || formValues['first-name'].length == 0) {
                $('#RefinanceFirstName').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['last-name'] === 'undefined' || formValues['last-name'].length == 0) {
                $('#RefinanceLastName').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['email-address'] === 'undefined' || formValues['email-address'].length == 0) {
                $('#RefinanceEmailAddress').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['phone'] === 'undefined' || formValues['phone'].length == 0) {
                $('#RefinancePhone').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            return isValid;
        },
        onFinished: function (event, currentIndex) {
            SaveWizard();
        },
    });

    frmHomePurchase.steps({
        headerTag: 'h3',
        bodyTag: 'section',
        transitionEffect: 'slideLeft',
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; } // Always allow previous action even if the current form is not valid!

            var isValid = true;
            switch (currentIndex) {
                case PURCHASE_PROPERTYTYPE:
                    return (typeof formValues['property-type'] !== 'undefined' && formValues['property-type'].length > 0);
                case PURCHASE_PROPERTYUSE:
                    return (typeof formValues['property-use'] !== 'undefined' && formValues['property-use'].length > 0);
                case PURCHASE_CREDITHISTORY:
                    return (typeof formValues['credit-history'] !== 'undefined' && formValues['credit-history'].length > 0);
                case PURCHASE_FOUNDAHOME:
                    isValid = true;
                    if (typeof formValues['found-a-home'] === 'undefined' || formValues['found-a-home'].length == 0) {
                        $('#ddlPurchasePurchasePrice').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['purchase-price'] === 'undefined' || formValues['purchase-price'].length == 0) {
                        $('#ddlPurchasePurchasePrice').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    return isValid;
                case PURCHASE_DOWNPAYMENT:
                    return (typeof formValues['downpayment'] !== 'undefined' && formValues['downpayment'].length > 0);
                case PURCHASE_MILITARYSERVICE:
                    return (typeof formValues['military-service'] !== 'undefined' && formValues['military-service'].length > 0);
                case PURCHASE_BUYWITHIN:
                    return (typeof formValues['buy-within'] !== 'undefined' && formValues['buy-within'].length > 0);
                case PURCHASE_ABOUTYOURSELF:
                    isValid = true;
                    if (typeof formValues['first-time'] === 'undefined' || formValues['first-time'].length == 0) {
                        $('#ddlPurchaseFirstTime').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['bankruptcy'] === 'undefined' || formValues['bankruptcy'].length == 0) {
                        $('#ddlPurchaseBankruptcy').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['employment-status'] === 'undefined' || formValues['employment-status'].length == 0) {
                        $('#ddlPurchaseEmployment').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['household-income'] === 'undefined' || formValues['household-income'].length == 0) {
                        $('#ddlPurchaseIncome').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['monthly-payments'] === 'undefined' || formValues['monthly-payments'].length == 0) {
                        $('#ddlPurchaseMonthlyPayments').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    return isValid;
                case PURCHASE_PROPERTYZIP:
                    return true;
                case PURCHASE_CONTACTINFORMATION:
                default:
                    console.warn(`Case fell through when currentIndex = ${currentIndex}`);
                    return false;
            }
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
        },
        onFinishing: function (event, currentIndex) {
            var isValid = true;
            if (typeof formValues['contact-time'] === 'undefined' || formValues['contact-time'].length == 0) {
                $('#ddlPurchaseContactTime').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['first-name'] === 'undefined' || formValues['first-name'].length == 0) {
                $('#txtPurchaseFirstName').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['last-name'] === 'undefined' || formValues['last-name'].length == 0) {
                $('#txtPurchaseLastName').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['email-address'] === 'undefined' || formValues['email-address'].length == 0) {
                $('#txtPurchaseEmail').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['phone'] === 'undefined' || formValues['phone'].length == 0) {
                $('#txtPurchasePhone').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            return isValid;
        },
        onFinished: function (event, currentIndex) {
            SaveWizard();
        },
    });

    frmHomeEquity.steps({
        headerTag: 'h3',
        bodyTag: 'section',
        transitionEffect: 'slideLeft',
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; } // Always allow previous action even if the current form is not valid!

            var isValid = true;
            switch (currentIndex) {
                case EQUITY_PROPERTYTYPE:
                    return (typeof formValues['property-type'] !== 'undefined' && formValues['property-type'].length > 0);
                case EQUITY_PROPERTYUSE:
                    return (typeof formValues['property-use'] !== 'undefined' && formValues['property-use'].length > 0);
                case EQUITY_CREDITHISTORY:
                    return (typeof formValues['credit-history'] !== 'undefined' && formValues['credit-history'].length > 0);
                case EQUITY_MILITARYSERVICE:
                    return (typeof formValues['military-service'] !== 'undefined' && formValues['military-service'].length > 0);
                case EQUITY_ABOUTYOURSELF:
                    isValid = true;
                    var isSecondMortgage = $('#ddlEquityMortgageRateTwo').val() === 'yes';
                    if (typeof formValues['type-of-loan'] === 'undefined' || formValues['type-of-loan'].length == 0) {
                        $('#ddlEquityTypeOfLoan ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['loan-purpose'] === 'undefined' || formValues['loan-purpose'].length == 0) {
                        $('#ddlEquityLoanPurpose ').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['purchase-year'] === 'undefined' || formValues['purchase-year'].length == 0) {
                        $('#txtEquityPurchaseYear').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['property-value'] === 'undefined' || formValues['property-value'].length == 0) {
                        $('#ddlEquityPropertyValue').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['mortgage-balance-one'] === 'undefined' || formValues['mortgage-balance-one'].length == 0) {
                        $('#ddlEquityMortgageBalanceOne').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (isSecondMortgage && (typeof formValues['mortgage-balance-two'] === 'undefined' || formValues['mortgage-balance-two'].length == 0)) {
                        $('#ddlEquityMortgageBalanceTwo').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (typeof formValues['mortgage-rate-one'] === 'undefined' || formValues['mortgage-rate-one'].length == 0) {
                        $('#ddlEquityMortgageRateOne').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if ($('#ddlEquityShowMtg2LoanType').val() == '') {
                        $('#ddlEquityShowMtg2LoanType').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    if (isSecondMortgage && (typeof formValues['mortgage-rate-two'] === 'undefined' || formValues['mortgage-rate-two'].length == 0)) {
                        $('#ddlEquityMortgageRateTwo').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                        isValid = false;
                    }
                    return isValid;
                case EQUITY_PROPERTYZIP:
                    return true;
                case EQUITY_CONTACTINFORMATION:
                default:
                    console.warn(`Case fell through when currentIndex = ${currentIndex}`);
                    return false;
            }
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
        },
        onFinishing: function (event, currentIndex) {
            var isValid = true;
            if (typeof formValues['contact-time'] === 'undefined' || formValues['contact-time'].length == 0) {
                $('#ddlEquityContactTime').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['first-name'] === 'undefined' || formValues['first-name'].length == 0) {
                $('#txtEquityFirstName').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['last-name'] === 'undefined' || formValues['last-name'].length == 0) {
                $('#txtEquityLastName').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['email-address'] === 'undefined' || formValues['email-address'].length == 0) {
                $('#txtEquityEmail').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            if (typeof formValues['phone'] === 'undefined' || formValues['phone'].length == 0) {
                $('#txtEquityPhone').css('background-color', ESM_BACKGROUND_VALIDATION_COLOR);
                isValid = false;
            }
            return isValid;
        },
        onFinished: function (event, currentIndex) {
            SaveWizard();
        },
    });


    // display the right wizard when a loan type is selected
    $('.loan-type').click(function () {
        ImageClicked(this.id, this.id, 'loan-type');
        switch(this.id) {
            case 'homerefinance':
                $('#frmHomeRefinance').show();
                formValues['lead-type'] = 'Wizard: Home Refinance';
                PopulateHomePriceDropdown($('#RefinancePropertyValue'), 3, 150);
                PopulateHomePriceDropdown($('#RefinanceFirstBalance'), 3, 150);
                PopulateMortgageRateDropdown($('#RefinanceFirstRate'), 2.25, 11);
                PopulateHomePriceDropdown($('#RefinanceSecondBalance'), 1, 150);
                PopulateMortgageRateDropdown($('#RefinanceSecondRate'), 2.25, 11);
                break;
            case 'homepurchase':
                $('#frmHomePurchase').show();
                formValues['lead-type'] = 'Wizard: Home Purchase';
                PopulateHomePriceDropdown($('#ddlPurchasePurchasePrice'), 7, 150);
                break;
            case 'homeequity':
                $('#frmHomeEquity').show()
                formValues['lead-type'] = 'Wizard: Home Equity';
                PopulateHomePriceDropdown($('#ddlEquityPropertyValue'), 7, 150);
                PopulateHomePriceDropdown($('#ddlEquityMortgageBalanceOne'), 3, 150);
                PopulateMortgageRateDropdown($('#ddlEquityMortgageRateOne'), 2.25, 11);
                PopulateHomePriceDropdown($('#ddlEquityMortgageBalanceTwo'), 1, 150);
                PopulateMortgageRateDropdown($('#ddlEquityMortgageRateTwo'), 2.25, 11);
                break;
        }

        $('#divLoanType').hide();
    });

    $('.show-mortgage-two').change(function() {
        $('.divSecondMortgage').toggle($(this).val() === 'yes');
    });

    $('.property-type').click(function () {
        ImageClicked(this.id, this.id, 'property-type');
    });
    $('.property-use').click(function () {
        ImageClicked(this.id, this.id, 'property-use');
    });
    $('.credit-history').click(function () {
        ImageClicked(this.id, this.id, 'credit-history');
    });
    $('.military-service').click(function () {
        ImageClicked(this.id, this.id, 'military-service');
    });
    $('.purchase-price').click(function () {
        ImageClicked(this.id, this.id, 'purchase-price');
    });

    $('.down-payment').click(function () {
        ImageClicked(this.id, this.id, 'down-payment');
    });

    $('.buy-within').click(function () {
        ImageClicked(this.id, this.id, 'buy-within');
    });

    $('.image-click').click(function () {
        ImageClickedNew($(this));
    });

    $('.select-input').change(function () {
        $(this).css('background-color', '');
        formValues[$(this).attr('formkey')] = $(this).val();
    });

    $('.text-input').keyup(function () {
        $(this).css('background-color', '');
        formValues[$(this).attr('formkey')] = $(this).val();
    });

    //function DropdownChanged(controlId) {
    //    alert('moved to select-input.change')
    //    //formValues[controlId] = $('#' + controlId).val();
    //}

    function ImageClickedNew(obj) {
        obj.removeClass('appbox-active');
        obj.addClass('appbox-active');
        formValues[obj.attr('formkey')] = obj.attr('formvalue');
    }

    function ImageClicked(clickedId, value, groupClass) {

        if ($(this).attr('formkey') != undefined) {
            $(this).removeClass('appbox-active');
            $(this).addClass('appbox-active');
            formValues[$(this).attr('formkey')] = $(this).attr('formvalue');
        }
        else {
            $('.' + groupClass).removeClass('appbox-active');
            $("input:hidden[class='" + groupClass + "']").first().val(value);
            $('#' + clickedId).addClass('appbox-active');
            formValues[groupClass] = value;
        }
    }
    
    $('.property-zip').keyup(function () {
        var zip = this.value;
        $.ajax({
            type: 'GET',
            url: '//loanzify.com/api/zip/get/' + zip + '/',
            dataType: 'jsonp',
            success: function (json) {
                if (!json.data.city || !json.data.state) return; // ignore if null

                $('.property-city')
                    .val(json.data.city)
                    .show();
                formValues['property-city'] = json.data.city;
                $('.property-state')
                    .val(json.data.state_prefix)
                    .show();
                formValues['property-state'] = json.data.state;
                $('.property-zip-title').html('Property Address');
                $('.property-address').show();
            }
        });

    });

    var loanTypes = ['homerefinance', 'homepurchase', 'homeequity'];
    if (loanTypes.indexOf(hpw_action.toLowerCase()) > -1) {
        $('#' + hpw_action).click();
    } else {
        $('#divLoanType').show();
    }

});