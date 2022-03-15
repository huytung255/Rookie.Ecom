using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.ViewComponents
{
    public class ProductCard : ViewComponent
    {
        public ProductCard()
        {
        }
        public async Task<IViewComponentResult> InvokeAsync(int maxPriority, bool isDone)
        {
            return View();
        }
        
    }
}
