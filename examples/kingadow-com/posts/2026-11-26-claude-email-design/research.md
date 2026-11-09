# Research · Claude email design

## 1. The answer
Claude designs on-brand emails in Figma when it has your brand written down for email (EMAIL.md), a Figma file built from components (SETUP.md, checked by the readiness audit), and a blind review in a separate session. The kit is free at github.com/kingadow/email-design-md.

## 2. Section by section

| Section | Claim | Evidence | Source |
|---|---|---|---|
| GitHub | GitHub is where people share work for reuse | plain description, from the launch email | launch email |
| GitHub | Anthropic's skills library has more than 180,000 stars | 183,874 on 2026-10-26 | `gh api repos/anthropics/skills` |
| GitHub | Biggest website DESIGN.md collection has more than 120,000 stars | VoltAgent/awesome-design-md, 123,601 on 2026-10-26; its description: "Drop one into your project and let coding agents generate a matching UI" | `gh api repos/VoltAgent/awesome-design-md` |
| GitHub | Best email design repo found had 6 stars | CosmoBlk/email-design, 6 on 2026-10-26 | `gh api repos/CosmoBlk/email-design` |
| GitHub | Search results: e-commerce email templates and Klaviyo templates were small personal projects | Kinga's own search, Oct 2026 | Substack essay + email |
| DESIGN.md | What a DESIGN.md holds; why email needs its own | Kinga's essay; repo README | essay, README |
| EMAIL.md | Contents: contrast pairs, email type scale, components, layout rules, photography, voice, email jobs | README table | repo README |
| Figma | SETUP.md checklist: brand kit page, color variables, email type scale, components, conventions around each email | README "How it works" step 1 | repo README |
| Figma | Fixed a button once in the block, all 4 emails changed | essay | Kinga, essay |
| Figma | Readiness audit scores the file out of 100; Limonaia scores 100 | README | repo |
| Figma | Testimonial: "The audit confirmed where the groundwork for AI in the design step lies, a proper component library, and it gave us a clear order to build it in." A retention marketer for e-commerce brands | launch email copy (approved, anonymous) | launch email |
| Skills | email-design, email-design-review, email-remix, figma-email-readiness: what each does | README table | repo README |
| Skills | Self-review 75 vs blind panel 52 on a real build | README | repo README |
| Skills | Round 1: 61, 64, 63, 64. Round 2: 67, 63, 63, 69. Round 3: 79, 77, 74, 79 | README + figure 06 | repo |
| Skills | Round 1 catches: faint label, wrong price, summer tea in all-year welcome, squeezed buttons | essay | Kinga, essay |
| Cold test | Fresh session with repo only, fifth email, blind 65, failed on July 2026 label vs "this year's harvest" in a May 2027 send; became rule 3 | README + essay + corrections | repo |
| Composer | "Composer is Klaviyo's AI marketing agent"; it drafts campaigns and flow messages; has skills and connectors | fetched 2026-10-26 | help.klaviyo.com/hc/en-us/articles/52230280693403 |
| Composer | Composer "reads published Figma components and library styles through Figma's MCP server" | fetched 2026-10-26 | klaviyo.com/blog/klaviyo-figma-integrations-design-to-inbox |
| Composer | Kinga's sandbox test: brand library + pasted rules skill = 57; + Figma connector = 61 (first pass, blind, same rubric); with Figma it used the real labeled photo; without, it generated photos with invented jar packaging; remaining misses: fonts, spacing, a photo choice, footer link | Kinga's test, 2026-10-26 | test notes |

## 3. Verified figures
All numbers above are first-hand (Kinga's builds and tests) or fetched today. Star counts are written as "more than 180,000" and "more than 120,000" so they stay true at publication. No client figures.

## 4. Sources fetched
- https://help.klaviyo.com/hc/en-us/articles/52230280693403 (Composer definition, skills and connectors)
- https://www.klaviyo.com/blog/klaviyo-figma-integrations-design-to-inbox (Composer reads Figma components via Figma's MCP server)
- GitHub API for the four repos above

## 5. Information gap
Page one for "claude email design" is tool listings and generic how-tos. None show a tested system with blind-review scores, a cold test or a Composer comparison.

## 6. Open questions
- Reply keyword or direct repo link (decided: direct link)
- Thanksgiving slot (Nov 26): the Thursday subscriber email still sends that morning
