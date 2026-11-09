#!/usr/bin/env node
/**
 * Publish-day email.
 *
 * Reads the site's RSS feed. If the newest post went live today, it builds a
 * Klaviyo campaign for it (subject, preview text, an email from template.html)
 * and schedules it for your send time, 09:15 by default, in your time zone.
 *
 * It also reads Atom feeds, the kind a Shopify blog has at
 * https://your-store.com/blogs/<blog>.atom. Set FEED to that address. The
 * shopify/email folder in the blog-md kit has the setup for Shopify.
 *
 *   node scripts/blog-email/send.mjs --dry-run   show the plan, change nothing
 *   node scripts/blog-email/send.mjs             create and schedule the email
 *
 *   node scripts/blog-email/send.mjs --dry-run --post <slug>
 *     Shows the email for one post, including a scheduled post or a draft.
 *     <slug> is the file name in src/content/blog without .md. When the post
 *     is not in the feed yet, the script reads its Markdown file directly.
 *     From npm: npm run email:dry-run -- --post <slug>
 *
 * Settings come from src/site.config.mjs. Each one can be overridden by an
 * environment variable of the same meaning:
 *
 *   KLAVIYO_PRIVATE_KEY  required for a real run. A Klaviyo private API key
 *                        (starts with pk_) with Campaigns and Templates set to
 *                        full access and Lists set to read. Keep it in a
 *                        GitHub secret, never in a file.
 *   LIST_ID              the list to send to       (default: email.listId)
 *   SITE_URL             your live address         (default: url)
 *   SEND_TIME            HH:MM, 24-hour            (default: email.sendTime)
 *   TIMEZONE             e.g. America/New_York     (default: timezone)
 *   FEED                 a file path or address for the RSS or Atom feed.
 *                        Default: SITE_URL/rss.xml. A dry run uses
 *                        dist/rss.xml when it exists, so it needs no network
 *                        at all.
 *
 * The post is published by the weekly build, and this script only announces
 * it. Every check below exists so that a subscriber never gets a link to a
 * page that is not there, and never gets the same email twice.
 */

import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import site from "../../src/site.config.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");

const DRY_RUN = process.argv.includes("--dry-run");
const env = (name) => (process.env[name] ?? "").trim() || undefined;

const API_KEY = env("KLAVIYO_PRIVATE_KEY");
const LIST_ID = env("LIST_ID") ?? site.email.listId;
const SITE_URL = (env("SITE_URL") ?? site.url).replace(/\/+$/, "");
const SEND_TIME = env("SEND_TIME") ?? site.email.sendTime;
const TIMEZONE = env("TIMEZONE") ?? site.timezone;
const FROM_EMAIL = site.email.fromEmail;
const FROM_NAME = site.email.fromName;

// Klaviyo retires an API revision 2 years after its release date, and then
// rejects requests that use it. This one stops working on 2027-10-15. Move it
// forward before then (the subscribe form in src/components/Subscribe.astro
// uses the same revision).
const KLAVIYO_REVISION = "2025-10-15";

// How long a real run keeps checking the feed for today's post. The workflow
// starts this right after it asks Netlify to build, and the build takes a few
// minutes to finish.
const WAIT_FOR_POST_MINUTES = 40;
const POLL_INTERVAL_MS = 2 * 60_000;

// When a run arrives after the send time, the email goes out at the next
// quarter hour at least this many minutes away. See the "late run" note in
// main() for why.
const LATE_LEAD_MINUTES = 5;
const QUARTER_HOUR_MS = 15 * 60_000;

// The inbox preview text is the post's excerpt, cut to this many characters
// at the end of a word. Write each excerpt as 1 or 2 sentences under 150
// characters and the whole thing shows in the inbox.
const PREVIEW_MAX = 150;

const BLOG_DIR = join(ROOT, "src", "content", "blog");

const log = (...args) => console.log(...args);

