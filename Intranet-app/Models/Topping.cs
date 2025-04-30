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
        public decimal Weight { get; set; }
        public string ToppingDescription { get; set; }
        public ICollection<Ramen> Ramens { get; set; } = new List<Ramen>();
        public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
    }
}
