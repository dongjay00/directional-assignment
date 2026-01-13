import { useEffect } from "react";

type InfiniteScrollOptions = {
  enabled: boolean;
  target: React.RefObject<Element | null>;
  onIntersect: () => void;
  rootMargin?: string;
};

export const useInfiniteScroll = ({
  enabled,
  target,
  onIntersect,
  rootMargin = "200px",
}: InfiniteScrollOptions) => {
  useEffect(() => {
    const element = target.current;
    if (!enabled || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, target, onIntersect, rootMargin]);
};
