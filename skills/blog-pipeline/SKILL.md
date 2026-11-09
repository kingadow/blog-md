---
name: blog-pipeline
description: "Writes blog posts for your own site, from topic to a review-ready post: picks topics from real search data, writes the brief, checks every fact, drafts in your voice, makes a 1200x630 featured image and puts the post in the site's content folder with frontmatter the build accepts. Reads BLOG.md at the project root first for voice, audience, banned words, categories, cadence and the frontmatter contract. Use whenever the task is to write, draft, research, brief, refresh, update, schedule or publish a blog post or article, plan what to write next, find keywords or topics for a blog, fix an old post that Google shows but nobody clicks, or fill in BLOG.md. Triggers on: write a blog post, blog idea, blog topics, blog brief, keyword research for the blog, refresh a post, schedule a post, publish the post, BLOG.md, posts/ folder. Social posts and newsletters belong to other skills."
---

# Blog pipeline

**What you get:** a post that answers a real search, in your voice, with checked facts, a 1200x630 image and valid frontmatter, waiting for your review in its own folder.

**First thing to do:** put a filled-in `BLOG.md` at the root of your project (the template is in this repo). Every stage reads it.

## Read first, every time

1. `BLOG.md` at the project root: site, reader, goal, voice, words to avoid, categories, cadence, SEO and image rules, frontmatter defaults and the Corrections list. Where BLOG.md and this skill disagree, BLOG.md wins.
2. `references/frontmatter-contract.md` before writing any frontmatter.
3. The reference file for the stage you're running, and nothing else you don't need.

**No BLOG.md yet?** Stop and offer to make one. Read 3 to 5 of the person's existing posts or pages, ask the questions in each section of the template, write the file and ask them to check it. A post written without it sounds like nobody in particular.

## How it works

A blog post is the answer to something a person types into Google. The knowledge can come from a talk, a newsletter or a client call; the post rebuilds it around one search: a title that matches the search, the answer near the top, headings phrased the way people search.

**Refresh before you write new.** Check whether an existing post or page already targets the search. A post Google already shows, with views and no clicks, is worth more than a new post from zero, and it takes a fraction of the work. Two pages aimed at one search usually both lose.

## The working folder

One folder per post, in the person's project: `posts/<YYYY-MM-DD>-<slug>/`. The date is the planned publish day. The slug is the final address and file name. Each stage writes one file into the folder, so the folder is the memory: any stage can be re-run or picked up later without redoing the stages before it.

| # | Stage | Reads | Writes | Instructions |
|---|---|---|---|---|
| 1 | Ideation | BLOG.md, search data, existing posts and pages | `posts/_ideas/topic-ideas.md` | `references/01-ideation.md` |
| 2 | Brief | one topic | `brief.md` | `references/02-brief.md` |
| 3 | Research | `brief.md` | `research.md` | `references/03-research.md` |
| 4 | Draft | `research.md`, `brief.md`, BLOG.md | `draft.md` | `references/04-draft.md` |
| 5 | Visuals | `draft.md` | `visuals.md`, `<slug>.svg`, `<slug>.png` | `references/05-visuals.md` |
| 6 | Publish | `draft.md`, `visuals.md` | the post in `src/content/blog/`, images in `public/images/blog/`, `publish.md` | `references/06-publish.md` |

**The whole chain:** stages 2 to 6 in order for one topic. Stage 1 is a batch step: run it when the list of ideas runs low, about once a month at a weekly cadence.

