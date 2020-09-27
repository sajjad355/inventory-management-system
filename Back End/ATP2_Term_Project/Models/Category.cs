using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Models
{
    public class Category
    {
        public int Id { get; set; }
 
        public string CategoryName { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();

        public IEnumerable<Product> Products { get; set; }
       
    }
}