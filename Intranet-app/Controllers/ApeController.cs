using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intranet_app.Controllers
{
    public class ApeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
