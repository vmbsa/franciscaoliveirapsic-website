import { createContext, useContext } from "react";

const STORAGE_KEY = "fo-intro-seen";

/* True once the intro curtain has lifted (or when it is skipped). */
export const IntroContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);

export function hasSeenIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the intro will simply replay.
  }
}
