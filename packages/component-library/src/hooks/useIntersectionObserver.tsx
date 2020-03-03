import { useEffect, useRef, useState } from 'react';

type UseIntersectionObserver = IntersectionObserverInit & {
  callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
}

export default ({
  root,
  rootMargin,
  threshold = 0,
  callback = () => {}
}: UseIntersectionObserver) => {
  const [node, setNode] = useState();

  const observer = useRef(
    new window.IntersectionObserver(
      (entries, observer) => callback(entries, observer),
      { root, rootMargin, threshold }
    )
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) {
      currentObserver.observe(node);
    }

    return () => currentObserver.disconnect();
  }, [node]);

  return setNode;
};
