using ATP2_Term_Project.Repository;
using ATP2_Term_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ATP2_Term_Project.Attribute;

namespace ATP2_Term_Project.Controllers
{
    [RoutePrefix("api/report")]
    [BasicAuthorization]
    public class ReportController : ApiController
    {
        PurchaseRepository purRepo = new PurchaseRepository();
        SaleseRepository saleRepo = new SaleseRepository();

        [Route("purchase")]
        public IHttpActionResult GetPurchaseWithAllDetails()
        {
            var p = purRepo.GetPurchaseWithAllDetails();
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/", HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/from/" + item.Date, HttpMethod = "GET", Relation = "Get purchase from date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/to/" + item.Date, HttpMethod = "GET", Relation = "Get purchase to date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/" + item.Date+"/"+item.Date, HttpMethod = "GET", Relation = "Get purchase between two dates" });


            }
            return Ok(p);
        }

        [Route("purchase/from/{date}")]
        public IHttpActionResult GetPurchaseFromDate(DateTime date)
        {
            var p = purRepo.GetPurchaseFromDate(date);
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/", HttpMethod = "GET", Relation = "Get all purchase" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/from/" + item.Date, HttpMethod = "GET", Relation = "self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/to/" + item.Date, HttpMethod = "GET", Relation = "Get purchase to date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/" + item.Date + "/" + item.Date, HttpMethod = "GET", Relation = "Get purchase between two dates" });


            }

            return Ok(p);
        }
        [Route("purchase/to/{date}")]
        public IHttpActionResult GetPurchaseToDate(DateTime date)
        {
            var p = purRepo.GetPurchaseToDate(date);
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/", HttpMethod = "GET", Relation = "Get all purchase" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/from/" + item.Date, HttpMethod = "GET", Relation = "Get purchase from date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/to/" + item.Date, HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/" + item.Date + "/" + item.Date, HttpMethod = "GET", Relation = "Get purchase between two dates" });


            }
            return Ok(p);
        }
        [Route("purchase/{from}/{to}")]
        public IHttpActionResult GetPurchaseBetweenDate(DateTime from, DateTime to)
        {
            var p = purRepo.GetPurchaseBetweenDate(from, to);
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/", HttpMethod = "GET", Relation = "Get all purchase" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/from/" + item.Date, HttpMethod = "GET", Relation = "Get purchase from date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/to/" + item.Date, HttpMethod = "GET", Relation = "Get purchase to date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/purchase/" + item.Date + "/" + item.Date, HttpMethod = "GET", Relation = "Self" });


            }
            return Ok(p);
        }

        [Route("sales")]
        public IHttpActionResult GetSaleeWithAllDetails()
        {
            var p = saleRepo.GetSalesWithAllDetails();
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/", HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/from/" + item.Date, HttpMethod = "GET", Relation = "Get sales from date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/to/" + item.Date, HttpMethod = "GET", Relation = "Get sales to date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/" + item.Date + "/" + item.Date, HttpMethod = "GET", Relation = "Get sales between two dates" });


            }
            return Ok(p);
        }

        [Route("sales/from/{date}")]
        public IHttpActionResult GetSaleFromDate(DateTime date)
        {
            var p = saleRepo.GetSaleFromDate(date);
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/", HttpMethod = "GET", Relation = "Get all sales" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/from/" + item.Date, HttpMethod = "GET", Relation = "self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/to/" + item.Date, HttpMethod = "GET", Relation = "Get sales to date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/" + item.Date + "/" + item.Date, HttpMethod = "GET", Relation = "Get sales between two dates" });


            }
            return Ok(p);
        }
        [Route("sales/to/{date}")]
        public IHttpActionResult GetSaleToDate(DateTime date)
        {
            var p = saleRepo.GetSaleToDate(date);
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/", HttpMethod = "GET", Relation = "Get all sales" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/from/" + item.Date, HttpMethod = "GET", Relation = "Get sales from date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/to/" + item.Date, HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/" + item.Date + "/" + item.Date, HttpMethod = "GET", Relation = "Get sales between two dates" });


            }
            return Ok(p);
        }
        [Route("sales/{from}/{to}")]
        public IHttpActionResult GetSaleBetweenDate(DateTime from, DateTime to)
        {
            var p = saleRepo.GetSaleBetweenDate(from, to);
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/", HttpMethod = "GET", Relation = "Get all sales" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/from/" + item.Date, HttpMethod = "GET", Relation = "Get sales from date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/to/" + item.Date, HttpMethod = "GET", Relation = "Get sales to date" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/report/sales/" + item.Date + "/" + item.Date, HttpMethod = "GET", Relation = "Self" });


            }
            return Ok(p);
        }

    }
}