/** The value after --post, from `--post my-post` or `--post=my-post`. */
function argPost() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--post") return args[i + 1];
    if (args[i].startsWith("--post=")) return args[i].slice("--post=".length);
  }
  return undefined;
}

const POST_ARG = argPost();
const ONE_POST = process.argv.slice(2).some((a) => a === "--post" || a.startsWith("--post="));

// ---------------------------------------------------------------- helpers

function decodeXml(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * The excerpt as inbox preview text: at most PREVIEW_MAX characters, cut at
 * the end of a word, with no comma or other mark left dangling at the end.
 */
function previewText(excerpt, max = PREVIEW_MAX) {
  const text = String(excerpt).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const room = max - 3; // leaves space for "..."
  let cut = text.slice(0, room + 1);
  const lastSpace = cut.lastIndexOf(" ");
  cut = lastSpace > 0 ? cut.slice(0, lastSpace) : text.slice(0, room);
  return cut.replace(/[\s,;:.!?\-]+$/, "") + "...";
}

function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decodeXml(m[1]) : null;
}

/** "09:15" -> { hour: 9, minute: 15 } */
function parseSendTime(value) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) {
    throw new Error(`SEND_TIME must be HH:MM in 24-hour time, got "${value}"`);
  }
  return { hour: Number(m[1]), minute: Number(m[2]) };
}

/**
 * How far `tz` is ahead of UTC at a given moment, in milliseconds. Lets the
 * script find "09:15 in New York" on any date, daylight saving included,
 * with no date library.
 */
function tzOffsetMs(date, tz) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second)
  );
  return asUtc - date.getTime();
}

/** The moment when it is hh:mm on y-m-d in `tz`. */
function zonedTimeToUtc(y, m, d, hh, mm, tz) {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  // 2 passes: if the first guess lands on the other side of a daylight saving
  // change, its offset is off by an hour, and the second pass corrects it.
  let result = new Date(guess - tzOffsetMs(new Date(guess), tz));
  result = new Date(guess - tzOffsetMs(result, tz));
  return result;
}

/**
 * The first quarter hour (:00, :15, :30, :45) at least `leadMs` after `from`.
 * Every time zone in use is offset from UTC by a multiple of 15 minutes, so a
 * UTC quarter hour is a quarter hour in your zone too.
 */
function nextQuarterHour(from, leadMs) {
  return new Date(Math.ceil((from.getTime() + leadMs) / QUARTER_HOUR_MS) * QUARTER_HOUR_MS);
}

/** Calendar date of `at` in `tz`, as { y, m, d, iso: "yyyy-mm-dd" }. */
function dateIn(tz, at = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(at)
      .map((p) => [p.type, p.value])
  );
  return {
    y: Number(parts.year),
    m: Number(parts.month),
    d: Number(parts.day),
    iso: `${parts.year}-${parts.month}-${parts.day}`,
  };
}

function fromIso(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d, iso };
}

