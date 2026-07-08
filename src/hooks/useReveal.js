import { useState, useEffect, useRef } from "react";

/**
 * Custom hook that triggers a reveal animation when an element
 * enters the viewport. Uses IntersectionObserver for performance.
 *
 * @param {number} threshold - Intersection ratio threshold (0–1)
 * @returns {[React.RefObject, boolean]} - [ref, isVisible]
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}
