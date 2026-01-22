import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Code2, Cpu, Globe } from 'lucide-react';
import { Terminal } from '@/app/components/Terminal';

const skills = [
  { icon: Code2, label: 'Infrastructure', level: 95 },
  { icon: Cpu, label: 'System Design', level: 99 },
  { icon: Globe, label: 'Backend Development', level: 96 },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen bg-zinc-950 py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #dc2626 1px, transparent 1px),
              linear-gradient(to bottom, #dc2626 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Section label */}
      <motion.div
        className="absolute top-12 left-6 sm:left-12 text-red-600 font-mono text-sm tracking-widest"
        style={{ opacity }}
      >
        [03] ABOUT
      </motion.div>

      <motion.div className="px-4 sm:px-6 lg:px-12 relative z-10" style={{ opacity }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left column - Interactive Terminal */}
            <motion.div style={{ y }} className="relative">
              <Terminal />
            </motion.div>

            {/* Right column - Content */}
            <div className="flex flex-col justify-center">
              <motion.h2
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                BUILDING
                <br />
                THE FUTURE
              </motion.h2>

              <motion.div
                className="space-y-6 text-gray-400 font-mono text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <p>
                  <span className="text-red-600">Ezra, Azariah (עֲזַרְיָה)</span> — helped by God. A
                  philosophy I live by: building with purpose, shipping with conviction.
                </p>

                <p>
                  I architect digital experiences that challenge conventions. Brutalism isn't just
                  an aesthetic — it's a rejection of unnecessary complexity. Every line of code
                  serves a purpose. Every pixel has intention.
                </p>

                <p>
                  From low-level performance optimization to high-level system architecture, I
                  operate across the full stack. But my true passion? Translating business needs to
                  a usable, <span className="text-white font-bold">raw</span> experience.
                </p>
              </motion.div>

              {/* Skills */}
              <motion.div
                className="mt-12 space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {skills.map((skill, index) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className="w-5 h-5 text-red-600" />
                        <span className="text-white font-mono text-sm">{skill.label}</span>
                      </div>
                      <span className="text-red-600 font-mono text-sm">{skill.level}%</span>
                    </div>
                    <motion.div
                      className="h-px bg-gray-800 overflow-hidden"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    >
                      <motion.div
                        className="h-full bg-red-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                      />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Marquee */}
          <motion.div
            className="mt-20 sm:mt-32 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex gap-8 text-6xl sm:text-8xl md:text-9xl font-bold text-white/5 whitespace-nowrap select-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            >
              <span>TECH IC</span>
              <span>•</span>
              <span>BUILDER</span>
              <span>•</span>
              <span>CREATOR</span>
              <span>•</span>
              <span>TECH IC</span>
              <span>•</span>
              <span>BUILDER</span>
              <span>•</span>
              <span>CREATOR</span>
              <span>•</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
