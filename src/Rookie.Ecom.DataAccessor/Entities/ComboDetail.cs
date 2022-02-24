using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.DataAccessor.Entities
{
    [Table("ComboDetails")]
    public class ComboDetail:BaseEntity
    {
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [ForeignKey("Combo")]
        public Guid ComboId { get; set; }
        [Required]
        public int Quantity { get; set; }
        public Combo Combo { get; set; }
        public Product Product { get; set; }
    }
}
