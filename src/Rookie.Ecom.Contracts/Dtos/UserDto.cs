using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class UserDto
    {
        public Guid? Id { get; set; }
        public string FullName { get; set; }
    }
}
