import { useState, useCallback } from 'react';
import type { RefObject } from 'react';

export function useHorizontalScroll(ref: RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const percentage = (scrollLeft / maxScroll) * 100;
        setProgress(Math.min(100, Math.max(0, percentage)));
      }
    }
  }, [ref]);

  const scrollByAmount = useCallback((direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [ref]);

  return { progress, handleScroll, scrollByAmount };
}