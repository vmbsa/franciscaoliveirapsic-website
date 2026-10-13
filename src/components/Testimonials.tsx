import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import plants from "../assets/plants.jpg";
import { ArcRing } from "./Ornaments";
import { useRange } from "../lib/hooks";

const testimonials = [
  "A mudança ocorre quando há espaço para a autenticidade, a presença e escuta.",
  "A relação terapêutica oferece um espaço seguro onde é possível existir sem julgamento.",
];

const INTERVAL = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

/* A quiet pause between sections: one thought at a time. */
function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplay = !reduced && !paused;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useRange(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), INTERVAL);
    return () => clearTimeout(timer);
  }, [index, autoplay]);

  const go = (step: number) =>
    setIndex((i) => (i + step + testimonials.length) % testimonials.length);

  return (
    <section
      ref={ref}
      aria-roledescription="carrossel"
      className="relative isolate flex min-h-[80svh] items-center overflow-hidden py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Close crop on the blurred garden behind the glass, so it reads apart from the hero */}
      <motion.img
        src={plants}
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 -top-[10%] -z-20 h-[120%] w-full origin-top-right scale-150 object-cover object-[70%_15%]"
        style={{ y: imageY }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-espresso/65" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(40,22,10,0.6)_100%)]"
      />
      <div
        aria-hidden="true"
        className="breathe absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 sm:h-[44rem] sm:w-[44rem]"
      >
        <ArcRing className="h-full w-full text-sand/30" strokeWidth={0.4} />
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 text-center">
        <Quote aria-hidden="true" className="mx-auto h-10 w-10 text-sand/60" strokeWidth={1.2} />

        <div className="mt-8 grid min-h-[12rem] items-center sm:min-h-[10rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              className="col-start-1 row-start-1 font-heading text-[clamp(1.6rem,3.4vw,2.7rem)] font-medium italic leading-[1.3] text-white"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.9, ease }}
            >
              {testimonials[index]}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-5">
          <button
            onClick={() => go(-1)}
            aria-label="Citação anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sand/40 text-sand transition-colors hover:border-sand hover:bg-sand/10"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <span key={i} className="h-[2px] w-12 overflow-hidden rounded-full bg-sand/25">
                {i === index && (
                  <motion.span
                    key={`${index}-${autoplay}`}
                    className="block h-full origin-left bg-sand"
                    initial={{ scaleX: autoplay ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: autoplay ? INTERVAL / 1000 : 0, ease: "linear" }}
                  />
                )}
              </span>
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Citação seguinte"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sand/40 text-sand transition-colors hover:border-sand hover:bg-sand/10"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
