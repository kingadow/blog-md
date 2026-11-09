# One real post, folder by folder

This is the working folder for one kingadow.com post, "Claude Email Design: The Free Skills and Figma Setup I Use", published on Thursday 26 November 2026. The [`blog-pipeline`](../../../../skills/blog-pipeline) skill writes one file per stage, so you can see every step:

| File | Stage | What it shows |
|---|---|---|
| [`brief.md`](brief.md) | Brief | The target searches from Google autocomplete, the overlap check against existing posts, the one-sentence answer, the titles and the outline |
| [`research.md`](research.md) | Research | Every claim in the post with its evidence and source, and what page one is missing |
| [`draft.md`](draft.md) | Draft | The frontmatter and the opening, with the outline. The full text is [on the site](https://kingadow.com/blog/claude-email-design/) |
| [`visuals.md`](visuals.md) | Visuals | Which image goes where, and where each came from |
| [`images/`](images) | Visuals | The hero (a 1200x630 PNG, so link previews show it) and the figures |

## How the brief maps to the template

This brief was written before the skill's brief template ([`references/02-brief.md`](../../../../skills/blog-pipeline/references/02-brief.md)) took its current layout. For your own posts, follow the template. Here is where each heading in this brief belongs:

| This brief | The template |
|---|---|
| The line under the title (slug, slot, category, pillar) | The list at the top: publish date and category. Pillar has no place in the template. |
| Target queries | Target search, variants and volume / difficulty at the top |
| Intent | Intent at the top |
| Cannibalization check | The overlap check the brief stage runs before writing |
| The answer, in one sentence | The answer in one sentence |
| Information gain | What this post has that page one lacks |
| Sources | Evidence to gather in stage 3 |
| Titles | Titles. The template adds a metaDescription line. |
| Outline (H2s) | Outline |
| Internal links (live before Nov 26) | Internal links |
| CTA | Call to action |
| Confidentiality | Confidentiality |

The template's Page one section has no match here: page one was read during research, in [`research.md`](research.md). The folder also has no `publish.md`, the report stage 6 writes: that file was not kept for this post.
