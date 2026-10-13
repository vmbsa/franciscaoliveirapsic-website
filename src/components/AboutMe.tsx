import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import profilePic from "../assets/foto_perfil.jpg";
import paperTexture from "../assets/paper.png";
import { ArcRing } from "./Ornaments";
import { useRange } from "../lib/hooks";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease,
    },
  },
};

function AboutMe() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoScale = useRange(scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <section id="sobre-mim" className="relative isolate overflow-hidden bg-sand py-24 md:py-32">
      {/* Texture + soft light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-50 mix-blend-multiply"
        style={{ backgroundImage: `url(${paperTexture})` }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-48 -top-48 -z-10 h-[36rem] w-[36rem] rounded-full bg-white/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 -right-40 -z-10 h-[40rem] w-[40rem] rounded-full bg-linen/70 blur-3xl"
      />
      <ArcRing className="absolute -left-40 bottom-[-12rem] -z-10 h-[30rem] w-[30rem] text-espresso/15" />

      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-[3fr_2fr] lg:gap-24">
          <motion.div
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              variants={itemVariants}
              className="font-heading text-4xl font-extrabold text-cocoa md:text-5xl"
            >
              Sobre mim
            </motion.h2>

            <motion.span
              variants={itemVariants}
              aria-hidden="true"
              className="mb-10 mt-6 block h-px w-20 bg-caramel/60"
            />

            <motion.p variants={itemVariants} className="mb-6 text-[1.02rem] leading-8 text-mocha">
              Enquanto psicóloga clínica, acredito que cada pessoa tem uma história
              única e merece um espaço seguro sem julgamentos, onde possa
              expressar-se livremente e ser verdadeiramente ouvido/a.
            </motion.p>

            <motion.p variants={itemVariants} className="mb-6 text-[1.02rem] leading-8 text-mocha">
              Coloco-me ao seu lado com disponibilidade e cuidado, respeitando a sua
              individualidade em cada etapa do processo.
            </motion.p>

            <motion.p variants={itemVariants} className="mb-12 text-[1.02rem] leading-8 text-mocha">
              O meu trabalho tem como objetivo a construção de uma relação
              terapêutica próxima e de confiança, baseada na escuta ativa, empatia e
              acolhimento. Cada acompanhamento é pensado de forma personalizada,
              tendo em conta as suas necessidades, objetivos e ritmo.
            </motion.p>

            <motion.blockquote variants={itemVariants} className="border-l-2 border-caramel/60 pl-7">
              <p className="font-heading text-[1.55rem] font-semibold italic leading-snug text-cocoa md:text-[1.9rem]">
                Sinto-me realizada em poder conectar-me verdadeiramente com a
                individualidade de cada pessoa.
              </p>
            </motion.blockquote>

            <motion.div variants={itemVariants} className="mt-12 flex justify-center md:justify-start">
              <a href="#contactos" className="button-primary group">
                Contacte-me
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-sm md:max-w-none"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Offset outline */}
            <div
              aria-hidden="true"
              className="arch-frame absolute inset-0 translate-x-4 translate-y-4 border border-espresso/35 md:translate-x-6 md:translate-y-6"
            />

            <div
              ref={photoRef}
              className="arch-frame relative aspect-[3/4] overflow-hidden bg-linen shadow-[0_50px_90px_-40px_rgba(80,49,29,0.7)]"
            >
              <motion.img
                src={profilePic}
                alt="Francisca Oliveira - Psicóloga Clínica"
                style={{ scale: photoScale }}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-espresso/25 via-transparent to-transparent"
              />
            </div>

            <ArcRing
              className="absolute -left-12 -top-10 h-40 w-40 text-caramel/60"
              strokeWidth={1.2}
              delay={0.3}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
