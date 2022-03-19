using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts;
using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.DataAccessor.Entities;
using Rookie.Ecom.DataAccessor.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Services
{
    public class ProductService : IProductService
    {
        private readonly IBaseRepository<Product> _baseRepository;
        private readonly IMapper _mapper;

        public ProductService(IBaseRepository<Product> baseRepository, IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }

        public async Task<ProductDto> AddAsync(CreateProductDto createProductDto)
        {
            var product = _mapper.Map<Product>(createProductDto);

            var item = await _baseRepository.AddAsync(product);
            return _mapper.Map<ProductDto>(item);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _baseRepository.DeleteAsync(id);
        }

        public async Task UpdateAsync(UpdateProductDto updateProductDto)
        {
            var product = await _baseRepository.GetByIdAsync(updateProductDto.Id);
            var updatedProduct = _mapper.Map(updateProductDto,product);

            await _baseRepository.UpdateAsync(updatedProduct);
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync()
        {
            var products = await _baseRepository.GetAllAsync("ProductImages,Category,Ratings");
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<ProductDto> GetByIdAsync(Guid id)
        {
            var query = _baseRepository.Entities;
            var product = query.Include(ord => ord.ProductImages).Include(ord => ord.Ratings).ThenInclude(rating => rating.User).FirstOrDefault(x => x.Id == id);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<IEnumerable<ProductDto>> GetByFeatureAsync()
        {
            var query = _baseRepository.Entities;
            query = query.Where(x => x.IsFeatured == true).Include("ProductImages").Include("Category").Include("Ratings");
            return _mapper.Map<IEnumerable<ProductDto>>(query);
        }

        public async Task<PagedResponseModel<ProductDto>> PagedQueryAsync(string category, int page, int limit)
        {
            var query = _baseRepository.Entities;

            query = query.Where(x => string.IsNullOrEmpty(category) || x.CategoryId.ToString().Contains(category)).Include("ProductImages").Include("Category").Include("Ratings");

            //query = query.OrderBy(x => x.Name);

            var assets = await query
                .AsNoTracking()
                .PaginateAsync(page, limit);

            return new PagedResponseModel<ProductDto>
            {
                CurrentPage = assets.CurrentPage,
                TotalPages = assets.TotalPages,
                TotalItems = assets.TotalItems,
                Items = _mapper.Map<IEnumerable<ProductDto>>(assets.Items)
            };
        }
    }
}
