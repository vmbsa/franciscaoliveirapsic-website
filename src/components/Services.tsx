import { motion } from "framer-motion";
import { HandHeart, Languages, MapPin, MonitorSmartphone, Sprout, User } from "lucide-react";
import sofa from "../assets/sofa.png";
import { Divider } from "./Ornaments";

const services = [
  {
    title: "Adultos",
    icon: User,
    description:
      "Oferece um espaço seguro e de confiança para compreender emoções e desafios pessoais, promovendo bem-estar emocional, autoconhecimento e estratégias para lidar com dificuldades pessoais e relacionais.",
  },
  {
    title: "Crianças e Adolescentes",
    icon: Sprout,
    description:
      "Abordagem centrada na relação terapêutica e na escuta ativa, é criado um espaço seguro onde crianças e adolescentes podem explorar emoções, dificuldades e desafios do seu desenvolvimento.",
  },
  {
    title: "Aconselhamento Psicológico Parental",
    icon: HandHeart,
    description:
      "Oferece um espaço de reflexão e diálogo, apoiando pais e cuidadores na compreensão das necessidades emocionais dos seus filhos e no fortalecimento de uma parentalidade mais consciente e segura.",
  },
];

const formats = [
  { label: "Presencial na zona de Lisboa", icon: MapPin },
  { label: "Online", icon: MonitorSmartphone },
  { label: "English available", icon: Languages },
];

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

function Services() {
  return (
    <section id="consultas" className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${sofa})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-linen/90 via-linen/45 to-espresso/40"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-14 text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="font-heading text-4xl font-bold text-espresso md:text-5xl">
            Consultas de Psicologia
          </h2>
          <Divider className="mt-6" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map(({ title, description, icon: Icon }, index) => (
            <motion.article
              key={index}
              variants={item}
              className="group relative mx-auto flex h-full w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-white/25 bg-espresso/75 px-8 py-10 text-center shadow-[0_40px_70px_-35px_rgba(40,22,10,0.9)] backdrop-blur-md transition-[background-color,translate] duration-500 hover:-translate-y-2 hover:bg-espresso/90 md:max-w-none"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-sand/30 bg-white/10 text-sand transition-transform duration-500 group-hover:scale-110">
                <Icon className="h-7 w-7" strokeWidth={1.4} />
              </div>
              <h3 className="font-heading text-xl font-bold leading-tight text-white">
                {title}
              </h3>
              <span
                aria-hidden="true"
                className="my-5 block h-px w-10 bg-sand/50 transition-all duration-500 group-hover:w-20"
              />
              <p className="text-sm leading-7 text-sand">{description}</p>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-caramel/50 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Extra info boxes */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 md:mt-14 md:flex-row"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {formats.map(({ label, icon: Icon }) => (
            <motion.div
              key={label}
              variants={item}
              className="flex w-full max-w-sm items-center gap-3 rounded-full bg-espresso py-2.5 pl-2.5 pr-7 shadow-[0_18px_40px_-18px_rgba(40,22,10,0.9)] ring-1 ring-white/10 md:w-auto"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand/15 text-sand">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <h3 className="text-sm font-semibold text-white">{label}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
