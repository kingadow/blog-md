// The date gate: which posts are live, and which are still scheduled.
//
// Every post has a `date`. When the site is built:
//   - `draft: true`          never publishes. Work in progress.
//   - a date today or before is live: it gets a page and appears everywhere.
//   - a date in the future   is scheduled: no page, no listing, no RSS entry,
//                            no sitemap entry. It shows only in the Upcoming
//                            Posts list on the blog index.
//
// The site is plain files, built once and then served as they are. So "today"
// means the moment the build runs. A scheduled post goes live on the first
// build on or after its date, and the weekly build in
// .github/workflows/publish.yml is the build that runs on the date. Without
// that workflow a scheduled post would wait until your next manual deploy.
//
// A date written as YYYY-MM-DD counts from 00:00 UTC on that day. For
// 2026-11-26 that is the evening of Nov 25 in the Americas, so a build that
// happens to run that evening will include it. The weekly build runs on the
// morning of the date, which is the build you can count on.
//
// Every page or feed that lists posts must use these 2 functions. Copying the
// filter into a page by hand is how a scheduled post ends up in the RSS feed
// or the sitemap while it is correctly hidden from the blog index.

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

/**
 * True when src/content/blog holds at least 1 post file. With no posts at
 * all, Astro prints a warning that the collection "does not exist or is
 * empty" each time a page asks for posts. Checking first keeps a new site
 * with the samples deleted free of that warning.
 */
function hasPostFiles(): boolean {
  const dir = join(process.cwd(), "src", "content", "blog");
  if (!existsSync(dir)) return false;
  return readdirSync(dir, { recursive: true }).some((f) => String(f).endsWith(".md"));
}

/**
 * Posts that are live, newest first.
 *
 * In `npm run dev` scheduled posts are included too, so you can read and
 * check a post before its date. Drafts stay hidden in dev as well; set
 * `draft: false` with a future date to preview a finished post.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  if (!hasPostFiles()) return [];
  const now = Date.now();
  const posts = await getCollection("blog", ({ data }) => {
    if (data.draft) return false;
    if (import.meta.env.DEV) return true;
    return data.date.valueOf() <= now;
  });
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Posts dated in the future, soonest first. Feeds the Upcoming Posts list.
 *
 * A draft with `announce: true` is listed too, so a planned topic can sit on
 * the schedule while you finish it. If its date passes while it is still a
 * draft, it drops off this list and nothing goes live. The list has no links,
 * so a listed draft can never lead to a missing page.
 *
 * This one ignores dev mode, so the list looks the same locally as it will
 * live. A post leaves this list on the same build that publishes it, so the
 * 2 lists can never disagree.
 */
export async function getUpcomingPosts(limit = 6): Promise<Post[]> {
  if (!hasPostFiles()) return [];
  const now = Date.now();
  const posts = await getCollection(
    "blog",
    ({ data }) => (!data.draft || data.announce) && data.date.valueOf() > now
  );
  return posts
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
    .slice(0, limit);
}

/**
 * Formats a post date for display. Uses UTC so a date written as YYYY-MM-DD
 * shows as that same day wherever the build runs.
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
): string {
  return date.toLocaleDateString("en-US", { ...options, timeZone: "UTC" });
}
