using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ConfigurationManager.Repositories;
using ConfigurationServer.CustomMiddlewares;
using ConfigurationManager.Publisher;

namespace ConfigurationServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Enabling Cors because of client app will be served in different port
            //instead of allowing any origin we can set specific client application url
            string clientUrl = Environment.GetEnvironmentVariable("ClientUrl");
            if (clientUrl == null)
            {
                clientUrl= Configuration["ClientUrl"];
            }
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins(clientUrl)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            string connStr = Environment.GetEnvironmentVariable("ConnStr");
            if (connStr == null)
            {
                connStr= Configuration["ConfigurationManagerDBConnectionString"];
            }

            string interval = Environment.GetEnvironmentVariable("RefreshInterval");
            if (interval == null)
            {
                interval= Configuration["ConfigurationManagerRefreshInterval"];
            }

            services.AddScoped<IConfigurationSettingRepository>(s => new MongoConfigurationSettingRepository(connStr));
            services.AddSingleton<IConfigurationPublisher>(s => new ConfigurationPublisher(connStr, int.Parse(interval)));
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            //Middleware for Error Management With Custom Exception Types
            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseMvc();
        }
    }
}
