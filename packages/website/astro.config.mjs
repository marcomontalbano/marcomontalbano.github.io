import { unified } from '@astrojs/markdown-remark'
import sitemap from '@astrojs/sitemap'
import { defineConfig, sharpImageService } from 'astro/config'
import rehypeVideo from 'rehype-video'
import remarkGemoji from 'remark-gemoji'
import remarkGithubAlerts from 'remark-github-alerts'
import tailwindcss from '@tailwindcss/vite';
import mermaid from 'astro-mermaid'

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE,
  integrations: [
    mermaid({
      autoTheme: true,
      mermaidConfig: {
        htmlLabels: false,
      }
    }),
    sitemap(),
  ],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkGemoji, remarkGithubAlerts],
      rehypePlugins: [[rehypeVideo, { details: false }]]
    })
  },

  image: {
    service: sharpImageService({ limitInputPixels: false }),
    domains: [
      'raw.githubusercontent.com'
    ],
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [
        ".ts.net",
        ".ngrok.app"
      ]
    }
  }
})
