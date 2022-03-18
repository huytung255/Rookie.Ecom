using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.ViewComponents
{
    public class FeaturedProduct : ViewComponent
    {
        private readonly IProductService _productService;
        public FeaturedProduct(IProductService productService)
        {
            _productService = productService;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var featuredList = await _productService.GetByFeatureAsync();
            return View(featuredList);
        }
    }
}
