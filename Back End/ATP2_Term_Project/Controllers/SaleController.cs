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
    [RoutePrefix("api/sales")]
    [BasicAuthorization]
    public class SaleController : ApiController
    {

        InformationRepository infoRepo = new InformationRepository();
        SaleseRepository saleRepo = new SaleseRepository();
        SaleRepository saleRepo1 = new SaleRepository();

        [Route("")]
        public IHttpActionResult Get()
        {
            var p = saleRepo1.GetAll();

            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {

                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/sales", HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/sales", HttpMethod = "POST", Relation = "Create a new sale transaction" });
            }

            return Ok(saleRepo1.GetAll());
        }


        [Route("")]
        public IHttpActionResult Post(Sale sales)
        {
            saleRepo.Insert(sales);
            sales.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/sales", HttpMethod = "POST", Relation = "Self" });
            sales.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/sales", HttpMethod = "GET", Relation = "Get all sales transaction" });
            return Ok();
        }

        [Route("{id}")]
        public IHttpActionResult GetInvoiceNumber(string id)
        {
            Sale sale = saleRepo1.checkInvoice(id);
            if (sale == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            sale.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/sales/" +id, HttpMethod ="POST", Relation = "Self" });
            sale.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/sales", HttpMethod = "POST", Relation = "Create a new sale transaction" });
            sale.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/sales", HttpMethod = "GET", Relation = "Get all sales transaction" });

            return Ok(sale);
        }


        [Route("details")]
        public IHttpActionResult GetSaleDetails(int? id=0)
        {
            return Ok(saleRepo.GetSalesWithAllDetails());
        }

    }
}
