using Rookie.Ecom.DataAccessor.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.DataAccessor.Entities
{
    [Table("Orders")]
    public class Order: BaseEntity
    {
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public OrderStatus Status { get; set; }
        public string Note { get; set; }
        public string ShippingAddress { get; set; }
        public string ReceiverFullName { get; set; }
        public string ReceiverPhoneNumber { get; set; }
        public User User { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }
    }
}
