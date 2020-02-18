using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasySpeedyMortgages.Classes
{
    public class WizardData
    {
        public string additional_cash { get; set; }
        public string household_income { get; set; }
        public string bankruptcy { get; set; }
        public string contact_time { get; set; }
        public string credit_history { get; set; }
        public string email_address { get; set; }
        public string employment_status { get; set; }
        public string fha_loan { get; set; }
        public string first_name { get; set; }
        public string foreclosure { get; set; }
        public string phone { get; set; }
        public string id { get; set; }
        public string last_name { get; set; }
        public string late_payments { get; set; }
        public string lead_date { get; set; }
        public string lead_type { get; set; }
        public string loan_purpose { get; set; }
        public string loan_type { get; set; }
        public string military_service { get; set; }
        public string monthly_payments { get; set; }
        public string mortgage_balance_one { get; set; }
        public string mortgage_balance_two { get; set; }
        public string mortgage_rate_one { get; set; }
        public string mortgage_rate_two { get; set; }
        public string property_address { get; set; }
        public string property_city { get; set; }
        public string property_state { get; set; }
        public string property_type { get; set; }
        public string property_use { get; set; }
        public string property_value { get; set; }
        public string property_zip { get; set; }
        public string purchase_year { get; set; }
        public string site_owner_id { get; set; }
        /// <summary>
        /// From where was the data in this object collected?
        /// </summary>
        public string source_of_information { get; set; }
        public string alt_phone { get; set; }
    }
}