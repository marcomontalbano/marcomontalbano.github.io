/** The marker, written on the line above a sound-only video link: `<!-- audio -->`. GitHub hides it. */
const AUDIO_MARKER = /^<!--\s*audio\s*-->$/;

/**
 * Turns the `<video>` that `rehype-video` made from a link into an `<audio>` player, when the link follows
 * an `<!-- audio -->` comment. For sound-only clips, which GitHub attachment URLs can't tell apart from videos.
 * Must run after `rehype-video`.
 */
export default function rehypeAudio() {
  return (tree) => convertMarkedVideos(tree);
}

/** Walks the tree, converting each video that directly follows the marker. */
function convertMarkedVideos(node) {
  if (!Array.isArray(node.children)) return;

  let isAfterMarker = false;
  for (const child of node.children) {
    if (isMarker(child)) {
      isAfterMarker = true;
      continue;
    }
    // Whitespace between the comment and the player doesn't break the pairing.
    if (child.type === 'text' && child.value.trim() === '') continue;

    if (isAfterMarker && child.type === 'element' && child.tagName === 'video') {
      child.tagName = 'audio';
      child.properties = { controls: true, src: child.properties.src };
      child.children = [];
    }
    isAfterMarker = false;
    convertMarkedVideos(child);
  }
}

/** The comment is still raw HTML here: Astro parses raw HTML only after the user's rehype plugins. */
function isMarker(node) {
  return (
    (node.type === 'raw' && AUDIO_MARKER.test(node.value.trim())) ||
    (node.type === 'comment' && node.value.trim() === 'audio')
  );
}
