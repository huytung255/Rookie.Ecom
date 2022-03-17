using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using System;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.Controllers
{
    public class ProductController : Controller
    {
        //private readonly IProductService _productService;
        //public ProductController(IProductService productService)
        //{
        //    _productService = productService;
        //}

        [Authorize]
        public async Task<IActionResult> Index(string name, int page = 1, int limit = 10)
        {
            //var result = await _productService.PagedQueryAsync(name, page, limit);
            return View();
        }


        //public async Task<IActionResult> Detail(Guid id)
        //{
        //    var result = await _productService.GetByIdAsync(id);
        //    return View(result);
        //}
    }
}
