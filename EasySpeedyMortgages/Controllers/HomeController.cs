using EasySpeedyMortgages.Models.DataModels;
using EasySpeedyMortgages.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static EasySpeedyMortgages.Models.DataModels.LoanOfficerDataModel;

namespace EasySpeedyMortgages.Controllers
{
    //[RoutePrefix("charlotte")]
    public class HomeController : Controller
    {
        EasySpeedyMortgagesEntities _db;

        public HomeController()
        {
            _db = new EasySpeedyMortgagesEntities();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        [HttpGet]
        [Route("o/{officerKey}")]
        public ActionResult DisplayOfficer(string officerKey)
        {
            return View("DisplayOfficer", new DisplayOfficerViewModel(officerKey));
        }

        [HttpGet]
        public ActionResult GetOfficers()
        {
            var loanOfficers = (new LoanOfficerDataModel()).GetLoanOfficers();

            return Json(loanOfficers, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetOfficersDropdown()
        {
            var loanOfficers = (new LoanOfficerDataModel()).GetLoanOfficersForDropdownList();

            return Json(loanOfficers, JsonRequestBehavior.AllowGet);

        }


        //[HttpPost]

    }
}