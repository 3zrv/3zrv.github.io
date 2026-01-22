import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const codeSnippets = [
  `const buildFuture = () => {
  return conviction + rawTalent;
};`,
  `function breakConventions() {
  while (statusQuo) {
    innovate();
  }
}`,
  `class BrutalistDesign {
  constructor() {
    this.unnecessary = null;
    this.purpose = 100;
  }
}`,
];

export function AsciiSignature() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const text = codeSnippets[currentSnippet];
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
          setDisplayedText('');
        }, 3000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentSnippet]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="py-20 sm:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          className="border border-red-600 p-6 sm:p-12 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-gray-500 font-mono text-sm">terminal.tsx</span>
          </div>

          {/* Code display */}
          <div className="font-mono text-sm sm:text-base text-red-600">
            <pre className="whitespace-pre-wrap break-words">
              {displayedText}
              {cursorVisible && <span className="animate-pulse">█</span>}
            </pre>
          </div>

          {/* Bottom metadata */}
          <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between gap-2 text-gray-600 font-mono text-xs">
            <div>
              Line {displayedText.split('\n').length} | Col{' '}
              {displayedText.split('\n').pop()?.length || 0}
            </div>
            <div>UTF-8 | JavaScript | React</div>
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="text-white/10 text-6xl sm:text-8xl md:text-9xl font-bold select-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            3ZRV
          </div>
          <div className="text-red-600 font-mono text-sm mt-4 tracking-[0.5em]">SIGNATURE</div>
        </motion.div>
      </div>
    </section>
  );
}
