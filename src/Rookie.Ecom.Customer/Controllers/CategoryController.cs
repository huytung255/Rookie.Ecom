using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        public async Task<IActionResult> Index(string name,int page = 1, int limit = 10)
        {
            var result = await _categoryService.PagedQueryAsync(name, page, limit);
            return View(result);
        }
    }
}
