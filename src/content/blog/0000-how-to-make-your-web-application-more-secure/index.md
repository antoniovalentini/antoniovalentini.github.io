---
title: "How to make your web application more secure"
description: ""
date: "2018-03-04"
draft: false
slug: how-to-make-your-web-application-more-secure
tags:
  - headers
  - security
  - xss
---

While finalizing the new UI for my website, I decided to spend a bit of time concentrating on security, even though time’s never enough. There are lots of different aspects to be taken into account when you want to develop a web application that is publicly accessible. For example:

1.  which external assets are you integrating?
2.  what input do you allow users to submit?
3.  what does the hosting provider tell users about your environment?
4.  and so on….

I’m not a security expert so I must rely on the thousands resources on the web and on my common sense of course. Among the security experts around the world, I’ve found the following very interesting and super super comprehensible:

- **Scott Helme**: a Security Researcher, international speaker and author of [this blog](https://scotthelme.co.uk). He is also the founder of [securityheaders.io](https://securityheaders.io/) and [report-uri.com](https://report-uri.com/) 
- **Troy Hunt**: Pluralsight teacher, Microsoft Regional Director and MVP, author of [this blog](https://www.troyhunt.com/)
- **Muhammad Rehan Saeed**: senior software developer, Microsoft MVP, author of [this blog](https://rehansaeed.com/)

## External Assets

There are an infinity of external assets out there waiting to be integrated in your project. Basic ones are [bootstrap](https://getbootstrap.com/), [jQuery](https://jquery.com/), [font-awesome](https://fontawesome.com/) and so on. Many of them are essentials for styling and scripting (unless you don’t want to reinvent the wheel). Nobody can say “you can trust this one and not that one”, because a breach in THEIR code is also a breach in YOUR code.

First rule, as usual, is to retrieve as much documentation and opinions as possible before you integrate an external asset. Then you have to decide if self-hosting the asset or relying on the [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) if available. I’ll make an example with bootstrap below.

Self-Hosted:

`<link rel="stylesheet" href="folder_on_my_server/bootstrap/4.0.0/css/bootstrap.min.css" crossorigin="anonymous">`

CDN:

`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" crossorigin="anonymous">`

The difference is where actually the file’s stored. When you have to upgrade your asset, if you’re self-hosting it then you have to upload the new version on your server and update the reference in your html. If you’re using CDN, you just have to change the html. But remember, if the CDN url you’re referencing gets hacked and the asset is replaced with a malicious script, then you’ll allow the malicious code to be executed on you machine.

## Input from users

I could spend a thousand words here, but I’ll be as concise as I can. You must ALWAYS validate your input and ALWAYS server-side. A simple contact form that writes directly in your database could lead to catastrophic consequences if not properly validated. [Microsoft Entity Framework](https://docs.microsoft.com/it-it/ef/) is a very good starting point. See [this link](https://en.wikipedia.org/wiki/SQL_injection) for further information about SQL Injection techniques.

## Headers

In digital communication, each packet travelling through the network has its own “header” together with a payload (the actual data). Usually we tend to concentrate more on payloads then headers, but we must take into consideration that a header can carry lots of important information and can be exploited to carry out different attacks against the server, the website or a component included in your website.

Some headers can be added or removed in order to improve your application security, even though it heavily depends on where you’re hosting your application. As starting point, I used Scott Helme’s [securityheaders.io](https://securityheaders.io/) web scanner to have a first Security Report. Just type your website address and wait for it to end the scanning. At the end of the scan, it’ll provide you a list of the security leaks and also some information on how to fix them. 

From now on I’ll discuss the main headers evaluated from Scott’s service that you can modify from your application, without messing with the web server settings. The examples will refer to an ASP.NET web application. Again, I’m not a security expert, so I’ll just summarise what I’ve found reading this [Scott’s blog post about headers](https://scotthelme.co.uk/hardening-your-http-response-headers/).

### X-XSS-Protection

This header is used to configure the built-in reflective XSS protection found in Internet Explorer, Chrome and Safari (Webkit). Valid settings for the header are `0`, which disables the protection, `1` which enables the protection and `1; mode=block` which tells the browser to block the response if it detects an attack rather than sanitising the script.

Add this inside your web.config:

`<add name="X-XSS-Protection" value="1; mode=block" />`

### X-Frame-Options

The X-Frame-Options header ([RFC](https://tools.ietf.org/html/rfc7034)), or XFO header, protects your visitors against clickjacking attacks. Troy Hunt has a great blog on [Clickjack attack – the hidden threat right in front of you](https://www.troyhunt.com/clickjack-attack-hidden-threat-right-in/).

Add this inside your web.config:

`<add name="X-Frame-Options" value="SAMEORIGIN" />`

### X-Content-Type-Options

Nice and easy to configure, this header only has one valid value, `nosniff`. It prevents Google Chrome and Internet Explorer from trying to mime-sniff the content-type of a response away from the one being declared by the server. It reduces exposure to drive-by downloads and the risks of user uploaded content that, with clever naming, could be treated as a different content-type, like an executable.

Add this inside your web.config:

`<add name="X-Content-Type-Options" value="nosniff" />`

### Strict-Transport-Security

HSTS allows you to tell a browser that you always want a user to connect using HTTPS instead of HTTP. This means any bookmarks, links or addresses the user types will be forced to use HTTPS, even if they specify HTTP. Read more on Scott’s blog on [HSTS – The Missing Link In Transport Layer Security](https://scotthelme.co.uk/hsts-the-missing-link-in-tls/).

Add this inside your web.config (max age equals to 365 days):

`<add name="Strict-Transport-Security" value="max-age=31536000; includeSubdomains" />`

### Referrer-Policy

When a user clicks a link on one site, the origin, that takes them to another site, the destination, the destination site receives information about the origin the user came from. This referer header lets me know where the inbound visitor came from, and is really handy, but there are cases where we may want to control or restrict the amount of information present in this header like the path or even whether the header is sent at all. See this Scott’s blog post for more information [A new security header: Referrer Policy](https://scotthelme.co.uk/a-new-security-header-referrer-policy/).

Add this inside your web.config:

`<add name="Referrer-Policy" value="no-referrer-when-downgrade" />`

### Content-Security-Policy

This is a very long story. Basically you can decide what/when/where/how assets (i.e. scripts or stylesheets) can run in your web application. You can decide to run all the scripts excepts inline ones (same for stylesheets), allow only few external urls where you can gather assets, and so on. As you see, this can limit the resources your site is able to load so much, which can lead your website to show only characters without any style or scripting automation. So BE VERY CAREFUL when you set this header. Read this [Scott’s blog post for wide introduction on CSP](https://scotthelme.co.uk/content-security-policy-an-introduction/). In this case there’s not typical configuration. You must set this header according to your needs.

Perfect, I think it’s enough for now. There are some things left like removing Server and Versions headers, but I’ll tackle them in the next post.

Hope you enjoyed it!!