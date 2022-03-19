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
    [Authorize(Policy = "ADMIN_ROLE_POLICY")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IEnumerable<OrderDto>> GetAsync()
    => await _orderService.GetAllAsync();


        [HttpGet("find")]
        public async Task<PagedResponseModel<OrderDto>> FindAsync( int page = 1, int limit = 10)
                => await _orderService.PagedQueryAsync(page, limit);

        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] UpdateOrderDto updateOrderDto)
        {
            //Ensure.Any.IsNotNull(orderDto, nameof(orderDto));
            //Ensure.Any.IsNotNull(orderDto.Id, nameof(orderDto.Id));
            await _orderService.UpdateAsync(updateOrderDto);

            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<OrderDto> GetByIdAsync(string id)
                => await _orderService.GetByIdAsync(id);
    }
}
