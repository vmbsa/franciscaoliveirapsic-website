import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "../lib/hooks";

type Mode = "hidden" | "default" | "link" | "text";

/* Soft ring that trails the pointer and swells over links (mouse only). */
function Cursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("hidden");
  const x = useSpring(useMotionValue(-100), { stiffness: 380, damping: 32, mass: 0.5 });
  const y = useSpring(useMotionValue(-100), { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (!finePointer || reduced) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest("input, textarea")) setMode("text");
      else if (target?.closest("a, button, label, [role='button']")) setMode("link");
      else setMode("default");
    };
    const onLeave = () => setMode("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [finePointer, reduced, x, y]);

  if (!finePointer || reduced) return null;

  const variants = {
    hidden: { scale: 0, opacity: 0 },
    default: { scale: 1, opacity: 1, backgroundColor: "rgba(128, 92, 59, 0)" },
    link: { scale: 1.8, opacity: 1, backgroundColor: "rgba(128, 92, 59, 0.14)" },
    text: { scale: 0.4, opacity: 0.6, backgroundColor: "rgba(128, 92, 59, 0)" },
  };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] -ml-4 -mt-4 h-8 w-8 rounded-full border border-caramel/70"
      style={{ x, y }}
      variants={variants}
      initial="hidden"
      animate={mode}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    />
  );
}

export default Cursor;
