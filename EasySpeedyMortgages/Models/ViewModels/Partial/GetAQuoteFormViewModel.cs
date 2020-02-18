using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasySpeedyMortgages.Models.ViewModels.Partial
{
    public class InitialBorrowerInfoViewModel
    {
        public int? ReferringOfficerId { get; set; }

        public InitialBorrowerInfoViewModel(int? referringOfficerId = null)
        {
            ReferringOfficerId = referringOfficerId;
        }

        [DisplayName("First Name")]
        public string FirstName { get; set; }
        [DisplayName("Last Name")]
        public string LastName { get; set; }
        [DisplayName("Email")]
        public string Email { get; set; }
        [DisplayName("Home Phone")]
        public string PhoneNumber { get; set; }
        [DisplayName("Loan Amount")]
        public List<SelectListItem> LoanAmountList
        {
            get
            {
                return DollarRangeList(70000, 1500000);
            }
        }

        public string LoanAmount { get; set; }
        [DisplayName("Propery Value")]
        public List<SelectListItem> PropertyValueList { get { return DollarRangeList(70000, 1500000); } }
        public string PropertyValue { get; set; }
        [DisplayName("Loan Type")]
        public List<SelectListItem> LoanTypeList
        {
            get
            {
                return
                    new List<SelectListItem>()
                    {
                        new SelectListItem() { Text = "Purchase Loan", Value = "purchase" },
                        new SelectListItem() { Text = "Refinance Loan", Value = "refinance" },
                        new SelectListItem() { Text = "Debt Consolidation", Value = "consolidation" },
                        new SelectListItem() { Text = "Home Equity", Value = "equity" }
                    };
            }
        }
        public string LoanType { get; set; }
        [DisplayName("Credit History")]
        public List<SelectListItem> CreditHistoryList
        {
            get
            {
                return
                    new List<SelectListItem>()
                    {
                        new SelectListItem() { Text = "Excellent", Value = "excellent" },
                        new SelectListItem() { Text = "Good", Value = "good" },
                        new SelectListItem() { Text = "Fair", Value = "fair" },
                        new SelectListItem() { Text = "Poor", Value = "poor" }
                    };
            }
        }
        public string CreditHistory { get; set; }

        private List<SelectListItem> DollarRangeList(int start, int stop)
        {
            var list = new List<SelectListItem>();

            list.Add(new SelectListItem() { Text = string.Format("Less than ${0:N0}", start), Value = (start - 10000).ToString() });

            for (var v = start; v < stop; v += 10000)
            {
                list.Add(new SelectListItem() { Text = string.Format("${0:N0} - {1:N0}", v + 1, v + 10000), Value = v.ToString() });
            }

            list.Add(new SelectListItem() { Text = string.Format("${0:N0}+", stop), Value = stop.ToString() });


            return list;
        }

    }

}