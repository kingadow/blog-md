# Part 4: Automate it

**What you get:** you schedule a post once, by giving it a date. On that day the site publishes it, the upcoming posts list updates, and your subscribers get an email built from the post. Nobody has to remember to press publish.

**First step (15 minutes):** run the [starter site](../starter) on your computer. Open the `starter` folder in Claude Code and say: *"Run this site on my computer."* Then open the blog page and look at the upcoming posts list.

## The 4 pieces

| Piece | What it does | Why it matters |
|---|---|---|
| **The date gate** | A post with a future date stays hidden until that day. Drafts stay hidden until you approve them. | You can write 4 posts in one sitting and let them go out one a week. |
| **The upcoming posts list** | The blog page shows your next scheduled posts, each with a short description, and a subscribe box under them. A post leaves the list on the day it goes live. | Readers see what's coming, find a topic they want, and subscribe so they don't miss it. |
| **The weekly build** | Every week on your publish day, GitHub asks your host to rebuild the site, and that day's post appears. | A static site only changes when it's rebuilt. This is the rebuild. |
| **The publish-day email** | After the build, a script finds the new post and schedules an email about it to your subscribers. | Your list hears about every post, and you write the email zero times. |

## Set it up

The [starter README](../starter/README.md) has every step, each with a sentence to give Claude. The accounts it needs are in [What you need](../README.md#what-you-need) in the README. In short:

1. **Copy the starter and run it on your computer.** Everything works there before you go online.
2. **Make it yours:** your details in `src/site.config.mjs`, the sample posts, and the colors and fonts at the top of `src/styles/global.css`.
3. **Give it its own GitHub repository.** GitHub only runs the weekly workflows from the top folder of a repository.
4. **Put it online with Netlify** (free) by connecting the GitHub repository.
5. **Turn on the weekly build:** create a build hook in Netlify and save it in GitHub as a secret called `NETLIFY_BUILD_HOOK`.
6. **Connect the subscribe form** to your email list (Klaviyo in the starter; the form's file explains how to use another tool).
7. **Turn on the publish-day email:** save your Klaviyo private key in GitHub as a secret, then test with a dry run that shows the email without sending anything.

## Your publish day lives in 3 places

The starter ships set to Thursday. To change the day, change these 3 settings so they match. Nothing else needs to change: the comments in those files refer to "your publish day", and the sample posts that mention Thursday get deleted when you add your own.

| Where | What to change |
|---|---|
| `BLOG.md`, section 8 | The publish day the skill plans posts around |
| `src/site.config.mjs` | `publishDay` |
| `.github/workflows/publish.yml` | The live schedule line, marked `# <- the live line`: `cron: "37 9 * * 4"`. The last number is the day: 0 is Sunday, 4 is Thursday. Change only that line. |

Ask Claude: *"Change my publish day to Tuesday in BLOG.md, src/site.config.mjs and .github/workflows/publish.yml (only the live cron line there), and move the email send time to match."*

## Already have a site?

You can copy the pieces into it. Ask Claude:

> Read the starter in this repo, especially src/lib/posts.ts and src/components/UpcomingPosts.astro, and tell me how to add the date gate and the upcoming posts list to my site.

The pieces are small: the date gate is one file, and the upcoming posts list is one component.

## What goes wrong, and what the starter does

| What happens | What the starter does |
|---|---|
| GitHub runs scheduled jobs late, sometimes by hours, and most often on the hour | The weekly build runs off the hour (9:37 UTC), and the email sends late instead of not at all |
| The build finishes a few minutes after the hook fires | The email script waits until the post's page loads before it schedules anything |
| A job runs twice | The email script skips a post that already has a campaign |
| Link previews on LinkedIn and Substack ignore SVG images | Every SVG hero has a 1200x630 PNG twin, and the post page shares the PNG |

On kingadow.com the weekly build fired 4 to 7 hours late through September and October while it ran on the hour. Moving it off the hour and letting the email send late kept every Thursday post and email going out.

## Done when

- [ ] The starter (or your own site) hides a post until its date
- [ ] The upcoming posts list shows your next scheduled post, with the subscribe box
- [ ] The weekly build runs on your publish day
- [ ] A dry run of the email shows your newest post, or a scheduled one picked with `--post <slug>` (see the [starter README](../starter/README.md))
