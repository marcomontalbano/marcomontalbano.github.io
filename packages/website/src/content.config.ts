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

export const collections = {
  project,
}
