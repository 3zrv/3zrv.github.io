import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'flash' | 'text' | 'exit'>('flash');
  const [cipherText, setCipherText] = useState('XXXXXXXX');
  const [cipherText2, setCipherText2] = useState('XXXXX');

  const cipherChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  // Cipher text animation
  useEffect(() => {
    const cipherInterval = setInterval(() => {
      setCipherText(
        Array(8)
          .fill(0)
          .map(() => cipherChars[Math.floor(Math.random() * cipherChars.length)])
          .join('')
      );
      setCipherText2(
        Array(5)
          .fill(0)
          .map(() => cipherChars[Math.floor(Math.random() * cipherChars.length)])
          .join('')
      );
    }, 50);

    return () => clearInterval(cipherInterval);
  }, []);

  // Phase transitions
  useEffect(() => {
    // Flash phase duration - matches the pulsating animation
    const flashTimer = setTimeout(() => {
      setPhase('text');
    }, 1800);

    return () => clearTimeout(flashTimer);
  }, []);

  useEffect(() => {
    if (phase === 'text') {
      const exitTimer = setTimeout(() => {
        setPhase('exit');
      }, 1200);

      return () => clearTimeout(exitTimer);
    }

    if (phase === 'exit') {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 800);

      return () => clearTimeout(completeTimer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background cipher text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <motion.div
              className="text-[20vw] sm:text-[25vw] font-bold text-white/[0.03] tracking-tighter whitespace-nowrap"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {cipherText}
            </motion.div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden translate-y-[15vw]">
            <motion.div
              className="text-[20vw] sm:text-[25vw] font-bold text-white/[0.03] tracking-tighter whitespace-nowrap"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {cipherText2}
            </motion.div>
          </div>

          {/* Flash overlay - multiple pulsating flashes */}
          <motion.div
            className="absolute inset-0 bg-red-600"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 'flash' ? [0, 0.7, 0.2, 0.8, 0.1, 0.6, 0.15, 0.5, 0] : 0,
            }}
            transition={{
              duration: 1.8,
              ease: 'easeInOut',
              times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9, 1],
            }}
          />

          {/* Secondary red flash - offset timing */}
          <motion.div
            className="absolute inset-0 bg-red-500"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 'flash' ? [0, 0.4, 0.1, 0.5, 0.05, 0.3, 0] : 0,
            }}
            transition={{
              duration: 1.8,
              ease: 'easeOut',
              times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
            }}
          />

          {/* White accent flash - rapid pulses */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 'flash' ? [0, 0.3, 0.05, 0.25, 0.02, 0.15, 0] : 0,
            }}
            transition={{
              duration: 1.8,
              ease: 'easeInOut',
              times: [0, 0.12, 0.25, 0.4, 0.6, 0.8, 1],
            }}
          />

          {/* Main text container */}
          <div className="relative z-10 text-center">
            {/* Name - fades in after flash */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: phase === 'text' ? 1 : 0,
                scale: phase === 'text' ? 1 : 0.95,
              }}
              transition={{
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <h1
                className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-white tracking-tighter"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                MOHAMED
              </h1>
              <h1
                className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-white tracking-tighter -mt-4 sm:-mt-8 lg:-mt-16"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                SAYED
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-red-600 font-mono text-sm sm:text-base tracking-[0.3em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: phase === 'text' ? 1 : 0,
                y: phase === 'text' ? 0 : 20,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
            >
              TECH IC • BUILDER
            </motion.p>
          </div>

          {/* Scan line during flash */}
          {phase === 'flash' && (
            <motion.div
              className="absolute left-0 right-0 h-px bg-white/30"
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}

          {/* Corner brackets */}
          <motion.div
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-red-600/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: phase === 'text' ? 0.5 : 0, scale: phase === 'text' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-red-600/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: phase === 'text' ? 0.5 : 0, scale: phase === 'text' ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-red-600/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: phase === 'text' ? 0.5 : 0, scale: phase === 'text' ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-red-600/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: phase === 'text' ? 0.5 : 0, scale: phase === 'text' ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
