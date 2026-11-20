import { getCollection } from 'astro:content';
import { SOCIAL_IMAGE_SIZE } from './social-image';

/**
 * Blog posts to publish: only approved ones in a production build, every post in dev.
 * Drafts are left out before their pages are built, so production never gets a URL for them.
 * Throws when a cover is smaller than a link preview, since Astro never enlarges images.
 */
export async function getBlogPosts() {
  const posts = await getCollection('blog', ({ data }) => !import.meta.env.PROD || data.status === 'approved');

  const postWithSmallCover = posts.find(
    ({ data: { cover } }) => cover.width < SOCIAL_IMAGE_SIZE.width || cover.height < SOCIAL_IMAGE_SIZE.height,
  );
  if (postWithSmallCover != null) {
    const { width, height } = postWithSmallCover.data.cover;
    throw new Error(
      `The cover of "${postWithSmallCover.id}" is ${width}×${height}: it must be at least ` +
        `${SOCIAL_IMAGE_SIZE.width}×${SOCIAL_IMAGE_SIZE.height} for link previews.`,
    );
  }

  return posts;
}

/** Whether there is any post to publish, which decides if the blog shows up at all. */
export async function hasBlogPosts() {
  return (await getBlogPosts()).length > 0;
}
