using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

namespace EasySpeedyMortgages.Classes
{

    public class EsmMail
    {
        private EasySpeedyMortgagesEntities _dbContext;

        public EsmMail(EasySpeedyMortgagesEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public OperationResult SendEmail(SendParameters sendParameters)
        {
            var defaultFrom = EsmGlobals.FromEmail;

            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(EsmGlobals.SmtpAddress, EsmGlobals.SmtpPort);

                if (EsmGlobals.ApplicationEnvironment == "Development")
                {
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
                    SmtpServer.PickupDirectoryLocation = string.Format(@"{0}TestFiles\", AppDomain.CurrentDomain.BaseDirectory);
                }

                mail.From = new MailAddress(!string.IsNullOrEmpty(sendParameters.From) ? sendParameters.From : defaultFrom);

                if (EsmGlobals.ApplicationEnvironment == "Development")
                {
                    mail.To.Add(EsmGlobals.TestingToEmailAddress);
                }
                else
                {
                    foreach (var a in sendParameters.ToAddress.Split(';').ToList())
                        mail.To.Add(a);
                }

                mail.Subject = sendParameters.Subject;
                mail.Body = sendParameters.Body;

                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
                var jsonMessage = new JavaScriptSerializer().Serialize(sendParameters);
                var result = new OperationResult() { IsSuccessful = false };
                result.Message = string.Format("Failed to Send Mail.{0}Message: {1}{0}Exception:{2}", Environment.NewLine, jsonMessage, ex.InnerException != null ? ex.InnerException.Message : ex.Message);

                return result;
            }

            return new OperationResult();
        }


        private OperationResult AddEmail(SendParameters sendParameters)
        {
            var o = new EmailLog()
            {
                body = sendParameters.Body,
                dt_sent = DateTime.Now,
                from_address = sendParameters.From.ToString(),
                subject = sendParameters.Subject,
                to_address = sendParameters.ToAddress
            };

            _dbContext.EmailLogs.Add(o);
            var result = _dbContext.SaveChanges();
            return new OperationResult()
            {
                IsSuccessful = result == 1
            };
        }

        public class SendParameters
        {
            public string Body { get; set; }
            public string From { get; set; }
            public string SenderIpAddress { get; set; }
            public string Subject { get; set; }
            private string _toAddress;
            /// <summary>
            /// Semi-colon separated string of email addresses. Be cautious, no validation.
            /// </summary>
            public string ToAddress { get { return _toAddress.Replace(" ", string.Empty); } set { _toAddress = value; } }
        }


    }
}