import { motion } from "framer-motion";

type ArcRingProps = {
  className?: string;
  strokeWidth?: number;
  delay?: number;
};

/* Thin open circle, echoing the arc around the "F" in the logo. */
export function ArcRing({ className = "", strokeWidth = 0.6, delay = 0 }: ArcRingProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={`pointer-events-none ${className}`}>
      <motion.circle
        cx="100"
        cy="100"
        r="98"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        transform="rotate(90 100 100)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 0.75 }}
        viewport={{ once: true }}
        transition={{ duration: 2.6, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

type DividerProps = {
  className?: string;
  tone?: "dark" | "light";
};

/* Small line–dot–line ornament used under section titles. */
export function Divider({ className = "", tone = "dark" }: DividerProps) {
  const line = tone === "dark" ? "bg-caramel/40" : "bg-sand/40";
  const dot = tone === "dark" ? "bg-caramel/70" : "bg-sand/70";

  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`h-px w-12 ${line}`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${dot}`} />
      <span className={`h-px w-12 ${line}`} />
    </div>
  );
}
