import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { GlitchText } from '@/app/components/GlitchText';

export function Hero() {
  const [time, setTime] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const roles = ['TECH IC', 'עֲזַרְיָה', 'BUILDER'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-red-600"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220, 38, 38, 0.03) 2px, rgba(220, 38, 38, 0.03) 4px)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 4px'],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div className="relative z-10 w-full max-w-7xl" style={{ y, opacity }}>
        {/* Top bar with glitch effect */}
        <motion.div
          className="absolute top-8 left-0 right-0 flex justify-between items-start text-red-600 font-mono text-xs sm:text-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-red-600 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>30.0472261, 31.2314059</span>
            </div>
            <div className="mt-1">Cairo, Egypt</div>
          </div>
          <div className="text-right">
            <div>{time.toLocaleTimeString('en-US', { hour12: false })}</div>
            <div className="mt-1">
              {time.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="text-center pt-20 sm:pt-24 lg:pt-0">
          {/* Name with 3D effect */}
          <div className="perspective-1000">
            <motion.div
              initial={{ opacity: 0, z: -100, rotateX: 90 }}
              animate={{ opacity: 1, z: 0, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <GlitchText
                text="MOHAMED"
                as="h1"
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[12rem] xl:text-[14rem] font-bold text-white leading-none tracking-tighter"
                style={{ fontFamily: "'Space Grotesk', sans-serif" } as any}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, z: -100, rotateX: 90 }}
              animate={{ opacity: 1, z: 0, rotateX: 0 }}
              transition={{ delay: 0.9, duration: 1, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="-mt-4 sm:-mt-6 md:-mt-8 lg:-mt-16"
            >
              <GlitchText
                text="SAYED"
                as="h1"
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[12rem] xl:text-[14rem] font-bold text-white leading-none tracking-tighter"
                style={{ fontFamily: "'Space Grotesk', sans-serif" } as any}
              />
            </motion.div>
          </div>

          {/* Subtitle - rotating roles with enhanced animation */}
          <motion.div
            className="mt-8 sm:mt-12 md:mt-16 text-red-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono tracking-[0.3em] overflow-hidden h-10 sm:h-12 md:h-14 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole}
                initial={{ y: 50, opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -50, opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {roles[currentRole]}
              </motion.div>
            </AnimatePresence>

            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-red-600"
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Descriptor with stagger effect */}
          <motion.p
            className="mt-8 sm:mt-12 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {/* Removed intro text */}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            <motion.a
              href="#experience"
              className="px-8 py-4 bg-red-600 text-black font-mono font-bold tracking-wider hover:bg-red-700 transition-colors relative overflow-hidden group inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">WORK</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 border-red-600 text-red-600 font-mono font-bold tracking-wider hover:bg-red-600 hover:text-black transition-all relative overflow-hidden group inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">GET IN TOUCH</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator with enhanced animation */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-red-600 to-transparent"
              animate={{ scaleY: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-red-600"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-red-600"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      />
    </section>
  );
}