function inZone(date, tz) {
  return date.toLocaleString("en-US", {
    timeZone: tz,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

async function klaviyo(path, { method = "GET", body } = {}) {
  const res = await fetch(`https://a.klaviyo.com${path}`, {
    method,
    headers: {
      Authorization: `Klaviyo-API-Key ${API_KEY}`,
      revision: KLAVIYO_REVISION,
      accept: "application/vnd.api+json",
      ...(body ? { "content-type": "application/vnd.api+json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Klaviyo ${method} ${path} -> ${res.status}\n${text}`);
  return text ? JSON.parse(text) : null;
}

// ---------------------------------------------------------------- steps

/** Where to read the feed from: { kind: "file" | "url", location }. */
function feedSource() {
  const custom = env("FEED");
  if (custom) {
    return /^https?:\/\//.test(custom)
      ? { kind: "url", location: custom }
      : { kind: "file", location: resolve(ROOT, custom) };
  }
  const local = join(ROOT, "dist", "rss.xml");
  if (DRY_RUN && existsSync(local)) return { kind: "file", location: local };
  return { kind: "url", location: `${SITE_URL}/rss.xml` };
}

async function readFeed(source) {
  if (source.kind === "file") return readFile(source.location, "utf8");
  const res = await fetch(source.location, { headers: { "cache-control": "no-cache" } });
  if (!res.ok) throw new Error(`Feed ${source.location} returned ${res.status}`);
  return res.text();
}

function parseItem(item) {
  const link = tag(item, "link");
  if (!link) return null;
  const pubDate = tag(item, "pubDate");
  return {
    title: tag(item, "title") ?? "",
    excerpt: tag(item, "description") ?? "",
    url: link,
    slug: link.replace(/\/$/, "").split("/").pop(),
    category: tag(item, "category") ?? "",
    image: tag(item, "image"),
    // A post dated 2026-11-26 is stored as midnight UTC on that day. Its UTC
    // calendar date is the date you wrote, so that is what gets compared with
    // today. Converting it to a zone west of UTC first would turn it into the
    // evening before, and it would never match.
    dateIso: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : null,
  };
}

// ------------------------------------------------------------ Atom feeds
//
// A Shopify blog publishes an Atom feed. Each post is an <entry> with a
// <link rel="alternate" href="...">, a <published> time with its own time
// zone, and the text as escaped HTML in <summary> and <content>. Shopify does
// not document which elements its feed holds, so every field below has a
// fallback.

/** The value of one attribute in a tag's attribute text, or undefined. */
function attr(attrs, name) {
  const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`));
  return m ? decodeXml(m[1] ?? m[2]) : undefined;
}

/** Escaped HTML from a feed as plain text on one line. */
function htmlToText(html) {
  return decodeXml(
    String(html)
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;|&#160;/g, " ")
  )
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

/** A full address for an image URL that may start with // (Shopify's CDN does). */
function absoluteUrl(url, base) {
  if (!url) return null;
  if (url.startsWith("//")) return `https:${url}`;
  try {
    return new URL(url, base).href;
  } catch {
    return null;
  }
}

function parseEntry(entry) {
  const links = [...entry.matchAll(/<link\b([^>]*?)\/?>/g)].map((m) => m[1]);
  const page = links.find((l) => (attr(l, "rel") ?? "alternate") === "alternate");
  const link = page ? attr(page, "href") : null;
  if (!link) return null;

  const summaryHtml = tag(entry, "summary") ?? "";
  const contentHtml = tag(entry, "content") ?? "";
  const excerpt = htmlToText(summaryHtml) || previewText(htmlToText(contentHtml), 300);

  // The image: a media or enclosure element if the feed has one, else the
  // first image in the summary, else the first image in the content.
  const enclosure = links.find((l) => attr(l, "rel") === "enclosure" && /^image\//.test(attr(l, "type") ?? ""));
  const media = entry.match(/<media:(?:thumbnail|content)\b([^>]*?)\/?>/);
  const firstImg = (html) => {
    const m = html.match(/<img\b[^>]*?\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    return m ? m[1] ?? m[2] : null;
  };
  const image = absoluteUrl(
    (enclosure && attr(enclosure, "href")) ||
      (media && attr(media[1], "url")) ||
      firstImg(summaryHtml) ||
      firstImg(contentHtml),
    link
  );

  const category = entry.match(/<category\b([^>]*?)\/?>/);
  const published = tag(entry, "published") ?? tag(entry, "updated");
  return {
    title: htmlToText(tag(entry, "title") ?? ""),
    excerpt,
    url: link,
    slug: link.replace(/[?#].*$/, "").replace(/\/$/, "").split("/").pop(),
    category: (category && attr(category[1], "term")) || "Blog",
    image,
    // An Atom date carries its own time and zone, for example
    // 2026-11-26T06:00:00-05:00. The post's day is that moment's calendar
    // date in your time zone.
    dateIso: published && !Number.isNaN(Date.parse(published)) ? dateIn(TIMEZONE, new Date(published)).iso : null,
  };
}

function feedItems(xml) {
  if (/<feed\b[^>]*>/.test(xml) && /<entry\b/.test(xml)) {
    return [...xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/g)].map((m) => parseEntry(m[1])).filter(Boolean);
  }
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => parseItem(m[1])).filter(Boolean);
}

async function newestPost(source) {
  // The feed lists posts newest first, so the first item is the newest.
  return feedItems(await readFeed(source))[0] ?? null;
}

/** One post from the feed, by its file name. Null when it is not there. */
async function feedPost(source, slug) {
  return feedItems(await readFeed(source)).find((p) => p.slug === slug) ?? null;
}

/**
 * Reads the settings at the top of a post's Markdown file. Handles the simple
 * `key: value` lines posts use, with or without quotes, and a value written on
 * the indented lines below its key. Lists such as `keywords` are skipped.
 */
function frontmatter(markdown) {
  const block = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return {};
  const lines = block[1].split(/\r?\n/);
  const data = {};
  for (let i = 0; i < lines.length; i++) {
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(lines[i]);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2].trim();
    if (value === "" || /^[>|][-+]?$/.test(value)) {
      const parts = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1]) && !/^\s+-(\s|$)/.test(lines[i + 1])) {
        parts.push(lines[++i].trim());
      }
      value = parts.join(" ");
    } else if (value.startsWith('"')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.replace(/^"|"$/g, "");
      }
    } else if (value.startsWith("'")) {
      value = value.replace(/^'|'$/g, "").replace(/''/g, "'");
    } else {
      value = value.replace(/\s+#.*$/, "");
    }
    data[key] = value;
  }
  return data;
}

/** Same rule as src/lib/share-image.ts: use the PNG twin of an SVG when it exists. */
function sharePath(image) {
  const png = image.replace(/\.svg$/i, ".png");
  return png !== image && existsSync(join(ROOT, "public", png)) ? png : image;
}

/**
 * One post read straight from src/content/blog/<slug>.md. Used by
 * `--post <slug>` for a post that is not in the feed yet: a scheduled post or
 * a draft. Null when the file does not exist.
 */
async function markdownPost(slug) {
  const file = join(BLOG_DIR, `${slug}.md`);
  if (!existsSync(file)) return null;
  const data = frontmatter(await readFile(file, "utf8"));
  const image = data.image ? sharePath(data.image) : null;
  return {
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    url: `${SITE_URL}/blog/${slug}/`,
    slug,
    category: data.category ?? "Blog",
    image: image ? new URL(image, `${SITE_URL}/`).href : null,
    dateIso: data.date ? String(data.date).slice(0, 10) : null,
    draft: data.draft === "true",
    file: `src/content/blog/${slug}.md`,
  };
}

/** File names of every post in src/content/blog, without .md. */
async function postSlugs() {
  if (!existsSync(BLOG_DIR)) return [];
  return (await readdir(BLOG_DIR, { recursive: true }))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\\/g, "/").replace(/\.md$/, ""))
    .sort();
}

async function isLive(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * True when a campaign with this name already exists. The name includes the
 * post and the date, so a second run on the same day (a rerun, or a manual
 * run after the scheduled one) finds the first campaign and stops. Checks the
 * newest campaigns, which is enough for a run on the same day.
 */
async function alreadyCreated(campaignName) {
  const res = await klaviyo(
    `/api/campaigns/?filter=${encodeURIComponent("equals(messages.channel,'email')")}` +
      `&sort=-created_at&fields%5Bcampaign%5D=name`
  );
  return (res.data ?? []).some((c) => c.attributes?.name === campaignName);
}

async function renderEmail(post, imageSrc) {
  // Remove the notes at the top of the file. Only that first comment goes:
  // other comments in email HTML can be load-bearing for Outlook.
  const base = (await readFile(join(HERE, "template.html"), "utf8")).replace(/^\s*<!--[\s\S]*?-->\s*/, "");

  // Most email apps cannot show SVG. No image is better than a broken one.
  const imageBlock =
    imageSrc && !/\.svg$/i.test(imageSrc)
      ? `<tr><td style="padding:0;"><a href="${post.url}"><img src="${imageSrc}" width="600" alt="${escapeHtml(
          post.title
        )}" style="display:block; width:100%; max-width:600px; height:auto; border:0;" /></a></td></tr>`
      : "";

  const html = base
    .replace(/\[\[SITE_NAME\]\]/g, escapeHtml(site.name))
    .replace(/\[\[SITE_URL\]\]/g, `${SITE_URL}/`)
    .replace(/\[\[AUTHOR_NAME\]\]/g, escapeHtml(FROM_NAME))
    .replace(/\[\[POST_TITLE\]\]/g, escapeHtml(post.title))
    .replace(/\[\[POST_EXCERPT\]\]/g, escapeHtml(post.excerpt))
    .replace(/\[\[PREVIEW_TEXT\]\]/g, escapeHtml(previewText(post.excerpt)))
    .replace(/\[\[POST_CATEGORY\]\]/g, escapeHtml(post.category))
    .replace(/\[\[POST_URL\]\]/g, post.url)
    .replace(/\[\[IMAGE_BLOCK\]\]/g, imageBlock);

  const leftover = html.match(/\[\[[A-Z_]+\]\]/g);
  if (leftover) throw new Error(`Unreplaced tokens in template.html: ${[...new Set(leftover)].join(", ")}`);
  return html;
}

async function createTemplate(name, html) {
  const res = await klaviyo("/api/templates/", {
    method: "POST",
    body: { data: { type: "template", attributes: { name, editor_type: "CODE", html } } },
  });
  return res.data.id;
}

async function createCampaign(post, campaignName, sendAt) {
  const res = await klaviyo("/api/campaigns/", {
    method: "POST",
    body: {
      data: {
        type: "campaign",
        attributes: {
          name: campaignName,
          audiences: { included: [LIST_ID] },
          // One fixed send time for everyone. is_local false means the
          // email does not wait for each reader's own 09:15.
          send_strategy: {
            method: "static",
            datetime: sendAt.toISOString(),
            options: { is_local: false },
          },
          // Subscribers asked for every post, so Smart Sending is off.
          send_options: { use_smart_sending: false },
          tracking_options: {
            is_tracking_opens: true,
            is_tracking_clicks: true,
            add_tracking_params: true,
            custom_tracking_params: [
              { type: "static", name: "utm_source", value: "klaviyo" },
              { type: "static", name: "utm_medium", value: "email" },
              { type: "static", name: "utm_campaign", value: `blog-${post.slug}` },
            ],
          },
          "campaign-messages": {
            data: [
              {
                type: "campaign-message",
                // On this API revision the channel, label and content sit
                // inside `definition`. Sent without it, Klaviyo rejects the
                // message with "'definition' is a required field".
                attributes: {
                  definition: {
                    channel: "email",
                    label: campaignName,
                    content: {
                      subject: post.title,
                      preview_text: previewText(post.excerpt),
                      from_email: FROM_EMAIL,
                      from_label: FROM_NAME,
                      reply_to_email: FROM_EMAIL,
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });

  const campaignId = res.data.id;
  const messageId = res.data.relationships?.["campaign-messages"]?.data?.[0]?.id;
  if (!messageId) throw new Error("Campaign created but Klaviyo returned no message id");
  return { campaignId, messageId };
}

// ---------------------------------------------------------------- main

async function main() {
  const { hour, minute } = parseSendTime(SEND_TIME);
  const today = dateIn(TIMEZONE);
  const notSetUp = (v) => !v || /^YOUR_/.test(v);

  log(`Today in ${TIMEZONE}: ${today.iso}${DRY_RUN ? "   (dry run: nothing is sent to Klaviyo)" : ""}`);

  // `--post <slug>` previews the email for one post, scheduled or not.
  if (ONE_POST && !DRY_RUN) {
    throw new Error("--post works with --dry-run only. A real run always takes the post that went live today.");
  }

  if (!DRY_RUN) {
    if (!API_KEY) throw new Error("KLAVIYO_PRIVATE_KEY is not set. Add it as a GitHub secret (see README).");
    if (notSetUp(LIST_ID)) throw new Error("No list ID. Set email.listId in src/site.config.mjs or a LIST_ID secret.");
  }

  const slug = ONE_POST ? (POST_ARG ?? "").replace(/^.*src\/content\/blog\//, "").replace(/\.md$/, "") : null;
  if (ONE_POST && (!slug || slug.startsWith("-"))) {
    throw new Error("Add the post's file name after --post, without .md. Example: npm run email:dry-run -- --post your-first-post");
  }

  const source = feedSource();
  let post = null;

  if (ONE_POST) {
    // The local feed first, so a live post looks exactly as it will be sent.
    // A post that is not in it (scheduled, a draft, or no build yet) is read
    // from its Markdown file. Neither needs the network.
    if (source.kind === "file" && existsSync(source.location)) {
      post = await feedPost(source, slug);
      if (post) log(`Feed: ${source.location}`);
    }
    if (!post) {
      post = await markdownPost(slug);
      if (!post) {
        const slugs = await postSlugs();
        throw new Error(
          `No post called "${slug}" in src/content/blog.` +
            (slugs.length ? ` Posts there: ${slugs.join(", ")}` : " The folder has no posts yet.")
        );
      }
      log(`Post file: ${post.file} (not in the feed yet, so read from the file)`);
    }
  } else {
    log(`Feed: ${source.location}`);

    // A real run waits for today's post to appear, since the Netlify build may
    // still be running. Ending without an email is the right result on a week
    // with no new post: a missing email can be sent by hand, a wrong one cannot
    // be taken back. A dry run takes the newest post as it is.
    post = await newestPost(source);
    if (!DRY_RUN) {
      const deadline = Date.now() + WAIT_FOR_POST_MINUTES * 60_000;
      while (!post || post.dateIso !== today.iso) {
        log(`Newest post: ${post?.slug ?? "none"} (${post?.dateIso ?? "no date"}), dated another day.`);
        if (Date.now() >= deadline) {
          log("No post went live today. Nothing to send.");
          return;
        }
        log(`Checking again in ${POLL_INTERVAL_MS / 60_000} minutes...`);
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        post = await newestPost(source);
      }
    }
  }

  if (!post) {
    log("The feed has no posts yet. Nothing to send.");
    if (DRY_RUN) {
      log("To see the email for a scheduled post, name it: npm run email:dry-run -- --post <file name without .md>");
    }
    return;
  }

  if (!post.dateIso) throw new Error(`The post has no date: ${post.file ?? post.url}`);
  const isToday = post.dateIso === today.iso;
  log(`\n${ONE_POST ? "Post" : "Newest post"}: ${post.slug}`);
  log(`  title:     ${post.title}`);
  log(`  date:      ${post.dateIso}${isToday ? " (today)" : ""}`);
  log(`  url:       ${post.url}`);
  log(`  image:     ${post.image ?? "(none)"}`);

  // Plan the send for the post's own date. On a real run that is always today.
  const day = isToday ? today : fromIso(post.dateIso);
  let sendAt = zonedTimeToUtc(day.y, day.m, day.d, hour, minute, TIMEZONE);

  if (isToday && sendAt.getTime() < Date.now()) {
    // Late run. GitHub scheduled workflows on the free plan wait in a queue,
    // and they can start hours after their cron time: runs 4 to 10 hours late
    // have happened. Klaviyo refuses a send time in the past, and an early
    // version of this script stopped here, which left a published post
    // unannounced while the workflow still showed green. So the email goes out
    // at the next quarter hour. The post is live either way. A late
    // email beats no email.
    //
    // Past midnight the campaign name and the post date would disagree, so
    // that case fails on purpose: the run shows red in the Actions tab and
    // you can send the email by hand.
    sendAt = nextQuarterHour(new Date(), LATE_LEAD_MINUTES * 60_000);
    if (dateIn(TIMEZONE, sendAt).iso !== today.iso) {
      throw new Error(
        `${SEND_TIME} ${TIMEZONE} has passed and the next slot (${sendAt.toISOString()}) is tomorrow. Stopping without sending.`
      );
    }
    log(`  late run:  ${SEND_TIME} has passed in ${TIMEZONE}. The email goes out at the next quarter hour.`);
  }

  const campaignName = `Blog: ${post.slug} (${day.iso})`;

  if (DRY_RUN) {
    // In a dry run, point the preview at the local image so it shows before
    // the site is deployed: the built copy in dist/, or the file in public/.
    let previewImage = post.image;
    if ((source.kind === "file" || post.file) && post.image) {
      const path = decodeURIComponent(new URL(post.image).pathname);
      const local = ["dist", "public"].map((dir) => join(ROOT, dir, path)).find((f) => existsSync(f));
      if (local) previewImage = pathToFileURL(local).href;
    }
    const html = await renderEmail(post, previewImage);
    const previewPath = join(HERE, "preview.html");
    await writeFile(previewPath, html);

    log(`\nPlan`);
    log(`  campaign:  ${campaignName}`);
    log(`  list:      ${LIST_ID}${notSetUp(LIST_ID) ? "   <- set email.listId in src/site.config.mjs" : ""}`);
    log(`  from:      ${FROM_NAME} <${FROM_EMAIL}>`);
    log(`  subject:   ${post.title}`);
    log(`  preview:   ${previewText(post.excerpt)}`);
    log(`  send at:   ${inZone(sendAt, TIMEZONE)}  (${sendAt.toISOString()})`);
    log(`  email:     ${previewPath}  (open it in a browser)`);
    log(`             The unsubscribe link and your address show as Klaviyo tags here.`);
    log(`             Klaviyo fills them in when it sends.`);
    log(`\nOn a real run the script would also:`);
    log(`  - check that ${post.url} loads before scheduling anything`);
    log(`  - skip the send if a campaign named "${campaignName}" already exists`);
    if (post.draft) {
      log(`\nNote: this post is a draft. It never goes live, and no email goes out, until you set draft: false.`);
    } else if (!isToday) {
      log(
        `\nNote: the ${ONE_POST ? "" : "newest "}post is dated ${post.dateIso}, not today (${today.iso}). ` +
          `A real run today would send nothing. On ${post.dateIso} it would send this plan.`
      );
    }
    log(`\nDry run finished. Nothing was created in Klaviyo.`);
    return;
  }

  if (!(await isLive(post.url))) {
    throw new Error(`The post is in the feed, but ${post.url} does not load. Stopping without sending.`);
  }
  log("  live:      yes");

  if (await alreadyCreated(campaignName)) {
    log(`Campaign "${campaignName}" already exists. Nothing to do.`);
    return;
  }

  const templateId = await createTemplate(campaignName, await renderEmail(post, post.image));
  log(`Template created: ${templateId}`);

  const { campaignId, messageId } = await createCampaign(post, campaignName, sendAt);
  log(`Campaign created: ${campaignId}`);

  await klaviyo("/api/campaign-message-assign-template/", {
    method: "POST",
    body: {
      data: {
        type: "campaign-message",
        id: messageId,
        relationships: { template: { data: { type: "template", id: templateId } } },
      },
    },
  });
  log("Template assigned");

  await klaviyo("/api/campaign-send-jobs/", {
    method: "POST",
    body: { data: { type: "campaign-send-job", id: campaignId } },
  });
  log(`Scheduled for ${inZone(sendAt, TIMEZONE)} (${sendAt.toISOString()})`);
  log(`Review or cancel it in Klaviyo: Campaigns > "${campaignName}"`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
