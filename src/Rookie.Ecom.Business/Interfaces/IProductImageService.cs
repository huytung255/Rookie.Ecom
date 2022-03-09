using Rookie.Ecom.Contracts;
using Rookie.Ecom.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Interfaces
{
    public interface IProductImageService
    {
        Task<IEnumerable<ProductImageDto>> GetAllAsync();


        Task<ProductImageDto> GetByIdAsync(Guid id);


        Task<ProductImageDto> AddAsync(CreateProductImageDto createProductImageDto);

        Task DeleteAsync(Guid id,string imagePath);

        Task UpdateAsync(UpdateProductImageDto updateProductImageDto);
    }
}
