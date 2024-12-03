---
title: "Make a fully functional ASP.NET Core application out of a bootstrap admin template"
description: ""
date: "2018-11-20"
draft: false
slug: make-a-fully-functional-asp-net-core-application-out-of-a-bootstrap-admin-template
tags: 
  - asp-net-core
  - bootstrap
  - csharp
  - dashboard
  - template
---

In the last couple of years, it happened quite often that I had to build a web application to serve as a backoffice administration panel. So I took a fresh asp.net core application plus a static admin template and I made them working together with a database connection, a bunch of models/controllers and some JavaScript. More or less the same things every single time.

So, this time I decided to start it again from scratch, but putting everything on GitHub. This way it'll be available to anyone and, yes, to me when I'll need it again.

Basic features will be:

- Authentication system based on Identity Core
- User profile management
- Database connection with EF Core
- Charts and tables population with fake data

Some future improvements could be:

- Offline messages between users
- A contact list
- A calendar
- Whatever comes to my mind while building the project

You can find a draft of the project [here on GitHub](https://github.com/battxbox/SbAdminCore). The html template I chose for my project is the [SbAdmin](https://startbootstrap.com/template-overviews/sb-admin/) one by [David Miller](http://davidmiller.io/). David is a web developer founder of the [StartBootstrap](https://startbootstrap.com/) project. On his website you can find many kind of (as you can guess from the name) bootstrap templates: from a blog post layout to a complete admin UI.
