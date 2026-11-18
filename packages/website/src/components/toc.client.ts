/**
 * Scroll-spy for `TableOfContents.astro`: marks the heading being read and
 * slides the active marker along the rail to its link.
 */

/** Top fraction of the viewport where a heading counts as "being read". */
const READING_BAND = 0.25;
/** Pixels from the page end that still count as scrolled to the bottom. */
const BOTTOM_EPSILON = 2;
/** Space kept around the active link when scrolling it into the sidebar's view. */
const REVEAL_PADDING = 12;

/** Keys that scroll the page by hand, releasing a link the reader clicked. */
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);

/** Wires one table of contents to the headings it links to. */
function initToc(root: HTMLElement): void {
  const nav = root.querySelector('nav');
  const marker = root.querySelector<HTMLElement>('[data-toc-marker]');
  const links = Array.from(root.querySelectorAll<HTMLElement>('[data-toc-link]'));
  if (nav == null || marker == null) return;

  const scrollHost = root.closest<HTMLElement>('[data-toc-scroll-host]') ?? root;
  /** The heading each link points to, by link index; `null` when it's missing from the page. */
  const headings = links.map((link) => document.getElementById(link.dataset.slug ?? ''));
  /** Index of the last link whose heading is on the page: it wins at the bottom. */
  const lastIndex = headings.findLastIndex((heading) => heading != null);
  if (lastIndex === -1) return;

  let activeLink: HTMLElement | null = null;
  /** Link the reader clicked, kept active until they scroll by hand. */
  let clickedIndex: number | null = null;
  let hasClickedHeadingBeenSeen = false;

  /** Moves the marker beside the active link. */
  function paintMarker() {
    if (activeLink == null) return;
    marker!.style.translate = `0 ${activeLink.offsetTop}px`;
    marker!.style.height = `${activeLink.offsetHeight}px`;
  }

  /** Scrolls the sidebar, not the page, so the active link stays visible. */
  function revealLink(link: HTMLElement) {
    const hostRect = scrollHost.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    if (linkRect.top < hostRect.top + REVEAL_PADDING) {
      scrollHost.scrollTop += linkRect.top - hostRect.top - REVEAL_PADDING;
    } else if (linkRect.bottom > hostRect.bottom - REVEAL_PADDING) {
      scrollHost.scrollTop += linkRect.bottom - hostRect.bottom + REVEAL_PADDING;
    }
  }

  function setActive(index: number) {
    if (links[index] === activeLink) return;
    activeLink?.removeAttribute('aria-current');
    activeLink = links[index];
    activeLink.setAttribute('aria-current', 'true');
    revealLink(activeLink);
    paintMarker();
  }

  function isInViewport(heading: HTMLElement | null) {
    const rect = heading?.getBoundingClientRect();
    return rect != null && rect.bottom >= 0 && rect.top <= window.innerHeight;
  }

  /** Index of the last heading scrolled into the reading band, or the first one before any is. */
  function getReadIndex() {
    const bandBottom = window.innerHeight * READING_BAND;
    let readIndex = headings.findIndex((heading) => heading != null);
    headings.forEach((heading, index) => {
      if (heading != null && heading.getBoundingClientRect().top <= bandBottom) readIndex = index;
    });
    return readIndex;
  }

  function isAtBottom() {
    const scrollEl = document.scrollingElement ?? document.documentElement;
    const maxScroll = scrollEl.scrollHeight - window.innerHeight;
    return maxScroll > BOTTOM_EPSILON && scrollEl.scrollTop >= maxScroll - BOTTOM_EPSILON;
  }

  /** Forgets the clicked link once its heading has been seen and scrolled away. */
  function releaseStaleClick() {
    if (clickedIndex == null) return;
    if (isInViewport(headings[clickedIndex])) {
      hasClickedHeadingBeenSeen = true;
    } else if (hasClickedHeadingBeenSeen || headings[clickedIndex] == null) {
      clickedIndex = null;
    }
  }

  function updateActive() {
    releaseStaleClick();
    setActive(clickedIndex ?? (isAtBottom() ? lastIndex : getReadIndex()));
  }

  function releaseClick() {
    if (clickedIndex == null) return;
    clickedIndex = null;
    updateActive();
  }

  let isFramePending = false;
  function onScroll() {
    if (isFramePending) return;
    isFramePending = true;
    requestAnimationFrame(() => {
      updateActive();
      isFramePending = false;
    });
  }

  nav.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLElement>('[data-toc-link]');
    if (link == null) return;
    clickedIndex = links.indexOf(link);
    hasClickedHeadingBeenSeen = isInViewport(headings[clickedIndex]);
    updateActive();
  });

  window.addEventListener('wheel', releaseClick, { passive: true });
  window.addEventListener('touchmove', releaseClick, { passive: true });
  window.addEventListener('keydown', (event) => {
    if (SCROLL_KEYS.has(event.key)) releaseClick();
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  // Links rewrap when the nav resizes, so the marker follows its link's new box.
  new ResizeObserver(paintMarker).observe(nav);

  updateActive();
  // Commits the first position before transitions turn on, so the marker fades in instead of sliding.
  void marker.offsetWidth;
  marker.dataset.ready = 'true';
}

document.querySelectorAll<HTMLElement>('[data-toc]').forEach(initToc);
