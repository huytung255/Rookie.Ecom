using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts.Dtos;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.Controllers
{
    [Authorize]
    public class RatingController : Controller
    {
        private readonly IRatingService _ratingService;
        private readonly IProductService _productService;
        public RatingController(IRatingService ratingService, IProductService productService)
        {
            _ratingService = ratingService;
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> Index([FromBody] CreateRatingDto createRatingDto)
        {
            var asset = await _ratingService.AddAsync(createRatingDto);
            var product = await _productService.GetByIdAsync(createRatingDto.ProductId);
            return PartialView("~/Views/Product/Detail.cshtml", product);
        }
    }
}
