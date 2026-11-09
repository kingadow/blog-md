# Stage 3: Research

**What you get:** `research.md`, an answer-first outline where every fact has a source you can open.

**Reads:** `brief.md`
**Writes:** `research.md` in the post folder

## The one rule

Every fact in the output traces back to something read during this stage, or to the person's own first-hand experience.

A claim you can't verify gets cut, or marked `[UNVERIFIED: confirm with the author]` so it surfaces at review. Never smooth over a gap with a sentence that sounds right. One invented statistic costs more trust than the post earns.

Every URL was opened. If a page fails to load, its link stays out.

**When nothing can be opened.** A post with no outside sources is fine when every claim rests on the author's own experience and says so ("in the accounts I've audited", "on my own site"). Check the brief first: if a claim needs an official source (a tax rule, a legal requirement, a platform's current limit or price) and you can't open one, stop and tell the person. That topic waits for a session where the source can be opened; pick another from `posts/_ideas/topic-ideas.md` meanwhile.

With nothing opened, the page-one gap rests on what the person pasted at stage 2 (titles, and coverage lines if they gave them). Say so under "What this post adds" in `research.md`, and re-check page one at the first refresh.

General knowledge about an outside source (what a well-known study, book or article says) counts as an outside claim, even when the person knows it well. Cut it, or mark it `[UNVERIFIED]` and list it under Open questions, until the source is opened.

## What to gather

**Current platform behavior.** Anything about how a tool works, what it costs or what it allows gets checked against the official documentation or help center today. Note the date you read it. A 2-year-old how-to is often wrong now, and that staleness can be the reason the post wins.

**What page one covers.** Read the top results for the target search. For each, note what it covers and what it misses. The gap is the post's reason to exist. If page one already covers everything well, tell the person before writing a post that repeats it.

**The person's own material.** Usually the strongest source and the one nobody else has. Ask for it: notes, past posts, call notes, numbers from their own work, screenshots, examples they've seen first-hand. Check BLOG.md's "What you bring" section for where it lives.

**A figure from the person's own work needs a source you can point to.** That covers any number in the post, including the numbers inside a rule of thumb ("stop at 8 interviews"). One of 2 things:

- a file in the project that holds it (for example `notes/2026-client-calls.md`), named with its path, and you opened it
- a dated line in `research.md` quoting what the person said in chat: `Given by the author in chat, 2026-11-09: "12 of the 30 shops I audited this year had no second welcome email."`

Anything else is `[UNVERIFIED: confirm with the author]`, even when it sounds like their experience, and it stays out of the published file until they confirm it. Never credit a figure to notes, a call or a spreadsheet you haven't seen. If BLOG.md says material lives in a folder that isn't there, say so and ask for it.

**Real quotes.** A line from a real conversation, quoted exactly, is strong evidence. Attribute it by role ("an ecommerce manager at a 6-person brand"), never by name unless the person said yes to being named.

**Numbers.** Each one with its source (a URL, a project file path, or the dated chat line), its date, and whether the author needs to sign off before it's published.

**Scope words match the source.** Record the date range and scope each figure covers ("12 studies, January to June 2026"). Any qualifier the post will put on it ("my last 12", "every study", "all my clients", "this year") must fit that range. A count from one window can't be called "my last N" when the notes show later work. Write the allowed wording next to the figure in "Verified figures".

## Output format

1. **The answer:** the one-sentence answer from the brief, sharpened
2. **Section by section:** for each heading in the outline, the claim, the evidence and the source
3. **Verified figures:** every number, where it came from, and whether it needs sign-off
4. **Sources:** each URL opened, what it supports, the date opened
5. **What this post adds:** what it has that page one lacks
6. **Open questions:** anything you couldn't verify, for the author to answer at review

## Refresh mode

For a post that's already live, the questions are narrower:

- **What changed since it was published?** Features, prices, best practice, the author's own thinking. List each thing that's now wrong or missing.
- **What does the page show up for now?** In Search Console: Performance, filter by the page, then Queries. The searches it shows up for are often different from the one it was written for, and those are the ones to lean into.
- **Why so few clicks?** Usually the title and description. Read them as a searcher would and say plainly what's wrong.
- **What stays?** A refresh repairs. Name the parts that still work so stage 4 keeps them.

## Confidentiality

Client figures follow rule 7 in SKILL.md: anonymous unless the client agreed, ratios in place of revenue, and no mix of category, place and timing that points to one business. When in doubt, flag it for the author.
