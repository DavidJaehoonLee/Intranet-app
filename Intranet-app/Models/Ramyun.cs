using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intranet_app.Models
{
    public class Ramyun
    {
        public int RamyunID { get; set; }
        public string BrandName { get; set; }
        public string RamyunName { get; set; }
        public decimal Price { get; set; }
        public string RamyunDescription { get; set; }
        public int Quantity { get; set; }
    }
}
