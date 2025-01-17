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
    
    public partial class Borrower
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Borrower()
        {
            this.Applications = new HashSet<Application>();
            this.Borrowers_Addresses = new HashSet<Borrowers_Addresses>();
            this.Applications1 = new HashSet<Application>();
        }
    
        public int id { get; set; }
        public string first_name { get; set; }
        public string middle_name { get; set; }
        public string last_name { get; set; }
        public string social_security_number { get; set; }
        public System.DateTime date_of_birth { get; set; }
        public string home_phone { get; set; }
        public string work_phone { get; set; }
        public string email { get; set; }
        public string marital_status { get; set; }
        public Nullable<int> number_years_in_school { get; set; }
        public Nullable<int> number_of_dependents { get; set; }
        public string dependents_ages { get; set; }
        public Nullable<int> monthly_base_income { get; set; }
        public Nullable<int> monthly_overtime { get; set; }
        public Nullable<int> monthly_bonuses { get; set; }
        public Nullable<int> monthly_commissions { get; set; }
        public Nullable<int> mopnthly_dividends_interest { get; set; }
        public Nullable<int> net_rental_income { get; set; }
        public Nullable<int> other_income { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Application> Applications { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Borrowers_Addresses> Borrowers_Addresses { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Application> Applications1 { get; set; }
    }
}
