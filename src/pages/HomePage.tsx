import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import ProfessionalPath from "../components/ProfessionalPath";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import { scrollToTarget } from "../lib/smoothScroll";

function HomePage() {
  const location = useLocation();

  // Arriving from another page via a menu link (e.g. "Percurso").
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const timer = setTimeout(() => scrollToTarget(target), 250);
    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <Hero />
      <AboutMe />
      <ProfessionalPath />
      <Testimonials />
      <Services />
    </>
  );
}

export default HomePage;
