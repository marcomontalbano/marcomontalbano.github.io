import sitemap from '@astrojs/sitemap'
import { defineConfig, sharpImageService } from 'astro/config'
import rehypeVideo from 'rehype-video'
import remarkGemoji from 'remark-gemoji'
import remarkGithubAlerts from 'remark-github-alerts'
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE,
  integrations: [sitemap()],

  markdown: {
    remarkPlugins: [remarkGemoji, remarkGithubAlerts],
    rehypePlugins: [[rehypeVideo, { details: false }]]
  },

  image: {
    service: sharpImageService({ limitInputPixels: false }),
    domains: [
      'raw.githubusercontent.com'
    ],
  },

  vite: {
    plugins: [tailwindcss()]
  }
})
