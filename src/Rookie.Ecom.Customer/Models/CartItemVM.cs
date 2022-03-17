namespace Rookie.Ecom.Customer.Models
{
    public class CartItemVM
    {
        public string ProductId { get; set; }

        public int Quantity { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public decimal Price { get; set; }
    }
}
