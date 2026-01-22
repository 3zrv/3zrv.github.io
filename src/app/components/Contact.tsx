import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/3zrv', handle: '@3zrv' },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/3zrv',
    handle: '/in/3zrv',
  },
];

export function Contact() {

  return (
    <section id="contact" className="min-h-screen bg-black py-20 sm:py-32 relative overflow-hidden">
      {/* Section label */}
      <div className="absolute top-12 left-6 sm:left-12 text-red-600 font-mono text-sm tracking-widest">
        [04] CONTACT
      </div>

      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Email CTA */}
          <motion.div
            className="mb-20 sm:mb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tighter break-all leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              LET'S
            </h2>
            <motion.a
              href="mailto:mohamed@3zrv.com"
              className="group inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-red-600 tracking-tighter break-all leading-none relative"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              whileHover={{ x: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              BUILD
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left column - Find me online */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-mono">
                FIND ME ONLINE
              </h3>

              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 sm:p-6 border border-gray-800 hover:border-red-600 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center gap-4">
                      <link.icon className="w-6 h-6 text-red-600" />
                      <div>
                        <div className="text-white font-mono font-bold">{link.label}</div>
                        <div className="text-gray-500 font-mono text-sm">{link.handle}</div>
                      </div>
                    </div>
                    <motion.span
                      className="text-red-600 font-mono"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                ))}

                {/* Email card */}
                <motion.a
                  href="mailto:k@3zrv.com"
                  className="group flex items-center justify-between p-4 sm:p-6 bg-red-600 text-black"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ x: 10, backgroundColor: '#a3e635' }}
                >
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6" />
                    <div>
                      <div className="font-mono font-bold">Email</div>
                      <div className="font-mono text-sm opacity-80">k@3zrv.com</div>
                    </div>
                  </div>
                  <motion.span
                    className="font-mono"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>
            </motion.div>

            {/* Right column - Availability status */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-mono">
                AVAILABILITY
              </h3>

              <motion.div
                className="p-8 border border-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-4 h-4 bg-red-600 rounded-full"
                    animate={{
                      opacity: [1, 0.4, 1],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="text-red-600 font-mono text-xl tracking-wider font-bold">
                    AVAILABLE FOR WORK
                  </span>
                </div>
                <p className="text-gray-400 font-mono text-base leading-relaxed">
                  Currently accepting select projects and consulting opportunities.
                </p>
                <p className="text-gray-500 font-mono text-sm mt-4">
                  Specialized in backend systems, infrastructure, and team scaling.
                </p>
              </motion.div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div
                  className="p-4 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="text-3xl font-bold text-white font-mono">8+</div>
                  <div className="text-gray-500 font-mono text-sm">Years Experience</div>
                </motion.div>
                <motion.div
                  className="p-4 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="text-3xl font-bold text-white font-mono">Cairo</div>
                  <div className="text-gray-500 font-mono text-sm">Based in Egypt</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer
            className="mt-20 sm:mt-32 pt-12 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-600 font-mono text-xs sm:text-sm">
              © 2026 MOHAMED SAYED (3ZRV). ALL RIGHTS RESERVED.
            </div>
            <div className="text-gray-600 font-mono text-xs sm:text-sm">MADE IN EGYPT</div>
          </motion.footer>
        </div>
      </div>
    </section>
  );
}
