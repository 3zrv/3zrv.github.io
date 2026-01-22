import { motion, useMotionValue, useTransform } from 'motion/react';
import { useRef } from 'react';

const images = [
  { id: 1, title: 'QUANTUM UI', color: 'from-red-500 to-red-900', rotation: -5 },
  { id: 2, title: 'NEURAL CANVAS', color: 'from-cyan-400 to-blue-600', rotation: 3 },
  { id: 3, title: 'VOID STACK', color: 'from-orange-400 to-red-600', rotation: -3 },
  { id: 4, title: 'CIPHER MESH', color: 'from-pink-400 to-purple-600', rotation: 5 },
];

function DraggableCard({ title, color, rotation, index }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      dragElastic={0.1}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        rotate: rotation,
        zIndex: 10 - index,
      }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      className="absolute cursor-grab active:cursor-grabbing"
      initial={{ x: index * 30, y: index * 30 }}
    >
      <div
        className={`w-72 h-96 bg-gradient-to-br ${color} rounded-lg shadow-2xl p-8 flex items-end`}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div>
          <h3
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h3>
          <div className="text-white/60 font-mono text-sm">Drag me around →</div>
        </div>
      </div>
    </motion.div>
  );
}

export function DraggableGallery() {
  return (
    <section className="min-h-screen bg-zinc-950 py-32 relative overflow-hidden">
      <div className="absolute top-12 left-12 text-red-600 font-mono text-sm tracking-widest">
        [03] INTERACTIVE GALLERY
      </div>

      <div className="text-center mb-20">
        <motion.h2
          className="text-7xl font-bold text-white mb-4 tracking-tighter"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          DRAG & EXPLORE
        </motion.h2>
        <p className="text-red-600 font-mono">Physics-based interaction</p>
      </div>

      <div className="relative h-[600px] flex items-center justify-center">
        {images.map((image, index) => (
          <DraggableCard key={image.id} {...image} index={index} />
        ))}
      </div>

      <div className="text-center mt-20">
        <p className="text-gray-500 font-mono text-sm">
          Use your mouse to drag the cards • Experience the physics
        </p>
      </div>
    </section>
  );
}
