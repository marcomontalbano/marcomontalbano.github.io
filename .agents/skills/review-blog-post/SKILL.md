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

- Named `YYYY-MM-DD-slug.md`. The date is the day the draft started; it only orders the files, and the site drops it from the URL.
- The slug is 3–5 kebab-case words about the topic: the title's key phrase plus the main keyword someone would search for. Matching the title word for word is not a goal.
- Once a post has been published, its slug is permanent: renaming it changes the URL and breaks every link to it. Before then, rename freely.

### Frontmatter

- `description` names the tools or topic plainly; search results show it under the title.
- `createdAt` matches the file's date; `updatedAt` moves when the content changes meaningfully.
- `status` stays `draft` until the review passes. `approved` is what publishes the post in production.

### Cover

- A local file in `covers/`, named like the post (`covers/YYYY-MM-DD-slug.jpg`).
- Larger is better: the site crops link previews to 1200×630 and shows the hero at up to 1920×928, and it never enlarges an image.

### Tags

- Fetch the live ranking from `https://dev.to/tags/suggest`: a JSON array of dev.to's top 100 tags, most popular first, each with a `short_summary`.
- Pick four: two large tags for reach, two specific ones for the right readers. Specific tags (the tools the post is about) are often outside the top 100; that is fine.
- Each tag must match what its readers expect: read its `short_summary` against the post's angle, and prefer the tag that names why someone would read the post over one that merely touches it.
