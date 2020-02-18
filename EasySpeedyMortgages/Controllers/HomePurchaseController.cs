using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EasySpeedyMortgages.Classes;
using EasySpeedyMortgages.Models.DataModels;

namespace EasySpeedyMortgages.Controllers
{
    public class HomePurchaseController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View("HomePurchaseWizard");
        }

        [HttpPost]
        public ActionResult SaveWizard(WizardData data)
        {
            var o = new ShortApplicationDataModel();
            var result = o.SaveWizardData(data);

            return Json(result.IsSuccessful);
        }

        [HttpGet]
        public ActionResult HomePurchaseWizard()
        {
            return View();
        }

        [HttpGet]
        [Route("HomePurchase/Complete/{success}")]
        public ActionResult WizardComplete(string success)
        {
            if (success == "1")
            {
                ViewBag.Title = "Thank You";
                ViewBag.Content = "Thank you for submitting your information. We will contact you shortly.";
            }
            else
            {
                ViewBag.Title = "Trouble!";
                ViewBag.Content = "An error has occured and your information was not submitted. Please contact the site administrator.";
            }

            return View("..\\UserMessage");
        }

    }
}