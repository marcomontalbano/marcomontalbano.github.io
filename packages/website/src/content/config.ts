import { defineCollection, z } from 'astro:content'

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    name: z.string(),
    description: z.string(),
    cover: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    topics: z.string().array(),
  })
})

export const collections = {
  'projects': projectsCollection,
}