import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function GlitchText({ text, className = '', as = 'span' }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);

      const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
      let iterations = 0;

      const glitchTimer = setInterval(() => {
        setGlitchedText((prev) =>
          prev
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return text[index];
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('')
        );

        iterations += 1 / 3;

        if (iterations >= text.length) {
          clearInterval(glitchTimer);
          setGlitchedText(text);
          setIsGlitching(false);
        }
      }, 30);

      return () => clearInterval(glitchTimer);
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  const Component = motion[as];

  return (
    <Component
      className={className}
      animate={{
        textShadow: isGlitching
          ? ['0 0 0 transparent', '2px 2px 0 #dc2626, -2px -2px 0 #ec4899', '0 0 0 transparent']
          : '0 0 0 transparent',
      }}
      transition={{ duration: 0.1, repeat: isGlitching ? 3 : 0 }}
    >
      {glitchedText}
    </Component>
  );
}
