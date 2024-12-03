---
title: "Testing your code part 3 - ClassData and MemberData"
description: ""
date: "2018-04-04"
draft: false
slug: testing-your-code-part-3-classdata-and-memberdata
tags: 
  - net
  - csharp
  - tests
  - unittests
  - xunit
---

In the previous article we've seen how to use the `[Theory]` attribute with `[InlineData]`, which allow us to have static elements to feed our tests methods. This particular approach can bring lots of noise inside our code, especially when dealing with 10 or more test methods in the same class.

In this article we'll see how to use `[ClassData]` and `[MemberData]` attributes in order to make our testing code more dynamic.

## ClassData

`[ClassData]` attribute, always combined with the `[Theory]` one, accepts a `type` parameter. This parameter will be a class used to obtain the data and must implement `IEnumerable` :

```csharp
public class TestDataGenerator : IEnumerable<object[]>  
{
    public IEnumerator<object[]> GetEnumerator()
    {
        yield return new object[] { 50, 50 };
        yield return new object[] { 25, 75 };
        yield return new object[] { 80, 20 };
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
```

`TestDataGenerator` class will give us 3 group of parameters made by 2 elements each. That means that our test method will support 2 int as input parameters.

This is a test method that can use the `TestDataGenerator` as a parameter for the `[ClassData]` attribute:

```csharp
[Theory]
[ClassData(typeof(TestDataGenerator))]
public void SumMustBe100(int num1, int num2)
{
    Assert.Equal(100, num1 + num2);
}
```

## MemberData

The `[MemberData]` attribute accepts a `nameof` parameter and can be used to fetch data from a static property or a particular method. There are many different implementations for this attribute, but I'll go through the simplest ones for the moment.

In this example we see how to fetch data using a static property:

```csharp
[Theory]
[MemberData(nameof(Data))]
public void SumMustBeZero(int num1, int num2)
{
    Assert.Equal(0, num1 + num2);
}

public static IEnumerable<object[]> Data =>
    new List<object[]>
    {
        new object[] { -1, 1 },
        new object[] { -100, 100 },
        new object[] { 0, 0 },
    };
```

In this one we see how to fetch data from a static method, also passing a parameter (the number of tests we want to take into account in this example):

```csharp
[Theory]
[MemberData(nameof(MemberDataMethod), parameters: 3)]
public void SumMustBeZero(int num1, int num2)
{
    Assert.Equal(0, num1 + num2);
}

public static IEnumerable<object[]> MemberDataMethod(int testNum)
{
    var someData = new List<object[]>
    {
        new object[] { -3, 3 },
        new object[] { -12345, 12345 },
        new object[] { -99, 99 },
        new object[] { -619, 619 },
    };

    return someData.Take(testNum);
}
```

That's all for now. Hope you enjoyed the article. See you in the next one!
