using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.Customer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.Controllers
{
    public class CartController : Controller
    {
        private readonly IProductService _productService;
        private readonly string _cartSession = "CartSession";
        public CartController(IProductService productService)
        {
            _productService = productService;
        }
        public IActionResult Index()
        {
            List<CartItemVM> currentCart = new List<CartItemVM>();
            currentCart = GetCart();
            var cartVM = new CartVM()
            {
                Items = currentCart,
                Total = Math.Round(currentCart.Sum(x => x.Price * x.Quantity), 2)
            };
            return View(cartVM);
        }
        public IActionResult GetSize()
        {
            List<CartItemVM> currentCart = new List<CartItemVM>();
            currentCart = GetCart();
            var count = 0;
            foreach (var item in currentCart)
            {
                count += item.Quantity;
            }
            return Ok(count);
        }
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody]CartItemDto item)
        {
            var product = await _productService.GetByIdAsync(Guid.Parse(item.ProductId));

            List<CartItemVM> currentCart = new List<CartItemVM>();
            currentCart = GetCart();
            if (currentCart.Any(x => x.ProductId == item.ProductId))
            {
                currentCart.First(x => x.ProductId == item.ProductId).Quantity += item.Quantity;
            }
            else
            {
                var cartItem = new CartItemVM()
                {
                    ProductId = item.ProductId,
                    ImageUrl = GetImageUrl(product),
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = item.Quantity
                };

                currentCart.Add(cartItem);
            }

            HttpContext.Session.SetString(_cartSession, JsonConvert.SerializeObject(currentCart));
            return Ok(currentCart);

        }
        [HttpPost]
        public async Task<IActionResult> UpdateQuantity([FromBody] CartItemDto item)
        {
            var product = await _productService.GetByIdAsync(Guid.Parse(item.ProductId));

            List<CartItemVM> currentCart = new List<CartItemVM>();
            currentCart = GetCart();

            currentCart.First(x => x.ProductId == item.ProductId).Quantity += item.Quantity;


            HttpContext.Session.SetString(_cartSession, JsonConvert.SerializeObject(currentCart));

            var cartVM = new CartVM()
            {
                Items = currentCart,
                Total = Math.Round(currentCart.Sum(x => x.Price * x.Quantity), 2)
            };
            return PartialView("Index",cartVM);

        }

        [HttpDelete]
        public  IActionResult DeleteItem(string id)
        {
            List<CartItemVM> currentCart = new List<CartItemVM>();
            currentCart = GetCart();
            var item = currentCart.FirstOrDefault(x => x.ProductId == id);
            if (item != null)
            {
                currentCart.Remove(item);
            }
            HttpContext.Session.SetString(_cartSession, JsonConvert.SerializeObject(currentCart));
            var cartVM = new CartVM()
            {
                Items = currentCart,
                Total = Math.Round(currentCart.Sum(x => x.Price * x.Quantity), 2)
            };
            return PartialView("Index", cartVM);

        }

        public IActionResult Checkout()
        {
            List<CartItemVM> currentCart = new List<CartItemVM>();
            currentCart = GetCart();
            var cartVM = new CartVM()
            {
                Items = currentCart,
                Total = Math.Round(currentCart.Sum(x => x.Price * x.Quantity), 2)
            };
            return View(cartVM);
        }
        private List<CartItemVM> GetCart()
        {
            var session = HttpContext.Session.GetString(_cartSession);
            List<CartItemVM> currentCart = new List<CartItemVM>();
            if (session != null)
                currentCart = JsonConvert.DeserializeObject<List<CartItemVM>>(session);
            return currentCart;
        }
        private string GetImageUrl(ProductDto product)
        {
            return product.DefaultImage != null ? product.DefaultImage.ImageUrl : (product.ProductImages.Count != 0 ? product.ProductImages[0].ImageUrl : "/images/placeholder.png");
        }
        public class CartItemDto
        {
            public string ProductId {get; set;}
            public int Quantity { get; set; }    
        }
    }
}
