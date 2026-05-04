import { useCallback } from 'react';
import { useLenis, useScrollTo } from '../hooks/useLenis';
import BackgroundAnimation from '../components/BackgroundAnimation';
import CustomCursor from '../components/CustomCursor';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import SelectedWork from '../sections/SelectedWork';
import RotatingTextLoop from '../sections/RotatingTextLoop';
import AIWorkflow from '../sections/AIWorkflow';
import Experience from '../sections/Experience';
import TechStack from '../sections/TechStack';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Home() {
  const lenisRef = useLenis();
  const scrollTo = useScrollTo(lenisRef);

  const handleNavigate = useCallback(
    (target: string) => {
      scrollTo(target, { duration: 1.5 });
    },
    [scrollTo]
  );

  return (
    <div className="relative">
      {/* Background Animation */}
      <BackgroundAnimation />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Content Layer */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Hero onNavigate={handleNavigate} />
        <SelectedWork />
        <RotatingTextLoop />
        <AIWorkflow />
        <Experience />
        <TechStack />
        <Contact />
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
