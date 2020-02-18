'use strict'

var wizardStep = 0;
var APPLY_BORROWER = wizardStep++;
var APPLY_COBORROWER = wizardStep++;
var APPLY_PROPERTY = wizardStep++;
var APPLY_FINANCIAL = wizardStep++;
var APPLY_DISCLOSURES = wizardStep++;
var APPLY_FINISH = wizardStep++;

wizardStep = 0;
var APPLY_BORROWER_BORROWERINFO = wizardStep++;
var APPLY_BORROWER_ADDRESS = wizardStep++;
var APPLY_BORROWER_EMPLOYMENT = wizardStep++;
var APPLY_BORROWER_INCOME = wizardStep++;

var formValues = {};

$(function() {
    $('#divApplyNow').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        transitionEffect: 'slideLeft',

        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; } // Always allow previous action even if the current form is not valid!
            switch (currentIndex) {
                case APPLY_BORROWER:
                    return true; //(typeof formValues['borrower'] !== 'undefined' && formValues['borrower'].length > 0);
                case APPLY_COBORROWER:
                    return true; //(typeof formValues['coborrower'] !== 'undefined' && formValues['coborrower'].length > 0);
                case APPLY_PROPERTY:
                    return true; //(typeof formValues['property'] !== 'undefined' && formValues['property'].length > 0);
                case APPLY_FINANCIAL:
                    return true; //(typeof formValues['financial'] !== 'undefined' && formValues['financial'].length > 0);
                case APPLY_DISCLOSURES:
                    return true; //(typeof formValues['disclosures'] !== 'undefined' && formValues['disclosures'].length > 0);
                case APPLY_FINISH:
                    return true; //(typeof formValues['finish'] !== 'undefined' && formValues['finish'].length > 0);
            }

            console.warn('onStepChanging fell through');
            return false;
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            return true;
        },
        onFinishing: function (event, currentIndex) {
            var isValid = true;

            return isValid;
        },
        onFinished: function (event, currentIndex) {
            var isValid = true;

            return isValid;
        }
    });        

    $('#divApplyBorrower').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        stepsOrientation: 'vertical',
        transitionEffect: 'slideLeft',

        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; } // Always allow previous action even if the current form is not valid!
            switch (currentIndex) {
                case APPLY_BORROWER_BORROWERINFO:
                    return true; //(typeof formValues['borrower'] !== 'undefined' && formValues['borrower'].length > 0);
                case APPLY_BORROWER_ADDRESS:
                    return true; //(typeof formValues['coborrower'] !== 'undefined' && formValues['coborrower'].length > 0);
                case APPLY_BORROWER_EMPLOYMENT:
                    return true; //(typeof formValues['property'] !== 'undefined' && formValues['property'].length > 0);
                case APPLY_BORROWER_INCOME:
                    return true; //(typeof formValues['financial'] !== 'undefined' && formValues['financial'].length > 0);
            }

            console.warn('onStepChanging fell through');
            return false;
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            return true;
        },
        onFinishing: function (event, currentIndex) {
            var isValid = true;

            return isValid;
        },
        onFinished: function (event, currentIndex) {
            var isValid = true;

            return isValid;
        }
    });


    $('.image-click').click(function () {
        var obj = $(this);
        obj.removeClass('appbox-active');
        obj.addClass('appbox-active');
        formValues[obj.attr('formkey')] = obj.attr('formvalue');
    });

    $('.select-input').change(function () {
        var obj = $(this);
        obj.css('background-color', '');
        formValues[obj.attr('formkey')] = obj.val();
    });

    $('.text-input').keyup(function () {
        var obj = $(this);
        obj.css('background-color', '');
        formValues[obj.attr('formkey')] = obj.val();
    });

    $('#cbCoBorrower').change(function() {
        $('#divCoBorrowerWizard').toggle();
    });
});
