using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public string Invoice { get; set; }
        public DateTime Date { get; set; }
        public DateTime ExpireDate { get; set; }
        public int Quantity { get; set; }
        public double PreUnitPrice { get; set; }
        public string Remarks { get; set; }
        public double NewUnitPrice { get; set; }
        public double TotalPrice { get; set; }

        public int InformationId { get; set; }
        public Information Information { get; set; }

        public int CatagoryId { get; set; }
        public Category Category { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();

    }
}