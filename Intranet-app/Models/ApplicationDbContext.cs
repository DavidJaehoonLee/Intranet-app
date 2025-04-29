using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Intranet_app.Mapping;

namespace Intranet_app.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Ramen> Ramens { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Topping> Toppings { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RamenMap());
            modelBuilder.ApplyConfiguration(new RecipeMap());
            modelBuilder.ApplyConfiguration(new ToppingMap());
        }
    }
}
