using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.Ecom.Business;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Business.Services;
using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.DataAccessor.Entities;
using Rookie.Ecom.IntegrationTests.Common;
using Rookie.Ecom.Tests;
using Rookie.Ecom.Admin.Controllers;
using System;
using System.Threading.Tasks;
using Xunit;
using Rookie.Ecom.DataAccessor.Interfaces;
using Rookie.Ecom.DataAccessor;

namespace Rookie.Ecom.IntegrationTests
{
    public class CategoryControllerShould : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly SqliteInMemoryFixture _fixture;
        private readonly IBaseRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;

        public CategoryControllerShould(SqliteInMemoryFixture fixture)
        {
            _fixture = fixture;
            _fixture.CreateDatabase();
            _categoryRepository = new BaseRepository<Category>(_fixture.Context);
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
        }

        [Fact]
        public async Task Add_New_Category_Success()
        {
            // Arrange
            var categoryService = new CategoryService(_categoryRepository, _fileStorageService, _mapper);
            var categoryController = new CategoryController(categoryService);

            var newCategory = new CreateCategoryDto { Name = "Test Category", Desc = "TC" };

            // Act
            var result = await categoryController.CreateAsync(newCategory);

            // Assert
            result.Result.Should().HaveStatusCode(StatusCodes.Status201Created);
            result.Should().NotBeNull();

            var createdResult = Assert.IsType<CreatedResult>(result.Result);
            var returnValue = Assert.IsType<CategoryDto>(createdResult.Value);

            Assert.Equal(newCategory.Name, returnValue.Name);
            Assert.Equal(newCategory.Desc, returnValue.Desc);

          
            returnValue.Id.Should().NotBe(Guid.Empty);
        }

        [Fact]
        public async Task Add_Exist_Category_ExistedName()
        {
            // Arrange
            var existCategory = new Category { Id = Guid.NewGuid(), Name = "Laptop", Desc = "LT" };
            await _categoryRepository.AddAsync(existCategory);

            var categoryService = new CategoryService(_categoryRepository, _fileStorageService, _mapper);
            var categoryController = new CategoryController(categoryService);

            var newCategory = new CreateCategoryDto { Name = "Laptop 2", Desc = "ABC" };

            // Act
            var result = await categoryController.CreateAsync(newCategory);

            // Assert
            result.Result.Should().HaveStatusCode(StatusCodes.Status201Created);
            result.Should().NotBeNull();

            var createdResult = Assert.IsType<CreatedResult>(result.Result);
            var returnValue = Assert.IsType<CategoryDto>(createdResult.Value);

            Assert.Equal(newCategory.Desc, returnValue.Desc);
            Assert.Equal(newCategory.Name, returnValue.Name);

            returnValue.Should().NotBeNull();
        }

        [Fact]
        public async Task Get_All_Categories()
        {
            //Arrange
            var category1 = new Category { Name = "Cate 1", Desc = "Code1" };
            var category2 = new Category { Name = "Cate 2", Desc = "Code2" };
            var category3 = new Category { Name = "Cate 3", Desc = "Code3" };
            var category4 = new Category { Name = "Cate 4", Desc = "Code4" };
            await _categoryRepository.AddAsync(category1);
            await _categoryRepository.AddAsync(category2);
            await _categoryRepository.AddAsync(category3);
            await _categoryRepository.AddAsync(category4);

            var categoryService = new CategoryService(_categoryRepository, _fileStorageService, _mapper);
            var categoryController = new CategoryController(categoryService);

            // Act
            var result = await categoryController.GetAsync();

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(4);
        }
    }
}