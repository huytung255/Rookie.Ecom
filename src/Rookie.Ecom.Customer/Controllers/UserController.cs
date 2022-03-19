using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts.Dtos;
using System.Net.Http;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.Controllers
{
    [Authorize]
    public class UserController : Controller
    {

        public UserController()
        {

        }
        public async Task<IActionResult> Profile()
        {
            var MyHttpClient = new HttpClient();
            var userId = User.FindFirst("sub").Value;
            HttpResponseMessage response =  MyHttpClient.GetAsync(@"https://localhost:5001/api/User/"+ userId).Result;
                var body = response.Content.ReadAsStringAsync().Result;
            var obj = (UserDto)JsonConvert.DeserializeObject(body, typeof(UserDto));
            return View(obj);
        }

    }
}
