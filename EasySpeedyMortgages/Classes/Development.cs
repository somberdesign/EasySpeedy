using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Web;

namespace EasySpeedyMortgages.Classes
{
    public class Development
    {
        public static void SnakeToCamel()
        {
            var input = @"
first_name
last_name
email
phone_number
loan_amount
property_value
loan_type_id
credit_quality_id
";
            var output = new StringBuilder();
            var action = string.Empty;
            var originalWord = new StringBuilder();
            char target;



            foreach (char c in input)
            {
                target = c;

                if (action == "toupper") target = char.ToUpper(c);
                if (action == "ignore") continue;

                action = string.Empty;

                if (target == '\r') continue;
                if (target == '\n')
                {
                    action = "toupper";
                    output.AppendFormat(" {0}", originalWord);
                    originalWord.Clear();
                    output.AppendLine();
                    continue;
                }

                originalWord.Append(c);

                if (target == "_".ToCharArray()[0])
                {
                    action = "toupper";
                    continue;
                }

                output.Append(target);
            }

            output.AppendLine();
            Debug.Write(output);


        }
    }
}