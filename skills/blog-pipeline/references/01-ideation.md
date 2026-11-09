# Stage 1: Ideation

**What you get:** 10 to 15 topic ideas, each tied to a real search, each marked as a new post or a refresh, with a ranked shortlist of 5.

**Writes:** `posts/_ideas/topic-ideas.md`. This is a batch step with no post folder. Put the date of the run at the top and add new runs above old ones.

Run it when the list of ideas runs low: about once a month at a weekly cadence. For a first post, run it, let the person pick one idea, then go to stage 2.

Part 2 of the repo (`docs/2-decide-what-to-write.md`) explains the same 6 steps, in the same order, for people who want to do them by hand.

## Inputs

- `BLOG.md`: the reader, what you want readers to do, categories, what you bring, seed phrases
- The existing posts (`src/content/blog/`) and site pages (`src/pages/`), plus a newsletter archive if BLOG.md lists one
- Google Search Console, if the site is connected and has data
- The person's own material: notes, talks, newsletter issues, and the questions clients or customers ask again and again

## New site with no data yet

- **No Search Console data** (a new site, or not connected yet): skip steps 1 and 2. Start from the questions the person's clients ask (BLOG.md section 4, "Questions you hear again and again"), then run steps 3, 5 and 6.
- **No volume tool:** go ahead on autocomplete and page-one evidence. A phrase autocomplete suggests, with at least one weak result on page one, is a valid idea. Write "unestimated" for volume and difficulty and rank by intent (commercial first when BLOG.md's goal is leads) and by what the person brings. Suggest checking the post in Search Console about 6 weeks after it goes live.
- **No way to open pages this session:** rank the ideas on the evidence you have: the questions in BLOG.md, intent, what the person brings, and Search Console if it's connected. Write "not checked (no web access)" for autocomplete and page one. Don't ask for pastes at this stage. Once the person picks a topic, they paste the autocomplete suggestions and page one for that one target search at stage 2, before the brief is approved. Those pastes live in the brief, verbatim; after stage 2, the idea's Evidence line here says "see brief.md" and holds no second copy. Never fill in page one from memory. Prefer topics the person can support from their own experience. A post with no outside sources is fine when every claim is labeled as the author's experience. Topics that need official sources (tax rules, legal requirements, platform limits and prices) wait until research can open those sources: list them with the note "needs official sources" and keep them off the shortlist.

## Method, in this order

**1. Refresh candidates.** In Search Console, open Performance, then Pages, for the last 3 months. A page with views (Search Console calls them impressions) and almost no clicks is a refresh candidate. Also flag pages whose facts are out of date. These come before every new idea.

**2. Searches with views and no clicks.** In Search Console, open Queries. Look for searches where the site shows up, gets no clicks, and has no page built for that search. Google already links the site to the topic, so a page made for the search has a head start.

**3. Google autocomplete.** Type each seed phrase from BLOG.md into Google in a private window, so your own history doesn't steer it. Note the suggestions. Then add a letter after the seed ("welcome email a", "welcome email b") and note those too. Write down the "People also ask" questions on the results page.

**4. Ubersuggest, free plan.** The free plan gives 3 reports a day, and every lookup counts as one. Plan all 3 before running any. Use the keyword suggestions report with 3 seed phrases in one lookup: one report returns dozens of searches with monthly volume and difficulty (0 to 100). Record the numbers with the date.

**5. Who holds page one.** For each promising search, search it on Google in a private window and read the top 10. Big brands and the platform's own help pages are hard to pass. Forum threads, Reddit, thin posts and posts that are years old are beatable. Prefer searches with difficulty under about 30 and at least one weak result on page one.

**6. Overlap check.** Look for the search phrase and close variants in existing post titles, slugs, `metaTitle` values and headings, in site pages, and in the newsletter archive. If a page already targets it, the idea is a refresh of that page, or it's dropped. One page should own each search. Check the ideas in this run against each other too: 2 ideas never share a target search, and one idea's target search is never another idea's variant. On kingadow.com, "klaviyo mcp" (210 searches a month, difficulty 25) was split across 3 posts; on 2026-10-21 one post was retitled to own it.

## Output format

For each idea:

- **Working title:** the brief sharpens it later
- **Category:** one from BLOG.md
- **Target search:** the exact words a person types
- **Intent:** informational (wants to learn), commercial (comparing or close to hiring or buying) or navigational (looking for a site). If BLOG.md's goal is leads, commercial ranks first.
- **Evidence:** autocomplete yes, no, or "not checked (no web access)"; volume and difficulty with source and date, or "unestimated"; Search Console views if any; one line on page one
- **New or refresh:** if a page already targets it, name the page
- **What you bring:** the first-hand material only this person has for this topic
- **Confidentiality flag:** if it draws on client work

End with the shortlist: the top 5, one line each on why. With evidence "not checked", rank by intent first, then by the first-hand material the person has, and say so above the shortlist.

When the person picks, add a line under the shortlist: the pick, the date and their reason. The pick need not be #1.

## Rules

- Search volume is data or it's "unestimated". Never fill a gap with a guess.
- Drop ideas that fit none of the categories in BLOG.md. They may belong in a newsletter or a social post.
- Prefer the question a buyer asks over the question a peer asks: "how to audit a welcome flow" over "the philosophy of retention".
- Seasonal topics get written ahead, so they're live before people start searching.
