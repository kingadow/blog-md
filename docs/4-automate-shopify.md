# Part 4 on Shopify: Automate it

**What you get:** you schedule a post once, by giving it a date and time. On that day Shopify publishes it, the upcoming posts list on your blog drops it, and your subscribers get an email built from it. Nobody has to remember to press publish.

**First step (15 minutes):** make a free development store (step 1) and try every step there before you touch your live store.

This is the Shopify version of [part 4](4-automate.md). The files are in the kit's [`shopify`](../shopify) folder. You do not need to write code: each step has a sentence to give Claude, and the store steps can also be done by hand in the Shopify admin.

## The 4 pieces

| Piece | What it does on Shopify | Why it matters |
|---|---|---|
| **Scheduling** | Each post gets a visibility date and time. Shopify keeps it off the store until then and publishes it at that time. | You can write 4 posts in one sitting and let them go out one a week. |
| **The upcoming posts list** | A section on your blog page shows your next scheduled posts, each with an image and a short description, and a subscribe box under them. A post leaves the list on its day. | Readers see what's coming, find a topic they want, and subscribe so they don't miss it. |
| **The weekly rhythm** | 1 publish day. Every post is scheduled for 06:00 that day, and the email job runs that day. | Readers learn when to expect you, and every piece runs off the same day. |
| **The publish-day email** | A small GitHub job reads your blog's feed, finds today's post and schedules a Klaviyo email about it. | Your list hears about every post, and you write the email zero times. |

Shopify publishes scheduled posts by itself, so the starter's weekly build is not needed here.

**How the list knows what's coming.** Shopify keeps scheduled posts out of your theme until they go live, so a theme section cannot read them from the blog. The list reads a small content type instead, called a metaobject: `upcoming_post`, with 1 entry per scheduled post (title, date, excerpt, image, address). Claude adds the entry when it schedules the post. That is the one extra step Shopify needs.

## Set it up

