# Starter blog site

A small blog site you can run on your computer today and put online for free. It has the 4 automated pieces from part 4 of this repo:

1. **The date gate.** Write posts ahead and give each one a date. A post stays hidden until its date, then goes live.
2. **The Upcoming Posts list (the ticker).** The blog index shows your scheduled posts, with a subscribe box under them.
3. **The weekly build.** Every week on your publish day (step 5 sets it), GitHub asks Netlify to rebuild your site, and that day's post goes live.
4. **The publish-day email.** When a post goes live, a Klaviyo email is built from it and scheduled for 9:15am in your time zone.

**First thing to do:** open this `starter` folder in Claude Code and say: *"Copy this folder to a new folder called my-blog in my Documents folder, not inside the kit. Then install and run the site there and give me the address to open."* From then on, open `my-blog` in Claude Code, not `starter`. You can try everything on your computer first. GitHub and Netlify come in at step 3, when you are ready to put the site online.

You do not need to write code. Each step below has a sentence you can give Claude Code, which does the technical part.

The site is built with [Astro](https://astro.build), a tool that turns Markdown files into a website. It uses plain CSS and 3 packages.

---

## What you need

- **Node.js 20.3 or newer** from [nodejs.org](https://nodejs.org). It runs the site on your computer. This is all you need for steps 1 and 2.
- **A GitHub account** (from step 3). It stores your site and runs the weekly build.
- **A free Netlify account** (from step 4). It puts the site online.
- **A Klaviyo account** for the subscribe form and the publish-day email. Optional: the site works without it, and the top of `src/components/Subscribe.astro` explains how to use another email tool.

> Ask Claude: *"Check that Node.js is installed and tell me which version I have."*

## Step 1. Run it on your computer

Open this `starter` folder in Claude Code and ask Claude to copy it to `my-blog` (the prompt is below). Claude then installs and starts the site in `my-blog` with these 2 commands:

```bash
npm install
npm run dev
```

Open the address it prints, usually `http://localhost:4321/`. Each time you save a file, the page updates.

`npm run dev` also shows scheduled posts, so you can read a post before its date. To see exactly what the live site will show, run `npm run build` and then `npm run preview`.

`npm install` may end with a line about "vulnerabilities", some marked high or critical. See [Warnings you can ignore](#warnings-you-can-ignore) before you act on it.

> Ask Claude: *"Copy this folder to a new folder called my-blog in my Documents folder, not inside the kit. Then install and run the site there and give me the address to open."*
>
> Then close this session and open `my-blog` in Claude Code for everything after this step.

## Step 2. Change these 3 things first

1. **`src/site.config.mjs`**: your site name, address, your name and a short bio, time zone, your main action and email settings. Everything else reads from this file. The About page (`/about/`) shows your name, bio and main action, and every post ends with the main action, so fill in `author.bio` and `cta` (the button text and where it goes: a booking page, a contact page or an email address). The starter has `/about/` and no contact page; `cta` starts as an email address. Your `BLOG.md` main action should use the same address as `cta`.
2. **The sample posts** in `src/content/blog/` and their images in `public/images/blog/`. Read them first: they explain how the system works. Then delete them or replace them with your own. They mention Thursday, the starter's publish day; that goes when they do.
3. **The look**: the color, font and size variables at the top of `src/styles/global.css`. 2 other files keep their own copy of the colors: `scripts/blog-email/template.html` (email apps ignore CSS variables) and `public/favicon.svg` (the icon in the browser tab, starter blue until you change it).

> Ask Claude: *"Update src/site.config.mjs. The site is called [name], it will live at [address], my name is [name], my time zone is [city], and my main action is [book a call at this address]. Write a 2-sentence bio from these notes: [notes]."*
>
> Ask Claude: *"Change the colors in src/styles/global.css, the email template and the favicon to my brand colors: [colors]."*
>
> Ask Claude: *"Delete the 3 sample posts in src/content/blog/ (your-first-post.md, why-every-post-gets-a-date.md, how-the-upcoming-posts-list-works.md) and their 6 images in public/images/blog/ (the .svg and .png with the same names). List each file by name, one at a time."* Claude Code may refuse a delete that uses a wildcard such as `*.md`, so name each file.
>
> Want a contact or booking page? Ask Claude: *"Add a /contact/ page with [my booking link or email] and point cta in src/site.config.mjs at it."*

**Which color is which.** `global.css` has 9 color variables. Most brands have 3 to 5 colors; map them like this, and let Claude make the rest from them. The email template uses the same hex values as the first 6, so the same swap covers it.

| Variable | What it colors | From your brand |
| --- | --- | --- |
| `--color-bg` | the page background | your lightest color, or white |
| `--color-surface` | cards, panels, the subscribe band | a slightly darker tint of the background |
| `--color-text` | body text and headings | your darkest color |
| `--color-muted` | dates, captions, secondary text | made from your darkest color, lighter |
| `--color-border` | lines and card edges | made from the background, a little darker |
| `--color-accent` | links, buttons, the selected date | your main brand color |
| `--color-accent-text` | text on buttons | white or your darkest color, whichever reads better on the accent |
| `--color-accent-soft` | the selected row, hover backgrounds | a very light tint of the accent |
| `--color-success` | the "thanks for subscribing" message | keep the green, or a brand green |

The pairs to check for contrast, each at 4.5:1 or more: text on background, text on surface, muted on background, muted on surface, accent on background (links), accent text on accent (buttons). Ask Claude: *"Compute the contrast ratio for each of these pairs and fix any under 4.5:1."*

## Step 3. Put it on GitHub

Everything so far runs on your computer, and you can stay there as long as you like. When you are ready to put the site online, give it its own GitHub repository. GitHub only runs the workflows in `.github/workflows/` from the top folder of a repository, so the site has to be a repository of its own.

The `.gitignore` file keeps a few things off GitHub, including the `posts/` folder, where the blog-pipeline skill keeps each post's brief, research and notes, and the `notes/` folder, where your own material can live. Both can hold figures from client calls, so they stay on your computer. If your repository is private and you want them backed up, delete the `posts/` and `notes/` lines in `.gitignore`.

> Ask Claude: *"Make my-blog a git repository and help me push it to a new GitHub repository called my-blog."*

## Step 4. Put it online with Netlify

1. In Netlify, choose **Add new site**, then **Import an existing project**, then GitHub, and pick your repository.
2. Netlify reads `netlify.toml`, so the build settings fill themselves in. Click **Deploy**.
3. Optional: add your own domain under **Domain management**, then put that address in `url` in `src/site.config.mjs`.

From now on, every change you push to GitHub rebuilds the site.

> Ask Claude: *"Walk me through connecting this repository to Netlify, 1 click at a time."*

## Step 5. Turn on the weekly build

A scheduled post goes live on the first build on or after its date. This step makes sure a build runs every publish day.

1. In Netlify, open your site's configuration, then **Build & deploy**, then **Build hooks**. Add a hook named `Weekly publish` for your main branch and copy its address.
2. In GitHub, open your repository's **Settings**, then **Secrets and variables**, then **Actions**, and click **New repository secret**. Name it `NETLIFY_BUILD_HOOK` and paste the address.
3. In GitHub, open the **Actions** tab, choose **Weekly publish** and click **Run workflow**. A new deploy appears in Netlify's Deploys list.

It runs on your publish day at 09:37 UTC, which is early morning in the Americas, a few hours before the email goes out at 9:15am. The starter ships set to Thursday.

**Your publish day lives in 3 places.** Change all 3 together, or ask Claude to:

1. `publishDay` in `src/site.config.mjs`: the day the site names in the Upcoming Posts list and the subscribe box.
2. The `cron` line in `.github/workflows/publish.yml`: the day the weekly build runs.
3. The publish day line in your `BLOG.md`, if you have one.

Nothing else names the day: the comments in those files say "your publish day", and the sample posts that mention Thursday get deleted in step 2.

The `cron` line reads as minute, hour (UTC), day of the month, month, day of the week. Only the last number changes with the day:

| Publish day | `cron` line |
| --- | --- |
| Monday | `"37 9 * * 1"` |
| Tuesday | `"37 9 * * 2"` |
| Wednesday | `"37 9 * * 3"` |
| Thursday | `"37 9 * * 4"` |
| Friday | `"37 9 * * 5"` |
| Saturday | `"37 9 * * 6"` |
| Sunday | `"37 9 * * 0"` |

In `publish.yml`, change only the live line, the one marked `# <- the live line`. Keep the 37: a time off the hour starts sooner on GitHub. The comments in `.github/workflows/publish.yml` explain why. Outside the Americas, 09:37 UTC comes after 9:15am your time, so ask Claude to move the hour earlier.

> Ask Claude: *"Change my publish day to Tuesday in all 3 places, changing only the live cron line in publish.yml, and check that the weekly build still runs before my email send time."*

## Step 6. Connect the subscribe form

In `src/site.config.mjs`, fill in `email.klaviyoPublicKey` (Klaviyo: Settings, then Account, then API keys) and `email.listId` (the list's settings page in Klaviyo). The public key is safe to publish: it can add people to a list and nothing else.

Use a list for blog readers only, so they get the emails they asked for. Until both values are filled in, a note under each subscribe form says it "is not connected yet", and the form sends nothing. You see the note on your computer and on the live site, so you can tell from the page whether the form works.

> Ask Claude: *"Connect the subscribe form to Klaviyo. My public key is [key] and my blog list ID is [list ID]."*
>
> Using another email tool? Ask Claude: *"Switch src/components/Subscribe.astro to [tool]. Here is the embed code it gave me: [code]."*

## Step 7. Turn on the publish-day email

1. In Klaviyo, open Settings, then Account, then **API keys**, and create a **private** key with custom access: Campaigns full, Templates full, Lists read. It starts with `pk_`. Treat it like a password.
2. In GitHub, add it as a repository secret named `KLAVIYO_PRIVATE_KEY` (same place as step 5).
3. Check `email.fromEmail` in `src/site.config.mjs`. It must be an address on a domain you have set up for sending in Klaviyo.

What happens on a publish day:

- **Weekly publish** finishes, and **Publish-day email** starts right after it.
- It reads your RSS feed and waits for today's post to appear, checking every 2 minutes for up to 40 minutes.
- It checks that the post page loads, builds the email from `scripts/blog-email/template.html`, and schedules a Klaviyo campaign named `Blog: [post] ([date])` for `email.sendTime` in your time zone.
- On a week with no new post, it sends nothing.

> Ask Claude: *"Add my Klaviyo private key as the KLAVIYO_PRIVATE_KEY secret in GitHub. Walk me through it, and never paste the key into a file."*

## Check the email with a dry run

A dry run shows what the email would be, and creates nothing in Klaviyo.

On your computer, for your newest live post:

```bash
npm run build
npm run email:dry-run
```

For any post, including a scheduled post or a draft, add `-- --post` and the post's file name without `.md`:

```bash
npm run email:dry-run -- --post how-the-upcoming-posts-list-works
```

It reads the RSS feed from your local build, or the post's own Markdown file when the post is not in the feed yet, so it makes no network calls. The `--post` form needs no build first: when the post is not in a local build, it reads the Markdown file and takes the image from `public/`. It prints the subject, preview text, list, sender and send time, and saves the email as `scripts/blog-email/preview.html` so you can open it in a browser. If the post is dated another day, it says so: a real run today would send nothing, and on the post's date it would send this plan.

The preview text is the post's `excerpt`, cut at the end of a word at 150 characters. Keep each excerpt to 1 or 2 sentences under 150 characters and the whole thing shows in the inbox.

On GitHub: open **Actions**, choose **Publish-day email**, click **Run workflow** and leave **Dry run** ticked. The plan shows in the run's log.

> Ask Claude: *"Run the email dry run for my next scheduled post and open the preview for me."*

## Schedule a post

1. Write the post in `src/content/blog/` with a future `date`. The sample post `your-first-post.md` shows the main settings, and `src/content.config.ts` lists every one.
2. Push it to GitHub. The build after that push shows it in Upcoming Posts.
3. On its date, the weekly build publishes it and the email goes out.

To list a topic before the post is finished, add `draft: true` and `announce: true`. It shows in Upcoming Posts and never publishes while it is a draft.

> Ask Claude: *"Turn my notes below into a post dated on my next publish day, with a 1200x630 hero image and a PNG copy of it."*

The sample post "How the Upcoming Posts list works" is dated 2027-06-03. After that date it is live, and the Upcoming Posts list is empty until you schedule another post. That is the system working: give any post a future date and the list comes back.

## Warnings you can ignore

| What you see | What it means |
| --- | --- |
| `npm install` ends with "5 vulnerabilities (1 low, 3 high, 1 critical)" or similar, and suggests `npm audit fix --force`. | The warnings are about the tools that build the site on your computer and on Netlify. The live site is plain files, so visitors never run them. Do not run `npm audit fix --force`: it jumps to new major versions and can break the build. To update safely, ask Claude: *"Update the starter's packages to their latest versions and check the build still works."* |
| `npm run dev` prints "New version of Astro available" and suggests `npx @astrojs/upgrade`. | Astro has a newer version. The starter works on the one it has. Do not run the upgrade on its own. If you want the new version, ask Claude: *"Update the starter's packages and check the build still works."* |
| After you delete every sample post, the build prints `No files found matching "**/*.md"`. | The blog folder is empty. The build still completes, and the warning goes away with your first post. |
| After you edit or rename a post, the build prints `Duplicate id "your-post" found` once. | A copy of the old version was left over from the last build. Build again and it goes away. If it stays, delete the `.astro` folder and build again. If it still stays, 2 files in `src/content/blog/` share that name. |

## What goes wrong, and what the starter does about it

| What can happen | What the starter does |
| --- | --- |
| GitHub scheduled runs start late, sometimes by hours. | The weekly build runs early and off the hour. When the email run arrives after the send time, the email goes out at the next quarter hour that day. If it cannot go out that day, the run fails and shows red in the Actions tab. |
| The email workflow runs twice on 1 day. | The campaign name holds the post and the date. The second run finds the first campaign and stops. |
| The email run starts before the build finishes. | It keeps checking the feed for up to 40 minutes, and checks that the post page loads before it schedules anything. |
| GitHub turns off schedules in a public repository after 60 days with no commits. | A weekly post keeps it active. After a long break, turn the workflow back on in the Actions tab. |
| Klaviyo retires an API version 2 years after its release. | Both Klaviyo calls use revision `2025-10-15`, which works until 2027-10-15. Ask Claude to move it forward before then. |
| LinkedIn and most email apps cannot show SVG images. | Shares and the email use a PNG with the same name next to the SVG. With no PNG, the email goes out without an image. |

## Secrets and settings

| Name | Where | What it is |
| --- | --- | --- |
| `NETLIFY_BUILD_HOOK` | GitHub secret | The Netlify build hook address. Needed for the weekly build. |
| `KLAVIYO_PRIVATE_KEY` | GitHub secret | Klaviyo private key. Needed for the email. |
| `LIST_ID` | GitHub secret, optional | Overrides `email.listId` for the email. |
| Everything else | `src/site.config.mjs` | Name, address, author and bio, main action, publish day, time zone, public key, list, sender, send time. |

No key or password belongs in a file in this repository. `.gitignore` keeps `.env` files, the `posts/` working folders and your `notes/` folder out of git.

## Files

```
src/site.config.mjs              your settings (start here)
src/content/blog/                your posts, 1 Markdown file each
public/images/blog/              post images (SVG plus a PNG twin)
src/styles/global.css            the look: variables at the top
public/favicon.svg               the browser tab icon
src/lib/posts.ts                 the date gate
src/components/UpcomingPosts.astro   the ticker
src/components/Subscribe.astro   the subscribe form
src/pages/about.astro            the About page
src/pages/blog/[slug].astro      the post page
src/pages/rss.xml.js             the RSS feed the email reads
.github/workflows/publish.yml    the weekly build
.github/workflows/blog-email.yml the publish-day email
scripts/blog-email/send.mjs      builds and schedules the email
scripts/blog-email/template.html the email design
netlify.toml                     Netlify build settings
```
