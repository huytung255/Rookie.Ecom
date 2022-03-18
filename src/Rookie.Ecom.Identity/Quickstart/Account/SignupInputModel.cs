using System;
using System.ComponentModel.DataAnnotations;

namespace Rookie.Ecom.Identity.Quickstart.Account
{
    public class SignupInputModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string FullName { get; set; }
        public string UserAddress { get; set; }
        public DateTime Dob { get; set; }
        public string PhoneNumber { get; set; }
        public string ReturnUrl { get; set; }
    }
}
