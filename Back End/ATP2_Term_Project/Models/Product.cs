using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Models
{
    public class Product
    {
        public int Id { get; set; }
   
        public string ProductName { get; set; }
     
        public double Price { get; set; }
     
        public int Quantity { get; set; }


        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();
    }
}