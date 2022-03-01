using EnsureThat;
using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts.Constants;
using Rookie.Ecom.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rookie.Ecom.Admin.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        private readonly IProductImageService _productImageService;
        public ProductController(IProductService productService, IProductImageService productImageService)
        {
            _productService = productService;
            _productImageService = productImageService;
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateAsync([FromBody] ProductDto productDto)
        {
            Ensure.Any.IsNotNull(productDto, nameof(productDto));
            var asset = await _productService.AddAsync(productDto);
            return Created(Endpoints.Product, asset);
        }

        [HttpGet]
        public async Task<IEnumerable<ProductDto>> GetAsync()
    => await _productService.GetAllAsync();

        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] ProductDto productDto)
        {
            Ensure.Any.IsNotNull(productDto, nameof(productDto));
            Ensure.Any.IsNotNull(productDto.Id, nameof(productDto.Id));
            await _productService.UpdateAsync(productDto);

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAssetAsync([FromRoute] Guid id)
        {
            var productDto = await _productService.GetByIdAsync(id);
            Ensure.Any.IsNotNull(productDto, nameof(productDto));
            await _productService.DeleteAsync(id);
            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<ProductDto> GetByIdAsync(Guid id)
    => await _productService.GetByIdAsync(id);

        [HttpPost("image")]
        public async Task<ActionResult<ProductImageDto>> CreateProductImageAsync([FromForm] ProductImageDto productImageDto)
        {
            //Ensure.Any.IsNotNull(productImageDto, nameof(productImageDto));
            var asset = await _productImageService.AddAsync(productImageDto);
            return Created(Endpoints.Product, asset);
        }
        [HttpPut("image")]
        public async Task<ActionResult<ProductImageDto>> UpdateProductImageAsync([FromForm] ProductImageDto productImageDto)
        {
            //Ensure.Any.IsNotNull(productImageDto, nameof(productImageDto));
            Ensure.Any.IsNotNull(productImageDto.Id, nameof(productImageDto.Id));
            await _productImageService.UpdateAsync(productImageDto);
            return NoContent();
        }
        [HttpDelete("image/{imageId}")]
        public async Task<ActionResult> DeleteProductImageAsync([FromRoute] Guid imageId)
        {
            var productImageDto = await _productImageService.GetByIdAsync(imageId);
            Ensure.Any.IsNotNull(productImageDto, nameof(productImageDto));
            await _productImageService.DeleteAsync(imageId,productImageDto.ImageUrl);
            return NoContent();
        }
    }
}
