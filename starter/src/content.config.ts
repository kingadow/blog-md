// The fields every blog post can have, at the top of its Markdown file
// (the "frontmatter"). If a post is missing a required field or has a typo in
// one, the build stops and names the post and the field.
//
// Posts live in src/content/blog/. The file name becomes the address:
// src/content/blog/my-first-post.md -> /blog/my-first-post/

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    // Required
    title: z.string(),
    // The publish date, as YYYY-MM-DD. A date in the future schedules the
    // post. See src/lib/posts.ts for how that works.
    date: z.coerce.date(),
    // 1 or 2 sentences, under 150 characters. Shown on the blog index, in
    // search results, in the RSS feed and in the publish-day email. The
    // email's inbox preview stops at 150 characters, so a longer excerpt is
    // cut at the end of a word.
    excerpt: z.string(),
    // Path to the hero image in public/, e.g. /images/blog/my-post.svg.
    // Use 1200x630. If it is an SVG, put a PNG with the same name next to it
    // and social networks will use the PNG.
    image: z.string(),

    // Optional
    imageAlt: z.string().optional(),
    category: z.string().default("Blog"),
    // Defaults to the author in src/site.config.mjs.
    author: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    // `draft: true` never publishes, whatever the date.
    draft: z.boolean().default(false),
    // Lists a draft in Upcoming Posts while you finish it. It still never
    // publishes while `draft` is true.
    announce: z.boolean().default(false),
    // Set this when you refresh an old post. Shown as "Updated" on the page.
    updated: z.coerce.date().optional(),
    // Search result title and description, when the defaults are too long.
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = { blog };
