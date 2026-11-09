# Publish-day email for a Shopify blog

**What you get:** on your publish day, a Klaviyo email built from the post that went live that morning, scheduled for 9:15am in your time zone. You write it zero times. On a week with no new post, nothing goes out.

**First thing to do:** find your blog's feed. Open your blog page, for example `https://your-store.com/blogs/news`, and add `.atom` to the end: `https://your-store.com/blogs/news.atom`. Shopify makes this feed for every blog. That address is your `FEED`.

It uses the same script as the starter site, [`starter/scripts/blog-email/send.mjs`](../../starter/scripts/blog-email/send.mjs), which reads Shopify's Atom feed. GitHub runs it once a week. Klaviyo has no setting that sends an email when a feed gets a new post, and Shopify Flow has no "blog post published" trigger, so this small GitHub job is the piece in between.

## What goes in your email repository

Make a new **private** GitHub repository, for example `blog-email`, with 4 files:

```
.github/workflows/blog-email.yml    from shopify/email/blog-email.yml
scripts/blog-email/send.mjs         from starter/scripts/blog-email/send.mjs
scripts/blog-email/template.html    from starter/scripts/blog-email/template.html
src/site.config.mjs                 from shopify/email/site.config.mjs
```

Private matters: GitHub turns off scheduled workflows in a public repository after 60 days with no commits, and on Shopify nothing commits to this repository each week.

> Ask Claude: *"Make a new folder called blog-email in my Documents folder. Copy these 4 files from the blog-md kit at [where you saved the kit] into it, at the paths in shopify/email/README.md. Then help me push it to a new private GitHub repository called blog-email."*

## Set it up

1. **Fill in `src/site.config.mjs`:** your store name and address, your store's time zone (the one in Shopify: Settings > General), your Klaviyo list ID, the sender and the send time.
2. **Make a Klaviyo private key.** In Klaviyo, open Settings, then Account, then **API keys**, and create a **private** key with custom access: Campaigns full, Templates full, Lists read. It starts with `pk_`. Treat it like a password.
3. **Add the 2 secrets in GitHub.** In the repository, open **Settings**, then **Secrets and variables**, then **Actions**, and click **New repository secret** for each:

   | Secret | What it is |
   |---|---|
   | `KLAVIYO_PRIVATE_KEY` | The private key from step 2. Lets the job create and schedule the campaign. |
   | `FEED` | Your blog's feed address, `https://your-store.com/blogs/news.atom`. Where the job looks for today's post. |

   Optional: `LIST_ID`, to keep the list ID out of `src/site.config.mjs`.
4. **Set the day.** The `cron` line in `blog-email.yml` runs every Thursday at 12:23 UTC. Change the last number for another day (0 Sunday to 6 Saturday). The run has to start after your posts' publish time (schedule posts for 06:00) and before your send time.
5. **Run a dry run** (below) before the first publish day.

> Ask Claude: *"Add my Klaviyo private key as the KLAVIYO_PRIVATE_KEY secret and my feed address as the FEED secret in GitHub. Walk me through it, and never paste the key into a file."*

## The dry run

A dry run shows the email the job would build, and creates nothing in Klaviyo.

**On GitHub:** open **Actions**, choose **Publish-day email**, click **Run workflow** and leave **Dry run** ticked. The log shows the subject, preview text, list, sender, send time and the post it picked.

**On your computer,** from the email repository folder (needs Node.js 20.3 or newer):

```bash
FEED=https://your-store.com/blogs/news.atom node scripts/blog-email/send.mjs --dry-run
```

It reads the newest post in the feed and saves the email as `scripts/blog-email/preview.html`, so you can open it in a browser. If the newest post is dated another day, it says so: a real run today would send nothing.

`FEED` can also be a file. A development store is always behind a password page, so GitHub cannot read its feed. To test there, log in to the store in your browser, open the `.atom` address, save the page as `news.atom`, and run:

```bash
FEED=news.atom node scripts/blog-email/send.mjs --dry-run
```

> Ask Claude: *"Run the email dry run against my blog feed and open the preview for me."*

## What happens on a publish day

- Shopify publishes the post at its scheduled time, 06:00.
- The job starts at 12:23 UTC, reads the feed and waits for today's post, checking every 2 minutes for up to 40 minutes.
- It checks that the post page loads, builds the email from `template.html` and schedules a Klaviyo campaign named `Blog: [post handle] ([date])` for your send time.
- If it runs twice, the second run finds the campaign by name and stops.
- If GitHub starts it late, after the send time, the email goes out at the next quarter hour that day.

## What to check on your live store

Shopify does not document which fields its Atom feed holds. The script reads the title, the post address, the published time, the summary (where the post's excerpt should land) and the first image in the summary or the post. Before your first real send, run the dry run against your live feed and check the preview: the right title, an excerpt, and the featured image. A post with no excerpt gets the first 300 characters of the post. A post with no image in its text goes out without one.

The email goes to one Klaviyo list. If that is the list your Shopify subscribers sync into, it is often your main list, so everyone on it gets each post. [docs/4-automate-shopify.md](../../docs/4-automate-shopify.md), step 5, covers the choice.
