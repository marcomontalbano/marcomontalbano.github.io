---
name: review-blog-post
description: Review a blog post's publishing readiness before it goes live on the site and on dev.to. Use when asked to review a post, check it is ready, pick its tags, or before setting `status: approved`.
---

# Review a blog post

Posts live in `packages/website/src/content/blog/`, one Markdown file each, with their cover in `covers/`. The review covers publishing readiness (file, frontmatter, cover, tags, cross-posting), not the prose.

## Steps

1. **Run the build checks.** In `packages/website`, run `pnpm astro check`. The schema in `src/content.config.ts` enforces the frontmatter fields and dev.to's tag format, and `src/lib/blog.ts` enforces the cover's minimum size; any failure there is a finding. Done when the command has run and its errors are noted.
2. **Apply every rule below** to the post. Done when each rule has a verdict: passes, or a finding with the fix.
3. **Report** the findings, most important first, each with its proposed fix, and end with a verdict: ready to approve, or what blocks it. Edit the post only once the user accepts a fix.

## Rules

### File name

- Named `YYYY-MM-DD-<title>.md`: the date the draft started, then the title in kebab-case, so the post is easy to find in a long list. The date only orders the files.
- The file follows the title: when the title changes, rename the file (and its cover). The URL comes from `slug`, so renaming breaks nothing.

### Slug

- The required `slug` frontmatter field is the post's URL, `/blog/<slug>/`.
- 3–5 kebab-case words about the topic: the title's key phrase plus the main keyword someone would search for.
- Permanent once the post is published: changing it breaks every link to the post. Before then, change it freely.

### Frontmatter

- `description` names the tools or topic plainly; search results show it under the title.
- `createdAt` and `updatedAt` are Italian local time with the offset that applies on that date, not today's: `+01:00` (CET) from the last Sunday of October, `+02:00` (CEST) from the last Sunday of March. A time without an offset reads as UTC. Check each with `TZ=Europe/Rome date -j -f '%Y-%m-%d %H:%M' '<date> <time>' +%z`.
- `createdAt` matches the file's date; `updatedAt` moves when the content changes meaningfully.
- `status` stays `draft` until the review passes. `approved` is what publishes the post in production.

### Cover

- A local file in `covers/`, named like the post (`covers/YYYY-MM-DD-<title>.jpg`).
- Larger is better: the site crops link previews to 1200×630 and shows the hero at up to 1920×928, and it never enlarges an image.

### Tags

- Fetch the live ranking from `https://dev.to/tags/suggest`: a JSON array of dev.to's top 100 tags, most popular first, each with a `short_summary`.
- Pick four: two large tags for reach, two specific ones for the right readers. Specific tags (the tools the post is about) are often outside the top 100; that is fine.
- Each tag must match what its readers expect: read its `short_summary` against the post's angle, and prefer the tag that names why someone would read the post over one that merely touches it.