The accounts are in [What you need](../README.md#what-you-need) in the README. Do steps 1 to 7 on a development store, then repeat steps 3 to 5 on your live store.

### 1. Make a development store

A development store is a free Shopify store for building and testing. It can't take real orders, it always has a password page, and it never touches your customers.

1. Open the Shopify Dev Dashboard. From your own store's admin: click your store name, then **View Dev Dashboard**. A Shopify Partner account opens the same dashboard.
2. Choose **Stores**, then **Create store**, then **Dev** as the store type.
3. Name it (the name sets its `myshopify.com` address, which can't change later), tick **Generate test data for store**, and click **Create store**.
4. Add a blog post or 2 so the blog exists: **Content** > **Blog posts**.

> Ask Claude: *"Walk me through making a Shopify development store in the Dev Dashboard, 1 click at a time."*

### 2. Let Claude reach your store

Claude needs access to create posts and list entries. Pick one:

- **A Shopify connector in Claude.** If your Claude has one connected to your store, Claude runs the API calls in [`shopify/graphql`](../shopify/graphql) through it.
- **An app in the Dev Dashboard.** Create an app for your store with these access scopes: `read_content`, `write_content`, `read_metaobject_definitions`, `write_metaobject_definitions`, `read_metaobjects`, `write_metaobjects`, `write_files`. Install it on the store. Its client ID and secret let Claude request an access token, which lasts 24 hours. Keep the 2 values in a `.env` file outside any repository, never in a post or a chat.
- **By hand.** Every store step below also works in the Shopify admin. Claude tells you what to click.

> Ask Claude: *"Help me create a Dev Dashboard app for my development store with the scopes in docs/4-automate-shopify.md, step 2, and store its credentials in a .env file outside any repository."*

### 3. Add the upcoming post content type

Once per store. Either click through [`shopify/metaobject/admin-steps.md`](../shopify/metaobject/admin-steps.md), or let Claude run [`upcoming-post-definition.graphql`](../shopify/metaobject/upcoming-post-definition.graphql).

> Ask Claude: *"Create the upcoming_post metaobject on my development store with shopify/metaobject/upcoming-post-definition.graphql, and show me the result."*

### 4. Add the upcoming posts section to your theme

1. In **Online Store** > **Themes**, duplicate your live theme and work on the copy. Publish the copy when it looks right.
2. On the copy, click **...** > **Edit code**. Under **Sections**, add a new section named `upcoming-posts` and paste in [`shopify/sections/upcoming-posts.liquid`](../shopify/sections/upcoming-posts.liquid). Save.
3. Click **Customize**, open your blog page, click **Add section** and pick **Upcoming posts**. Set the heading, the intro line (name your publish day there) and how many posts to show.
4. Add 1 test entry in **Content** > **Metaobjects** > **Upcoming post** with a date next week, and check it shows. Then give it yesterday's date and check it disappears.

The colors start from your theme's text color. To change them, edit the variables at the top of the section's style block.

> Ask Claude: *"Add shopify/sections/upcoming-posts.liquid to a copy of my theme, then tell me how to place it on my blog page in the theme editor."*

### 5. Send signups to Klaviyo

The subscribe box uses Shopify's own newsletter form. Each signup becomes a customer who accepts email marketing, tagged `newsletter` and `blog`.

1. Install Klaviyo's Shopify integration if you don't have it.
2. In Klaviyo's Shopify integration settings, open **Sync settings**, then **From Shopify**, and tick **Sync your Shopify email subscribers to Klaviyo**. Pick the list they join.
3. Note that list's ID. The publish-day email goes to it.

**Which list.** Klaviyo syncs every Shopify email subscriber into the one list you pick, often your main list with your welcome series. Then each blog post goes to everyone on it. To email only blog signups, the `blog` tag is the handle: Klaviyo shows Shopify customer tags on each profile as "Shopify Tags", and a segment can select them. That comes from Klaviyo community answers, and Klaviyo's API docs do not say whether a campaign can be sent to a segment ID the way the email script sends to a list. Test it before you rely on it.

> Ask Claude: *"Walk me through turning on Klaviyo's sync of Shopify email subscribers, and tell me which list my blog emails will go to."*

### 6. Set your publish day

Your publish day lives in 3 places. Change all 3 together:

| Where | What to change |
|---|---|
| `BLOG.md`, section 8 | The publish day the skill plans posts around |
| `.github/workflows/blog-email.yml` in your email repository | The live line, `cron: "23 12 * * 4"`. The last number is the day: 0 Sunday to 6 Saturday. |
| The section's intro line, in the theme editor | The day you name to readers |

Every post is scheduled for 06:00 on that day, in your store's time zone (Settings > General).

> Ask Claude: *"Change my publish day to Tuesday in BLOG.md and the cron line, and tell me what to change in the theme editor."*

### 7. Schedule a test post

On the development store, have Claude take 1 post through the whole path:

1. Claude creates the post hidden, with its SEO title, meta description and image alt text (`CreatePostHidden` in [`schedule-post.graphql`](../shopify/graphql/schedule-post.graphql)). You read it in the admin.
2. You say yes. Claude schedules it for 06:00 on a publish day (`SchedulePost`) and reads it back (`CheckPost`): `isPublished` true and `publishedAt` on the date you picked.
3. Claude adds its upcoming post entry (`UploadImage`, then `CreateUpcomingPost` in [`upcoming-post-entry.graphql`](../shopify/graphql/upcoming-post-entry.graphql)). It shows in the list.
4. After the time passes, the post is on the blog and gone from the list.

Check step 2 once: Shopify's API docs describe the 2 fields and show no example with a future date. If the post went live at once, tell Claude, set it hidden again (`HidePost`) and set the date in the admin: the post's **Visibility** section, the calendar icon, **Set visibility date**.

> Ask Claude: *"Use the blog-pipeline skill to publish my next post to my Shopify development store: create it hidden, wait for my yes, then schedule it for 06:00 next Thursday and add its upcoming post entry."*

### 8. Turn on the publish-day email

Follow [`shopify/email/README.md`](../shopify/email/README.md): a private GitHub repository with 4 files, 2 secrets (`KLAVIYO_PRIVATE_KEY` and `FEED`, your blog's `.atom` address), and a dry run that shows the email without creating anything in Klaviyo.

A development store sits behind a password page, so GitHub can't read its feed. Test the dry run there with a feed file saved from your browser. The first real run happens on your live store.

> Ask Claude: *"Set up the publish-day email from shopify/email/README.md for my store, then run the dry run against my feed."*

## What goes wrong, and what to do

| What happens | What to do |
|---|---|
| A post goes live and its entry stays in the list | Nothing: the list hides an entry on its date, in the page and again in the visitor's browser. Delete old entries once a month (`DeleteUpcomingPost`); the section reads up to 50. |
| A post is called off | Hide the post (`HidePost`) and delete its entry. The list never reads the blog, so both need the change. |
| Shopify serves a stored copy of the blog page | The section checks each date again in the visitor's browser, so a stale copy still drops past posts. |
| A visitor in another time zone sees a post leave the list a few hours early or late | The browser check uses the visitor's own date. The post itself goes live at your store's time. |
| GitHub starts scheduled jobs late, sometimes by hours | The job runs off the hour, and if it starts after your send time, the email goes out at the next quarter hour that day. |
| The job runs twice | The campaign name holds the post and the date. The second run finds it and stops. |
| GitHub turns off the schedule | It does this in a public repository after 60 days with no commits. Keep the email repository private. |
| The email shows no image or a long excerpt | Shopify does not document its feed's fields. Run the dry run against your live feed before the first send, and give every post an excerpt and an image in its text. |
| Klaviyo or Shopify Flow could send this for you | Neither can today: Klaviyo flows start from lists, segments, metrics, dates, price drops and low stock, and Flow's triggers include nothing for blog posts. That is why the GitHub job exists. |

## Done when

- [ ] A test post scheduled on your development store went live at its time, and `CheckPost` showed it scheduled beforehand
- [ ] The upcoming posts list shows your next scheduled post, with the subscribe box, and drops it on its day
- [ ] A test signup shows up in your Klaviyo list
- [ ] Your publish day matches in BLOG.md, the cron line and the section's intro
- [ ] A dry run of the email shows your newest post with the right title, excerpt and image
