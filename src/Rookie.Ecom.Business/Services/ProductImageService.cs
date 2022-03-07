using AutoMapper;
using Microsoft.AspNetCore.Http;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts;
using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.DataAccessor.Entities;
using Rookie.Ecom.DataAccessor.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Services
{
    public class ProductImageService : IProductImageService
    {
        private readonly IBaseRepository<ProductImage> _baseRepository;
        private readonly IFileStorageService _storageService;
        private readonly IMapper _mapper;


        public ProductImageService(IBaseRepository<ProductImage> baseRepository, IFileStorageService storageService, IMapper mapper)
        {
            _baseRepository = baseRepository;
            _storageService = storageService;
            _mapper = mapper;
        }

        public async Task<ProductImageDto> AddAsync(ProductImageDto productImageDto)
        {
            var productImage = _mapper.Map<ProductImage>(productImageDto);
            productImage.Id = new Guid();
            productImage.CreatedDate = DateTime.Now;
            productImage.UpdatedDate = DateTime.Now;
            productImage.CreatorId = null;
            productImage.Published = true;
            productImage.ImageUrl = await _storageService.SaveFile(productImageDto.ImageFile);
            var item = await _baseRepository.AddAsync(productImage);
            return _mapper.Map<ProductImageDto>(item);
        }

        public async Task DeleteAsync(Guid id, string imagePath)
        {
            await _storageService.DeleteFileAsync(imagePath);
            await _baseRepository.DeleteAsync(id);
        }

        public async Task UpdateAsync(ProductImageDto productImageDto)
        {
            var productImage = _mapper.Map<ProductImage>(productImageDto);
            productImage.UpdatedDate = DateTime.Now;
            await _baseRepository.UpdateAsync(productImage);
        }

        public async Task<IEnumerable<ProductImageDto>> GetAllAsync()
        {
            var categories = await _baseRepository.GetAllAsync();
            return _mapper.Map<List<ProductImageDto>>(categories);
        }

        public async Task<ProductImageDto> GetByIdAsync(Guid id)
        {
            var productImage = await _baseRepository.GetByIdAsync(id);
            return _mapper.Map<ProductImageDto>(productImage);
        }


    }
}
