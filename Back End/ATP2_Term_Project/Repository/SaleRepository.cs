using ATP2_Term_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Repository
{
    public class SaleRepository: Repository<Sale>,ISaleRepository
    {
        public Sale checkInvoice(string id)
        {
            return this.context.Sales.Where(x => x.Invoice == id).FirstOrDefault();
        }
        public List<Sale> GetSalesWithAllDetails()
        {
            return context.Sales.Include("Category").Include("Product").Include("Information").ToList();
        }
    }
}