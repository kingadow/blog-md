# BLOG.md on Shopify

**What you get:** the 4 automated pieces of [part 4](../docs/4-automate.md) on a Shopify store's own blog. You schedule a post once. On its day Shopify publishes it, the upcoming posts list on your blog drops it, and your subscribers get an email built from it.

**First thing to do:** make a free development store and try everything there before your live store. It is a free Shopify store for building and testing, made in the Shopify Dev Dashboard. The steps are in [part 4 for Shopify](../docs/4-automate-shopify.md), step 1.

You do not need to write code. Claude does the technical part; each step in the guide has a sentence to give it.

## The 4 pieces

| Piece | On Shopify | In this folder |
|---|---|---|
| **Scheduling** | Shopify's own visibility date. A scheduled post stays off the store until its date and time. | [`graphql/schedule-post.graphql`](graphql/schedule-post.graphql): what Claude runs to create a post hidden, then schedule it with its SEO title, description and image alt text |
| **The upcoming posts list** | A theme section that lists your next scheduled posts with a subscribe box. Shopify keeps scheduled posts out of the theme, so the list reads a small content type, `upcoming_post`, with 1 entry per post. | [`sections/upcoming-posts.liquid`](sections/upcoming-posts.liquid), [`metaobject/`](metaobject) (the content type, as clicks or 1 API call), [`graphql/upcoming-post-entry.graphql`](graphql/upcoming-post-entry.graphql) |
| **The weekly rhythm** | 1 publish day. Every post is scheduled for 06:00 that day, and the email job runs that day. Shopify publishes by itself, so there is no weekly build. | The `cron` line in [`email/blog-email.yml`](email/blog-email.yml) |
| **The publish-day email** | A small GitHub job reads your blog's feed (`/blogs/<blog>.atom`) and schedules a Klaviyo campaign for the new post. | [`email/`](email): the workflow, the settings file and its README |

## Files

```
shopify/
  README.md                              this file
  sections/upcoming-posts.liquid         the upcoming posts list with a subscribe box
  metaobject/admin-steps.md              the upcoming_post content type, by hand
  metaobject/upcoming-post-definition.graphql   the same, as 1 API call
  graphql/schedule-post.graphql          create a post hidden, schedule it, check it
  graphql/upcoming-post-entry.graphql    add, list and delete upcoming posts
  email/README.md                        the publish-day email, step by step
  email/blog-email.yml                   the weekly GitHub workflow
  email/site.config.mjs                  the email's settings
```

The email script itself lives in the starter: [`starter/scripts/blog-email/send.mjs`](../starter/scripts/blog-email/send.mjs) reads both the starter's RSS feed and Shopify's Atom feed.

## What you need

- A Shopify store with the Online Store and a blog. A development store for testing.
- Claude Code, or Claude with access to your files.
- A way for Claude to reach your store: a Shopify connector in Claude, or an app you make in the Dev Dashboard. Or do the store steps by hand in the admin; the guide has both.
- A Klaviyo account connected to your store, for the email. The subscribe box works without it.
- A GitHub account, for the weekly email job.

Parts 1 to 3 work on Shopify as they are. The Shopify notes are in [part 1](../docs/1-get-your-site-ready.md) (where titles, descriptions, alt text, the sitemap and redirects live) and in the skill's [publish stage](../skills/blog-pipeline/references/06-publish.md#publishing-to-shopify).

Next: [Part 4 for Shopify](../docs/4-automate-shopify.md).
