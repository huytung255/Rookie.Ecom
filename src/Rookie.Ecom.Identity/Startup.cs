using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Rookie.Ecom.Business;
using Rookie.Ecom.DataAccessor;
using Rookie.Ecom.DataAccessor.Data;
using Rookie.Ecom.DataAccessor.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;

namespace Rookie.Ecom.Identity
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment CurrentEnvironment { get; }
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            CurrentEnvironment = env;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<AppIdentityDbContext>(options =>
            //{
            //    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            //});


            services.AddBusinessLayer(Configuration);
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
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });

            services.AddMvc()
            .AddFluentValidation(fv =>
            {
                fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            })
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
                options.SerializerSettings.DateFormatString = "dd'/'MM'/'yyyy";
            })
            .ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = c =>
                {


                    var errors = string.Join('\n', c.ModelState.Values.Where(v => v.Errors.Count > 0)
                        .SelectMany(v => v.Errors)
                        .Select(v => v.ErrorMessage));

                    return new BadRequestObjectResult(new
                    {
                        ErrorCode = StatusCodes.Status400BadRequest,
                        Message = errors
                    });
                };
            });
            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
            //JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ADMIN_ROLE_POLICY", policy =>
                {
                    policy.AddAuthenticationSchemes("Bearer");
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("CUSTOMER_ROLE_POLICY", policy =>
                {
                    policy.AddAuthenticationSchemes("Bearer");
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("Customer");
                });
                options.AddPolicy("DEFAULT_AUTHENTICATE_POLICY", policy =>
                {
                    policy.AddAuthenticationSchemes("Bearer");
                    policy.RequireAuthenticatedUser();
                });
                options.DefaultPolicy = options.GetPolicy("DEFAULT_AUTHENTICATE_POLICY");
            });

            //services.AddIdentityServer()
            //.AddDeveloperSigningCredential()
            //.AddInMemoryIdentityResources(InitData.GetIdentityResources())
            //.AddInMemoryClients(InitData.GetClients())
            //.AddInMemoryApiScopes(InitData.ApiScopes)
            //.AddInMemoryApiResources(InitData.ApiResources)
            //.AddAspNetIdentity<User>();

            var builder = services.AddIdentityServer()
            .AddDeveloperSigningCredential()
            .AddInMemoryIdentityResources(InitData.GetIdentityResources())
            .AddInMemoryApiScopes(InitData.ApiScopes)
            .AddInMemoryClients(InitData.GetClients())
            .AddAspNetIdentity<User>();

            SeedIdentityData.EnsureSeedData(Configuration.GetConnectionString("DbConnection"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("AllowOrigins");
            app.UseIdentityServer();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=home}/{action=Index}/{id?}");
            });
        }
    }
}
