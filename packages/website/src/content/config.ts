import { defineCollection, z } from 'astro:content'

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    description: z.string(),
    cover: z.string(),
    repoUrl: z.string(),
    homepageUrl: z.string().nullable(),
    createdAt: z.date(),
    tags: z.string().array(),
  })
})

export const collections = {
  'project': projectCollection,
}