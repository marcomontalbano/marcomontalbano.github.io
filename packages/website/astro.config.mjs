import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeVideo from 'rehype-video'
import remarkGemoji from 'remark-gemoji'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkGemoji],
    rehypePlugins: [[rehypeVideo, { details: false }]]
  },
  image: {
    domains: ['raw.githubusercontent.com'],
  }
})
