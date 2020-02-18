using EasySpeedyMortgages.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasySpeedyMortgages.Models.DataModels
{
    public class DisplayOfficerDataModel
    {
        public static string Globals { get; private set; }


        // todo: this returns too much info for just the officer dropdown. return only needed fields.
        public static Officer GetOfficer(string officerKey)
        {
            Officer officer = null;

            using (var context = new EasySpeedyMortgagesEntities() )
            {
                officer = (from o in context.GetOfficer(officerKey)
                           select new Officer()
                           {
                               biography = o.biography,
                               biography_title = o.biography_title,
                               description = o.description,
                               id = o.id,
                               image = o.image ?? EsmGlobals.MissingImageFilename,
                               officer_name = o.officer_name,
                               nmls_number = o.nmls_number,
                               officer_key = o.officer_key
                           })
                           .FirstOrDefault();
            }

            return officer;
        }

    }
}