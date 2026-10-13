import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarHeart, CircleAlert, CircleCheck, Mail, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import ersLogo from "../assets/ers_logo.png";
import LogoMark from "./LogoMark";
import { ArcRing } from "./Ornaments";
import { BOOKING_URL } from "../lib/site";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "peer w-full rounded-2xl border border-sand bg-linen/25 px-5 pb-2.5 pt-6 text-[0.95rem] text-espresso outline-none transition-all duration-300 placeholder:text-transparent hover:border-mocha/50 focus:border-espresso/60 focus:bg-white focus:ring-4 focus:ring-espresso/10";

const labelClass =
  "pointer-events-none absolute left-5 top-4 text-[0.95rem] text-mocha/80 transition-all duration-200 peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-caramel peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-caramel";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h3.96V21H3V9.75Zm6.49 0h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21h-3.96v-5.07c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68V21H9.49V9.75Z" />
    </svg>
  );
}

function Footer() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          mensagem: formData.mensagem,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setSuccessMessage("Obrigado pela confiança. Entrarei em contacto brevemente.");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
      });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setErrorMessage("Não foi possível enviar a mensagem. Tente novamente daqui a pouco.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer id="contactos" className="relative isolate overflow-hidden bg-white pt-24 md:pt-32">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-linen/60 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-[2fr_3fr] lg:gap-12">
          {/* Contact card */}
          <motion.div
            className="relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] bg-espresso p-8 text-white shadow-[0_40px_80px_-40px_rgba(80,49,29,0.8)] sm:p-10 lg:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,rgba(128,92,59,0.6),transparent_55%)]"
            />
            <ArcRing className="absolute -bottom-24 -right-24 -z-10 h-48 w-48 text-sand/20 sm:-bottom-40 sm:-right-40 sm:h-80 sm:w-80" />
            <ArcRing className="absolute -left-20 -top-20 -z-10 h-56 w-56 text-sand/10" strokeWidth={1} />

            <div className="text-center">
              <h3 className="font-heading text-3xl font-bold leading-tight lg:text-4xl">Conte comigo.</h3>
              <h3 className="font-heading text-3xl font-bold leading-tight lg:text-4xl">Entre em contacto.</h3>
            </div>

            <div className="my-12 flex flex-col gap-4">
              <a
                href="mailto:francisca.oliveira.psic@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/25 hover:bg-white/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand/15 text-sand transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="min-w-0 text-[0.95rem] [overflow-wrap:anywhere]">
                  francisca.oliveira.psic@gmail.com
                </span>
              </a>

              <a
                href="tel:+351916638161"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/25 hover:bg-white/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand/15 text-sand transition-transform duration-300 group-hover:scale-110">
                  <Phone className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="text-[0.95rem]">+351 916 638 161</span>
              </a>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/francisca.oliveira.psic/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-sand/30 text-sand transition-all duration-300 hover:-translate-y-0.5 hover:border-sand hover:bg-sand hover:text-espresso"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://pt.linkedin.com/in/francisca-oliveira-71279a195"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-sand/30 text-sand transition-all duration-300 hover:-translate-y-0.5 hover:border-sand hover:bg-sand hover:text-espresso"
              >
                <LinkedInIcon />
              </a>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            className="relative rounded-[2rem] border border-sand/60 bg-white/90 p-7 shadow-[0_40px_80px_-45px_rgba(80,49,29,0.45)] backdrop-blur-sm sm:p-10 lg:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.12, ease }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="relative block">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className={fieldClass}
                />
                <span className={labelClass}>Nome</span>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="relative block">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                  <span className={labelClass}>Email</span>
                </label>

                <label className="relative block">
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="Telefone"
                    required
                    value={formData.telefone}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                  <span className={labelClass}>Telefone</span>
                </label>
              </div>

              <label className="relative block">
                <textarea
                  name="mensagem"
                  placeholder="Mensagem"
                  rows={5}
                  required
                  value={formData.mensagem}
                  onChange={handleChange}
                  className={`${fieldClass} resize-none`}
                />
                <span className={labelClass}>Mensagem</span>
              </label>

              <button type="submit" disabled={isSending} className="button-primary group w-full py-4">
                {isSending ? "A enviar..." : "Enviar Mensagem"}
                {!isSending && (
                  <Send
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                )}
              </button>

              {successMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-center text-sm text-green-700"
                >
                  <CircleCheck className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {successMessage}
                </motion.p>
              )}

              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-700"
                >
                  <CircleAlert className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {errorMessage}
                </motion.p>
              )}
            </form>

            {/* Booking prompt */}
            <div className="relative isolate mt-8 flex flex-col gap-6 overflow-hidden rounded-[1.5rem] bg-espresso p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(128,92,59,0.6),transparent_60%)]"
              />
              <ArcRing className="absolute -bottom-20 -right-16 -z-10 h-52 w-52 text-sand/25" strokeWidth={0.8} />
              <p className="font-heading text-2xl font-semibold italic text-linen">Sem mais questões?</p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-light w-full shrink-0 whitespace-nowrap sm:w-auto"
              >
                <CalendarHeart className="h-4 w-4" strokeWidth={1.75} />
                Agende uma sessão
              </a>
            </div>
          </motion.div>
        </div>

        {/* Closing bar */}
        <div className="mt-24 flex flex-col items-center gap-6 border-t border-sand py-10 text-sm text-mocha md:flex-row md:justify-between">
          <Link to="/" className="flex items-center gap-3 text-espresso">
            <LogoMark className="h-9 w-9" strokeWidth={3.5} />
            <span className="text-xs font-semibold tracking-[0.26em]">FRANCISCA OLIVEIRA</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <img src={ersLogo} alt="ERS Logo" className="h-6" />
            <span>ERS 45874</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-sand sm:inline-block" />
            <Link
              to="/politica-de-privacidade"
              className="underline decoration-sand underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso"
            >
              Política de Privacidade
            </Link>
          </div>

          <p className="text-center text-mocha/80">© 2026 Francisca Oliveira. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
