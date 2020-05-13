using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;


namespace EasySpeedyMortgages.Classes
{
    public static class CustomHelpers
    {
        public static IHtmlString Application_Checkbox(this HtmlHelper helper, string idStem, string labelText, string additionalClassString = "")
        {
            var returnVal = string.Format(@"
<div class=""row"">
    <div class=""col-md-5"">
        <label class=""checkbox-inline control-label"">
            <input id=""chk{0}"" type=""checkbox""  formkey=""chk{0}"" class=""checkbox-input checkbox{2}"" />{1}
        </label>
    </div>
</div>
", idStem, labelText, string.IsNullOrEmpty(additionalClassString) ? string.Empty : " " + additionalClassString);
            return new HtmlString(returnVal);
        }

        public static IHtmlString Application_Display_Text(this HtmlHelper helper, string idStem, string labelText, string valueDivClass = "", string value = "")
        {
            if (valueDivClass.Length > 0)
                valueDivClass = " " + valueDivClass;

            var template = string.Format(@"
<div id=""div{0}"" class=""row form-group"">
    <div class=""col-md-3 text-right"">
        <label id=""lbl{0}"" class=""control-label application-textbox-label"">{1}</label>
    </div>
    <div id=""divValue{0}"" class=""col-md-9{3}"" idStem=""{0}"">{2}</div>
</div>
", idStem, labelText, value, valueDivClass);

            return new HtmlString(template);
        }

        public static IHtmlString Application_Dropdown_List(this HtmlHelper helper, string idStem, string labelText, List<SelectListItem> items, SelectListItem topItem = null)
        {
            var itemHtml = new StringBuilder();
            if (topItem != null)
            {
                itemHtml.Append(string.Format(@"<option{0}{1}>{2}</option>",
                    topItem.Value == null ? string.Empty : string.Format(@" value=""{0}""", topItem.Value),
                    topItem.Selected ? @" selected=""selected""" : string.Empty,
                    topItem.Text
                    ));
            }
            foreach (var item in items)
            {
                itemHtml.Append(string.Format(@"<option{0}{1}>{2}</option>",
                    item.Value == null ? string.Empty : string.Format(@" value=""{0}""", item.Value),
                    item.Selected ? @" selected=""selected""" : string.Empty,
                    item.Text
                    ));
            }

            var template = string.Format(@"
<div id=""div{0}"" class=""row form-group"">
    <div class=""col-md-3 text-right"">
        <label class=""control-label"">{1}</label>
    </div>
    <div class=""col-md-9"">
        <select id=""ddl{0}"" class=""select-input form-control"" formkey=""ddl{0}"">
            {2}
        </select>
        <div class=""invalid-feedback hidden text-danger"">Choose One</div>
    </div>
</div>
", idStem, labelText, itemHtml);

            return new HtmlString(template);
        }

        public class NavigationButton
        {
            public bool EnableValidation { get; set; } = true;
            public string PageId { get; set; }
            public string PrependJavascript { get; set; }
        }
        public static IHtmlString Application_Navigation_Buttons(this HtmlHelper helper, NavigationButton previousButton, NavigationButton nextButton)
        {
            const string button_template = @"<button type = ""button"" class=""btn btn-primary ml-3"" onclick=""{0}{1}('{2}');"">{3}</button>";

            var prev = string.Empty;
            if (previousButton != null)
            {
                prev = string.Format(button_template,
                    string.IsNullOrEmpty(previousButton.PrependJavascript) ? string.Empty : previousButton.PrependJavascript,
                    previousButton.EnableValidation ? "ValidateAndGo" : "Go",
                    previousButton.PageId,
                    "Previous"
                );
            }

            var next = string.Empty;
            if (nextButton != null)
            {
                next = string.Format(button_template,
                string.IsNullOrEmpty(nextButton.PrependJavascript) ? string.Empty : nextButton.PrependJavascript,
                nextButton.EnableValidation ? "ValidateAndGo" : "Go",
                nextButton.PageId,
                "Next"
            );
            }

            string returnVal =
string.Format(@"
<div class=""container top25"">
    <div class=""row"">
        <div class=""col-3 offset-9"">{0}{1}</div>
    </div>
</div>", prev, next);
            return new HtmlString(returnVal);
        }

        public class AppRadioButton
        {
            public string AdditionalClasses { get; set; }
            public string Id { get; set; }
            public string FormKey { get; set; }
            public string Label { get; set; }
            public string Name { get; set; }
            public string Value { get; set; }
        }
        public static IHtmlString Application_Radio_Button(this HtmlHelper helper, string id, string name, string value, string label, string additionalClasses = "")
        {
            return Application_Radio_Button(null, new AppRadioButton() { Id = id, Name = name, FormKey = name, Value = value, Label = label, AdditionalClasses = additionalClasses });
        }
        public static IHtmlString Application_Radio_Button(this HtmlHelper helper, AppRadioButton appRadioButton)
        {
            var returnVal = string.Format(@"
<div class=""row"">
    <div class=""col-md-5"">
        <label class=""radio-inline control-label"">
            <input id=""{0}"" type=""radio"" name=""{1}"" formkey=""{2}"" value=""{3}"" class=""radio-input radio{4}"" />{5}
        </label>
    </div>
</div>
",
    appRadioButton.Id,
    appRadioButton.Name,
    appRadioButton.FormKey,
    appRadioButton.Value,
    string.IsNullOrEmpty(appRadioButton.AdditionalClasses) ? string.Empty : " " + appRadioButton.AdditionalClasses,
    appRadioButton.Label);
            return new HtmlString(returnVal);
        }

        public static IHtmlString Application_Text_Box(this HtmlHelper helper, string idStem, string labelText, string validationText = "Required", string value = "")
        {
            var template = string.Format(@"
<div id=""div{0}"" class=""row form-group"">
    <div class=""col-md-3 text-right"">
        <label class=""control-label application-textbox-label"">{1}</label>
    </div>
    <div class=""col-md-9"">
        <input type = ""text"" id=""txt{0}"" name=""txt{0}"" class=""text-input form-control"" formkey=""txt{0}""{3} />
        <div class=""invalid-feedback hidden text-danger"">{2}</div>
    </div>
</div>
", idStem, labelText, validationText, string.IsNullOrEmpty(value) ? string.Empty : string.Format(@" value=""{0}""", value));

            return new HtmlString(template);
        }
    }
}