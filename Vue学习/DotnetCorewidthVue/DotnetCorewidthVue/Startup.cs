using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotnetCorewidthVue
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

            services.AddControllersWithViews();
            services.AddSpaStaticFiles(config => {
                config.RootPath = "client_app/dist"; //此处build 对应vue项目的发布文件夹名。
                                                     //如未配置vue项目的build文件夹名，则需修改为dist
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DotnetCorewidthVue", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DotnetCorewidthVue v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllers();
            //});

            #region 添加单页面web应用  vue
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseEndpoints(options => {
                options.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=index}/{id?}"
                    );
            });

            app.UseSpa(spa => {
                spa.Options.SourcePath = "client_app";
                //if (env.IsDevelopment())
                //{
                //    //此处配置为调试时从外部引入vue项目，也就是说在运行asp.net core前需要先启动你的vue项目
                //    spa.UseProxyToSpaDevelopmentServer("http://localhost:8084");
                //}
            });
            #endregion
        }
    }
}
