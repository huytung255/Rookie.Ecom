using EnsureThat;
using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts.Constants;
using Rookie.Ecom.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rookie.Ecom.Admin.Controllers
{
    [Route("api/[controller]")]
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

        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] OrderDto orderDto)
        {
            //Ensure.Any.IsNotNull(orderDto, nameof(orderDto));
            //Ensure.Any.IsNotNull(orderDto.Id, nameof(orderDto.Id));
            await _orderService.UpdateAsync(orderDto);

            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<OrderDto> GetByIdAsync(Guid id)
=> await _orderService.GetByIdAsync(id);
    }
}
