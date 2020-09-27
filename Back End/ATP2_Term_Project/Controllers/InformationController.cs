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
    [RoutePrefix("api/informations")]
    public class InformationController : ApiController
    {
        InformationRepository infoRepo = new InformationRepository();

        [Route("")]
        [BasicAuthorization]

        public IHttpActionResult Get()
        {
            var p = infoRepo.GetAll();


            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "GET", Relation = "Self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + item.InformationId, HttpMethod = "GET", Relation = "Get an specific information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "POST", Relation = "Register a new information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + item.InformationId, HttpMethod = "PUT", Relation = "Edit an existing information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/users", HttpMethod = "GET", Relation = "Get all information of users" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/salers", HttpMethod = "GET", Relation = "Get all information of salers" });
            }
            return Ok(p);

     
        }

        [Route("users")]
        [BasicAuthorization]

        public IHttpActionResult GetUsers()
        {
            var p = infoRepo.GetUsers();
            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "GET", Relation = "Get all informtions" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + item.InformationId, HttpMethod = "GET", Relation = "Get an specific information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "POST", Relation = "Register a new information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + item.InformationId, HttpMethod = "PUT", Relation = "Edit an existing information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/users", HttpMethod = "GET", Relation = "self" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/salers", HttpMethod = "GET", Relation = "Get all information of salers" });
            }

            return Ok(p);
        }
     
        [Route("{id}", Name = "GetInfoById")]
        [BasicAuthorization]
        public IHttpActionResult Get(int id)
        {
            Information info = infoRepo.GetById(id);
            if (info == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "GET", Relation = "Get all informtions" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + info.InformationId, HttpMethod = "GET", Relation = "self" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "POST", Relation = "Register a new information" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + info.InformationId, HttpMethod = "PUT", Relation = "Edit an existing information" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/users", HttpMethod = "GET", Relation = "Get all information of users" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/salers", HttpMethod = "GET", Relation = "Get all information of salers" });


            return Ok(info);
        }

        [Route("{id}")]
        [BasicAuthorization]
        public IHttpActionResult Put([FromBody]Information info, [FromUri]int id)
        {
            info.InformationId = id;
            infoRepo.Edit(info);

            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "GET", Relation = "Get all informtions" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + info.InformationId, HttpMethod = "GET", Relation = "Get an specific informations" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "POST", Relation = "Register a new information" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + info.InformationId, HttpMethod = "PUT", Relation = "Self" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/users", HttpMethod = "GET", Relation = "Get all information of users" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/salers", HttpMethod = "GET", Relation = "Get all information of salers" });
            return Ok(info);
        }

        [Route("")]
        public IHttpActionResult Post(Information info)
        {
            infoRepo.Insert(info);
            string url = Url.Link("GetInfoById", new { id = info.InformationId });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "GET", Relation = "Get all informtions" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + info.InformationId, HttpMethod = "GET", Relation = "Get an specific informations" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "POST", Relation = "Self" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + info.InformationId, HttpMethod = "PUT", Relation = "Edit an existing information" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/users", HttpMethod = "GET", Relation = "Get all information of users" });
            info.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/salers", HttpMethod = "GET", Relation = "Get all information of salers" });
            
            return Created(url, info);
        }
        [BasicAuthorization]
        [Route("salers")]
        public IHttpActionResult GetInformationByTypes()
        {
            var p = infoRepo.GetInformationByType("saler");

            if (p == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            foreach (var item in p)
            {


                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "GET", Relation = "Get all informtions" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + item.InformationId, HttpMethod = "GET", Relation = "Get an specific information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations", HttpMethod = "POST", Relation = "Register a new information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/" + item.InformationId, HttpMethod = "PUT", Relation = "Edit an existing information" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/users", HttpMethod = "GET", Relation = "Get all information of users" });
                item.HyperLinks.Add(new HyperLink() { HRef = "http://localhost:11917/api/informations/salers", HttpMethod = "GET", Relation = "Self" });
            }

            return Ok(p);
        }
    }
}
