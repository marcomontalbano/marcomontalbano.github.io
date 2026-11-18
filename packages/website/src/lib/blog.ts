import { getCollection } from 'astro:content';

/**
 * Blog posts to publish: only approved ones in a production build, every post in dev.
 * Drafts are left out before their pages are built, so production never gets a URL for them.
 */
export function getBlogPosts() {
  return getCollection('blog', ({ data }) => !import.meta.env.PROD || data.status === 'approved');
}

/** Whether there is any post to publish, which decides if the blog shows up at all. */
export async function hasBlogPosts() {
  return (await getBlogPosts()).length > 0;
}
