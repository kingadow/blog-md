// /robots.txt: lets search engines crawl everything and points them to the
// sitemap. Built from the address in src/site.config.mjs.
import site from "../site.config.mjs";

export function GET() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap-index.xml", site.url).href}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
