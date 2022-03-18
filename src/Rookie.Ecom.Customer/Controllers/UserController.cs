using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Rookie.Ecom.Contracts.Dtos;
using System.Net.Http;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        public async Task<IActionResult> Profile()
        {
            var MyHttpClient = new HttpClient();
            string userId = "";
            foreach (var claim in User.Claims)
            {
                if (claim.Type == "sub") userId = claim.Value;
            }
            HttpResponseMessage response =  MyHttpClient.GetAsync(@"https://localhost:5001/api/User/"+ userId).Result;
                var body = response.Content.ReadAsStringAsync().Result;
            var obj = (UserDto)JsonConvert.DeserializeObject(body, typeof(UserDto));
            return View(obj);
        }
    }
}
