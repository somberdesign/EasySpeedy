using EasySpeedyMortgages.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using static EasySpeedyMortgages.Classes.EsmMail;
using static EasySpeedyMortgages.Models.DataModels.InitialBorrowerInfoDataModel;

namespace EasySpeedyMortgages.Controllers
{
    public class InitialBorrowerController : Controller
    {

        [HttpPost]
        public ActionResult InsertInitialBorrower(InitialBorrowerParameters initialBorrowerParameters)
        {
            var result = (new InitialBorrowerInfoDataModel()).InsertRecord(initialBorrowerParameters);

            //var mailMessage = new MailMessage()
            //{
                 
            //}
            //var sendParameters = new SendParameters()
            //{

            //}

            return Json(result.IsSuccessful);
        }
    }
}