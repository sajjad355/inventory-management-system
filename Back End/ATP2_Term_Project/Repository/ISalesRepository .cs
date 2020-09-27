using ATP2_Term_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATP2_Term_Project.Repository
{
    interface ISalesRepository
    {
        Sale GetSalesByProduct(int id);
        List<Sale> GetSalesWithAllDetails();
    }
}
