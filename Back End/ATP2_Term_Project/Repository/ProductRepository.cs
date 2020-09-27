using ATP2_Term_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATP2_Term_Project.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        
        public List<Product> GetProducts(int id)
        {
            List<Product> products = this.context.Products.Where(x => x.CategoryId == id).ToList();
            
            return products;
        }

        public List<Product> GetProductsWithCategory()
        {
            return this.context.Products.Include("Category").ToList();
        }
    }
}