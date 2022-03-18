using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.DataAccessor.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Rookie.Ecom.Business
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            FromDataAccessorLayer();
            FromPresentationLayer();
        }

        private void FromPresentationLayer()
        {
            CreateMap<CategoryDto, Category>().ForMember(d => d.Products, t => t.Ignore());
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();
            CreateMap<ProductDto, Product>().ForMember(d => d.ProductImages, t => t.Ignore());
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
            CreateMap<ProductImageDto, ProductImage>();
            CreateMap<CreateProductImageDto, ProductImage>();
            CreateMap<UpdateProductImageDto, ProductImage>();
            CreateMap<UserDto, User>();
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Product, ProductDto>().ForMember(d => d.DefaultImage, t => t.MapFrom(x => FindDefault(x.ProductImages)));
            CreateMap<ProductImage, ProductImageDto>();
            CreateMap<User, UserDto>();
        }
        private ProductImage FindDefault(List<ProductImage> list)
        {
            if (list.Count == 0) return null;
            var res = list.FirstOrDefault(i => i.IsDefault);
            if (res == null)
            {
                res = list[0];
            }
            return res;
        }
    }
}
