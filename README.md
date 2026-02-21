Source files for www.antoniovalentini.com

## How to build

Scaffold an Astro.js project
```
npm create astro@latest
```

Install dependencies
```
npm install
```

Build
```
npm run build
```

Run locally
```
npm run dev
```

## Style customizations

### src/components/Container.astro
```xml
<div class="mx-auto max-w-(--breakpoint-md) px-3"><slot /></div> <!-- intead of breakpoint-sm -->
```

### src/styles/global.css

```css
main {
  @apply flex-1 py-28; /* instead of 32 */
}
```

### src/pages/index.astro

```xml
<div class="space-y-16"> <!-- intead of 10 -->
```

### wrap tags inside each article using flex-wrap
```xml
<div class="animate flex flex-wrap gap-2 pt-1">
  <!-- tags here -->
</div>
```

### Styles for YouTube iframe

```css
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
}
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```
