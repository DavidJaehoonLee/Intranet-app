using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Intranet_app.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Intranet_app.Mapping
{
    public class RecipeMap : IEntityTypeConfiguration<Recipe>
    {
        public void Configure(EntityTypeBuilder<Recipe> builder)
        {
            builder.HasKey(x => x.RecipeID);
            builder.Property(x => x.RecipeName).HasMaxLength(50).IsRequired();
            builder.Property(x => x.RecipeInstruction).HasMaxLength(200).IsRequired();
            builder.HasMany(x => x.Ramens).WithMany(x => x.Recipes);
            builder.HasMany(x => x.Toppings).WithMany(x => x.Recipes);
        }
    }
}
