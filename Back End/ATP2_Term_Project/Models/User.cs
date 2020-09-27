using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
     
        public string Type { get; set; }

        public string Permission { get; set; }

        public int InfoId { get; set; }
        public Information Info { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}