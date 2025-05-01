using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Intranet_app.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Intranet_app.Mapping
{
    public class RamenMap : IEntityTypeConfiguration<Ramen>
    {
        public void Configure(EntityTypeBuilder<Ramen> builder)
        {
            builder.HasKey(x => x.RamenID);
            builder.Property(x => x.BrandName).HasMaxLength(50).IsRequired();
            builder.Property(x => x.RamenName).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Price).IsRequired();
            builder.Property(x => x.RamenDescription).HasMaxLength(500).IsRequired();
            builder.Property(x => x.Quantity).IsRequired();
        }
    }
}
