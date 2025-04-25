using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Intranet_app.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Intranet_app.Mapping
{
    public class ToppingMap : IEntityTypeConfiguration<Topping>
    {
        public void Configure(EntityTypeBuilder<Topping> builder)
        {
            builder.HasKey(x => x.ToppingID);
            builder.Property(x => x.ToppingName).HasMaxLength(50).IsRequired();
            builder.Property(x => x.ToppingDescription).HasMaxLength(200).IsRequired();
            builder.HasMany(x => x.Ramens).WithMany(x => x.Toppings);
            builder.HasMany(x => x.Recipes).WithMany(x => x.Toppings);
        }
    }
}
