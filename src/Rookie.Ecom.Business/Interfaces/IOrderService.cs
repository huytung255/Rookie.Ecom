using Rookie.Ecom.Contracts;
using Rookie.Ecom.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllAsync();

        Task<PagedResponseModel<OrderDto>> PagedQueryAsync(int page, int limit);

        Task<OrderDto> GetByIdAsync(string id);
        Task<IEnumerable<OrderDto>> GetByUserId(string userId);

        Task<OrderDto> AddAsync(CreateOrderDto createOrderDto);

        Task UpdateAsync(UpdateOrderDto updateOrderDto);
    }
}
