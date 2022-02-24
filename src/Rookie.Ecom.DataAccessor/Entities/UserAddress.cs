using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.DataAccessor.Entities
{
    [Table("UserAddresses")]
    public class UserAddress: BaseEntity
    {
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public string Address { get; set; }
        public User User { get; set; }
    }
}
