# Stage 6: Publish

**What you get:** the post in the site's content folder with valid frontmatter, its images in place, a passing build, and a short report telling the author what's left for them.

**Reads:** `draft.md`, `visuals.md`
**Writes:** `src/content/blog/<slug>.md`, `public/images/blog/<slug>.svg` and `.png`, and `publish.md` in the post folder

This stage validates, copies, builds and reports. Pushing and deploying stay with the author.

## How the starter decides what's live

| `draft` | `date` | Result |
|---|---|---|
| `true` | any | Never publishes. Work in progress. |
| `true` + `announce: true` | future | Listed under Upcoming Posts by title and date only, with no page and no link. |
| `false` | future | Scheduled: hidden everywhere except Upcoming Posts until the first build on or after its date. |
| `false` | today or past | Live on the next build. |

The starter's weekly build runs on the publish day, so a scheduled post goes live that morning, and the publish-day email goes out from it.

## 2 files, 2 moments

After this stage the post exists twice:

| File | What it is |
|---|---|
| `posts/<folder>/draft.md` | The working copy, and the record of what was approved |
| `src/content/blog/<slug>.md` | The published file. The site builds from this one. |

SKILL.md rule 5 says when approval can happen, how, and where edits go. In short:

**1. The draft lands for review.** Write the published file with `draft: true` and `date` set to the planned publish day. The author reads the post. To see it on the site, set `draft: false` in the published file locally and run `npm run dev`: dev mode shows scheduled posts. Set it back to `draft: true` before anything is pushed.

**2. The author approves,** any time after reading it, in the same session or later. Approval is one change: `draft: false` in `src/content/blog/<slug>.md`, made by the author or by Claude when the author says so. Confirm `date` is the publish day at the same time.

**Schedule only when nothing is outstanding.** `draft: false` on a future date means the weekly build publishes the post on its own, with nobody checking. So the post stays at `draft: true`, even after the author likes it, while any of these is open:

- anything `publish.md` lists as to do before the date (a page to build, a figure to confirm, a screenshot to add)
- a claim marked `[UNVERIFIED]`
- any line the link audit below prints

Say in the report what is outstanding and what turns the post to `draft: false`. When the list is empty, schedule it. Commit and push when the author says so. The build on that day publishes it. Several approved posts can go in one push, each with its own date.

**After stage 6, edit the published file only.** It is the copy readers see. `draft.md` stays as the draft that was handed over; list each later change in `publish.md`. If the author edits `draft.md` instead, copy the change into the published file before the next push and note it in `publish.md`.

**A public site repository makes draft files public too.** The starter's `.gitignore` keeps `posts/` and `notes/` out of the repository: both can hold figures from client calls. On another site, add `posts/` and `notes/` to `.gitignore` if the author wants work in progress and notes kept private. For a topic that should appear in Upcoming Posts before the post is approved, commit only the frontmatter with `draft: true` and `announce: true`, with the hero image in place, since the list shows it.

## Steps

**1. Validate the frontmatter** against `references/frontmatter-contract.md`: every field the skill always writes is present, `date` is `YYYY-MM-DD`, `category` is one from BLOG.md, `draft` is right for this moment.

**2. Copy the images** from the post folder to `public/images/blog/`. The path in `image:` must point at a real file; a missing image is the most common broken build.

**3. Write the post** to `src/content/blog/<slug>.md`. The file name is the slug from the folder name, and it becomes the address `/blog/<slug>/`.

**4. Check every link to the site's own pages** with the audit below. A link to a page that is missing or not live yet keeps the post at `draft: true`.

**5. Build.** From the site folder, run `npm run build`. The build rejects frontmatter that breaks the schema and names the post and the field. Fix and build again. Never hand over a failing build.

**6. Report** in `publish.md` and to the author: the file path, the status (draft, scheduled for a date, or live), a "to do before the date" list (empty, or the reason the post is still `draft: true`), what needs their decision, anything marked `[UNVERIFIED]`, and any confidentiality question.

The published file never carries an `[UNVERIFIED]` marker. Keep the marker in `draft.md`, leave the claim out of the published file or keep the post at `draft: true` until the author confirms it.

## Links to your own site: only to pages that are live

A post may link only to pages live on its own publish date. That covers every link to the site's own domain: other posts, and pages such as About, services or booking pages in `src/pages/`. A link to a page that doesn't exist yet leads to a missing page for exactly the weeks the new post is newest and most read.

