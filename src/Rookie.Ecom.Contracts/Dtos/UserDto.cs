using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class UserDto: BaseDto
    {
        public string FullName { get; set; }
        public string UserAddress { get; set; }
        public DateTime Dob { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
    public class CreateUserDto
    {
        public string FullName { get; set; }
        public string UserAddress { get; set; }
        public DateTime Dob { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

    }
    public class UpdateUserDto
    {
        public Guid? Id { get; set; }
        public string FullName { get; set; }
        public string UserAddress { get; set; }
        public DateTime Dob { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
