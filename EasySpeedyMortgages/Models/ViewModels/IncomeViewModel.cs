using EasySpeedyMortgages.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static EasySpeedyMortgages.Classes.EsmGlobals;

namespace EasySpeedyMortgages.Models.ViewModels
{

    public class IncomeViewModel
    {
        public EsmApplicantType ApplicantType { get; set; }

        public IncomeViewModel(EsmApplicantType applicantType)
        {
            ApplicantType = applicantType;
        }
    }
}