import { useEffect, useState } from "react";
import { transform, useTransform, type MotionValue } from "framer-motion";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/* Id of the section currently crossing the middle of the screen. */
export function useActiveSection(ids: readonly string[], key: string) {
  // Remember which page (key) the value came from, so a stale one is ignored after navigating.
  const [active, setActive] = useState<{ key: string; id: string } | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive({ key, id: entry.target.id });
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids, key]);

  return active?.key === key ? active.id : null;
}

/*
 * useTransform(value, input, output), always computed in JS. framer-motion
 * otherwise hands simple scroll mappings to the browser's ScrollTimeline,
 * which measures the page once and drifts when content above changes height.
 */
export function useRange<T>(value: MotionValue<number>, input: number[], output: T[]) {
  return useTransform(value, (v) => transform(v, input, output));
}
