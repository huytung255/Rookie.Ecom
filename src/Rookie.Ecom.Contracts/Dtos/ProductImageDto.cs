using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class ProductImageDto : BaseDto
    {
        public string ImageUrl { get; set; }
        public string Caption { get; set; }
    }
}
