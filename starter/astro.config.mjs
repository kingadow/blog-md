// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import site from "./src/site.config.mjs";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Your live address. Used for canonical links, the sitemap and the RSS feed.
  // Change it in src/site.config.mjs, not here.
  site: site.url,

  // Every page URL ends in a slash (/blog/my-post/). Links without the slash
  // go through a redirect first, and search tools count each one as a
  // problem. Keeping one form everywhere avoids that.
  trailingSlash: "always",

  // The sitemap lists every page that gets built. Scheduled and draft posts
  // never get a page (see src/lib/posts.ts), so they never reach the sitemap.
  integrations: [sitemap()],
});
