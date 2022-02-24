using Rookie.Ecom.DataAccessor.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class OrderDto : BaseDto
    {
        public OrderStatus OrderStatus { get; set; }
        public string Note { get; set; }
        public string ShippingAddress { get; set; }
        public string ReceiverFullName { get; set; }
        public string ReceiverPhoneNumber { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }

    }
}
