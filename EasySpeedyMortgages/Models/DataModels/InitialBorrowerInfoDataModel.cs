using EasySpeedyMortgages.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasySpeedyMortgages.Models.DataModels
{
    public class InitialBorrowerInfoDataModel
    {
        private EasySpeedyMortgagesEntities _db;

        public InitialBorrowerInfoDataModel()
        {
            _db = new EasySpeedyMortgages.EasySpeedyMortgagesEntities();
        }

        public List<v_initial_borrower_info> Get()
        {
            return (from r in _db.v_initial_borrower_info select r)
                    .OrderByDescending(r => r.id)
                    .ToList();
        }

        public DatabaseOperationResult InsertRecord(InitialBorrowerParameters inParams)
        {
            var spParams = new InitialBorrowerInfo()
            {
                credit_quality_id = inParams.CreditQualityId,
                email = inParams.Email,
                first_name = inParams.FirstName,
                last_name = inParams.LastName,
                loan_amount = inParams.LoanAmount,
                loan_type_id = inParams.LoanTypeId,
                phone_number = inParams.PhoneNumber,
                property_value = inParams.PropertyValue,
                referring_officer_id = inParams.ReferringOfficerId,
                created_dt = DateTime.Now
            };

            _db.InitialBorrowerInfoes.Add(spParams);

            var returnVal = new DatabaseOperationResult();
            returnVal.RecordsAffected = _db.SaveChanges();
            returnVal.IsSuccessful = returnVal.RecordsAffected == 1;

            return returnVal;
        }

        public class InitialBorrowerParameters
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string PhoneNumber { get; set; }
            public int LoanAmount { get; set; }
            public int PropertyValue { get; set; }
            public int LoanTypeId { get; set; }
            public int CreditQualityId { get; set; }
            public int? ReferringOfficerId { get; set; }
        }
    }
}