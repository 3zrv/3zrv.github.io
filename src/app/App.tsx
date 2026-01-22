import { useState, useEffect } from 'react';
import { Preloader } from '@/app/components/Preloader';
import { CustomCursor } from '@/app/components/CustomCursor';
import { NoiseOverlay } from '@/app/components/NoiseOverlay';
import { InteractiveGrid } from '@/app/components/InteractiveGrid';
import { ScrollProgress } from '@/app/components/ScrollProgress';
import { EasterEgg } from '@/app/components/EasterEgg';
import { Hero } from '@/app/components/Hero';
import { Projects } from '@/app/components/Projects';
import { About } from '@/app/components/About';
import { Contact } from '@/app/components/Contact';
import { useSmoothScroll } from '@/app/hooks/useSmoothScroll';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useSmoothScroll();

  return (
    <>
      {isLoading && (
        <Preloader
          onComplete={() => {
            window.scrollTo(0, 0);
            setIsLoading(false);
          }}
        />
      )}

      <div className="bg-black min-h-screen overflow-x-hidden" style={{ cursor: 'none' }}>
        <CustomCursor />
        <NoiseOverlay />
        <InteractiveGrid />
        <ScrollProgress />
        <EasterEgg />

        <Hero />
        <Projects />
        <About />
        <Contact />
      </div>
    </>
  );
}
