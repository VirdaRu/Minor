using Microsoft.AspNetCore.Mvc;
using REST_API;
using System.Net.Http;

public class Program 
{
    public static void Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        
        builder.Services.AddControllersWithViews();
        builder.Services.AddCors(options => {
            options.AddDefaultPolicy( policy =>
            {
                policy.AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        

        app.UseCors();
        app.MapControllers();
        app.Run();
    }



}