import { defineCollection, z } from 'astro:content'

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    description: z.string(),
    cover: z.string(),
    repoUrl: z.string(),
    homepageUrl: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    topics: z.string().array(),
  })
})

export const collections = {
  'projects': projectsCollection,
}