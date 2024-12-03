---
title: "How to integrate ASP.NET Identity Core inside your web application"
description: ""
date: "2018-11-27"
draft: false
slug: how-to-integrate-asp-net-identity-core-inside-your-web-application
tags: 
  - asp-net-core
  - identity
  - security
  - web
---

In this tutorial I will show you how to integrate one of the most complete and easy to use authentication system in your aspnet core web application. This is called ASP.NET Identity Core and it allows your application to handle user identification and management almost out of the box.

## Prerequisites

This tutorial is for anyone who has or would like to build a web application based on Microsoft's aspnet core framework (from the 2.1 on). At this point I suppose anyone who's reading (is there really anyone?) has familiarity with text editors, IDEs and web applications.

Let's assume we have our wonderful mvc application, with our controllers, our views and our models. But we need to allow users to have different access levels and let them see only certain resources. In order to do this we need to identify them and assign roles. Every user will be able to authenticate with a username/password pair for the moment and maybe, later on, we'll see how to add support for external identity provider such as facebook, google or twitter.

## Nugets

First thing we need to do is to make sure that Microsoft.AspNetCore.Identity namespace is available. If not we need to install [Microsoft AspNetCore Identity](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity/) nuget.

Now we need to install [EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore/) nuget, which will be our trusted ORM and will save us lots of time when it comes to load and store user's data permanently.

You can use Microsoft's integrated package manager to automatically install all nugets' dependencies whether you're using Visual Studio or Visual Studio Code.

## Startup configuration

In order to let EFCore do its magic, you need to create your own application context, extend **IdentityDbContext** and pass **DbContextOptions** to the base class (this will make more sense later):

```csharp
public class ApplicationContext : IdentityDbContext
{
    public ApplicationContext(DbContextOptions options)
        : base(options)
    {
    }
}
```

The application context will act as a container for our users and will allow us to read and save all user data with simple calls.

Now it's time for the Startup.cs file to conquer the stage. This is where all the app initial configurations take place. First we need access to our application configs (store inside the **appsettings.json** file). To do this, we just need to build up the class constructor, ask for an `IConfiguration` parameter and save it inside a property.

```csharp
public Startup(IConfiguration configuration)
{
    Configuration = configuration;
}

public IConfiguration Configuration { get; }
```

Then take a look at `ConfigureServices` method and add the following lines (right before the AddMvc() injection, if any):

```csharp
services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(
        Configuration.GetConnectionString("DefaultConnection")));
services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<ApplicationContext>();
services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.LogoutPath = "/Account/Logout";
});
```

This way we're simply telling the app to:

- read the connection string from our **appsettings.json** file
- setup entity framework to read/store users using the application context we created a while ago
- override basic paths (Identity Core comes with lots of pre-boiled code and views nowadays, in case you're too lazy to build your own user interfaces)

Finally, let's jump to the `Configure` method. Aspnet core has a fantastic feature called [middleware pipeline](https://docs.microsoft.com/it-it/aspnet/core/fundamentals/middleware/?view=aspnetcore-2.1) which allows you to insert and remove independent components to evaluate requests and generate response in a chain.

Here we'll add the authentication middleware (always right before the Mvc one):

```csharp
app.UseAuthentication();
```

## Db connection and scaffolding

Now let's head to the **appsettings.json** file and define a connection string object like this:

```json
{
  ...
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MyDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  ...
}
```

We should now be ready to setup the database schema using EFCore. Simply open the Package Manager Console and type **Add-Migration CreateIdentitySchema**. This will create a new **migration** file with all the specification that will be converted in SQL queries. You should recognise a couple of CREATE TABLE among the generated code. After that, in the same prompt run **Update-Database**. This command will compile the generated file and produce all the queries to structure your DB. Ok, now you should be asking: "Which DB?". Well, the connection string we defined before will instruct EFCore to create an mdf file in you home directory which will be your database. You're free to switch to whatever endpoint/provider you like. Take a look at the EFCore github repo for more information.

## MVC

All right, now that we have correctly setup the basics for our authentication system, we need to provide the minimal set of models/views/controllers in order to interact with that system. What we need is:

- an AccountController to handle at least Login actions (GET/POST), Logout and Register (GET/POST)
- at least one view for each action
- a UserViewModel class to be used in requests and responses.

You can find a basic setup here => [AccountController](https://github.com/battxbox/SbAdminCore/blob/develop/SbAdminCore.Web/Controllers/AccountController.cs)

A basic access configuration can be accomplished using Microsoft.AspNetCore.Authorization attributes like `[AllowAnonymous]` on each controller/action or acting directly on the global filters like this (in the `ConfigureServices` method):

```csharp
services.AddMvc(config =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    config.Filters.Add(new AuthorizeFilter(policy));
});
```

This way we create a policy which restricts access to authenticated user only for the entire application. We can then add the `[AllowAnonymous]` attribute to the login action in order to let the users see at least the login page.
