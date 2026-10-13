import { Fragment, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowDown } from "lucide-react";
import plants from "../assets/plants.jpg";
import { ArcRing } from "./Ornaments";
import { useIntroDone } from "../lib/intro";
import { useRange } from "../lib/hooks";

const quote = "“Pensar em conjunto é um ato profundamente transformador.”";
const words = quote.split(" ");

const ease = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);

  // Gentle exit: the photo drifts, the quote lifts and fades as you scroll away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useRange(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useRange(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useRange(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex h-svh min-h-[34rem] items-center justify-center overflow-hidden bg-espresso"
    >
      {/* Background image settles in as the intro curtain lifts */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20" style={{ y: imageY }}>
        <motion.img
          src={plants}
          alt=""
          className="h-full w-full object-cover"
          initial={{ scale: 1.25 }}
          animate={ready ? { scale: 1.04 } : { scale: 1.25 }}
          transition={{ duration: 3.2, ease }}
        />
      </motion.div>

      {/* Warm overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/35 to-espresso/90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(40,22,10,0.55)_100%)]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-4xl px-6 text-center"
      >
        {ready && (
          <ArcRing
            className="absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 text-sand/35 sm:h-[32rem] sm:w-[32rem] lg:h-[36rem] lg:w-[36rem]"
            strokeWidth={0.5}
            delay={0.3}
          />
        )}

        <motion.span
          aria-hidden="true"
          className="mx-auto mb-10 block h-px w-16 bg-sand/70"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={ready ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        />

        <h1 className="text-[2.2rem] font-semibold leading-[1.18] text-sand drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-[3.6rem]">
          {words.map((word, index) => (
            <Fragment key={index}>
              <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotate: 4 }}
                  animate={ready ? { y: "0%", rotate: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.35 + index * 0.08, ease }}
                >
                  {word}
                </motion.span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <motion.span
          aria-hidden="true"
          className="mx-auto mt-10 block h-px w-16 bg-sand/70"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={ready ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.3, ease }}
        />
      </motion.div>

      <motion.a
        href="#sobre-mim"
        aria-label="Sobre mim"
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12"
        initial={{ opacity: 0, y: -10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.7, ease }}
      >
        <span className="float-arrow flex h-12 w-12 items-center justify-center rounded-full border border-sand/40 bg-white/5 text-sand backdrop-blur-sm transition-colors duration-300 group-hover:border-sand group-hover:bg-sand/15">
          <ArrowDown className="h-5 w-5" strokeWidth={1.5} />
        </span>
      </motion.a>
    </section>
  );
}

export default Hero;
