# Part 2: Decide what to write

**What you get:** a topic for each post that real people search for, that your site can rank for,
and that none of your other posts already covers. Each post gets one main search term of its own.

**Do this first (about 15 minutes):** open Google Search Console, go to **Performance**, and sort
the searches by **Impressions**. Look for searches where you show up and nobody clicks. Those are
people already looking for you, and your first topics are often in that list. New site with no
Search Console data yet? Write down 10 questions your clients ask you again and again. Those are
your first seeds.

**The skill does this for you.** Stage 1 of the [blog-pipeline skill](../skills/blog-pipeline/SKILL.md)
runs the 6 steps below in the same order and writes the result to `posts/_ideas/topic-ideas.md`,
the file stage 2 reads to write the brief. Ask Claude: *"Use the blog-pipeline skill to find topic
ideas."* Use this page to understand what it does, or to do it by hand.

Every account this part uses is in [What you need](../README.md#what-you-need) in the README.

---

## New site with no data yet?

You can still pick a good first topic. Here is the path:

- **No Search Console data:** skip steps 1 and 2 of the method below. Start from the questions your
  clients ask (section 4 of your `BLOG.md`), then Google autocomplete (step 3) and page one (step 5).
- **No volume tool:** go ahead on autocomplete and page-one evidence. If autocomplete suggests the
  phrase and page one has a weak result you can beat, the topic is worth a post. Mark the volume and
  difficulty "unestimated" and check the post in Search Console about 6 weeks after it goes live.
  If Claude can't open Google in your session, stage 1 ranks the ideas on what it has (your
  clients' questions, intent, what you bring) and marks autocomplete and page one "not checked".
  You paste nothing for the shortlist. After you pick one topic, you paste the autocomplete
  suggestions and the 10 page-one results for that one search, at the brief stage, before you
  approve the brief. Claude will ask for them.
- **No outside sources:** a post built on your own experience is fine when every claim is labeled
  as your experience ("in the 40 audits I've run, ..."). Your first-hand material is what page
  one lacks anyway.
- **Topics that need official sources** (tax rules, legal requirements, platform limits) wait until
  Claude can open those sources during research. Park them in your ideas list and pick a topic you
  can support yourself.

---

## The method, in this order

### Step 1: Search Console, pages with views and no clicks

Search Console shows the pages Google already shows for searches. In Search Console:
**Performance** > tick **Impressions**, **Clicks** and **Average position** > open the **Pages**
tab, last 3 months. A page with views and almost no clicks is a **refresh candidate**: a better
title, a clearer answer near the top or a missing section often fixes it. Refresh candidates come
before every new idea.

### Step 2: Search Console, searches with views and no clicks

Open the **Queries** tab and sort by Impressions. Two groups are worth a post or a rewrite:

- **Views and no clicks.** You show up, and the title does not earn the click. If no page really
  answers the search, it is a topic.
- **Position 10 to 20.** You sit on page 2. A focused post, or a stronger section on the existing
  page, can move you to page 1.

Export both tabs and give them to Claude.

**Prompt:**

```
Here is my Search Console export: <attach the Queries and Pages files>. Find:
1. pages with impressions and almost no clicks (refresh candidates)
2. searches with impressions and 0 clicks
3. searches with an average position between 10 and 20
For each, tell me which of my pages Google shows for it, whether that page really answers the
search, and whether it needs a new post or a better title on the existing page.
```

On a new site this list is short or empty. That is normal; the next steps work without it.

### Step 3: Google autocomplete

Type your topic into Google in a private window, so your own history doesn't steer it, and read the
suggestions before you press Enter. Then try your topic followed by each letter, and with words such
as "how", "template", "vs", "example" in front or behind. Each suggestion is a real search. Scroll to
the bottom of the results page for **related searches** and check **People also ask**.

Write down every phrasing that matches what you can teach. You need these as seeds for step 4.

### Step 4: Ubersuggest (free)

[Ubersuggest](https://neilpatel.com/ubersuggest/) gives you monthly search volume and SEO difficulty
(0 to 100) for a keyword. The free plan gives you 3 reports a day, and every lookup counts as one.

Make each report count:
- Plan all 3 reports before you start.
- Use **keyword ideas** (keyword suggestions) over single keyword lookups. One ideas report returns
  dozens of related terms with their volume and difficulty.

**On the website (no setup):** sign in at Ubersuggest, run a keyword ideas report for your seed,
copy the table and paste it into Claude:

```
Here is an Ubersuggest keyword ideas table for "<seed>", run on <date>: <paste the table>.
Mark the terms with volume above 0 and difficulty under 30, and tell me which ones match what
I teach in BLOG.md.
```

**If Ubersuggest is connected to Claude** (as a connector you added yourself), put 3 seed terms in
one keyword suggestions request:

```
Run one Ubersuggest keyword suggestions report for these 3 seeds: <seed 1>, <seed 2>, <seed 3>,
US searches. Show the results in a table: keyword, monthly volume, SEO difficulty. Mark the ones
with volume above 0 and difficulty under 30. Don't run any other report without asking me; I have
3 a day.
```

Volume numbers are estimates and they run low for new topics. A term with 0 volume in the tool can
still bring readers, but it should not be the main term of a post. No tool at all? Mark the numbers
"unestimated" and go on (see [New site with no data yet?](#new-site-with-no-data-yet)).

### Step 5: Who holds page one

Search the term yourself in a private browser window and look at the 10 results. Checking many
terms? Apify's Google Search Scraper can collect them for you. It is optional and paid after the
free monthly credit.

- **Who ranks?** Big brands and the platform's own help pages are hard to pass. Small blogs,
  forums and old posts mean there is room.
- **What kind of page?** If page one is all templates and you planned an essay, write the template.
  Match what the searcher wants.
- **What is missing?** Note questions the top results skip. That is your angle.

**Prompt:**

```
Here are the top 10 Google results for "<term>": <paste titles and URLs, or the scraper output>.
Tell me what kind of page Google prefers for this search, who the sites are, which questions they
leave unanswered, and whether a post on my site has a realistic chance to reach page one.
```

### Step 6: Overlap check

Check you have not already written it. Your blog posts, your site pages and your newsletter archive
all compete for the same Google searches. Two pages on one topic split the attention Google would
give one page.

Check:
- every blog post, published and scheduled
- your site pages (services, about, tools, landing pages)
- your newsletter archive and drafts, if your newsletter is public on the web (Substack and similar
  platforms are indexed by Google)

**Prompt:**

```
I'm considering a blog post about <topic>. Search my blog posts (including scheduled ones), my site
pages and <link to newsletter archive> for anything that covers the same question or targets a
similar search term. List each match with its title, URL and the search term it targets. Tell me
whether the new post would compete with any of them.
```

If an existing piece already covers it, the idea becomes a refresh of that piece, or you drop it.
Check your planned posts too: another planned post's main search should never show up as a
secondary keyword on this one.

Have one topic in mind already? Run this check first. It takes a few minutes and can save the rest.

---

## Pick the main search term

**Aim for difficulty under about 30.** A newer or smaller site ranks most easily for terms with SEO
difficulty under about 30. Higher terms can wait until your site has more posts and more links in.
Pick the term with the best mix of volume above 0 (or, unestimated, autocomplete plus a weak page
one), low difficulty and a close match to what you sell or teach.

**One main search term per post.** Put it in the title, the description, the first paragraph and
one heading. Then make sure no other post uses the same main term. When 2 or 3 of your posts target
one term, they compete with each other and Google picks none of them with confidence.

**Prompt:**

```
List every blog post on my site with its title and the main search term it targets (from the
keywords field, title or first paragraph). Flag any search term that 2 or more posts target. For
each clash, recommend which post should own the term and what the other posts should target
instead, and add links from the other posts to the owner.
```

---

## Worked example: "klaviyo mcp"

On kingadow.com, a keyword check in Ubersuggest showed "klaviyo mcp" at 210 searches a month with a
difficulty of 25. It was the best opening in the data: real volume, under 30, and squarely the
subject of the site.

The overlap check found a problem. 3 posts already claimed the term, so the site was competing with
itself.

The fix, on 2026-10-21:
- One post became the owner. It was retitled "Klaviyo MCP Server: What It Does, and When to Use the
  API", with the term first in the title and description.
- The term came out of the keyword lists of the other 2 posts.
- Their links about the connector now point at the owner post.

One post, one term, and links from the related posts that tell Google which page answers the search.

---

## The output: your ideas list

The skill saves its ideas to `posts/_ideas/topic-ideas.md` in your site's folder, newest run at the
top, and ends with a shortlist of the top 5. Doing it by hand? Save your notes in the same file with
the same fields for each idea, so stage 2 of the skill can read it:

| Field | Your answer |
|---|---|
| Working title | |
| Category | One from your BLOG.md |
| Target search | The exact words a person types |
| Intent | Informational, commercial or navigational |
| Evidence | Autocomplete yes, no, or "not checked (no web access)"; volume and difficulty with source and date, or "unestimated"; Search Console views if any; one line on page one |
| New or refresh | If a page already targets it, name the page |
| What you bring | The first-hand material only you have for this topic |
| Confidentiality flag | If it draws on client work |

---

## Done with Part 2 when

- [ ] Your next topic passed the overlap check
- [ ] It has one main search term with evidence people search it: volume above 0 and difficulty
      under about 30, or, on a new site, autocomplete plus a weak result on page one, marked
      "unestimated"
- [ ] You know who holds page one and what your post adds
- [ ] No other post on your site targets the same main term

Back: [Part 1: Get your site ready](1-get-your-site-ready.md). See it applied in
[the kingadow.com example](../examples/kingadow-com/README.md).
