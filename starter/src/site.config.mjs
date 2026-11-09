// Your site settings, all in one place.
//
// This is the first file to change. The site, the subscribe form, the RSS feed
// and the publish-day email all read from here, so a change here shows up
// everywhere.
//
// It is a plain JavaScript file (.mjs) on purpose: the Astro site and the email
// script in scripts/blog-email/ can both read it, so nothing has to be typed
// twice.

const site = {
  // The name shown in the header, the browser tab and the email.
  name: "Your Blog",

  // One sentence about what you write. Used on the home page and in search
  // results.
  description:
    "Practical notes from my work, written so the people looking for this can find it.",

  // Your live address, with https:// and no slash at the end.
  url: "https://example.com",

  // The default author for every post. A post can set its own `author`.
  author: {
    name: "Your Name",
    // 2 or 3 sentences about you and who you help. Shown on the About page
    // (src/pages/about.astro).
    bio: "I help small businesses with the work I know best. This blog shares what I learn from that work, 1 post a week.",
    // Your About page. The starter has one at /about/. A full address, such
    // as your LinkedIn profile, works too.
    url: "/about/",
    // Other profiles that are you. Search engines use these to connect them.
    sameAs: ["https://www.linkedin.com/in/your-profile/"],
  },

  // Your main action: the one thing you want a reader to do next, such as
  // book a call or see your services. Shown at the end of every post and on
  // the About page. Point `url` at a page that exists: a page on this site
  // (/about/), a full address (https://...) or an email (mailto:...).
  // Set `cta: null` to leave it out.
  cta: {
    text: "Want help with this in your own business?",
    label: "Get in touch",
    url: "mailto:you@example.com",
  },

  // The day your posts go live, in words. Shown in the Upcoming Posts list
  // and the subscribe box. Date your posts on this day.
  //
  // The publish day lives in 3 places. Change all 3 together:
  //   1. `publishDay` here
  //   2. the `cron` line in .github/workflows/publish.yml, which sets the day
  //      the weekly build runs
  //   3. the publish day line in your BLOG.md, if you have one
  //
  // In the cron line, only the last number changes with the day: 0 Sunday,
  // 1 Monday, 2 Tuesday, 3 Wednesday, 4 Thursday, 5 Friday, 6 Saturday.
  // The starter README, step 5, has the full line for each day.
  //
  // Ask Claude: "Change my publish day to Tuesday in all 3 places. In
  // publish.yml, change only the live cron line."
  publishDay: "Thursday",

  // Your time zone, from the list at
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  // The publish-day email is sent at `sendTime` in this zone.
  timezone: "America/New_York",

  email: {
    // Klaviyo public API key (also called Site ID). Six characters. Safe to
    // publish: it can only add people to lists, never read them.
    // Klaviyo: Settings > Account > API keys.
    klaviyoPublicKey: "YOUR_KLAVIYO_PUBLIC_KEY",

    // The Klaviyo list new subscribers join, and the list the publish-day
    // email goes to. Klaviyo: Audience > Lists & segments > your list >
    // Settings. Use a list for blog readers only, so people get the emails
    // they asked for.
    listId: "YOUR_LIST_ID",

    // Who the publish-day email comes from. Use an address on a domain you
    // have set up for sending in Klaviyo.
    fromEmail: "you@example.com",
    fromName: "Your Name",

    // When the publish-day email goes out, as 24-hour HH:MM in `timezone`.
    sendTime: "09:15",
  },
};

export default site;
