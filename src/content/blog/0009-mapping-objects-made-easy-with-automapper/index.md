---
title: "Mapping objects made easy with AutoMapper"
description: ""
date: "2020-01-12"
draft: false
slug: mapping-objects-made-easy-with-automapper
tags: 
  - net
  - asp-net
  - asp-net-core
  - automapper
  - csharp
  - object-mapping
---

## What's AutoMapper

[AutoMapper](https://automapper.org/) is a powerful tool for .NET developers used for object mapping, created by [Jimmy Bogard](https://github.com/jbogard). It is used to map different objects (classes or structs in our case) without having to manually copy each object's member one by one.

How many times have you found yourself in this situation:

```csharp
public PersonDto GetPerson(int id)
{
    var person = _repository.GetPerson(id);
    var dto = new PersonDto
    {
        FirstName = person.FirstName,
        LastName = person.LastName,
        Age = person.Age,
    };
    return dto;
}
```

What if your objects have 10/20 properties each? You can imagine the struggle. Here's where AutoMapper comes to the aid:

```csharp
PersonDto dto = mapper.Map<PersonDto>(person);
```

Just make sure to follow its conventions like: source and destination objects' members must have the same name (Person.FirstName and PersonDto.FirstName). For further examples and to read more, please have a look at the official [Getting started guide](https://automapper.readthedocs.io/en/latest/Getting-started.html).

## How to use it

First you have to install the [AutoMapper nuget](https://www.nuget.org/packages/automapper/) from the package manager console:

![](images/image.png)

Once everything is installed, you have to create a configuration in order to instruct AutoMapper on what to map:

```csharp
var config = new MapperConfiguration(cfg =>
{
    cfg.CreateMap<Person, PersonDto>();
});
```

Now you can instantiate a mapper and do the actual mappings:

```csharp
var mapper = config.CreateMapper();
PersonDto dto = mapper.Map<PersonDto>(person);
```

## AutoMapper for web applications

If you're making a web application using ASP.NET Core for instance, one of the most common places to put the mapping configuration is inside the ConfigureServices:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAutoMapper(cfg =>
    {
        cfg.CreateMap<Person, PersonDto>(); 
    }, typeof(Startup));
    services.AddControllersWithViews();
}
```

NOTE: in order to use the `AddAutoMapper` extension, you also have to install the [AutoMapper.Extensions.Microsoft.DependencyInjection](https://www.nuget.org/packages/AutoMapper.Extensions.Microsoft.DependencyInjection/) nuget:

![](images/image-1.png)

This way you'll also be able to leverage the built-in dependency injection and spread the already configured mapper to every controller that needs it:

```csharp
public class HomeController : Controller
{
    private readonly IMapper _mapper;

    public HomeController(IMapper mapper)
    {
        _mapper = mapper;
    }

    public IActionResult Index()
    {
        var person = new Person();
        var dto = _mapper.Map<PersonDto>(person);
        return View();
    }
}
```

## Test your mappings

It's a good practice to test your mappings before running the main application. For instance, you can create a Test project (using [xUnit](https://xunit.net/) nuget as an example) with a simple test which will be in charge of simulating your mapping configuration (you can make a bootstrap class and share it among projects in order to avoid obsolete duplicates) and run `config.AssertConfigurationIsValid()`. This method will throw an exception in case of unmapped properties or any mapping error:

```csharp
public class ExampleTest
{
    [Fact]
    public void TestAutoMapperConfiguration()
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Person, PersonDto>();
        });
        config.AssertConfigurationIsValid();
    }
}
```
