import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://antoniovalentini.github.io",
  integrations: [tailwind(), sitemap(), mdx(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
  redirects: {
    "/how-to-make-your-web-application-more-secure": "/blog/how-to-make-your-web-application-more-secure",
    "/testing-your-code-part-1-intro-and-facts/": "/blog/testing-your-code-part-1-intro-and-facts/",
    "/testing-your-code-part-2-theories-and-inlinedata/": "/blog/testing-your-code-part-2-theories-and-inlinedata/",
    "/testing-your-code-part-3-classdata-and-memberdata/": "/blog/testing-your-code-part-3-classdata-and-memberdata/",
    "/handle-multi-types-basic-crud-operations-in-entity-framework/": "/blog/handle-multi-types-basic-crud-operations-in-entity-framework/",
    "/dependency-injection-in-asp-net-core/": "/blog/dependency-injection-in-asp-net-core/",
    "/make-a-fully-functional-asp-net-core-application-out-of-a-bootstrap-admin-template/": "/blog/make-a-fully-functional-asp-net-core-application-out-of-a-bootstrap-admin-template/",
    "/how-to-integrate-asp-net-identity-core-inside-your-web-application/": "/blog/how-to-integrate-asp-net-identity-core-inside-your-web-application/",
    "/how-to-handle-file-and-folder-dialog-windows-in-a-wpf-application/": "/blog/how-to-handle-file-and-folder-dialog-windows-in-a-wpf-application/",
    "/mapping-objects-made-easy-with-automapper/": "/blog/mapping-objects-made-easy-with-automapper/",
    "/test-your-web-app-with-selenium-xunit-and-net-core/": "/blog/test-your-web-app-with-selenium-xunit-and-net-core/",
    "/common-needs-when-building-enterprise-software/": "/blog/common-needs-when-building-enterprise-software/",
    "/rotate-an-object-towards-the-mouse-position-2d/": "/blog/rotate-an-object-towards-the-mouse-position-2d/",
    "/how-not-to-start-a-podcast-part-1/": "/blog/how-not-to-start-a-podcast-part-1/",
    "/how-to-use-dapper/": "/blog/how-to-use-dapper/",
    "/configuration-in-asp-net-core-a-comprehensive-guide/": "/blog/configuration-in-asp-net-core-a-comprehensive-guide/",
    "/how-to-fix-invalid-value-for-registry-error-when-opening-photos": "/blog/how-to-fix-invalid-value-for-registry-error-when-opening-photos",
  }
});
