﻿using AutoMapper;
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
    public class OrderService : IOrderService
    {
        private readonly IBaseRepository<Order> _baseRepository;
        private readonly IMapper _mapper;

        public OrderService(IBaseRepository<Order> baseRepository, IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }

        public async Task<OrderDto> AddAsync(CreateOrderDto createOrderDto)
        {
            var order = _mapper.Map<Order>(createOrderDto);
            var item = await _baseRepository.AddAsync(order);
            return _mapper.Map<OrderDto>(item);
        }

        public async Task UpdateAsync(UpdateOrderDto updateOrderDto)
        {
            var query = _baseRepository.Entities;

            var order = query.Include(ord => ord.User).Include(ord => ord.OrderDetails).ThenInclude(detail => detail.Product).ThenInclude(product => product.ProductImages).FirstOrDefault(x => x.Id == updateOrderDto.Id);
            var updatedOrder = _mapper.Map(updateOrderDto, order);
            await _baseRepository.UpdateAsync(updatedOrder);
        }

        public async Task<IEnumerable<OrderDto>> GetAllAsync()
        {
            var orders = await _baseRepository.GetAllAsync("OrderDetails");
            return _mapper.Map<List<OrderDto>>(orders);
        }

        public async Task<OrderDto> GetByIdAsync(string id)
        {
            var query = _baseRepository.Entities;
            
            var order = query.Include(ord => ord.User).Include(ord => ord.OrderDetails).ThenInclude(detail => detail.Product).ThenInclude(product => product.ProductImages).FirstOrDefault(x => x.Id == Guid.Parse(id));

            //var order = await _baseRepository.GetByAsync(x => x.Id == Guid.Parse(id), "OrderDetails");
            return _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderDto>> GetByUserId(string userId)
        {
            var query = _baseRepository.Entities;
            query = query.Where(x => x.UserId == Guid.Parse(userId)).Include("OrderDetails");
            return _mapper.Map<IEnumerable<OrderDto>>(query);
        }

        public async Task<PagedResponseModel<OrderDto>> PagedQueryAsync(int page, int limit)
        {
            var query = _baseRepository.Entities;
            query = query.Include("User").Include("OrderDetails");
            var assets = await query
                .AsNoTracking()
                .PaginateAsync(page, limit);

            return new PagedResponseModel<OrderDto>
            {
                CurrentPage = assets.CurrentPage,
                TotalPages = assets.TotalPages,
                TotalItems = assets.TotalItems,
                Items = _mapper.Map<IEnumerable<OrderDto>>(assets.Items)
            };
        }
    }
}