**Write links to your own pages as relative links:** `/about/`, `/blog/<slug>/`, never `https://example.com/about/`. The audit can check a relative link, and it keeps working if the address changes.

A post target is safe when 2 things are true: it's dated no later than the linking post (or no later than today, when the linking post is already live), and it has `draft: false`. A target dated earlier that's still a draft never publishes, so that link stays broken. A page target is safe when its file exists in `src/pages/` (or the file exists in `public/`) and is in the next push.

Run this from the site folder (the one that holds `src/` and `public/`) before every push. Set `site` to your address first. It runs in bash from any terminal. A pass prints one line, `audit done: N own-site links checked`, and nothing above it:

```bash
bash <<'AUDIT'
site="example.com"   # your address from BLOG.md section 1, without https:// or www.
today=$(date +%Y-%m-%d)
blog=src/content/blog
for f in "$blog"/*.md; do
  [ -e "$f" ] || continue
  name=$(basename "$f" .md)
  d=$(grep -m1 '^date:' "$f" | sed 's/date: *//; s/"//g')
  [[ "$today" > "$d" ]] && d=$today
  fdr=$(grep -m1 '^draft:' "$f" | sed 's/draft: *//')
  grep -oE '\]\([^) ]+\)' "$f" | sed 's/^](//; s/)$//' | while read -r u; do
    case "$u" in
      http://$site*|https://$site*|http://www.$site*|https://www.$site*)
        echo "FULL ADDRESS (write it as a relative link): $name -> $u"
        p=${u#*://}; p=/${p#*/} ;;
      /*) p=$u ;;
      *) continue ;;
    esac
    p=${p%%#*}; p=${p%%\?*}
    case "$p" in
      /blog/?*)
        t=${p#/blog/}; t=${t%/}
        td=$(grep -m1 '^date:' "$blog/$t.md" 2>/dev/null | sed 's/date: *//; s/"//g')
        tdr=$(grep -m1 '^draft:' "$blog/$t.md" 2>/dev/null | sed 's/draft: *//')
        [ -z "$td" ] && { echo "MISSING POST: $name -> $p"; continue; }
        [[ "$td" > "$d" ]] && echo "FORWARD: $name ($d) -> $t ($td)"
        [ "$tdr" = "true" ] && [ "$fdr" != "true" ] && echo "DRAFT TARGET: $name -> $t"
        ;;
      *)
        q=${p#/}; q=${q%/}
        [ -z "$q" ] && continue
        found=
        for c in src/pages/"$q".* src/pages/"$q"/index.* public/"$q"; do
          [ -e "$c" ] && found=1
        done
        [ -z "$found" ] && echo "MISSING PAGE: $name -> $p"
        ;;
    esac
  done
done
n=$(cat "$blog"/*.md 2>/dev/null | grep -oE "\]\((/|https?://(www\.)?$site)[^) ]*\)" | wc -l | tr -d ' ')
echo "audit done: $n own-site links checked"
AUDIT
```

What each line means:

- **FULL ADDRESS:** a link to your own site written with `https://`. Change it to the relative form; the next line checks it.
- **MISSING PAGE:** no file in `src/pages/` or `public/` for that address. Build the page, or take the link out. A page made by a pattern route (a file name in square brackets) shows here too: check it by hand.
- **MISSING POST, FORWARD, DRAFT TARGET:** the post it links to doesn't exist, publishes later, or is still a draft.

Posts get approved one at a time, so a link that was fine when written can break when the linking post is scheduled ahead of its target. Run the audit again at the moment of scheduling. If it flags a target, schedule the target too or take the link out.

**After a post goes live,** it becomes a valid target for every older post. Pick 2 or 3 older posts whose readers would click through, and add a link to the new post in each.

## Refresh mode

Same steps, with these differences:

- Edit the existing file in place.
- `date` stays at the original publish date. `updated` gets today's date, and the page shows "Updated".
- **`draft` stays `false` on a live post.** Setting it to `true` removes the page on the next build and throws away its rankings.
- So the file in `src/content/blog/` has to be publishable as it stands: no `[UNVERIFIED]` markers, no notes to the author, no open questions. Keep those in `draft.md` in the post folder and raise them in the report.
- Only a new post gets `draft: true`, since there's nothing live to lose.

## Builds and hosting

Each push can trigger a deploy. If the host limits builds a month, batch: several posts and link edits in one push.
