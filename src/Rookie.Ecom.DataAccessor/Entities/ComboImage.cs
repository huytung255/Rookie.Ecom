using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.DataAccessor.Entities
{
    [Table("ComboImages")]
    public class ComboImage: BaseEntity
    {
        [ForeignKey("Combo")]
        public Guid ComboId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public string Caption { get; set; }
        public Combo Combo { get; set; }
    }
}
