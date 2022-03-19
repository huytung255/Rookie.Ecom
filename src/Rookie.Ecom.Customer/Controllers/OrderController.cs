using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.Controllers
{
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {

            _orderService = orderService;
        }
        public async Task<IActionResult> Index()
        {
            var userId = User.FindFirst("sub").Value;
            var orders = await _orderService.GetByUserId(userId);
            return View(orders);
        }
        public async Task<IActionResult> Detail(string id)
        {
            var order = await _orderService.GetByIdAsync(id);
            return View(order);
        }
    }
}
