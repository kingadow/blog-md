---
title: "How the Upcoming Posts list works"
date: 2027-06-03
category: "How it works"
excerpt: "The list at the top of the blog shows what is coming next, with a subscribe box under it. It builds itself from your scheduled posts."
image: "/images/blog/how-the-upcoming-posts-list-works.svg"
imageAlt: "A list of upcoming post dates on the left and the selected post's summary on the right, with a subscribe box underneath"
keywords:
  - "upcoming blog posts"
  - "blog schedule"
---

At the top of the blog index sits a list of dates. Each date is a post that is written and scheduled. Select one and the panel next to it shows that post's image, title and summary. Under both is a subscribe box.

## Why show what is coming

A blog index shows what you have already written. A reader who liked it has no clear reason to come back. The Upcoming Posts list gives them one: they can see the next few topics and the day each one lands, and subscribe to get them by email.

It also shows that the blog is active. A dated schedule tells readers that posts arrive on a set day each week.

## Where the list comes from

You never edit the list. The component in `src/components/UpcomingPosts.astro` asks `src/lib/posts.ts` for every post dated after the build, soonest first, up to 6. Each one becomes a row.

When a post's day arrives, the weekly build publishes it. The same build drops it from the list, so a post is always in one place: on the schedule or on the blog. When nothing is scheduled, the whole section is left off the page.

The rows have no links. A scheduled post has no page yet, so a link would lead nowhere.

This post is an example. It is dated June 3, 2027, so until then it sits on the schedule and has no page of its own.

## Planned topics that are still drafts

Sometimes you know the topic and the date before the post is finished. Add `announce: true` next to `draft: true` and the post appears on the schedule. It still never publishes while it is a draft. If its date passes first, it drops off the list and nothing goes live.

## Keyboard and screen readers

The list follows the standard tabs pattern. Tab moves into the list, the arrow keys move between dates, and Home and End jump to the first and last. Screen readers announce each date as a tab with its own panel.

## Change how it looks

The colors come from the variables at the top of `src/styles/global.css`, like the rest of the site. The line above the list uses the `publishDay` setting in `src/site.config.mjs`.

## Ask Claude

- "Show 4 posts in the Upcoming Posts list."
- "Change the heading to What's next."
- "Add the Upcoming Posts list to the home page too."
