using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Models
{
    public class Information
    {
        public int InformationId { get; set; }
    
        public string FullName { get; set; }
   
        public string Address { get; set; }

        public string Phone { get; set; }
      
        public string AccNumber { get; set; }

        public double Balance { get; set; }

        public string WorkPosition { get; set; }

        public string UserType { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}