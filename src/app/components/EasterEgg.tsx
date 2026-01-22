import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function EasterEgg() {
  const [input, setInput] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((prev) => [...prev, e.key].slice(-KONAMI_CODE.length));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (input.join(',') === KONAMI_CODE.join(',')) {
      setActivated(true);
      setTimeout(() => setActivated(false), 5000);
    }
  }, [input]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Matrix rain effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-red-600 font-mono text-xs"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: window.innerHeight + 20,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  delay: Math.random() * 0.5,
                  ease: 'linear',
                }}
              >
                {String.fromCharCode(0x30a0 + Math.random() * 96)}
              </motion.div>
            ))}
          </div>

          {/* Secret message */}
          <motion.div
            className="relative z-10 bg-black border-4 border-red-600 p-12 max-w-2xl mx-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2
                className="text-6xl font-bold text-red-600 mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                UNLOCKED
              </h2>
              <p className="text-white font-mono text-lg mb-6">
                You found the secret. You're one of the real ones.
              </p>
              <div className="text-red-600 font-mono text-sm">
                <p>Access granted to exclusive content.</p>
                <p className="mt-2">Check your console...</p>
              </div>

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 border-2 border-red-600"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
