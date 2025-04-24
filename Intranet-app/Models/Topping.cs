using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intranet_app.Models
{
    public class Topping
    {
        public int ToppingID { get; set; }
        public string ToppingName { get; set; }
        public decimal Price { get; set; }
        public string ToppingDescription { get; set; }
    }
}
