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
    /** Drops the `YYYY-MM-DD-` prefix that orders the files, so it stays out of the URL. */
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  }),
  schema: ({ image }) => z.object({
    description: z.string(),
    cover: image(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tags: z
      .string()
      .regex(/^[a-z0-9]+$/, 'dev.to tags use only lowercase letters and digits.')
      .array()
      .max(4, 'dev.to allows at most 4 tags.'),
  })
})

export const collections = {
  project,
  blog,
}
