import { useEffect } from "react";
import { motion } from "framer-motion";
import LogoMark from "./LogoMark";

const ease = [0.76, 0, 0.24, 1] as const;

const NAME = "FRANCISCA OLIVEIRA";

/* Opening curtain: the logo draws itself, then the panel lifts to reveal the site. */
function Preloader({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-espresso text-sand"
      exit={{ y: "-100%" }}
      transition={{ duration: 1.15, ease }}
    >
      <motion.div
        className="flex flex-col items-center"
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <LogoMark draw className="h-28 w-28 md:h-36 md:w-36" strokeWidth={1.6} />

        <p className="mt-8 flex font-sans text-xs font-medium tracking-[0.42em] md:text-sm" aria-label={NAME}>
          {NAME.split("").map((char, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              className="inline-block whitespace-pre"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.035, ease: [0.22, 1, 0.36, 1] }}
            >
              {char}
            </motion.span>
          ))}
        </p>

        <motion.span
          className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-sand/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          Psicóloga Clínica
        </motion.span>
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-sand/50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.4, ease: [0.45, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}

export default Preloader;
