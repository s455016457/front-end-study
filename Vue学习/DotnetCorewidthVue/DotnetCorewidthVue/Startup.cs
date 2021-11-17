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
                config.RootPath = "client_app/dist"; //�˴�build ��Ӧvue��Ŀ�ķ����ļ�������
                                                     //��δ����vue��Ŀ��build�ļ������������޸�Ϊdist
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

            #region ��ӵ�ҳ��webӦ��  vue
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
                //    //�˴�����Ϊ����ʱ���ⲿ����vue��Ŀ��Ҳ����˵������asp.net coreǰ��Ҫ���������vue��Ŀ
                //    spa.UseProxyToSpaDevelopmentServer("http://localhost:8084");
                //}
            });
            #endregion
        }
    }
}
