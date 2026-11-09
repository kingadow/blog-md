---
title: "Your first post: write it, date it, publish it"
date: 2026-10-29
category: "Getting started"
excerpt: "Every post is one Markdown file with a few settings at the top. Here is what goes in it and how it reaches your live site."
image: "/images/blog/your-first-post.svg"
imageAlt: "A Markdown file with its title, date and image settings at the top, above lines of text"
keywords:
  - "first blog post"
  - "markdown blog post"
---

This site turns each Markdown file in `src/content/blog/` into a page. You write the words. Claude can handle the rest: the file, the image and the publishing steps.

## What goes in the file

The top of every post holds a few settings between 2 lines of 3 dashes. This post starts like this:

```md
---
title: "Your first post: write it, date it, publish it"
date: 2026-10-29
category: "Getting started"
excerpt: "Every post is one Markdown file with a few settings at the top..."
image: "/images/blog/your-first-post.svg"
---
```

| Setting | What it does |
| --- | --- |
| `title` | The headline on the page, in search results and in the email subject. |
| `date` | The day the post goes live. A future date schedules it. |
| `excerpt` | 1 or 2 sentences, under 150 characters, for the blog index, search results and the email. |
| `image` | The hero image, 1200 by 630 pixels, saved in `public/images/blog/`. |
| `category` | Groups related posts. Optional. |

The file name becomes the address. `your-first-post.md` lives at `/blog/your-first-post/`. Pick a name that matches what people search for, in lowercase words joined by hyphens.

Below the settings, write the post in plain Markdown: `##` for a section heading, a blank line between paragraphs, a `-` at the start of each list item.

## See it before anyone else does

Run `npm run dev` and open the address it prints, usually `http://localhost:4321/blog/`. The page updates each time you save. Scheduled posts show here too, so you can read a post days before its date.

## Publish it

When the post reads well, save it to GitHub. Netlify sees the change and rebuilds the site. If the date is today or earlier, the post is live once that build finishes. If the date is in the future, it waits for the weekly build on that day.

## Ask Claude

You can hand each step to Claude Code:

- "Create a new post in src/content/blog called pricing-mistakes.md, dated next Thursday, from my notes below."
- "Make a 1200x630 SVG hero image for it, with a PNG copy next to it."
- "Run the build and tell me if anything fails."

Your first post can be short. A clear answer to 1 question people ask you every week is a good place to start.
