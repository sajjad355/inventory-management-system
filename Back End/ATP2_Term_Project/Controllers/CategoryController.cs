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
    [RoutePrefix("api/categories")]
    [BasicAuthorization]
    public class CategoryController : ApiController
    {
        CategoryRepository catRepo = new CategoryRepository();


        ProductRepository proRepo = new ProductRepository();



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


        [Route("{id}", Name = "GetCategoryById")]
        public IHttpActionResult Get(int id)
        {
            Category cat = catRepo.GetById(id);
            if (cat == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "GET", Relation = "Get all categories" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "GET", Relation = "Self" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "POST", Relation = "Create a new Category resource" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "PUT", Relation = "Edit a existing Category resource" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "DELETE", Relation = "Delete a existing Category resource" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id + "/products", HttpMethod = "GET", Relation = "Get all products of an specific category" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id + "/products", HttpMethod = "POST", Relation = "Create new product for a category" });
            return Ok(cat);
        }


        [Route("{id}/products")]
        public IHttpActionResult GetProducts(int id)
        {
            var p = proRepo.GetProducts(id);
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "GET", Relation = "Get all categories" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id, HttpMethod = "GET", Relation = "Get an specific Category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "POST", Relation = "Create a new Category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id, HttpMethod = "PUT", Relation = "Edit an existing Category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id, HttpMethod = "DELETE", Relation = "Delete an existing category" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id + "/products", HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + item.Id + "/products", HttpMethod = "POST", Relation = "Create new product for an specefic category" });
            }


            return Ok(p);
        }


        [Route("")]
        public IHttpActionResult Post(Category cat)
        {
            catRepo.Insert(cat);
            string url = Url.Link("GetCategoryById", new { id = cat.Id });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "GET", Relation = "Get all categories" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "GET", Relation = "Get an specefic category" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "POST", Relation = "Self" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "PUT", Relation = "Edit a existing Category resource" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "DELETE", Relation = "Delete a existing Category resource" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id + "/products", HttpMethod = "GET", Relation = "Get all products of an specific category" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id + "/products", HttpMethod = "POST", Relation = "Create new product for a category" });
            return Created(url, cat);
        }


        [Route("{id}")]
        public IHttpActionResult Put([FromBody]Category cat, [FromUri]int id)
        {
            cat.Id = id;
            catRepo.Edit(cat);
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "GET", Relation = "Get all categories" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "GET", Relation = "Get an specefic category" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories", HttpMethod = "POST", Relation = "Create a new category" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "PUT", Relation = "Self" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id, HttpMethod = "DELETE", Relation = "Delete a existing Category resource" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id + "/products", HttpMethod = "GET", Relation = "Get all products of an specific category" });
            cat.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/categories/" + cat.Id + "/products", HttpMethod = "POST", Relation = "Create new product for a category" });
            return Ok(cat);
        }


        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            catRepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
















