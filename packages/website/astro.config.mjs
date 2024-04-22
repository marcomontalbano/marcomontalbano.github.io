import tailwind from "@astrojs/tailwind"
import { defineConfig } from 'astro/config'
import remarkGemoji from 'remark-gemoji'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkGemoji]
  }
})