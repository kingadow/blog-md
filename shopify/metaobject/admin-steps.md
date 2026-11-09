# The "Upcoming post" metaobject, by hand

**What you get:** the place your upcoming posts list reads from. Each scheduled post gets 1 entry: its title, date, excerpt, image and future address. You make the definition once.

**First thing to do:** open your Shopify admin on a computer. A development store is the safest place to try it first.

The same definition as one API call is in [`upcoming-post-definition.graphql`](upcoming-post-definition.graphql). Use either one, not both: the second attempt fails because the type already exists.

## Make the definition (once)

1. In your Shopify admin, go to **Content** > **Metaobjects**. (It is also under **Settings** > **Custom data**.)
2. Click **Add definition**.
3. In **Name**, type `Upcoming post`. Check that the type underneath reads `upcoming_post`. The section looks for exactly this type, so edit it if it differs.
4. Click **Add field** 5 times and set each one:

   | Field label | Field type | Required |
   |---|---|---|
   | Title | Single line text | Yes (click the asterisk) |
   | Publish date | Date | Yes |
   | Excerpt | Multi-line text | No |
   | Image | File > Image | No |
   | Post address | URL | No |

5. Check the keys Shopify made from the labels: `title`, `date`, `excerpt`, `image`, `url`. Open each field's row to see its key. The section reads these keys, so "Publish date" must have the key `date` and "Post address" the key `url`. Edit any that differ.
6. In the **Access** section, leave **Storefronts** ticked. It is on by default and lets your theme show the entries.
7. Click **Save**.

## Add an entry (each time you schedule a post)

1. Go to **Content** > **Metaobjects** and open **Upcoming post**.
2. Add an entry and fill in:
   - **Title:** the post title, as it will appear on the blog.
   - **Publish date:** the same day as the post's visibility date.
   - **Excerpt:** 1 or 2 sentences, under 150 characters.
   - **Image:** the post's featured image. Give it alt text in Files if it has none.
   - **Post address:** where the post will live, for example `https://your-store.com/blogs/news/your-post`.
3. Save.

The entry shows in the upcoming posts list until its date, then the list hides it. Delete old entries once a month: the section reads up to 50.

> Ask Claude: *"Walk me through creating the Upcoming post metaobject in my Shopify admin, 1 click at a time, using shopify/metaobject/admin-steps.md."*

If a label in your admin differs from the ones above, Shopify has moved it. The keys (`upcoming_post`, `title`, `date`, `excerpt`, `image`, `url`) are what matter.
