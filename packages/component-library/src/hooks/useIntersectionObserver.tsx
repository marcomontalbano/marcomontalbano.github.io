import { useEffect, useRef, MutableRefObject } from 'react';

type UseIntersectionObserver = IntersectionObserverInit & {
  ref: MutableRefObject<HTMLElement>;
  callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
}

export default ({
  ref,
  root,
  rootMargin,
  threshold = 0,
  callback = () => {}
}: UseIntersectionObserver) => {

  const observer = useRef(
    new window.IntersectionObserver(
      (entries, observer) => callback(entries, observer),
      { root, rootMargin, threshold }
    )
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (ref.current) {
      currentObserver.observe(ref.current);
    }

    return () => currentObserver.disconnect();
  }, [ref]);
};
