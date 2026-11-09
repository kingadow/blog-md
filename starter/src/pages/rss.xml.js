// The RSS feed at /rss.xml. Feed readers use it, and so does the publish-day
// email: scripts/blog-email/send.mjs reads the newest item to build the email.
import rss from "@astrojs/rss";
import { getPublishedPosts } from "../lib/posts";
import { shareUrl } from "../lib/share-image";
import site from "../site.config.mjs";

export async function GET() {
  // Same gate as the rest of the site, so subscribers never get a scheduled
  // post before it is live on the web.
  const posts = await getPublishedPosts();

  return rss({
    title: site.name,
    description: site.description,
    site: site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/blog/${post.id}/`,
      categories: [post.data.category],
      // An extra <image> tag with the share image (the PNG twin when there is
      // one). Feed readers skip tags they do not know. The email script reads
      // it for the email's hero image.
      customData: `<image>${shareUrl(post.data.image)}</image>`,
    })),
    customData: `<language>en-us</language>`,
  });
}
