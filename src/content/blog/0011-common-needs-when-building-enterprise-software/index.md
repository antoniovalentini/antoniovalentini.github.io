---
title: "Common needs when building enterprise software"
description: ""
date: "2020-04-14"
draft: false
slug: common-needs-when-building-enterprise-software
tags: 
  - coding-standards
  - development
  - enterprise-software
  - software-engineer
---

During these days, I've been wondering a lot about the **Software Engineer** role. According to Wikipedia "_A software engineer is a person who applies the principles of software engineering to the design, development, maintenance, testing, and evaluation of computer software_". This role is relatively young, compared to more ancient ones like Architects or Mechanical Engineers for example, and honestly, I can't help but think of the differences when it comes to designing a product.

For instance, if you were in charge of building a new airplane model, I'm ready to bet that no one would force you to apply a risky workaround just because "_we had to ship this yesterday_". But that's not exactly the point. The big difference that I see is that every (good) mechanical engineer knows how to build an engine, or at least, he or she knows what are the basic components to make an "internal combustion engine" for example. So, **standard product design definition**. When you have to build software instead, let's say a very standard order management application, you may choose among dozen of architectures, components, and coding styles. Some may have advantages and some may not. But mostly, it always depends on the tech-lead/manager/senior/bigger guy's TASTE who's in charge of leading the project, even though the core company's needs are mostly the same in most of the cases.

Of course, this may be based on my personal perception only, but after 8 years of work (not a lot but still a thing) more or less in the same field, I'm able to recognize various **common needs** when it comes to building a certain type of software, among different companies.

If a company has to sell a product online, whether it's a physical or a digital one, there are some **common aspects** that should be handled regardless of the product type, the company type, the technology stack or the IT manager's personal taste. Let's imagine you want to build a set of APIs that allows customers to buy products using some sort of web UI, some common aspects or **challenges** that you're likely to face, no matter the context, may be:

- validating inputs
- logging and auditing web requests (probably distributed among different services)
- communication to the business layer
- asynchronous events (activate newsletter upon registration)
- feature flags structure (activate/deactivate features based on configuration)
- and so on...

I'm not saying that we can build all the programs in the same way, but I'm pretty sure we could agree on a widely recognized standard for certain macro areas of software, especially when technology acts as a support for the core business.

To keep it short, this will be the first of a series (hopefully) of articles where I try to figure out the "common needs" when it comes to building a specific software or web application inside an enterprise environment. To do this, I'll think about a software idea (the more common the better) and I'll try to develop it focusing more on concepts and patterns then the program logic itself. This way I hope to come up with a versatile product that could be easily adapted to a different context and it will also serve as a fun way for me to practice standard coding techniques.
