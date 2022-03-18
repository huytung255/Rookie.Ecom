using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using System;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<IActionResult> Index(string category, int page = 1, int limit = 9)
        {
            var result = await _productService.PagedQueryAsync(category, page, limit);
            return View(result);
        }


        public async Task<IActionResult> Detail(Guid id)
        {
            var result = await _productService.GetByIdAsync(id);
            return View(result);
        }
    }
}
