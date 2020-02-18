using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasySpeedyMortgages.Classes
{
    public class OperationResult
    {
        public bool IsSuccessful { get; set; }
        public string Message { get; set; }
    }

    public class DatabaseOperationResult : OperationResult
    {
        public int RecordsAffected { get; set; }
        public int ResultId { get; set; }
        public int ResultMessage { get; set; }
    }
}