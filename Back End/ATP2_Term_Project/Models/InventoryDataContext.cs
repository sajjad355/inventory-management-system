using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Models
{
    public class InventoryDataContext:DbContext
    {
        virtual public DbSet<User> Users { get; set; }
        virtual public DbSet<Information> Informations { get; set; }

        virtual public DbSet<Product> Products { get; set; }
        virtual public DbSet<Category> Categories { get; set; }

        virtual public DbSet<Purchase> Purchases { get; set; }
        virtual public DbSet<Sale> Sales { get; set; }
        
    }
}