---
title: "Family budget app - The basics"
description: ""
date: "2025-04-01"
draft: true
slug: family-budget-app-the-basics
tags:
  - asp.net
  - dotnet
  - postgres
  - finance
  - budget
  - savings
---

## Components

- web api
minimal api was too cluttered. moved to controllers


- entity framework
from the infrastructure project
dotnet ef migrations add InitialMigration --startup-project ..\Expensi.Api\
dotnet ef database update --startup-project ..\Expensi.Api\

but then i moved infra code inside the api project for simplicity

- dtos

- kiota
https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/customize-openapi?view=aspnetcore-9.0#use-schema-transformers
to avoid decimals to be converted to double

kiota generate -d http://localhost:5038/openapi/v1.json -l csharp --output ./Client -c ExpensiClient -n Expensi.UIClient


- ui
