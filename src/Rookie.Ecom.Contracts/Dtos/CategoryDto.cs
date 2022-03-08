using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Rookie.Ecom.Contracts.Dtos
{
    public class CategoryDto : BaseDto
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Desc { get; set; }
        
    }
    public class CreateCategoryDto
    {
        public string Name { get; set; }
        public string Desc { get; set; }
    }
    public class UpdateCategoryDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
    }
    public class UpdateCategoryImageDto
    {
        public Guid? Id { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
