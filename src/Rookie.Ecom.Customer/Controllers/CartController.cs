using Microsoft.AspNetCore.Mvc;

namespace Rookie.Ecom.Customer.Controllers
{
    public class CartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
