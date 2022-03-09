using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class ProductImageDto : BaseDto
    {
        public Guid ProductId { get; set; }
        public string ImageUrl { get; set; }
        public string Caption { get; set; }
        public bool IsDefault { get; set; }
    }
    public class CreateProductImageDto
    {
        public Guid ProductId { get; set; }
        public IFormFile ImageFile { get; set; }
        public string Caption { get; set; }
        public bool IsDefault { get; set; }
    }
    public class UpdateProductImageDto
    {
        public Guid? Id { get; set; }
        public string Caption { get; set; }
        public bool IsDefault { get; set; }
    }
}
