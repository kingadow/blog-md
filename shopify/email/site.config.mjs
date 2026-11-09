// Settings for the publish-day email on a Shopify blog.
//
// This file goes in your email repository at src/site.config.mjs, next to
// scripts/blog-email/send.mjs and template.html copied from the kit's
// starter. The setup is in shopify/email/README.md in the blog-md kit.
//
// The feed address is a GitHub secret named FEED, set in step 3 of that
// README: https://your-store.com/blogs/<your blog>.atom

const site = {
  // Your store or blog name, shown in the email header.
  name: "Your Store",

  // Your store's address, with https:// and no slash at the end. The email
  // links to it.
  url: "https://example.com",

  // Your store's time zone, the one in Shopify: Settings > General > Store
  // defaults. Use the name from
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  // The email is sent at `sendTime` in this zone, and a post counts as
  // "today's" post by its date in this zone.
  timezone: "America/New_York",

  email: {
    // The Klaviyo list the email goes to. Klaviyo: Audience > Lists &
    // segments > your list > Settings. Use the list your Shopify subscribers
    // sync into (docs/4-automate-shopify.md, step 5). A LIST_ID secret
    // overrides this.
    listId: "YOUR_LIST_ID",

    // Who the email comes from. Use an address on a domain you have set up
    // for sending in Klaviyo.
    fromEmail: "you@example.com",
    fromName: "Your Name",

    // When the email goes out, as 24-hour HH:MM in `timezone`. Schedule your
    // posts for earlier the same day (06:00 works well).
    sendTime: "09:15",
  },
};

export default site;
