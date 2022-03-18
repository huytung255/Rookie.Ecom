using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Rookie.Ecom.DataAccessor.Data;
using Rookie.Ecom.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.DataAccessor
{
    public class SeedIdentityData
    {
        public static void EnsureSeedData(string connectionString)
        {
            var services = new ServiceCollection();
            services.AddLogging();

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            services.AddIdentity<User, IdentityRole<Guid>>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 0;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.Password.RequiredUniqueChars = 0;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            using var serviceProvider = services.BuildServiceProvider();
            using var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
            context.Database.Migrate();

            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
            userMgr.UserValidators.Add(new UserValidator<User>());
            var roleMgr = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

            var admin = roleMgr.FindByNameAsync("Admin").Result;
            if (admin == null)
            {
                admin = new IdentityRole<Guid>
                {
                    Name = "Admin",
                };

                var result = roleMgr.CreateAsync(admin).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
            }

            var customer = roleMgr.FindByNameAsync("Customer").Result;
            if (customer == null)
            {
                customer = new IdentityRole<Guid>()
                {
                    Name = "Customer"
                };

                var result = roleMgr.CreateAsync(customer).Result;

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

            }

            var user1 = userMgr.FindByNameAsync("admin").Result;
            if (user1 == null)
            {
                user1 = new User
                {
                    FullName = "John Doe",
                    UserName = "admin",
                    Email = "admin@ecom.com",
                    UserAddress = "791 Aviation Way, Gardena, California",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    Dob = DateTime.ParseExact("2000-05-25", "yyyy-MM-dd", null),
                    PhoneNumber = "0123456789"
                };
                var result = userMgr.CreateAsync(user1, "admin").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }


                result = userMgr.AddToRoleAsync(user1, "Admin").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
            }

            var user2 = userMgr.FindByNameAsync("customer1").Result;
            if (user2 == null)
            {
                user2 = new User
                {
                    FullName = "Mark Chris",
                    UserName = "customer1",
                    Email = "customer1@example.com",
                    UserAddress = "1414 Willis Avenue, Port Orange, Florida",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    Dob = DateTime.ParseExact("2000-01-01", "yyyy-MM-dd", null),
                    PhoneNumber = "0123456789"
                };
                var result = userMgr.CreateAsync(user2, "password@123").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                result = userMgr.AddToRoleAsync(user2, "Customer").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
            }

            var user3 = userMgr.FindByNameAsync("customer2").Result;
            if (user3 == null)
            {
                user3 = new User
                {
                    FullName = "Felicity Gage",
                    UserName = "customer2",
                    Email = "customer2@example.com",
                    UserAddress = "2207 Prospect Valley Road, Irvine, California",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    Dob = DateTime.ParseExact("2000-02-02", "yyyy-MM-dd", null),
                    PhoneNumber = "9876543210"
                };
                var result = userMgr.CreateAsync(user3, "password@123").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                result = userMgr.AddToRoleAsync(user3, "Customer").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
            }


        }
    }
}
