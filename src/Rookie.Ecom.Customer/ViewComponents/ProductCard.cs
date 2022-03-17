using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Contracts.Dtos;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.ViewComponents
{
    public class ProductCard : ViewComponent
    {
        public ProductCard()
        {
        }
        public async Task<IViewComponentResult> InvokeAsync(ProductDto product)
        {
            var processed = product;
            if (processed.DefaultImage == null)
            {
                if (processed.ProductImages.Count != 0) processed.DefaultImage = processed.ProductImages[0];
                else
                {
                    processed.DefaultImage = new ProductImageDto();
                    processed.DefaultImage.ImageUrl = "/images/placeholder.png";
                }
            }
            return View(processed);
        }
        
    }
}
