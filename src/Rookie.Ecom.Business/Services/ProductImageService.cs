using AutoMapper;
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
    public class ProductImageService : IProductImageService
    {
        private readonly IBaseRepository<ProductImage> _baseRepository;
        private readonly IMapper _mapper;

        public ProductImageService(IBaseRepository<ProductImage> baseRepository, IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }

        public async Task<ProductImageDto> AddAsync(ProductImageDto productImageDto)
        {
            var product = _mapper.Map<ProductImage>(productImageDto);
            var item = await _baseRepository.AddAsync(product);
            return _mapper.Map<ProductImageDto>(item);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _baseRepository.DeleteAsync(id);
        }

        public async Task UpdateAsync(ProductImageDto productImageDto)
        {
            var product = _mapper.Map<ProductImage>(productImageDto);
            await _baseRepository.UpdateAsync(product);
        }

        public async Task<IEnumerable<ProductImageDto>> GetAllAsync()
        {
            var categories = await _baseRepository.GetAllAsync();
            return _mapper.Map<List<ProductImageDto>>(categories);
        }

        public async Task<ProductImageDto> GetByIdAsync(Guid id)
        {
            // map roles and users: collection (roleid, userid)
            // upsert: delete, update, insert
            // input vs db
            // input-y vs db-no => insert
            // input-n vs db-yes => delete
            // input-y vs db-y => update
            // unique, distinct, no-duplicate
            var product = await _baseRepository.GetByIdAsync(id);
            return _mapper.Map<ProductImageDto>(product);
        }


    }
}
