using Rookie.Ecom.Contracts;
using Rookie.Ecom.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllAsync();

        Task<PagedResponseModel<ProductDto>> PagedQueryAsync(string category, int page, int limit);

        Task<ProductDto> GetByIdAsync(Guid id);

        Task<IEnumerable<ProductDto>> GetByFeatureAsync();

        Task<ProductDto> AddAsync(CreateProductDto createProductDto);

        Task DeleteAsync(Guid id);

        Task UpdateAsync(UpdateProductDto updateProductDto);
    }
}
