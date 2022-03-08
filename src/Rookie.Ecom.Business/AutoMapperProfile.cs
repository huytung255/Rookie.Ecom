using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.DataAccessor.Entities;

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
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Product, ProductDto>();
            CreateMap<ProductImage, ProductImageDto>();
        }
    }
}
