import { useEffect, useRef, MutableRefObject } from 'react'

type UseIntersectionObserver = IntersectionObserverInit & {
    ref: MutableRefObject<HTMLElement | null>
    callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
}

const useIntersectionObserver = ({
    ref,
    root,
    rootMargin,
    threshold = 0,
    callback = () => {},
}: UseIntersectionObserver) => {
    const observer = useRef<IntersectionObserver>()

    useEffect(() => {
        observer.current = new window.IntersectionObserver((entries, observer) => callback(entries, observer), {
            root,
            rootMargin,
            threshold,
        })
    }, [callback, root, rootMargin, threshold])

    useEffect(() => {
        const { current: currentObserver } = observer
        if (currentObserver) {
            currentObserver.disconnect()

            if (ref.current) {
                currentObserver.observe(ref.current)
            }

            return () => currentObserver.disconnect()
        }

        return () => {}
    }, [ref, observer])
}

export default useIntersectionObserver
