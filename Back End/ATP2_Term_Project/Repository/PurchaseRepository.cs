using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ATP2_Term_Project.Models;

namespace ATP2_Term_Project.Repository
{
    public class PurchaseRepository : Repository<Purchase>, IPurchaseRepository
    {
        public List<Purchase> GetPurchaseWithAllDetails()
        {
            return context.Purchases.Include("Category").Include("Product").Include("Information").ToList();
        }

        public Purchase GetPurchaseByProduct(int id)
        {
            Purchase purchase = context.Purchases.Where(x => x.ProductId == id).FirstOrDefault();
            if (purchase != null)
            {
                purchase.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/infos/" + purchase.InformationId, HttpMethod = "GET", Relation = "Self" });
                purchase.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/infos", HttpMethod = "POST", Relation = "Create a new Purchase resource" });
                purchase.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/infos/" + purchase.InformationId, HttpMethod = "PUT", Relation = "Edit a existing Purchase resource" });
                purchase.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/infos/" + purchase.InformationId, HttpMethod = "DELETE", Relation = "Delete a existing Purchase resource" });

            }
            return purchase;
        }

        public List<Purchase> GetPurchaseFromDate(DateTime date)
        {
            return context.Purchases.Include("Category").Include("Product").Include("Information").Where(x => x.Date >= date).ToList();
        }

        public List<Purchase> GetPurchaseToDate(DateTime date)
        {
            return context.Purchases.Include("Category").Include("Product").Include("Information").Where(x => x.Date <= date).ToList();
        }

        public List<Purchase> GetPurchaseBetweenDate(DateTime from, DateTime to)
        {
            return context.Purchases.Include("Category").Include("Product").Include("Information").Where(x => x.Date >= from && x.Date <= to).ToList();
        }

        public Purchase GetInvoiceUnique(string invoice)
        {
            Purchase purchase = context.Purchases.Where(x => x.Invoice == invoice).FirstOrDefault();
            return purchase;
        }

        public void PostAddSupplier(Information info)
        {
            info.UserType = "supplier";
            info.WorkPosition = "supplier";
            context.Informations.Add(info);
            context.SaveChanges();
        }
    }
}