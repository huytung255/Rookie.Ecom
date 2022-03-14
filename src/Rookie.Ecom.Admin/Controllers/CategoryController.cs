using EnsureThat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize(Policy = "ADMIN_ROLE_POLICY")]
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> CreateAsync([FromBody] CreateCategoryDto createCategoryDto)
        {
            Ensure.Any.IsNotNull(createCategoryDto, nameof(createCategoryDto));
            var asset = await _categoryService.AddAsync(createCategoryDto);
            return Created(Endpoints.Category, asset);
        }

        [Authorize(Policy = "ADMIN_ROLE_POLICY")]
        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] UpdateCategoryDto updateCategoryDto)
        {
            Ensure.Any.IsNotNull(updateCategoryDto, nameof(updateCategoryDto));
            Ensure.Any.IsNotNull(updateCategoryDto.Id, nameof(updateCategoryDto.Id));
            await _categoryService.UpdateAsync(updateCategoryDto);

            return NoContent();
        }

        [Authorize(Policy = "ADMIN_ROLE_POLICY")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAssetAsync([FromRoute] Guid id)
        {
            var categoryDto = await _categoryService.GetByIdAsync(id);
            Ensure.Any.IsNotNull(categoryDto, nameof(categoryDto));
            await _categoryService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<CategoryDto> GetByIdAsync(Guid id)
            => await _categoryService.GetByIdAsync(id);

        [HttpGet]
        public async Task<IEnumerable<CategoryDto>> GetAsync()
            => await _categoryService.GetAllAsync();

        [HttpGet("find")]
        public async Task<PagedResponseModel<CategoryDto>>
            FindAsync(string name, int page = 1, int limit = 10)
            => await _categoryService.PagedQueryAsync(name, page, limit);

        [Authorize(Policy = "ADMIN_ROLE_POLICY")]
        [HttpPut("image")]
        public async Task<ActionResult<ProductImageDto>> UpdateCategoryImageAsync([FromForm] UpdateCategoryImageDto updateCategoryImageDto)
        {
            await _categoryService.UpdateImageAsync(updateCategoryImageDto);
            return NoContent();
        }
    }
}
