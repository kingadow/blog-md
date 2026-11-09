# BLOG.md for kingadow.com

**What this is:** the BLOG.md behind the kingadow.com blog, filled in, so you can see what a finished one looks like. A new post has gone out every Thursday since 2026-07-30 using these rules with the blog-pipeline skill.

**First thing to do:** read it next to the empty template in the repo root, then fill in yours. Copy what fits; your voice and your reader will differ.

---

## 1. Site

*Why it matters: Claude needs to know where posts go and what the site is for.*

- **Site name:** Kinga Dow Productions
- **Address:** https://kingadow.com
- **Author name:** Kinga Dow
- **Posts folder:** src/content/blog/
- **Images folder:** public/images/blog/, used in posts as /images/blog/<file>
- **Site pages folder:** src/pages/
- **Newsletter archive:** the Substack archive

## 2. Who you write for

*Why it matters: every post opens on a moment this reader recognizes.*

- **The reader:** owners and marketing leads of e-commerce brands that run their email and SMS in Klaviyo, usually on Shopify, with small teams. Also people who look Kinga up before hiring her.
- **What they're doing when they search:** fixing a flow that stopped selling, deciding whether to hire help, trying to connect Klaviyo to Claude, checking whether their email numbers are good
- **What they already know:** Klaviyo's basics, their store, their own sales numbers
- **What to skip explaining:** what a flow or a segment is
- **Write for a brand owner:** endpoint names, scope names, rate limits and code stay out. A technical term gets an everyday word or a one-clause explanation the first time.

## 3. What you want readers to do

*Why it matters: one call to action per post, and topic choice leans toward people close to hiring.*

- **Main action:** book a consultation at https://kingadow.com/consultation/ (posts with commercial intent)
- **Second action:** https://kingadow.com/services/ (posts about positioning and what to hire)
- **Which searches matter most:** commercial ones. "How to audit a Klaviyo account" over "why retention matters". A post read by 20 people looking to hire beats one read by 200 who aren't.

## 4. What you bring

*Why it matters: first-hand material is what page one lacks.*

- **Experience:** 8+ years running Klaviyo for e-commerce brands as a retention agency
- **Evidence:** real numbers from the work (as ratios, never client revenue), before and after comparisons, what she's seen across many accounts and agency calls, screenshots with client details removed
- **Point of view:** AI is the operating layer that makes a retention system run every week. Claude connected to Klaviyo answers questions from the account's own data, where most teams use a rule of thumb.
- **The test for the AI angle:** take the AI section out. The post should still stand as useful Klaviyo advice. If it collapses, the AI section was carrying a generic post.
- **Categories of first-hand evidence she uses:** a time-bound scope ("the first 4 months of 2026 on calls with agency owners"), a before and after with numbers, a practitioner quote attributed by role, "I was there" observation

## 5. Voice

*Why it matters: posts should read like Kinga, someone who has done the work.*

- **Voice to match:** https://kingadow.com/blog/klaviyo-rfm-segmentation/ and https://kingadow.com/blog/mcp-vs-api-klaviyo/
- **Person:** first person singular. "I" for Kinga, "you" for the reader.
- **Direct and evidence-first.** State the problem plainly, then the answer, with a number, an example or a quote behind each main claim.
  - *"Almost every Klaviyo account I look at has the same shape. The sending is careful and the segmentation is not."*
- **Open on a moment the reader recognizes, then widen.** The first 2 or 3 sentences show something concrete from their own email, Klaviyo or Figma work. The broad argument comes after.
- **Lead with what a thing is and does.** Capability first, limits after, framed as which tool owns the job.
  - *Write "a webhook is an API job", and skip "the connector can't create a webhook".*
- **Headings:** noun phrases or plain statements, phrased the way people search ("What an AI Workflow Is", "How to Build RFM Segments in Klaviyo")
- **Paragraphs:** 4 to 6 sentences at most. A one-sentence paragraph for emphasis now and then.
- **One analogy per post at most,** grounded in a tool everyone knows (Excel and pivot tables).
- **Numerals for figures:** 30%, $40, 90 days, 6 emails, 30x. Words for ordinals (the first email) and figures of speech (one of them, both). Never start a sentence with a numeral.
- **Contractions throughout:** it's, didn't, you're. Keep the full form at the end of a clause ("as it is") and inside quotes.
- **Plain, literal sentences.** If a sentence needs a second read, rewrite it plainly. Name things instead of "the first discipline, the second".
- **Agencies and consultants are hired or signed with,** never bought.
- **Spelling:** US (color, gray, organize)
- **Endings:** add the next step and one call to action. Never restate the opening.

## 6. Words to avoid

*Why it matters: the skill searches every draft for these before Kinga sees it.*

- **Adverbs that claim a failure is invisible:** `quietly`, `silently`, `loudly`. State the concrete reason nobody noticed: "the flow keeps sending and nothing reports an error."
- **Marketing filler:** `leverage`, `unlock`, `empower`, `seamlessly`, `deep dive`, `game-changer`, `revolutionize`, `holistic`, `synergies`, `journey`, `exciting`, and `powerful`, `innovative`, `cutting-edge` without specifics
- **Openers:** `In today's fast-paced world`, `As technology continues to advance`, any question as the first sentence
- **Shapes:**
  - em dashes (use a comma, a period or a colon)
  - negative parallelism: `Not X. Y.`, `It isn't A. It's B.`, `not because X, but because Y`
  - a sentence starting with `Because`
  - `rather than`, `not just`, `not only`, `the idea that X is wrong`
  - section headers about limits: `Where X stops`, `What it will not do`
