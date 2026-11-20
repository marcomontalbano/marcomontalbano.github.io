import { getImage } from 'astro:assets';

/** Size of link-preview images, the one Facebook, LinkedIn and X expect. */
export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 };

/**
 * The JPEG shown in link previews and structured data, cropped to `SOCIAL_IMAGE_SIZE`.
 * `size` is set only when it's known to be exact: Astro never enlarges, so a smaller
 * source stays as it is, and a URL's size isn't known at build time.
 * `pageUrl` gives the origin: the site URL in a build, localhost in dev.
 */
export async function getSocialImage(src: ImageMetadata | string, pageUrl: URL) {
  const image = await getImage({ src, ...SOCIAL_IMAGE_SIZE, format: 'jpeg' });
  const isExactSize =
    typeof src !== 'string' && src.width >= SOCIAL_IMAGE_SIZE.width && src.height >= SOCIAL_IMAGE_SIZE.height;

  return {
    url: new URL(image.src, pageUrl).href,
    size: isExactSize ? SOCIAL_IMAGE_SIZE : undefined,
  };
}
