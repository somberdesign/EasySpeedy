using EasySpeedyMortgages;
using EasySpeedyMortgages.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasySpeedyMortgages.Models.DataModels
{

    public class LoanOfficerDataModel
    {
        private EasySpeedyMortgagesEntities _db;

        public LoanOfficerDataModel()
        {
            _db = new EasySpeedyMortgages.EasySpeedyMortgagesEntities();
            _db.Configuration.LazyLoadingEnabled = false;
            _db.Configuration.AutoDetectChangesEnabled = false;
        }

        public List<LoanOfficer> GetLoanOfficers(string officerKey = "")
        {

            var loanOfficers = _db.GetOfficer(officerKey)
                .Where(o => o.is_visible == true)
                .ToList();

            var list =
                loanOfficers
                .Select(lo => new LoanOfficer()
                {
                    id = lo.id,
                    officer_name = lo.officer_name,
                    description = lo.description,
                    image = lo.image ?? EsmGlobals.MissingImageFilename,
                    sort_order = lo.sort_order ?? 100,
                    is_visible = lo.is_visible,
                    biography = lo.biography,
                    biography_title = lo.biography_title,
                    officer_key = lo.officer_key,
                    nmls_number = lo.nmls_number,
                    email_address = lo.email_address,
                    mailing_address = lo.mailing_address,
                    primary_phone_number = lo.primary_phone_number
                }
                )
                .OrderBy(o => o.sort_order)
                .ToList();

            return list;
        }

        public List<LoanOfficerDropdownData> GetLoanOfficersForDropdownList()
        {

            var loanOfficers = _db.GetOfficer("")
                .Where(o => o.is_visible == true)
                .OrderBy(o => o.sort_order)
                .Select(lo => new LoanOfficerDropdownData()
                {
                    officer_name = lo.officer_name,
                    image = lo.image ?? EsmGlobals.MissingImageFilename,
                    officer_key = lo.officer_key,
                    nmls_number = lo.nmls_number,
                    primary_phone_number = lo.primary_phone_number ?? string.Empty
                }
                )
                .ToList();

            return loanOfficers;
        }

        public List<PhoneNumber> GetPhoneNumbers(string officerKey)
        {
            var returnVal = new List<PhoneNumber>();

            using (var dbContext = new EasySpeedyMortgagesEntities())
            {
                returnVal = (from p in dbContext.PhoneNumbers
                             join op in dbContext.Officers_PhoneNumbers on p.id equals op.phone_number_id
                             join o in dbContext.Officers on op.officer_id equals o.id
                             where o.officer_key == officerKey
                             select p)
                             .ToList();
            }

            return returnVal;
        }
        
        public class LoanOfficerDropdownData
        {
            public string image { get; set; }
            public string nmls_number { get; set; }
            public string officer_key { get; set; }
            public string officer_name { get; set; }
            public string primary_phone_number { get; set; }
        }
        public class LoanOfficer
        {
            public class PhoneNumber
            {
                public int id { get; set; }
                public string phone_number { get; set; }
                public string description { get; set; }
            }
            private List<PhoneNumber> _phoneNumbers = null;
            public List<PhoneNumber> Phones
            {
                get
                {
                    if (_phoneNumbers == null)
                    {
                        _phoneNumbers = new List<PhoneNumber>();
                        _phoneNumbers = (new LoanOfficerDataModel()).GetPhoneNumbers(officer_key)
                            .Select(p => new PhoneNumber()
                            {
                                id = p.id,
                                phone_number = p.phone_number,
                                description = p.description
                            })
                            .ToList();
                    }

                    return _phoneNumbers;
                }
            }

            public string biography { get; set; }
            public string biography_title { get; set; }
            public string description { get; set; }
            public string email_address { get; set; }
            public int id { get; set; }
            public string image { get; set; }
            public bool is_visible { get; set; }
            public string mailing_address { get; set; }
            public string nmls_number { get; set; }
            public string officer_key { get; set; }
            public string officer_name { get; set; }
            public string primary_phone_number { get; set; }
            public int sort_order { get; set; }

        }

        /// <summary>
        /// Phone number formatted for Loan Officer Display page
        /// </summary>
        public static string LoanOfficerDisplayNumber(PhoneNumber phoneNumber)
        {
                if (!string.IsNullOrEmpty(phoneNumber.description))
                    return $"${phoneNumber.description}: ${phoneNumber.phone_number}";

                return phoneNumber.phone_number;
        }

    }
}