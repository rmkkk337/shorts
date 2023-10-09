import { useEffect, useState, useRef, RefObject } from 'react';

export default function useOnScreen(ref: RefObject<HTMLElement>, threshold: number = 0) {
  const observerRef = useRef<any>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting), { threshold });
  }, [threshold]);

  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}
