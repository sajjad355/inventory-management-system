using ATP2_Term_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATP2_Term_Project.Repository
{
    interface IPurchaseRepository
    {
        Purchase GetPurchaseByProduct(int id);
        List<Purchase> GetPurchaseWithAllDetails();
    }
}
