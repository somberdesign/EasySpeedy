//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EasySpeedyMortgages
{
    using System;
    using System.Collections.Generic;
    
    public partial class InitialBorrowerInfo
    {
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string phone_number { get; set; }
        public int loan_amount { get; set; }
        public int property_value { get; set; }
        public int loan_type_id { get; set; }
        public int credit_quality_id { get; set; }
        public Nullable<int> referring_officer_id { get; set; }
        public System.DateTime created_dt { get; set; }
    }
}
