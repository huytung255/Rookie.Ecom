using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Contracts;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.ViewComponents
{
    public class Pagination : ViewComponent
    {
       public Pagination() { }
       public async Task<IViewComponentResult> InvokeAsync(BasePagedResponseModel paged)
       {
            return View(paged);
       }
    }
}
