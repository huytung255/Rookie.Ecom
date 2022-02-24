using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.DataAccessor.Entities
{
    [Table("Users")]
    public class User : IdentityUser<Guid>
    {
        public string FullName { get; set; }
        public DateTime Dob { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public List<UserAddress> UserAddresses { get; set; }
        public List<Order> Orders { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
