import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders';
import { z } from 'astro/zod'

const project = defineCollection({
  loader: glob({ base: "./src/content/project", pattern: '**/[^_]*.{md,mdx}' }),
  schema: z.object({
    description: z.string(),
    cover: z.string(),
    repoUrl: z.string(),
    homepageUrl: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tags: z.string().array(),
  })
})

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: '**/[^_]*.{md,mdx}',
    /**
     * The post's URL is its `slug`, so the file can be renamed with the title without breaking links.
     * Runs before the schema: a post missing `slug` falls back to its file path, which the schema error then names.
     */
    generateId: ({ entry, data }) => (typeof data.slug === 'string' ? data.slug : entry),
  }),
  schema: ({ image }) => z.object({
    /** URL segment, permanent once published, e.g. `code-from-anywhere-with-tailscale`. */
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'A slug uses lowercase words joined by hyphens.'),
    description: z.string(),
    cover: image(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tags: z
      .string()
      .regex(/^[a-z0-9]+$/, 'dev.to tags use only lowercase letters and digits.')
      .array()
      .max(4, 'dev.to allows at most 4 tags.'),
    /** Only `approved` posts reach production; drafts show in dev only. */
    status: z.enum(['draft', 'approved']).default('draft'),
  })
})

export const collections = {
  project,
  blog,
}
