using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rookie.Ecom.Customer.ViewComponents
{
    public class CategoryGrid : ViewComponent
    {
        private readonly ICategoryService _categoryService;
        public CategoryGrid(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var categoryList = await _categoryService.GetAllAsync();
            return View(categoryList);
        }
    }
}