- **Claims:** a statistic without a source; "AI is transforming"; a universal claim with no evidence
- **Speed:** never lead with `fast`, `quick` or `in minutes`
- **Search command:**

```bash
grep -n -i -E "loudly|quietly|silently|^Not |^Because |\. Not |\. Because |—|rather than|not just|not only" draft.md
```

## 7. Categories

*Why it matters: 4 steady categories keep the index tidy.*

- **Klaviyo:** audits, flows, forms, segmentation, deliverability. The highest commercial intent.
- **AI Systems:** Claude and AI workflows for e-commerce, the systems layer
- **Email Marketing:** retention and lifecycle strategy, what to hire, how to judge email numbers
- **eCommerce:** customer data, repeat purchase, unit economics

Spelled exactly as above in `category`.

## 8. Cadence and publish day

*Why it matters: the date is the publish gate.*

- **How often:** weekly
- **Publish day:** Thursday. Every Thursday, holidays included (Thanksgiving, Christmas Eve, New Year's Eve). Holiday slots get evergreen posts written ahead.
- **Where planned posts live:** a content calendar with one slot per Thursday. An empty week gets flagged right away with a proposed post.
- **Newsletter:** each post also gets a Substack version with its own search title, so the 2 don't compete.

## 9. SEO rules

*Why it matters: these turn a good post into one people can find.*

- **metaTitle pattern:** `<Title> | Kinga Dow`, under about 60 characters
- **metaDescription:** under about 155 characters, saying what the reader gets. Written on every post; the excerpt never stands in for it.
- **Title:** has to earn a click when Google shows it 9th
- **Answer:** inside the first 100 words, after one beat of context
- **Headings:** phrased the way people search
- **keywords:** 5 to 8, the target search first
- **Difficulty ceiling:** under about 30
- **Search tools:** Google autocomplete, Search Console (connected), Ubersuggest free plan (3 reports a day, 3 seeds per keyword suggestions lookup), Google page one in a private window
- **Overlap check covers:** blog posts, site pages, the published Substack archive and its search titles, Substack drafts
- **One page owns each search.** "klaviyo mcp" (210 searches a month, difficulty 25) was split across 3 posts; on 2026-10-21 one post was retitled to own it.
- **Internal links:** only to posts live on the linking post's date. After each Thursday post goes live, older posts that want it get a link to it.
- **Refresh rule:** a page Google shows with views and no clicks gets a new title and description before any new post on that search

## 10. Image rules

*Why it matters: the featured image is the card and the link preview.*

- **Size:** 1200x630
- **Default style:** an SVG diagram for concept and system posts (pipelines, flows, before and after). Other posts get a placeholder for a manual design pass.
- **Brand colors (from the site's CSS):** navy #3F455D, gold #BA9200, button gold #E0B000, cream #F6EFE6, light cream #FFF8F0, body text #333333, sage #59A56D, light sage #8CAB95
- **Fonts:** Aktiv Grotesk for headlines, Montserrat for body. In SVG, fall back to Montserrat, Arial, Helvetica, sans-serif.
- **SVG heroes:** always with a PNG twin of the same name, 1200x630, so LinkedIn and Substack previews show an image
- **Alt text:** what the diagram shows and what it argues
- **Screenshots:** account names, brand names, product names and revenue removed. When in doubt, leave it out.

## 11. Frontmatter contract

*Why it matters: a missing or misspelled field stops the build.*

- **Always written:** `title`, `date`, `excerpt`, `image`, `imageAlt`, `category`, `keywords`, `draft`, `metaTitle`, `metaDescription`
- **On a refresh:** `updated`; `date` stays at the original publish date
- **author:** "Kinga Dow"
- **Call to action links:** /consultation/ for commercial posts, /services/ for positioning posts

## 12. Client work and privacy

*Why it matters: an anonymous story can still name a client.*

- **Naming clients:** never. Confidentiality agreements cover all client work, including work in her own case studies.
- **Public brands she observed at events** (trade shows, public campaigns) can be named.
- **Numbers from client work:** ratios and multiples, never absolute revenue
- **Never stack** category with place with timing. Together they identify a brand even with the name removed.
- **Quotes from calls:** by role, never by name

## 13. Corrections

*Why it matters: each fix made twice became a rule.*

- **2026-07-31:** the first 8 posts opened too abruptly with the answer in sentence 1. Rule: one beat of context, then the answer by the end of the third paragraph.
- **2026-07-31:** a post linked to a post that hadn't published yet. Rule: link only to posts live on the linking post's date, and add links into each new post after it goes live.
- **2026-08-08:** negative parallelism read as AI writing. Rule: state the real reason directly; no sentence starts with `Because`.
- **2026-09-03:** a draft used endpoint names. Rule: write for a brand owner, not a developer.
- **2026-09-05:** a post opened on the broad subject (what AI costs). Rule: open on a moment from the reader's own email, Klaviyo or Figma work.
- **2026-09-05:** a draft read as a list of what tools can't do. Rule: affirmative framing, capability first.
- **2026-09-05:** figures written as words. Rule: numerals for figures.
- **2026-10-14:** read-aloud review found clever lines that needed a second read. Rule: plain, literal sentences; contractions throughout.
- **2026-10-26:** a proposed topic was already covered on Substack. Rule: the overlap check covers Substack and site pages, and topics are picked on search data.
