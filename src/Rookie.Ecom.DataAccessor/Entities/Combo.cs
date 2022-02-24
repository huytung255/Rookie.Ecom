using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.DataAccessor.Entities
{
    [Table("Combos")]
    public class Combo : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Desc { get; set; }
        [Required]
        public decimal OriginalPrice { get; set; }
        [Required]
        public decimal Price { get; set; }
        public List<ComboDetail> ComboDetails { get; set; }
        public List<ComboImage> ComboImages { get; set; }
    }
}
