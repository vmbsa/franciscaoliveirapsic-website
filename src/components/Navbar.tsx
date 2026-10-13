import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import LogoMark from "./LogoMark";
import { useActiveSection } from "../lib/hooks";
import { BOOKING_URL, NAV_LINKS } from "../lib/site";
import { lockScroll, scrollToTarget } from "../lib/smoothScroll";

const SPY_IDS = ["inicio", ...NAV_LINKS.map((link) => link.id)];

const ease = [0.22, 1, 0.36, 1] as const;

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const active = useActiveSection(SPY_IDS, pathname);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight - 90));

  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [isOpen]);

  // Transparent and light while over the hero photo; a frosted bar everywhere else.
  const overHero = pathname === "/" && !pastHero && !isOpen;

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (document.getElementById(id)) {
      lockScroll(false);
      scrollToTarget(`#${id}`);
    } else {
      navigate("/", { state: { scrollTo: `#${id}` } });
    }
  };

  const goHome = (e: React.MouseEvent) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      lockScroll(false);
      scrollToTarget(0);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,color] duration-500 ${
        overHero
          ? "border-transparent bg-transparent text-sand"
          : "border-sand/60 bg-white/80 text-espresso shadow-[0_10px_40px_-24px_rgba(80,49,29,0.4)] backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-6">
        {/* Logo */}
        <Link to="/" onClick={goHome} className="flex min-w-0 items-center gap-3">
          <LogoMark className="h-11 w-11 shrink-0" strokeWidth={3} />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="whitespace-nowrap text-[0.78rem] font-semibold tracking-[0.26em] sm:text-sm">
              FRANCISCA OLIVEIRA
            </span>
            <span
              className={`mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.34em] transition-colors duration-500 ${
                overHero ? "text-sand/75" : "text-caramel"
              }`}
            >
              Psicóloga Clínica
            </span>
          </span>
        </Link>

        {/* Desktop links — the pill follows the section in view */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const current = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={goTo(link.id)}
                  aria-current={current ? "true" : undefined}
                  className={`relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    overHero
                      ? "text-sand/85 hover:text-white"
                      : current
                        ? "text-espresso"
                        : "text-mocha hover:text-espresso"
                  }`}
                >
                  {current && !overHero && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-linen"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`button-primary hidden px-6 py-3 lg:inline-flex ${
            overHero ? "bg-sand text-espresso hover:bg-white hover:text-espresso" : ""
          }`}
        >
          <CalendarHeart className="h-4 w-4" strokeWidth={1.75} />
          Agende uma sessão
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors lg:hidden ${
            overHero ? "border-sand/40 hover:bg-white/10" : "border-sand hover:bg-linen"
          }`}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-[4px]"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-[4px]"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-x-0 bottom-0 top-20 -z-10 bg-espresso/25 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 top-full border-b border-sand/60 bg-white lg:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
            >
              <ul className="px-5 pt-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.id} className="border-b border-sand/50">
                    <a
                      href={`#${link.id}`}
                      onClick={goTo(link.id)}
                      className={`block py-4 text-xl font-semibold ${
                        active === link.id ? "text-espresso" : "text-mocha"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="px-5 pb-6 pt-5">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="button-primary w-full py-4"
                >
                  <CalendarHeart className="h-4 w-4" strokeWidth={1.75} />
                  Agende uma sessão
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
