---
title: "Handle multi types basic crud operations in Entity Framework"
description: ""
date: "2018-04-09"
draft: false
slug: handle-multi-types-basic-crud-operations-in-entity-framework
tags: 
  - net
  - csharp
  - tests
  - unittests
  - xunit
---

Sometimes we find ourselves in the need of handling various types of objects (or entities) while using Entity Framework as ORM for our projects. The situation can be a bit more struggling when the project is not big enough to justify the use of a Repository Pattern but it's big enough to cause lots of "noise" in the code when trying to handle basic CRUDs for each entity type.

So I came up with a solution that can handle the basic CRUDs you need within the same class:

```csharp
public class Repository
{
    private readonly ApplicationDbContext _context;

    public Repository()
    {
        _context = new ApplicationDbContext();
    }

    public IList<T> GetEntities<T>() where T : ContextEntity
    {
        return _context.Set<T>().ToList();
    }

    public T GetEntity<T>(int id) where T : ContextEntity
    {
        return _context.Set<T>().Find(id);
    }

    public bool DeleteEntity<T>(int id) where T : ContextEntity
    {
        var entity = _context.Set<T>().FirstOrDefault(p => p.Id == id);
        if (entity == null) return false;
        _context.Set<T>().Remove(entity);
        _context.SaveChanges();
        return true;
    }

    private void AddEntity<T>(T entity) where T : ContextEntity
    {
        _context.Set<T>().Add(entity);
        _context.SaveChanges();
    }

    private void UpdateEntity<T>(T entity) where T : ContextEntity
    {
        _context.Entry(entity).CurrentValues.SetValues(entity);
        _context.SaveChanges();
    }

    public void SaveEntity<T>(T entity) where T : ContextEntity
    {
        var oldEntity = _context.Set<T>().Find(entity.Id);
        if (oldEntity == null)
        {
            AddEntity(entity);
        }
        else
        {
            UpdateEntity(entity);
        }
    }
}
```

`ApplicationDbContext` is the class implementing DbContext from EF. `T` will be class type you defined for the `DbSet`. For example:

```csharp
public DbSet<Car> Cars { get; set; }
public DbSet<Truck> Trucks { get; set; }
```

In this example, `Car` and `Truck` must extend the base class `ContextEntity` which will contain an `Id` property:

```csharp
public class ContextEntity
{
    public int Id { get; set; }
}
```

Like this:

```csharp
public class Car : ContextEntity
{
    public int Year { get; set; }
    public float Speed { get; set; }
    public string Engine { get; set; }
}
```

This way you can have only 1 class handling basic Get, GetAll, Save, Delete, etc..., operations for all your EF entities. Things get complicated when you have foreign keys and need to do complex query. But we'll find out how to handle this kind of situation in the next article. Enjoy!
