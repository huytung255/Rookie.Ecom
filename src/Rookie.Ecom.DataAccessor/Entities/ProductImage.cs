using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.DataAccessor.Entities
{
    [Table("ProductImages")]
    public class ProductImage: BaseEntity
    {
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public string Caption { get; set; }
        public Product Product { get; set; }
    }
}
