using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intranet_app.Models
{
    public class Ramen
    {
        public int RamenID { get; set; }
        public string BrandName { get; set; }
        public string RamenName { get; set; }
        public decimal Price { get; set; }
        public string RamenDescription { get; set; }
        public int Quantity { get; set; }
    }
}
