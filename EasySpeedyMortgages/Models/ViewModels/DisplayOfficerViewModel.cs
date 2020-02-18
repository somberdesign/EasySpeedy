using EasySpeedyMortgages.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static EasySpeedyMortgages.Models.DataModels.LoanOfficerDataModel;

namespace EasySpeedyMortgages.Models.ViewModels
{

    public class DisplayOfficerViewModel
    {
        public LoanOfficer loanOfficer { get; private set; }

        public DisplayOfficerViewModel(string officerKey)
        {
            loanOfficer = (new LoanOfficerDataModel()).GetLoanOfficers(officerKey).FirstOrDefault();
        }
    }

}