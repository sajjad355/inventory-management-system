using ATP2_Term_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Repository
{
    public class InformationRepository: Repository<Information>, IInformationRepository
    {

        public List<Information> GetUsers()
        {
            return context.Informations.Where(x => x.UserType == "User").ToList();
        }

        public List<Information> GetInformationByType(string usertype)
        {
            List<Information> infos = context.Informations.Where(x => x.UserType == usertype).ToList();
            for (int i = 0; i < infos.Count; i++)
            {
                infos[i].HyperLinks.Add(new HyperLink() { HRef = "http://localhost:6100/api/infos/" + infos[i].InformationId, HttpMethod = "GET", Relation = "Self" });
                infos[i].HyperLinks.Add(new HyperLink() { HRef = "http://localhost:6100/api/infos", HttpMethod = "POST", Relation = "Create a new Information resource" });
                infos[i].HyperLinks.Add(new HyperLink() { HRef = "http://localhost:6100/api/infos/" + infos[i].InformationId, HttpMethod = "PUT", Relation = "Edit a existing Information resource" });
                infos[i].HyperLinks.Add(new HyperLink() { HRef = "http://localhost:6100/api/infos/" + infos[i].InformationId, HttpMethod = "DELETE", Relation = "Delete a existing Information resource" });
            }
            return infos;
        }
    }
}