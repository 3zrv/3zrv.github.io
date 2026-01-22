import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 40);
    const rows = Math.floor(canvas.height / 40);
    const points: { x: number; y: number; baseX: number; baseY: number }[] = [];

    // Create grid points
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * 40;
        const y = j * 40;
        points.push({ x, y, baseX: x, baseY: y });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      points.forEach((point) => {
        const dx = mousePos.current.x - point.x;
        const dy = mousePos.current.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          point.x += (dx / dist) * force * 20;
          point.y += (dy / dist) * force * 20;
        } else {
          point.x += (point.baseX - point.x) * 0.1;
          point.y += (point.baseY - point.y) * 0.1;
        }

        const opacity = dist < maxDist ? 1 - dist / maxDist : 0.1;
        ctx.fillStyle = `rgba(220, 38, 38, ${opacity})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        points.forEach((otherPoint) => {
          const dx2 = point.x - otherPoint.x;
          const dy2 = point.y - otherPoint.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 80) {
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.1 * (1 - dist2 / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}
