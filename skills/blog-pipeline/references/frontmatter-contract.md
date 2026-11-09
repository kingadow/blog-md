# Frontmatter contract

**What you get:** frontmatter the starter's build accepts on the first try, with titles and descriptions written for search.

The schema lives in the starter at `src/content.config.ts`. A post that breaks it stops the build, and the error names the post and the field. If the author's site uses a different schema, BLOG.md's frontmatter section and that site's config file win over this page.

## Fields

```yaml
---
title: "string"                 # required
date: 2026-11-26                # required, YYYY-MM-DD, the publish day
excerpt: "string"               # required, 1 or 2 sentences
image: "/images/blog/<slug>.svg" # required, path from public/, 1200x630
imageAlt: "string"              # optional in the schema, always written
category: "string"              # defaults to "Blog"; always written, from BLOG.md
author: "string"                # defaults to the author in src/site.config.mjs
keywords: ["string", ...]       # defaults to []
draft: true                     # defaults to false; true on every new post
announce: false                 # defaults to false; lists a draft in Upcoming Posts
updated: 2026-12-10             # only on a refresh
metaTitle: "string"             # optional in the schema, always written
metaDescription: "string"       # optional in the schema, always written
---
```

## What to write in each

**`title`:** the headline on the page. The target search near the start, then what the reader gets.

**`date`:** functional. It decides when the post appears. A future date schedules it; see the table in stage 6. Set it to the publish day from BLOG.md's cadence.

**`excerpt`:** card copy. It shows on the blog index, in the RSS feed and in the publish-day email, so it has to make someone want to read on. 1 or 2 sentences, under 150 characters (the email's preview line cuts there), using the post's own numbers and claims.

**`image`:** the file must exist in `public/images/blog/` before the build. For an SVG, put a PNG with the same name next to it; the starter uses the PNG for link previews.

**`imageAlt`:** what the image shows and the point it makes.

**`category`:** one of the categories in BLOG.md, spelled exactly the same, so the blog index stays tidy. Ask the author before adding a new one.

**`author`:** leave it out to use the site default, or set it when a post has a different author.

**`keywords`:** 5 to 8. Copy them from the brief's Keywords line: the target search first, then real variants. Never another post's or planned idea's main search.

**`draft`:** `true` on every new post until the author approves. A refresh of a live post keeps `false`.

**`announce`:** `true` puts a draft in Upcoming Posts (title and date, no link) while the author finishes it. It never publishes anything. If the date passes while it's still a draft, it drops off the list.

**`updated`:** set on a refresh only. Never change `date` on a refresh: the original date keeps the page's history, and `updated` shows it's current.

**`metaTitle`:** the title in Google results. Write it on every post, under about 60 characters so it isn't cut off. BLOG.md may set a pattern such as `<Title> | <Your Name>`.

**The call to action** has no field. On the starter it comes from `cta` in `src/site.config.mjs` and shows as a button under every post (it can be a `mailto:` address). The body leads into that button and adds no second link; stage 4 has the rule.

**`metaDescription`:** the text under the title in Google results. Write it on every post, under about 155 characters. Say what the reader gets. A low click rate on a page Google already shows is usually a title and description problem.

## Example

```yaml
---
title: "Welcome Email Timing: When to Send the Second Email"
date: 2026-11-26
excerpt: "How long to wait after the first welcome email, what the second one should say, and how to find the right gap in your own numbers."
image: "/images/blog/welcome-email-timing.svg"
imageAlt: "Timeline of a 3-email welcome series with the gap between email 1 and email 2 marked"
category: "Email Marketing"
keywords:
  - "welcome email timing"
  - "welcome series"
  - "second welcome email"
  - "welcome flow"
  - "email marketing for small brands"
draft: true
metaTitle: "Welcome Email Timing: When to Send Email 2"
metaDescription: "When to send the second welcome email, what to put in it, and how to check the timing in your own numbers."
---
```

## Validate before handing over

From the site folder, `npm run build`. Never hand over a post that hasn't built.
