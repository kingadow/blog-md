# Stage 5: Visuals

**What you get:** a 1200x630 featured image that works as the post's card on the blog index and as its picture when someone shares the link, plus its alt text.

**Reads:** `draft.md`, the image rules in `BLOG.md`
**Writes:** `visuals.md`, `<slug>.svg` and `<slug>.png` in the post folder

The starter requires an `image` on every post, and the blog index shows it on the card.

## Pick the kind of image

**Concept, system or process posts: an SVG diagram.** Most posts that explain how something works (a flow, a before and after, a set of steps) read better as a diagram. Free to make, sharp at any size, and in the site's own colors.

**Other posts:** a photo or design the author supplies. Leave a placeholder, say so in `visuals.md`, and list it in the handover.

## Rules

- **1200x630.** The standard share size, so the same image serves as card and link preview.
- **The diagram makes one point from the post clearer.** If it adds nothing to the argument, the post doesn't need it.
- **Legible at card size.** It will be seen small. Headline 40px or more at 1200 wide. Every text element, the site name line included, at least 28px.
- **Contrast 4.5:1 or more** between every text element and the color behind it. Check each pair, for example with WebAIM's contrast checker (webaim.org/resources/contrastchecker). No web access? Ask Claude to compute the WCAG contrast ratio for each pair from the hex values. Record the ratios in `visuals.md`.
- **Few words.** A headline image carries about 8 words at most. A checklist card (a short title and 3 or 4 items) can run to about 15. A small site name line doesn't count toward either. On a diagram, the limit is for the headline: labels are extra, at 1 to 3 words each and about 6 labels at most, and step numbers in circles don't count.
- **Headlines fit the width.** SVG text doesn't wrap. At 56px, one line holds about 32 characters at 1200 wide; break a longer headline onto 2 lines or make it smaller. Check the right edge when you open the PNG.
- **The hero also heads the publish-day email,** right under the email's own header, which already shows the site name. A site name line on the image repeats it there, so keep it small or leave it off.
- **Brand colors from BLOG.md only.** Every fill and stroke in the SVG is one of the colors BLOG.md lists. Need another shade? Ask the person, and add it to BLOG.md first. **Fonts from BLOG.md too.** In SVG, give each font a fallback list (`Montserrat, Arial, Helvetica, sans-serif`), since the PNG is rendered on a machine that may not have the brand font.
- **The headline keeps the condition that makes the claim true** ("per customer type", "for stores under 1,000 orders"). An image is often seen without the post, so a headline that drops the condition says something the post doesn't. Check it against the post's answer sentence.
- **Alt text:** what the image shows and the point it makes. "Featured image" is never alt text.

## The PNG twin

An SVG hero needs a PNG with the same name, 1200x630, saved next to it. LinkedIn, Facebook, Slack, newsletters and most email apps show no SVG. When `public/images/blog/<slug>.png` sits next to `<slug>.svg`, the starter uses the PNG for link previews automatically.

Render it with Google Chrome, which can save a page as an image without opening a window. Chrome is free and works on Mac, Windows and Linux. Claude runs the command: the person only needs Chrome installed. Ask: "Make the PNG copy of the hero image."

From the post folder, set `CHROME` to where Chrome lives and swap `<slug>` for the post's slug:

```bash
# Mac
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# Windows (Git Bash): CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
# Linux: CHROME=google-chrome
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --virtual-time-budget=2000 --window-size=1200,630 \
  --screenshot="$PWD/<slug>.png" "file://$PWD/<slug>.svg"
```

Chrome somewhere else? Find it first (on a Mac, `mdfind "kMDItemCFBundleIdentifier == com.google.Chrome"`; on any system, ask Claude to find Chrome on this computer).

Chrome may print lines that start with `ERROR` and mention `CVDisplayLink` or the display. They are harmless: Chrome has no screen to draw on. If the PNG exists, it worked.

Then open the PNG and look at it: cut-off text, a swapped font, a blank image. Fix and render again.

## In-body images

Optional. Worth it when:

- a screenshot proves a claim (a real settings screen, a real report)
- a diagram breaks up a long explanation of how parts connect

Scrub screenshots before they go anywhere near the site: account names, brand names, product names, revenue, email addresses, anything that points to a client. When in doubt, leave the screenshot out.

## File names

`<slug>.svg` and `<slug>.png` in the post folder. Stage 6 copies them to `public/images/blog/`, and the frontmatter points at `/images/blog/<slug>.svg`.

## Output

`visuals.md` records: what the featured image shows, the file names, the alt text, the colors used (all from BLOG.md), the contrast ratio of each text color on its background, any in-body images with where they go, and anything left as a placeholder for the author.
