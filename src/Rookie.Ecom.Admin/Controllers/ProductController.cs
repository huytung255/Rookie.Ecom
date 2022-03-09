using EnsureThat;
using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts;
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
        public async Task<ActionResult<ProductDto>> CreateAsync([FromBody] CreateProductDto createProductDto)
        {
            Ensure.Any.IsNotNull(createProductDto, nameof(createProductDto));
            var asset = await _productService.AddAsync(createProductDto);
            return Created(Endpoints.Product, asset);
        }

        [HttpGet]
        public async Task<IEnumerable<ProductDto>> GetAsync()
    => await _productService.GetAllAsync();
        [HttpGet("find")]
        public async Task<PagedResponseModel<ProductDto>>
    FindAsync(string name, int page = 1, int limit = 10)
    => await _productService.PagedQueryAsync(name, page, limit);

        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] UpdateProductDto updateProductDto)
        {
            Ensure.Any.IsNotNull(updateProductDto, nameof(updateProductDto));
            Ensure.Any.IsNotNull(updateProductDto.Id, nameof(updateProductDto.Id));
            await _productService.UpdateAsync(updateProductDto);

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
        public async Task<ActionResult<ProductImageDto>> CreateProductImageAsync([FromForm] CreateProductImageDto createProductImageDto)
        {
            //Ensure.Any.IsNotNull(productImageDto, nameof(productImageDto));
            var asset = await _productImageService.AddAsync(createProductImageDto);
            return Created(Endpoints.Product, asset);
        }
        [HttpPut("image")]
        public async Task<ActionResult<ProductImageDto>> UpdateProductImageAsync([FromForm] UpdateProductImageDto updateProductImageDto)
        {
            //Ensure.Any.IsNotNull(productImageDto, nameof(productImageDto));
            Ensure.Any.IsNotNull(updateProductImageDto.Id, nameof(updateProductImageDto.Id));
            await _productImageService.UpdateAsync(updateProductImageDto);
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
