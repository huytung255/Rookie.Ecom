using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.DataAccessor.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rookie.Ecom.Identity.Quickstart.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserController(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDto>> GetAsync()
        {
            var users = _userManager.Users;
            var res = users.Select(user => new UserDto
            {
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                UserAddress = user.UserAddress,
                Dob = user.Dob,
                Email = user.Email,
            }).ToList();
            return res;
        }

        [HttpGet("{id}")]
        public async Task<UserDto> GetByIdAsync(string id)
        {

            var user = await _userManager.FindByIdAsync(id);
            var res = new UserDto()
            {
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                UserAddress = user.UserAddress,
                Dob = user.Dob,
                Email = user.Email,
            };
            return res;
        }
    }
}
