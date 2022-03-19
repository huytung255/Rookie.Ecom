using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class RatingDto: BaseDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public decimal Star { get; set; }
        public string Comment { get; set; }
        public UserDto User { get; set; }
    }
    public class CreateRatingDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public decimal Star { get; set; }
        public string Comment { get; set; }
    }
}
