using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ATP2_Term_Project.Repository;
using ATP2_Term_Project.Models;
using ATP2_Term_Project.Attribute;

namespace ATP2_Term_Project.Controllers
{
    [RoutePrefix("api/purchases")]
    [BasicAuthorization]
    public class PurchaseController : ApiController
    {
        CategoryRepository catRepo = new CategoryRepository();
        ProductRepository proRepo = new ProductRepository();
        InformationRepository infoRepo = new InformationRepository();
        PurchaseRepository purRepo = new PurchaseRepository();

        [Route("")]
        public IHttpActionResult Get()
        {
            var p = catRepo.GetAll();


            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id, HttpMethod = "GET", Relation = "Get an specific Category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "POST", Relation = "Create a new Category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id, HttpMethod = "PUT", Relation = "Edit an existing Category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id, HttpMethod = "DELETE", Relation = "Delete an existing category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id + "/products", HttpMethod = "GET", Relation = "Get all products of an specific category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id + "/products", HttpMethod = "POST", Relation = "Create new product for a category" });
            }
            return Ok(p);
        
        }
        [Route("")]
        public IHttpActionResult Post(Purchase purchase)
        {
            purRepo.Insert(purchase);
            Product pro = proRepo.GetById(purchase.ProductId);
            pro.Quantity += purchase.Quantity;
            proRepo.Edit(pro);
            return Ok();
        }
        [Route("checkInvoice")]
        public IHttpActionResult GetInvoiceUnique(string invoice)
        {
            return Ok(purRepo.GetInvoiceUnique(invoice));
        }
        [Route("suppliers")]
        public IHttpActionResult GetInformationByType()
        {
            return Ok(infoRepo.GetInformationByType("supplier"));
        }
        [Route("products/{id}")]
        public IHttpActionResult GetProductsWithCategory(int id)
        {
            return Ok(proRepo.GetProducts(id));
        }
        [Route("products/{id}/details")]
        public IHttpActionResult GetPurchaseDetails(int id)
        {
            var proDetail = proRepo.GetById(id);
            var purDeatils = purRepo.GetPurchaseByProduct(id);
            var data = new Dictionary<string, string>();
            data.Add("aQuantity", proDetail.Quantity.ToString());
            if (purDeatils != null)
                data.Add("pUnitPrice", purDeatils.NewUnitPrice.ToString());
            else
                data.Add("pUnitPrice", "0");
            return Ok(data);
        }

        [Route("addSupplier")]
        public IHttpActionResult PostAddSupplier(Information info)
        {
            purRepo.PostAddSupplier(info);
            return Ok();
        }

    }
}
