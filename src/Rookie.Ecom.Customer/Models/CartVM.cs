using System.Collections.Generic;

namespace Rookie.Ecom.Customer.Models
{
    public class CartVM
    {
        public List<CartItemVM> Items { get; set; }
        public decimal Total { get; set; }
    }
}
