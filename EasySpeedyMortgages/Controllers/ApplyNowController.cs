using EasySpeedyMortgages.Classes;
using EasySpeedyMortgages.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasySpeedyMortgages.Controllers
{
    public class ApplyNowController : Controller
    {

        [HttpGet]
        public ActionResult Index()
        {
            return View(@"~\\Views\\Apply\\Apply.cshtml");
        }

        [HttpGet]
        public ActionResult ApplyNowWizard()
        {
            return View("ApplyNow");
        }
    }
}