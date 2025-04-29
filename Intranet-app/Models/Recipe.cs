using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intranet_app.Models
{
    public class Recipe
    {
        public int RecipeID { get; set; }
        public string RecipeName { get; set; }
        public string RecipeInstruction { get; set; }
        public ICollection<Ramen> Ramens { get; set; } = new List<Ramen>();
        public ICollection<Topping> Toppings { get; set; } = new List<Topping>();
    }
}
