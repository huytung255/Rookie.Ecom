using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class ProductDto : BaseDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Desc { get; set; }
        public Guid CategoryId { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsAvailable { get; set; }
        public List<ProductImageDto> ProductImages { get; set; }
    }

}
