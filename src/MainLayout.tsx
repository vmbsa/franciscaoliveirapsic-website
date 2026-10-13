import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { IntroContext, hasSeenIntro, markIntroSeen } from "./lib/intro";
import {
  lockScroll,
  scrollToTarget,
  startSmoothScroll,
  stopSmoothScroll,
} from "./lib/smoothScroll";

function MainLayout() {
  const { pathname } = useLocation();
  const [introDone, setIntroDone] = useState(hasSeenIntro);

  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  useEffect(() => {
    scrollToTarget(0, true);
  }, [pathname]);

  useEffect(() => {
    if (introDone) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [introDone]);

  const finishIntro = useCallback(() => {
    markIntroSeen();
    setIntroDone(true);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={introDone}>
        <AnimatePresence>
          {!introDone && <Preloader key="intro" onFinish={finishIntro} />}
        </AnimatePresence>

        <Cursor />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </IntroContext.Provider>
    </MotionConfig>
  );
}

export default MainLayout;
