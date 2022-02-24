using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rookie.Ecom.DataAccessor.Entities
{   
    [Table("Categories")]
    public class Category : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public List<Product> Products { get; set; }
        public string ImageUrl { get; set; }
        public string Desc { get; set; }
    }
}
