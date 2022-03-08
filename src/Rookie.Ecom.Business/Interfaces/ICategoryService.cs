using Rookie.Ecom.Contracts;
using Rookie.Ecom.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();

        Task<PagedResponseModel<CategoryDto>> PagedQueryAsync(string name, int page, int limit);

        Task<CategoryDto> GetByIdAsync(Guid id);

        Task<CategoryDto> GetByNameAsync(string name);

        Task<CategoryDto> AddAsync(CreateCategoryDto createCategoryDto);

        Task DeleteAsync(Guid id);

        Task UpdateAsync(UpdateCategoryDto updateCategoryDto);

        Task UpdateImageAsync(UpdateCategoryImageDto updateCategoryImageDto);
    }
}
