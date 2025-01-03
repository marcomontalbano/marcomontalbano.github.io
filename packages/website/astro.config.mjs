import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeVideo from 'rehype-video'
import remarkGemoji from 'remark-gemoji'
import remarkGithubAlerts from 'remark-github-alerts'

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE,
  integrations: [tailwind(), sitemap()],
  markdown: {
    remarkPlugins: [remarkGemoji, remarkGithubAlerts],
    rehypePlugins: [[rehypeVideo, { details: false }]]
  },
  image: {
    domains: ['raw.githubusercontent.com'],
  }
})
