using ATP2_Term_Project.Attribute;
using ATP2_Term_Project.Models;
using ATP2_Term_Project.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ATP2_Term_Project.Controllers
{
    [RoutePrefix("api/products")]
    [BasicAuthorization]
    public class ProductController : ApiController
    {
        ProductRepository proRepo = new ProductRepository();

        [Route("")]
        public IHttpActionResult Get()
        {
            var p = proRepo.GetAll();

            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {

                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products", HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + item.Id, HttpMethod = "GET", Relation = "Get an specific Product" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products", HttpMethod = "POST", Relation = "Create a new Product" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + item.Id, HttpMethod = "PUT", Relation = "Edit an existing Product" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + item.Id, HttpMethod = "DELETE", Relation = "Delete an existing Product" });

            }
            return Ok(proRepo.GetProductsWithCategory());
        }

        [Route("{id}", Name = "GetProductById")]
        public IHttpActionResult Get(int id)
        {
            Product pro = proRepo.GetById(id);
            if (pro == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "GET", Relation = "Self" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products", HttpMethod = "GET", Relation = "Get All products" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products", HttpMethod = "POST", Relation = "Create a new Product resource" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "PUT", Relation = "Edit a existing Product resource" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "DELETE", Relation = "Delete a existing Product resource" });

            return Ok(pro);
        }

        [Route("")]
        public IHttpActionResult Post(Product pro)
        {
            proRepo.Insert(pro);
            string url = Url.Link("GetProductById", new { id = pro.Id });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products", HttpMethod = "POST", Relation = "Self" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "GET", Relation = "Get a specific product" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products", HttpMethod = "GET", Relation = "Get All products" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "PUT", Relation = "Edit a existing Product resource" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "DELETE", Relation = "Delete a existing Product resource" });

            return Created(url, pro);
        }

        [Route("{id}")]
        public IHttpActionResult Put([FromBody]Product pro, [FromUri]int id)
        {
            pro.Id = id;
            proRepo.Edit(pro);
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "PUT", Relation = "Self" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products", HttpMethod = "POST", Relation = "Create a new product" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "GET", Relation = "Get a specific product" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products", HttpMethod = "GET", Relation = "Get All products" });
            pro.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/products/" + pro.Id, HttpMethod = "DELETE", Relation = "Delete a existing Product resource" });

            return Ok(pro);
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            proRepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
