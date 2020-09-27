using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ATP2_Term_Project.Models;

namespace ATP2_Term_Project.Repository
{
    public class SaleseRepository : Repository<Sale>,ISalesRepository{
        public List<Sale> GetSalesWithAllDetails()
        {
            return context.Sales.Include("Category").Include("Product").Include("Information").ToList();
        }

        public Sale GetSalesByProduct(int id)
        {
            Sale sale = context.Sales.Where(x => x.ProductId == id).FirstOrDefault();
            if (sale != null)
            {
                sale.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/infos/" + sale.InformationId, HttpMethod = "GET", Relation = "Self" });
                sale.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/infos", HttpMethod = "POST", Relation = "Create a new Sale resource" });
                sale.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/infos/" + sale.InformationId, HttpMethod = "PUT", Relation = "Edit a existing Sale resource" });
                sale.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/infos/" + sale.InformationId, HttpMethod = "DELETE", Relation = "Delete a existing Sale resource" });

            }
            return sale;
        }

        public List<Sale> GetSaleFromDate(DateTime date)
        {
            return context.Sales.Include("Category").Include("Product").Include("Information").Where(x=>x.Date>=date).ToList();
        }

        public List<Sale> GetSaleToDate(DateTime date)
        {
            return context.Sales.Include("Category").Include("Product").Include("Information").Where(x => x.Date <= date).ToList();
        }

        public List<Sale> GetSaleBetweenDate(DateTime from, DateTime to)
        {
            return context.Sales.Include("Category").Include("Product").Include("Information").Where(x => x.Date >= from && x.Date <= to).ToList();
        }

        public Sale GetInvoiceUnique(string invoice)
        {
            Sale sale= context.Sales.Where(x => x.Invoice == invoice).FirstOrDefault();
            return sale;
        }
    }
}