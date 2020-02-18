using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasySpeedyMortgages.Classes;

namespace EasySpeedyMortgages.Models.DataModels
{
    public class ShortApplicationDataModel
    {

        private EasySpeedyMortgagesEntities _db;

        public ShortApplicationDataModel()
        {
            _db = new EasySpeedyMortgages.EasySpeedyMortgagesEntities();
        }

        public List<ShortApplication> Get()
        {
            return (from r in _db.ShortApplications select r)
                    .ToList();
        }

        public DatabaseOperationResult SaveWizardData(WizardData wizardData)
        {
            var o = new ShortApplication()
            {
                additional_cash = wizardData.additional_cash,
                household_income = wizardData.household_income,
                bankruptcy = wizardData.bankruptcy,
                contact_time = wizardData.contact_time,
                credit_history = wizardData.credit_history,
                email_address = wizardData.email_address,
                employment_status = wizardData.employment_status,
                fha_loan = wizardData.fha_loan,
                first_name = wizardData.first_name,
                foreclosure = wizardData.foreclosure,
                phone = wizardData.phone,
                last_name = wizardData.last_name,
                late_payments = wizardData.late_payments,
                lead_date = wizardData.lead_date,
                lead_type = wizardData.lead_type,
                loan_purpose = wizardData.loan_purpose,
                loan_type = wizardData.loan_type,
                military_service = wizardData.military_service,
                monthly_payments = wizardData.monthly_payments,
                mortgage_balance_one = wizardData.mortgage_balance_one,
                mortgage_balance_two = wizardData.mortgage_balance_two,
                mortgage_rate_one = wizardData.mortgage_rate_one,
                mortgage_rate_two = wizardData.mortgage_rate_two,
                property_address = wizardData.property_address,
                property_city = wizardData.property_city,
                property_state = wizardData.property_state,
                property_type = wizardData.property_type,
                property_use = wizardData.property_use,
                property_value = wizardData.property_value,
                property_zip = wizardData.property_zip,
                alt_phone = wizardData.alt_phone,
                purchase_year = wizardData.purchase_year,
            };

            _db.ShortApplications.Add(o);
            var result = _db.SaveChanges();

            if (result == 1)
            {
                return new DatabaseOperationResult()
                {
                    IsSuccessful = true,
                    ResultId = o.id,
                };
            }

            return new DatabaseOperationResult() { IsSuccessful = false };
        }
    }
}