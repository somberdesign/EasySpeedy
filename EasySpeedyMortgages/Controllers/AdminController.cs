using EasySpeedyMortgages.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasySpeedyMortgages.Controllers
{
    public class AdminController : Controller
    {
        public ActionResult Index()
        {
            return View("Admin");
        }

        // GET: Admin
        public ActionResult GetInitialBorrowerInfo()
        {
            var o = new InitialBorrowerInfoDataModel();
            var list = o.Get();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetShortApplications()
        {
            var o = new ShortApplicationDataModel();
            var list = o.Get();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}