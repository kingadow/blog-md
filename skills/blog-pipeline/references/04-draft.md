# Stage 4: Draft

**What you get:** `draft.md`, the full post with frontmatter, in the author's voice, ready for them to read.

**Reads:** `research.md`, `brief.md`, `BLOG.md`
**Writes:** `draft.md` in the post folder

This is the hardest stage. Every stage before it exists to make this one work.

## Before writing

1. Read `BLOG.md` in full: the reader, Voice, Words to avoid, SEO rules and every line under Corrections. Read the file itself each time, not a memory of it.
2. Read the 2 example posts BLOG.md names as the voice to match. No posts yet? Read the voice samples BLOG.md section 5 names (a transcript or 3 emails) in their place.
3. Read `references/frontmatter-contract.md`.

## Structure

**Open on a moment the reader recognizes, then answer.** The first 2 or 3 sentences show something concrete from the reader's own work (a screen, a task, a number they've seen) so they know the post is about them. The answer arrives by the end of the third paragraph at the latest, since searchers and AI answer boxes both look for it near the top. A beat of context, then the answer. Never open with a question, and never open on the broad subject.

The shape, with an example:

> Your welcome email goes out, the open rate looks fine, and almost nobody buys. The fix is usually the second email.

**Headings phrased as searches** or as plain statements of what the section answers. Keep them specific: "How long to wait before the second email" tells the reader and Google what follows.

**Short paragraphs.** 4 to 6 sentences at most. A one-sentence paragraph for emphasis, used sparingly.

**Lead with what a thing is and does.** Describe what a tool or method does before its limits. When a limit matters, frame it as which tool owns the job: "a webhook is an API job" reads better than a list of what something can't do.

**Numerals for figures:** 30%, $40, 90 days, 6 emails, 3 steps. Words for ordinals (the first email) and figures of speech (one of them, both). A sentence never starts with a numeral: reword it so the numeral moves inside, and keep the numeral. "Ninety days after launch, ..." becomes "After 90 days, ...". A count that opens a sentence follows the same rule: "One group means ..." becomes "With 1 group, ...".

**First-hand evidence for each main claim.** A number from the author's work, a before and after, something they saw, a quote attributed by role. A claim backed only by "experts say" gets cut.

**Every factual claim traces to a source,** figures and plain statements alike. A sentence that states a fact ("most small teams run 1 or 2 user groups", "20 hours of calls") comes from `research.md` or a file in `notes/`, or it reads clearly as the author's opinion. A vivid detail that appears in neither gets cut or rewritten from what the sources say.

**Plain words.** Technical terms get an everyday word or a one-clause explanation the first time, unless BLOG.md says the reader is technical.

**One analogy at most,** built on a tool everyone knows.

**An ending that moves forward.** Give the reader the next step; skip any recap of the opening. On the starter, the main action button (`cta` in `src/site.config.mjs`, often a `mailto:` address) and the subscribe box come after the post on their own, so the body leads into that button and adds no second link. If the brief plans an in-text link to the main action, it appears once, where it fits the post, and points to a page that exists or to the `cta` address in `src/site.config.mjs`.

## The author's point of view

BLOG.md's "What you bring" names the angle only this author has. Use it where the post earns it, as an extension of the advice.

**The test:** take out the section that carries the point of view. The post should still stand as useful advice. If it collapses, the point of view was carrying the whole post and is probably generic.

## Checks before calling it done

A draft that fails any of these isn't finished:

- Would a reader know someone who has done the work wrote this?
- Is the answer in the first 100 words, after one beat of context?
- Does every word in BLOG.md's "Words to avoid" come back clean in a search of the file?
- Does the shape search below come back clean, and does a read-through find none of the shapes BLOG.md lists?
- Does every factual claim, figure or not, trace to `research.md` or `notes/`, and is every link one that was opened?
- Is any client named, or identifiable from category, place and timing together?
- Would the title earn a click when Google shows it 9th? Is `metaTitle` under about 60 characters and `metaDescription` under about 155?
- One call to action: when `cta` in `src/site.config.mjs` is set, does the body lead into that button and add no second call-to-action link? Any in-text link to the main action appears at most once, where it fits, to a page that exists (a relative link for the site's own pages) or to the `cta` address.
- Does every section agree with the answer? Read each threshold, count and rule against the answer sentence ("any 1 of these 3 signs" in one place and "2 or more signs" in another is a contradiction). That includes any test the reader is asked to run on their own work and the image headline. A reader test uses the same threshold as the data, and "stopped after N" means N was the last one that added something. Fix the section or the answer.
- Does every scope word on a figure ("my last", "every", "all", "this year") match the date range and scope recorded for it in `research.md`?
- Does the `excerpt` use the post's own numbers and claims, in 1 or 2 sentences under 150 characters? Read it next to the post: every figure in it appears in the body.
- Is the post free of stock aphorism lines, the kind that could end any post on any topic ("Small steps add up.", "The best time to start is now.")? Cut them or replace them with a specific line from the post.
- Do the `keywords` hold any other post's or planned idea's main search? Take it out.
- Does it follow every line under Corrections in BLOG.md?

## Shapes a word search misses

A search for single words misses sentence shapes. This search catches the common ones:

- a sentence that starts with `Not` or `Because`
- `not X, it's Y` and `isn't X. It's Y`
- `rather than`, `not just`, `not only`
- em dashes and en dashes

```bash
grep -n -i -E "(^|[.!?] +)(not|because) |\bnot [^.]{1,40}, (it|that|this)('s| is)|\b(isn't|is not|wasn't|aren't|doesn't)\b[^.]{0,60}[.,;] +(it's|it is|they're|this is)|rather than|not just|not only|—|–" posts/<folder>/draft.md
```

Every line it prints gets rewritten to say what the thing is and does. Some shapes need a read-through: a question as the opening line, a recap as the ending, and any shape BLOG.md adds. Read the draft once for those.

## Refresh mode

A refresh repairs a live post.

1. **Title and description first.** This is often the whole problem. Rewrite `title`, `metaTitle` and `metaDescription` for what the page shows up for now (from `research.md`).
2. **Fix what's wrong.** State the current behavior plainly.
3. **Add new material.** A refresh with nothing new is only a retitle. Add a section on what changed or what the author knows now.
4. **Keep what works.** Leave passages that still hold up.
5. **Set `updated:` to today.** Leave `date:` at the original publish date.
6. **Rewrite off-voice passages** into the author's voice, by BLOG.md.

## Output

The complete post in `draft.md`: frontmatter with `draft: true` (or `draft: false` for a refresh of a live post), then the body in Markdown. The `image` path can point at a file stage 5 hasn't made yet; note that it's pending. Keep `[UNVERIFIED]` markers in this file only; list them in the handover.
