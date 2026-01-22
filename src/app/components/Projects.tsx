import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const experiences = [
  {
    id: 1,
    role: 'SENIOR SOFTWARE ENGINEER',
    company: 'Yassir',
    period: 'Oct 2024–Jan 2026',
    description:
      'Leading backend driver account domain across mobility services, Cut API response times from 800ms → 270ms',
    skills: ['DDD', 'Node.js', 'Kubernetes', 'GCP', 'Leadership'],
  },
  {
    id: 2,
    role: 'SOFTWARE ENGINEER',
    company: 'Thndr',
    period: 'Apr–Oct 2024',
    description:
      'Built core product features from scratch. Implemented real-time collaboration tools and optimized performance across the platform.',
    skills: ['Node.js', 'PostgreSQL', 'AWS', '.Net', 'SQL Server'],
  },
  {
    id: 3,
    role: 'STAFF SOFTWARE ENGINEER',
    company: 'Kashier',
    period: '2022 - 2024',
    description:
      'Delivered SSO feature enabling a Marriott partnership, Migrated infrastructure from AWS to on-prem OpenShift, Scaled engineering from 1 squad (3 engineers) to 4 squads (19 engineers)',
    skills: ['Node.js', 'Payments', 'Kubernetes', 'Leadership'],
  },
  {
    id: 4,
    role: 'FULL STACK',
    company: 'Earlier roles',
    period: '2016 - 2021',
    description:
      'Full-stack engineering at various agencies plus a security specialist stint at BBI Consultancy.',
    skills: ['.NET', 'PHP', 'Containerization', 'Security'],
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const lineHeight = useTransform(timelineProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="min-h-screen bg-black py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #dc2626 1px, transparent 1px),
              linear-gradient(to bottom, #dc2626 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Section label */}
      <motion.div
        className="absolute top-12 left-6 sm:left-12 text-red-600 font-mono text-sm tracking-widest flex items-center gap-2"
        style={{ opacity }}
      >
        <motion.div
          className="w-2 h-2 bg-red-600"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        [02] CAREER PATH
      </motion.div>

      <motion.div className="px-4 sm:px-6 lg:px-12 relative z-10" style={{ opacity, scale }}>
        {/* Section title */}
        <div className="mb-16 sm:mb-24">
          <motion.h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter overflow-hidden"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              EXPERIENCE
            </motion.div>
          </motion.h2>

          <motion.div
            className="h-1 bg-red-600 mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Animated timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gray-800 sm:-translate-x-px">
            <motion.div className="w-full bg-red-600 origin-top" style={{ height: lineHeight }} />
          </div>

          {/* Experience entries */}
          <div className="space-y-12 sm:space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  className={`relative flex items-center ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-4 sm:left-1/2 w-4 h-4 -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className="w-full h-full bg-black border-2 border-red-600 rotate-45"
                      whileHover={{ scale: 1.5, borderColor: '#fff' }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-red-600 rotate-45 opacity-50"
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>

                  {/* Content card */}
                  <div
                    className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isLeft ? 'sm:pr-12' : 'sm:pl-12'}`}
                  >
                    <motion.div
                      className="group relative border border-gray-800 bg-black p-6 sm:p-8 hover:border-red-600 transition-all duration-500"
                      whileHover={{ y: -5 }}
                    >
                      {/* Hover glow effect */}
                      <motion.div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Period badge */}
                      <motion.div
                        className="inline-block px-3 py-1 bg-red-600/10 border border-red-600/30 text-red-600 font-mono text-xs tracking-wider mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        {exp.period}
                      </motion.div>

                      {/* Role */}
                      <h3
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {exp.role}
                      </h3>

                      {/* Company */}
                      <p className="text-red-600 font-mono text-sm mb-4">@ {exp.company}</p>

                      {/* Description */}
                      <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <motion.span
                            key={skill}
                            className="px-3 py-1 bg-gray-900 text-gray-300 font-mono text-xs border border-gray-800 hover:border-red-600 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>

                      {/* Index number */}
                      <div
                        className="absolute bottom-4 right-4 text-6xl sm:text-7xl font-bold opacity-5 select-none"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden sm:block w-1/2" />
                </motion.div>
              );
            })}
          </div>

          {/* Timeline end marker */}
          <motion.div
            className="absolute left-4 sm:left-1/2 -bottom-4 w-3 h-3 -translate-x-1/2 bg-red-600 rotate-45"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
