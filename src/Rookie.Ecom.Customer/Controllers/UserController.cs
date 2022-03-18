using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Rookie.Ecom.Customer.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        public IActionResult Profile()
        {
            return View();
        }
    }
}
