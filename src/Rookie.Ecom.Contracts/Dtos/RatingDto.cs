using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class RatingDto
    {
        public Guid? Id { get; set; }
        public decimal Star { get; set; }
        public string Comment { get; set; }
    }
}
