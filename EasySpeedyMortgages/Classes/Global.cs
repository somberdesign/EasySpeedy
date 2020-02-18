using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasySpeedyMortgages.Classes
{

    public class EsmGlobals
    {
        public enum EsmApplicantType
        {
            Borrower,
            Coborrower
        }

        public const string MissingImageFilename = "_emptyImage.jpg";

        public static string ApplicationEnvironment { get { return ConfigurationManager.AppSettings["ApplicationEnvironment"]; } }
        public static string FromEmail { get { return ConfigurationManager.AppSettings["FromEmail"]; } }
        public static string HtmlColor_Hr { get { return "#ABB2B9"; } }
        public static List<SelectListItem> ListItems_States
        {
            get
            {
                return new List<SelectListItem>()
                {
                    new SelectListItem() {Value = "al", Text = "Alabama" },
                    new SelectListItem() {Value = "ak", Text = "Alaska" },
                    new SelectListItem() {Value = "az", Text = "Arizona" },
                    new SelectListItem() {Value = "ar", Text = "Arkansas" },
                    new SelectListItem() {Value = "ca", Text = "California" },
                    new SelectListItem() {Value = "co", Text = "Colorado" },
                    new SelectListItem() {Value = "ct", Text = "Connecticut" },
                    new SelectListItem() {Value = "de", Text = "Delaware" },
                    new SelectListItem() {Value = "fl", Text = "Florida" },
                    new SelectListItem() {Value = "ga", Text = "Georgia" },
                    new SelectListItem() {Value = "hi", Text = "Hawaii" },
                    new SelectListItem() {Value = "id", Text = "Idaho" },
                    new SelectListItem() {Value = "il", Text = "Illinois" },
                    new SelectListItem() {Value = "in", Text = "Indiana" },
                    new SelectListItem() {Value = "ia", Text = "Iowa" },
                    new SelectListItem() {Value = "ks", Text = "Kansas" },
                    new SelectListItem() {Value = "ky", Text = "Kentucky" },
                    new SelectListItem() {Value = "la", Text = "Louisiana" },
                    new SelectListItem() {Value = "me", Text = "Maine" },
                    new SelectListItem() {Value = "md", Text = "Maryland" },
                    new SelectListItem() {Value = "ma", Text = "Massachusetts" },
                    new SelectListItem() {Value = "mi", Text = "Michigan" },
                    new SelectListItem() {Value = "mn", Text = "Minnesota" },
                    new SelectListItem() {Value = "ms", Text = "Mississippi" },
                    new SelectListItem() {Value = "mo", Text = "Missouri" },
                    new SelectListItem() {Value = "mt", Text = "Montana" },
                    new SelectListItem() {Value = "ne", Text = "Nebraska" },
                    new SelectListItem() {Value = "nv", Text = "Nevada" },
                    new SelectListItem() {Value = "nh", Text = "New Hampshire" },
                    new SelectListItem() {Value = "nj", Text = "New Jersey" },
                    new SelectListItem() {Value = "nm", Text = "New Mexico" },
                    new SelectListItem() {Value = "ny", Text = "New York" },
                    new SelectListItem() {Value = "nc", Text = "North Carolina" },
                    new SelectListItem() {Value = "nd", Text = "North Dakota" },
                    new SelectListItem() {Value = "oh", Text = "Ohio" },
                    new SelectListItem() {Value = "ok", Text = "Oklahoma" },
                    new SelectListItem() {Value = "or", Text = "Oregon" },
                    new SelectListItem() {Value = "pa", Text = "Pennsylvania" },
                    new SelectListItem() {Value = "ri", Text = "Rhode Island" },
                    new SelectListItem() {Value = "sc", Text = "South Carolina" },
                    new SelectListItem() {Value = "sd", Text = "South Dakota" },
                    new SelectListItem() {Value = "tn", Text = "Tennessee" },
                    new SelectListItem() {Value = "tx", Text = "Texas" },
                    new SelectListItem() {Value = "ut", Text = "Utah" },
                    new SelectListItem() {Value = "vt", Text = "Vermont" },
                    new SelectListItem() {Value = "va", Text = "Virginia" },
                    new SelectListItem() {Value = "wa", Text = "Washington" },
                    new SelectListItem() {Value = "wv", Text = "West Virginia" },
                    new SelectListItem() {Value = "wi", Text = "Wisconsin" },
                    new SelectListItem() {Value = "wy", Text = "Wyoming" },

                };
            }
        }
        public static string OfficerImagesPath { get { return ConfigurationManager.AppSettings["folder_images_officers"]; } }
        public static string SmtpAddress { get { return ConfigurationManager.AppSettings["SmtpAddress"]; } }
        public static int SmtpPort { get { return int.Parse(ConfigurationManager.AppSettings["SmtpPort"]); } }
        public static string TestingToEmailAddress { get { return ConfigurationManager.AppSettings["TestingToAddress"]; } }
    }
}
