# Stage 2: Brief

**What you get:** a one-page plan for the post that every later stage follows. A vague brief produces a generic post, so this page is where the post gets specific.

**Reads:** one topic, from `posts/_ideas/topic-ideas.md` or named by the person
**Writes:** `brief.md` in a new post folder

## Make the folder

`posts/<YYYY-MM-DD>-<slug>/`

- **Date:** the planned publish day: the next open slot on the publish day in BLOG.md that leaves the person time to review, usually the one after next. The person can pick a later slot.
- **Slug:** lowercase words joined by hyphens, short, with the target search in it. It becomes the address (`/blog/<slug>/`) and the file name in `src/content/blog/`.

## Check for overlap first

Search the existing posts, the site pages and any newsletter archive for the target search and close variants.

- **A page targets it and gets views:** stop. This is a refresh. Go to stage 3 in refresh mode.
- **A page targets it and gets no views:** decide with the person: refresh it, or replace it and redirect the old address to the new one.
- **Nothing targets it:** continue.

Then check the keywords you plan for this post against the target searches of the ideas in `posts/_ideas/topic-ideas.md`, the posts already planned (other `posts/` folders and BLOG.md section 8) and the `keywords` of existing posts. Another post's or another planned idea's main search never becomes a variant or secondary keyword here. Pick a different variant, or link to that post.

## Search data

If stage 1 didn't already cover this search, collect:

- Google autocomplete for the target search
- Ubersuggest volume and difficulty (each lookup uses 1 of the 3 free reports a day)
- Search Console views for this search, if the site already shows up for it. This is real demand for this site, and it beats any third-party estimate.
- Page one: the top 5 results, what each covers and what each misses

Write the source and date next to every number. If a tool isn't available, write "unestimated".

**No web access this session?** This is where the pasting happens, for the one target search only (stage 1 marked it "not checked"). Before the brief is approved, the person pastes 2 things: the Google autocomplete suggestions and the titles and addresses of the 10 results on page one. Ask them to add 1 line per result on what it covers, if they can read it. Record it all in the brief exactly as pasted, with the date and "pasted verbatim by the author". The brief is the one place it lives: `topic-ideas.md` points to the brief and holds no second copy. Without the coverage lines, write "titles only" in place of "covers ..., misses ..." and treat the gap as a guess. A brief without the pastes stays unapproved.

## What the brief contains

```markdown
# Brief: <working title>

- Target search: <exact words>   Variants: <2 or 3 at most>
- Keywords: <5 to 8: the target search first, then real variants from autocomplete or Search Console. Stage 4 copies this line into `keywords`.>
- Intent: <informational / commercial / navigational>, and what the searcher wants to walk away with
- Volume / difficulty: <numbers, source, date> or unestimated
- Category: <from BLOG.md>
- Publish date: <YYYY-MM-DD>

## The answer in one sentence
<If you can't write it in one sentence, the topic isn't sharp enough yet.>

## What this post has that page one lacks
<Name the first-hand material: a number from the person's work, a before and after,
a screenshot, something they saw, a quote from a call attributed by role.>

## Page one
<Read on <date>, or "pasted verbatim by the author on <date>". Exactly what was read or pasted:
titles only means titles only. Never fill in addresses or "covers / misses" from memory.>
1. <URL>: covers ..., misses ...

## Titles
- title: <earns a click when Google shows it 9th; search phrase near the start>
- metaTitle: <under about 60 characters>
- metaDescription: <under about 155 characters; what the reader gets>

## Outline
<3 to 6 headings phrased the way people search>

## Evidence to gather in stage 3
<Specific: a figure to confirm, a feature to check in current docs, a screenshot to take>

## Internal links
<Real addresses of pages live by the publish date>

## Cost side (commercial searches only)
<The author's price or price range for this service, as they gave it, with the date>

## Call to action
<The main action from BLOG.md section 3, which matches `cta` in src/site.config.mjs. On the starter it
already ends every post as a button, with a subscribe box. In-text link: "none", or one link where it
fits the post, to a page that exists today, written as a relative link (/about/ on the starter), or to
the `cta` address.>

## Confidentiality
<Client-derived figures and how to anonymize them, or "none">
```

## Notes on each part

**Intent decides the shape.** A how-to search wants numbered steps. A comparison wants a table. A "what is" search wants the definition in the first lines, then an example.

**The answer sentence becomes the opening.** Stage 4 builds the first paragraph around it.

**Commercial searches need the cost side.** When the target search is about hiring, cost, price or comparing ("hire", "cost", "price", "how much", "vs"), the searcher wants a number. Ask the person for their price or price range (or BLOG.md's, if section 3 lists one) and put it in the brief, so the post answers it. If they'd rather not share a price, the post says what the price depends on and how to get a quote, and the brief notes the choice.

**What the post has that page one lacks** is the reason the post exists. If the person has no first-hand material for this topic, say so and suggest a different topic.

**The title** has to earn a click at the bottom of page one. Lead with the search phrase, then the promise: what the reader gets or learns.

**The call to action.** On the starter, the main action button and the subscribe box sit under every post on their own. The body adds no second call to action. If BLOG.md names a page the site doesn't have yet (a `/contact/` page on a new starter site), use `/about/`, which shows the main action button, or the `cta` address, and tell the person.

## When the brief is done

Add the post to the planned posts BLOG.md section 8 points to (in the template, the table there): date, working title, target search, status "brief". The overlap check for the next brief reads it.
