---
title: "Why every post gets a date"
date: 2026-11-05
category: "How it works"
excerpt: "A date in the past means live, a date in the future means scheduled. That one rule lets you write ahead and still publish on the same day every week."
image: "/images/blog/why-every-post-gets-a-date.svg"
imageAlt: "A timeline of post dates: 2 filled dots marked live, then today's build, then an open dot marked scheduled"
keywords:
  - "schedule blog posts"
  - "astro scheduled posts"
---

The `date` at the top of a post does 2 jobs. It is the publish date readers see, and it decides whether the post is on the site at all.

## The rule

Each time the site is built, it compares every post's date with the moment of the build:

- **Today or earlier:** the post is live. It gets its own page and appears on the blog index, in the RSS feed, in the sitemap and under "More posts".
- **Later than today:** the post is scheduled. It has no page yet and appears only in the Upcoming Posts list on the blog index.
- **`draft: true`:** the post never publishes, whatever the date.

So you can write 3 posts in one sitting, date them for the next 3 Thursdays and leave them. Each one goes live on its day.

## Why the site needs a weekly build

The site is a set of plain files, built once and then served as they are. A build on Monday cannot change itself on Thursday. Something has to run a new build on the publish day.

That is the job of `.github/workflows/publish.yml`. Every Thursday morning GitHub asks Netlify to rebuild the site. The build sees that Thursday's post is now due, and the post goes live. Without that workflow, a scheduled post would wait until the next time you saved a change.

## One gate for every list

Every part of the site that lists posts asks the same function in `src/lib/posts.ts` which posts are live. The blog index, the post pages, the RSS feed, the sitemap and the related posts all use it.

This matters. If one page kept its own copy of the rule, a small difference could let a scheduled post into the RSS feed while the blog index still hid it. Email subscribers would then get a link to a page that does not exist yet.

## A note on time zones

A date like `2026-11-26` counts from midnight UTC on that day. In the Americas that is the evening before. The weekly build runs on the morning of the date, so your post appears on the day you chose.

## Ask Claude

- "Schedule my post about onboarding for Thursday the 10th."
- "Which posts are scheduled, and for which dates?"
- "Move every scheduled post back by 1 week."
