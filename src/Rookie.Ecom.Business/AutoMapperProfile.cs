using AutoMapper;
using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.DataAccessor.Entities;
using Rookie.Ecom.DataAccessor.Enums;
using System;
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
            CreateMap<CreateCategoryDto, Category>()
                .ForMember(d => d.Id, t => t.MapFrom(opt => new Guid()))
                .ForMember(d => d.CreatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.UpdatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.Published, t => t.MapFrom(opt => true));
            CreateMap<UpdateCategoryDto, Category>()
                .ForMember(d => d.UpdatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForAllOtherMembers(t => t.UseDestinationValue());

            CreateMap<ProductDto, Product>().ForMember(d => d.ProductImages, t => t.Ignore());
            CreateMap<CreateProductDto, Product>()
                .ForMember(d => d.Id, t => t.MapFrom(opt => new Guid()))
                .ForMember(d => d.CreatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.UpdatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.Published, t => t.MapFrom(opt => true));
            CreateMap<UpdateProductDto, Product>()
                .ForMember(d => d.UpdatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForAllOtherMembers(t => t.UseDestinationValue());

            CreateMap<ProductImageDto, ProductImage>();
            CreateMap<CreateProductImageDto, ProductImage>()
                .ForMember(d => d.Id, t => t.MapFrom(opt => new Guid()))
                .ForMember(d => d.CreatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.UpdatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.Published, t => t.MapFrom(opt => true));
            CreateMap<UpdateProductImageDto, ProductImage>()
                .ForMember(d => d.UpdatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForAllOtherMembers(t => t.UseDestinationValue());

            CreateMap<UserDto, User>();

            CreateMap<OrderDto, Order>();
            CreateMap<CreateOrderDto, Order>()
                .ForMember(d => d.Status, t => t.MapFrom(opt => OrderStatus.Processing) )
                .ForMember(d => d.Id, t => t.MapFrom(opt => new Guid()))
                .ForMember(d => d.CreatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.UpdatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.Published, t => t.MapFrom(opt => true));

            CreateMap<OrderDetailDto, OrderDetail>();
            CreateMap<CreateOrderDetailDto, OrderDetail>()
                .ForMember(d => d.Id, t => t.NullSubstitute(new Guid()))
                .ForMember(d => d.CreatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.UpdatedDate, t => t.MapFrom(opt => DateTime.Now))
                .ForMember(d => d.Published, t => t.MapFrom(opt => true));
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Product, ProductDto>().ForMember(d => d.DefaultImage, t => t.MapFrom(x => FindDefault(x.ProductImages)));
            CreateMap<ProductImage, ProductImageDto>();
            CreateMap<User, UserDto>();
            CreateMap<Order, OrderDto>().ForMember(d => d.Total, t => t.MapFrom(x => CalculateTotal(x.OrderDetails)));
            CreateMap<OrderDetail, OrderDetailDto>();
        }

        private decimal CalculateTotal(List<OrderDetail> orderDetails)
        {
            decimal res = 0;
            foreach (var detail in orderDetails)
            {
                res += detail.UnitPrice * detail.Quantity;
            }
            return res;
        }

        private ProductImage FindDefault(List<ProductImage> list)
        {
            if (list == null) return null;
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
