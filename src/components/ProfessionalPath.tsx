import { motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpenText,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Users,
} from "lucide-react";
import { ArcRing, Divider } from "./Ornaments";

const steps = [
  { text: "Mestre em Psicologia Clínica – ISPA", icon: GraduationCap },
  { text: "Membro Efetivo da Ordem dos Psicólogos Portugueses (29795)", icon: BadgeCheck },
  { text: "Curso Avançado em Parentalidade e Educação Consciente (CRIAP)", icon: BookOpenText },
  { text: "Experiência com Crianças, Adolescentes e Adultos", icon: Users },
  { text: "Experiência em Aconselhamento Psicológico Parental", icon: HandHeart },
  { text: "Especialização em Terapia Familiar e de Casal", icon: HeartHandshake },
];

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
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

const titleAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

const iconBubble =
  "relative z-10 flex items-center justify-center rounded-full border border-sand bg-white text-espresso shadow-[0_14px_30px_-14px_rgba(80,49,29,0.5)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-espresso group-hover:bg-espresso group-hover:text-sand";

function ProfessionalPath() {
  return (
    <section id="percurso" className="relative isolate overflow-hidden bg-white py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-b from-transparent to-linen/40"
      />
      <ArcRing className="absolute -left-48 -top-56 -z-10 h-[30rem] w-[30rem] text-sand" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16 text-center md:mb-24"
          variants={titleAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          <h2 className="font-heading text-4xl font-bold text-cocoa md:text-5xl">
            Percurso Profissional
          </h2>
          <Divider className="mt-6" />
        </motion.div>

        {/* Mobile */}
        <motion.ol
          className="mx-auto flex max-w-xl flex-col lg:hidden"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map(({ text, icon: Icon }, index) => (
            <motion.li
              key={index}
              className="group grid grid-cols-[56px_1fr] gap-5"
              variants={item}
            >
              <div className="flex flex-col items-center">
                <div className={`${iconBubble} h-14 w-14`}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                {index !== steps.length - 1 && (
                  <div className="my-2 w-px flex-1 bg-linear-to-b from-sand to-sand/30" />
                )}
              </div>

              <div className="pb-10 pt-4">
                <p className="text-base leading-relaxed text-mocha">{text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* Desktop */}
        <motion.ol
          className="relative hidden gap-6 lg:grid lg:grid-cols-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute left-[8.33%] right-[8.33%] top-8 h-px origin-left bg-linear-to-r from-sand via-caramel/50 to-sand"
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1.6, ease } },
            }}
          />

          {steps.map(({ text, icon: Icon }, index) => (
            <motion.li
              key={index}
              className="group relative flex flex-col items-center text-center"
              variants={item}
            >
              <div className={`${iconBubble} mb-6 h-16 w-16`}>
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <p className="mx-auto max-w-[210px] text-sm leading-relaxed text-mocha xl:text-[0.95rem]">
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

export default ProfessionalPath;
