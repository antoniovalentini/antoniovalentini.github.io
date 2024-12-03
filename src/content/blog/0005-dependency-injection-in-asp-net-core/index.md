---
title: "Quick introduction on how to use the ASP.NET Core built-in dependency injection"
description: ""
date: "2018-09-20"
draft: false
slug: dependency-injection-in-asp-net-core
tags: 
  - asp-net-core
  - csharp
  - dependency-injection
  - di
  - web
---

## Intro

Dependency injection is a programming technique where an object (the client) gets a dependency (i.e. a service) supplied by another object (the injector). This way the client delegates the "burden" of knowing how to implement a certain service to another class, actually decoupling itself from the service. Dependency Injection is also a design pattern used to provide Inversion of Control, which supports the dependency inversion principle (the D from the SOLID acronym).

Imagine you have a class with the responsibility to log an event. This class logs the event using the console:

```csharp
public class ConsoleLogger : ILogger
{
    public void Log(string msg)
    {
        Console.WriteLine($"Logged on console: {msg}");
    }
}

public class SomeManager
{
    public void TraceEvent()
    {
        var logger = new ConsoleLogger();
        logger.Log("Log Message");
    }
}
```

Now, applying the DI technique, the class will look like this more or less:

```csharp
public class ManageWithDi
{
    private readonly ILogger _logger;

    public ManageWithDi(ILogger logger)
    {
        _logger = logger;
    }

    public void TraceEvent()
    {
        _logger.Log("Log message");
    }
}
```

Last but not least, in a very simplified view, you can setup a central point in your application which will be responsible of "injecting" the correct service implementations to all your client classes. This central point is called IoC Container. This is just to give you an idea about DI and IoC. If you wanna read more, you can follow this link.

## DI in ASP.NET Core

Asp Net Core provides a built in system for dependency injection, with its container taking place in the Startup.cs file, inside the ConfigureServices method. This way you can set all the dependencies and related scopes during the application startup. Possible scopes can be:

- Singleton: the same instance will be used for the entire application lifecyle
- Transient: a new instance will be created every time it is needed
- Scoped: the same instance will be shared within the same web request

The container comes with a predefined set of extensions to facilitate your work in the most common scenarios like implementing a entity framework db, an identity system, or the MVC pattern itselfs:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext(options => ... );
    services.AddMvc();
}
```

Or you can just create your own:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddTransient<ILogger, ConsoleLogger>();
}
```

In this case, the ILogger requested by the HomeController will be of ConsoleLogger type.

There are 3 main ways to get an injected service:

- by constructor
- by action method
- manually

### Constructor Injection

```csharp
public HomeController(ILogger logger)
{
    _logger = logger;
}
```

### Action Method Injection

```csharp
public IActionResult Index([FromServices] ILogger logger)
{
    logger.Log("Index method executing");

    return View();
}
```

### Manual Injection

```csharp
public IActionResult Index()
{
    var services = this.HttpContext.RequestServices;
    var logger = (ILogger)services.GetService(typeof(ILogger));
    
    logger.Log("Index method executing");
    
    return View();
}
```

Remember to let your injected service implement IDisposable in order to be automatically disposed at the end of the scoped lifetime. Further readings about the DI inside ASP.NET Core can be found here: [https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.1](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.1)