**"Plan my first post" (or "plan my next post"):** stage 1, then stage 2. Run ideation, show the shortlist, let the person pick one topic (it need not be #1; record the pick and why in `topic-ideas.md`), then write its brief. Stop after the brief and say which stage comes next. When the person asks to "find topic ideas", run stage 1 only; when they ask to "write the brief for <topic>", run stage 2 only.

**One stage:** the person names the stage and the post. Read that stage's file and its inputs, and skip the rest.

**A refresh:** skip stages 1 and 2. Make the folder `posts/<today>-<slug>-refresh/`, run stage 3 and stage 4 in refresh mode, then stage 6.

Paths above are the starter site's. If BLOG.md lists other folders, use those.

## Rules

These override any stage file. BLOG.md can add more.

1. **Never invent a source, statistic, quote or link.** Every URL in a post was opened during research. A claim you can't verify gets cut, or marked `[UNVERIFIED]` for the person to confirm. The person's own experience counts as a source when it's labeled as theirs. A figure from their work needs a file in the project or a dated chat quote recorded in `research.md` (stage 3); without one it's `[UNVERIFIED]` and stays out of the published file.
2. **Check facts about tools and platforms against current documentation.** Features and limits change, and last year's how-to is often wrong today.
3. **Search numbers are data or they're labeled.** Volume and difficulty come from a tool someone ran, with the date, or the file says "unestimated". A guessed number presented as data is worse than no number.
4. **The person reviews every draft before it publishes.** New posts get `draft: true`. The skill never pushes, deploys or flips `draft` on its own. The one exception is a refresh of a live post, which keeps `draft: false` (see stage 6).
5. **Approval: when, how, and where edits go.** This is the one place the skill defines it; stage 6 follows it.
   - **When:** any time after stage 6 has written the published file and the person has read the post. The same session is fine.
   - **How:** one change. The person sets `draft: false` in `src/content/blog/<slug>.md`, or tells Claude to. Confirm `date` is the publish day at the same time.
   - **Where edits go:** before stage 6, in `posts/<folder>/draft.md`. After stage 6, in the published file only. `draft.md` stays as the draft that was handed over, and `publish.md` lists each change made after it.
   - **What holds it back:** anything still to do before the date (a missing page, an `[UNVERIFIED]` claim, a line the link audit prints) keeps the post at `draft: true` until it's done.
6. **The date is the publish gate.** The starter keeps a future-dated post hidden until its day and lists it under Upcoming Posts.
7. **Client work stays anonymous** unless the client agreed to be named. Removing the name is the start: check combinations of category, place and timing that still identify them ("a candle shop in Vermont that launched in March" is a name). Turn revenue into ratios or percentages.
8. **Answer first.** One beat of context the reader recognizes from their own work, then the answer by the end of the third paragraph. A question never opens a post.
9. **Write for the search, with one call to action.** Headings phrased the way people search, numerals for figures, short paragraphs. The main action is the one in BLOG.md section 3, and it matches `cta` in `src/site.config.mjs`. The starter shows that button, with a subscribe box, at the end of every post, so the body needs no closing call-to-action link. The body may link to the main action once, in the text, only where it fits the post, and only to a page that exists or to the `cta` address.
10. **Link only to pages that are live on the post's publish date.** That means every link to the site's own domain, posts and pages alike. Write own-site links as relative links (`/about/`). Stage 6 has the check.
11. **The voice belongs to the person.** A draft that reads like competent content from a stranger has failed, even when every rule passes.

## Corrections become rules

When the person corrects the same thing twice (a word, an opening, a heading style), offer to add a dated line to the Corrections section of BLOG.md. Stage 4 reads that section before every draft, so a fix made once stays fixed.

## Before handing over a draft

Search the draft for every word in BLOG.md's "Words to avoid", for example:

```bash
grep -n -i -E "word one|word two|—" posts/<folder>/draft.md
```

A word search misses sentence shapes. Run the shape search in stage 4 ("Shapes a word search misses"), then read the draft once for the shapes BLOG.md lists that no search catches, such as an opening question or a closing recap. Check every factual sentence against `research.md` too (stage 4).

Then tell the person, in a few lines: where the draft is, the target search, the planned date, anything marked `[UNVERIFIED]`, any confidentiality question, and what they need to decide.

## Optional: a newsletter version

If the person also publishes a newsletter (Substack, Beehiiv, Kit or similar), the same knowledge can go out there. Give the newsletter version its own title and its own search phrase, so the 2 pages don't compete in Google, and add the newsletter archive to the overlap check in stages 1 and 2.

## Tools

Claude Code, or Claude with access to the project's files. Search data comes from free tools: Google autocomplete, Google Search Console, the free Ubersuggest plan and a plain Google search for page one. If a tool isn't connected, ask the person to paste what they see (Ubersuggest works fine on its website), or mark the number unestimated. A new site with no data and no tools can still go ahead: `references/01-ideation.md` has the path.

**No web access this session:** stage 1 ranks ideas on the evidence it has and marks the rest "not checked". The person pastes the autocomplete suggestions and page one for the one target search they chose, at stage 2, before the brief is approved. Nobody pastes for the whole shortlist. Keep API keys out of BLOG.md and out of the post folders.
