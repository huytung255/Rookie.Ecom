using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Rookie.Ecom.Contracts.Dtos;
using System.Net.Http;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.ViewComponents
{
    public class CheckoutInfo : ViewComponent
    {
        public CheckoutInfo()
        {
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var MyHttpClient = new HttpClient();
            string userId = UserClaimsPrincipal.FindFirst("sub").Value;
            HttpResponseMessage response = MyHttpClient.GetAsync(@"https://localhost:5001/api/User/" + userId).Result;
            var body = response.Content.ReadAsStringAsync().Result;
            var obj = (UserDto)JsonConvert.DeserializeObject(body, typeof(UserDto));
            return View(obj);
        }
    }
}
