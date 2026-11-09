# BLOG.md

**What you get:** one file that tells Claude who you are, who you write for and how your posts should sound. The blog-pipeline skill reads it before every stage, so every post starts from your rules and your corrections stay fixed.

**First thing to do:** copy this file to the root of your site's folder (the top folder that holds your site's files; in the starter, next to `package.json`) and fill in sections 1 to 3. No site yet? Fill it in anywhere and move it in when you have a site folder. The rest can wait until your first post. Each field has an example in italics; replace it with yours, or delete what you don't need.

**The explanation lines are optional:** everything above the first line (`---`), and the italic "Why it matters" line under each heading. Delete them or keep them; the skill only needs your answers. The kingadow.com example keeps them. Keep the headings and the field names.

No time to fill it in? Ask Claude: "Read my last 5 posts and my About page, then fill in BLOG.md and show me what you guessed." Then correct what it got wrong.

Keep passwords, API keys and account IDs out of this file. It sits in your project and may end up public.

---

## 1. Site

*Why it matters: Claude needs to know where posts go and what the site is for.*

- **Site name:** *Example Studio*
- **Address:** *https://example.com*. No site online yet? Write the Netlify address you plan to use (*your-name.netlify.app*) and change it when you go live.
- **Author name:** *Your Name*
- **Posts folder:** *src/content/blog/* (the starter's default)
- **Images folder:** *public/images/blog/*, used in posts as */images/blog/<file>*
- **Site pages folder:** *src/pages/*
- **Newsletter archive (optional):** *https://yourname.substack.com/archive*

## 2. Who you write for

*Why it matters: every post opens on a moment this reader recognizes. Get this wrong and the post reads as if it were for someone else.*

- **The reader:** *owners of online shops with 1 to 10 people who run their own email marketing*
- **What they're doing when they search:** *setting up their first automated emails, or wondering why sales from email dropped*
- **What they already know:** *how to send a newsletter; their store's admin*
- **What to skip explaining:** *what an email list is*
- **Words they use:** *"welcome emails", "abandoned cart"; they rarely say "lifecycle"*

## 3. What you want readers to do

*Why it matters: each post gets one call to action, and topic choice leans toward searches from people close to this step.*

- **Main action:** *book a call* at */contact/*. Use the same address as `cta.url` in the starter's `src/site.config.mjs`: the starter shows that button, with a subscribe box, at the end of every post and on the About page. It must be a page that exists on your site, written as a relative link, or a full address on another site (a booking tool) or `mailto:`. The starter has an About page at */about/* and no contact page. To add one, ask Claude: "Add a /contact/ page with [my booking link or email] and point cta in src/site.config.mjs at it."
- **Your prices (optional):** *brand audit from $1,500; monthly retainers from $2,000*. Posts that answer "how much does it cost" or "should I hire" use this. Leave it blank and the skill asks when a post needs it.
- **Second action, for posts that teach:** *subscribe to the blog* (the starter's subscribe box)
- **Which searches matter most:** *commercial ones, from people comparing options or ready to hire*

## 4. What you bring

*Why it matters: Google and readers reward posts with something page one lacks. Yours is first-hand material nobody else has.*

- **Your experience:** *8 years running email for small shops*
- **Your evidence:** *before and after numbers from your own work, screenshots, things you've seen in 100+ accounts*
- **Questions you hear again and again:** *"Why do my welcome emails get opens and no sales?"*
- **Your point of view:** *most small shops need fewer emails, sent at better moments*
- **Where your material lives:** *notes/ folder, past newsletter issues, call notes*. A figure from your work goes in a post only when Claude can open the file that holds it, or you give it in chat. Anything else is marked `[UNVERIFIED]` until you confirm it. The starter's `.gitignore` keeps `notes/` and `posts/` off GitHub, since both can hold figures from client calls. On another site, add both to your `.gitignore`.

## 5. Voice

*Why it matters: the post should read like you wrote it. Rules with an example each work better than adjectives.*

- **Voice to match:** *2 of your best posts, by address: https://example.com/blog/post-one/, https://example.com/blog/post-two/*
- **No posts yet?** Give Claude something else that sounds like you. Record yourself explaining something to a client (a voice memo or a call you're allowed to record) and paste the transcript, or paste 3 emails you've sent. Then ask Claude to write the rules below from it.
- **Person:** *first person, "I" for me, "you" for the reader*
- **Rules, each with an example:**
  - *Short sentences. "The second email does the selling."*
  - *Open on a moment from the reader's day. "You check your store at 9pm and see 3 abandoned carts."*
  - *Numerals for figures: "6 emails", "30%", "90 days".*
  - *Contractions: "it's", "you're", "didn't".*
- **US or UK spelling:** *US*

## 6. Words to avoid

*Why it matters: the skill searches each draft for these before you see it. Add a word the second time you delete it.*

- **Words:** *`leverage`, `unlock`, `game-changer`, `seamlessly`, `deep dive`*
- **Shapes:** *em dashes; opening with a question; ending with a recap*
- **Claims to avoid:** *any number without a source*

## 7. Categories

*Why it matters: posts in a few steady categories keep the blog index tidy and tell Google what you cover. A topic that fits none of them probably belongs somewhere else.*

- *Email Marketing: flows, campaigns, copy*
- *Ecommerce: store setup, retention, customer data*
- *Tools: reviews and how-tos for the tools you use*

Use the exact spelling in each post's `category`.

## 8. Cadence and publish day

*Why it matters: a post's date is its publish gate. The starter keeps a future-dated post hidden until its day, and the weekly build publishes it.*

- **How often:** *weekly*
- **Publish day:** *Thursday*. With the starter, the publish day lives in 3 places, and all 3 must match: this line, `publishDay` in `src/site.config.mjs`, and the schedule line (`cron`) in `.github/workflows/publish.yml`. Ask Claude: "Change my publish day to Tuesday in BLOG.md, src/site.config.mjs and .github/workflows/publish.yml, changing only the live cron line there." The starter's sample posts mention Thursday too; you delete those when you add your own.
- **Holidays:** *publish anyway, with posts written ahead*
- **Where planned posts live:** *the table below*

| Date | Working title | Target search | Status |
|---|---|---|---|
| *2026-12-03* | *Welcome email timing* | *welcome email timing* | *brief* |

## 9. SEO rules

*Why it matters: these turn a good post into one people can find.*

- **metaTitle pattern:** *`<Title> | Your Name`*, under about 60 characters
- **metaDescription:** under about 155 characters, saying what the reader gets
- **Headings:** phrased the way people search
- **Difficulty ceiling:** *pick searches with difficulty under about 30*
- **Search tools you have:** *Google autocomplete; Search Console (connected: yes/no); Ubersuggest free plan, 3 reports a day*. None yet? Write *none connected; I'll paste autocomplete and page one by hand*. The skill then ranks ideas without them and asks you to paste for the one topic you pick.
- **Overlap check covers:** *blog posts, site pages, newsletter archive*
- **Internal links:** only to pages live on the post's publish date
- **Refresh rule:** a page Google shows with views and no clicks gets a refresh before any new post on the same search

## 10. Image rules

*Why it matters: the featured image is the card on your blog index and the picture when someone shares the link.*

- **Size:** 1200x630
- **Default style:** *a simple diagram in brand colors for posts that explain how something works*
- **Words on the image:** a headline of about 8 words at most; a checklist card can run to about 15. A small site name line doesn't count.
- **Brand colors:** *dark #1F2937, accent #2563EB, background #F9FAFB*. The images use these colors and no others, so list every one you want used.
- **Text on images:** at least 28px at 1200 wide, with contrast of 4.5:1 or more against the color behind it
- **Fonts:** *Inter for headings and text; fallback Arial, Helvetica, sans-serif*
- **SVG heroes:** always with a PNG twin of the same name, so link previews show an image
- **Alt text:** what the image shows and the point it makes

## 11. Frontmatter contract

*Why it matters: a missing or misspelled field stops the build. The full contract is in the skill's `references/frontmatter-contract.md`; these are your defaults.*

- **Always written:** `title`, `date`, `excerpt`, `image`, `imageAlt`, `category`, `keywords`, `draft`, `metaTitle`, `metaDescription`
- **On a refresh:** `updated`
- **When needed:** `author` (if not the site default), `announce` (to list a draft in Upcoming Posts)
- **Your author name:** *Your Name*
- **Your call to action link:** */contact/*, the same address as `cta.url` in `src/site.config.mjs`

## 12. Client work and privacy

*Why it matters: an anonymous story can still name a client by accident.*

- **Naming clients:** *only with written permission*
- **Numbers from client work:** *as ratios or percentages, never revenue*
- **Watch for:** combinations of category, place and timing that point to one business
- **Screenshots:** scrub names, products, revenue and email addresses

## 13. Corrections

*Why it matters: a fix you make once should stay fixed. When you correct the same thing twice, add it here as a rule. The skill reads this list before every draft.*

Format: date, what was wrong, the rule from now on.

- *2026-11-12: openings started with the definition. Rule: open on a moment from the reader's own week, then give the answer.*
- *2026-11-19: "utilize" appeared 4 times. Rule: "use".*
