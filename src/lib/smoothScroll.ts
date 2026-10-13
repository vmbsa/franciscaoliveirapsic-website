import Lenis from "lenis";

/* Height of the fixed header, so anchors land just below it. */
const HEADER_OFFSET = -80;

let lenis: Lenis | null = null;

/* Gentle inertial scroll. Skipped for reduced-motion users. */
export function startSmoothScroll() {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new Lenis({
    autoRaf: true,
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    anchors: { offset: HEADER_OFFSET },
  });
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export function scrollToTarget(target: string | number, immediate = false) {
  const offset = typeof target === "string" ? HEADER_OFFSET : 0;

  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, force: true });
    return;
  }

  const top =
    typeof target === "number"
      ? target
      : (document.querySelector(target)?.getBoundingClientRect().top ?? 0) + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
    return;
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
