// The image a post shows when someone shares its link.
//
// SVG heroes look sharp on the site, but LinkedIn, Facebook, Slack and most
// email apps will not show an SVG. So when a post's image is
// /images/blog/my-post.svg and public/images/blog/my-post.png also exists,
// shares use the PNG. With no PNG next to it, the SVG is used as it is.
//
// To make the PNG, open the SVG in a browser at 1200x630 and screenshot it, or
// ask Claude: "Render public/images/blog/my-post.svg to a 1200x630 PNG next to
// it."

import { existsSync } from "node:fs";
import { join } from "node:path";
import site from "../site.config.mjs";

/** Site path of the image to use for sharing, e.g. /images/blog/my-post.png */
export function sharePath(image: string): string {
  const png = image.replace(/\.svg$/i, ".png");
  if (png !== image && existsSync(join(process.cwd(), "public", png))) {
    return png;
  }
  return image;
}

/** Full address of the share image, e.g. https://example.com/images/blog/my-post.png */
export function shareUrl(image: string): string {
  return new URL(sharePath(image), site.url).href;
}
