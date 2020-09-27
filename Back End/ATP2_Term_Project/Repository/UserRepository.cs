using ATP2_Term_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Repository
{
    public class UserRepository: Repository<User>,IUserRepository
    {
        public List<User> GetWorkers()
        {
            return context.Users.Include("Info").Where(x => x.Type != "Admin").ToList();
        }

        public User GetByUsername(string username)
        {
            return context.Users.Where(x => x.UserName == username).FirstOrDefault();
        }
    }
}