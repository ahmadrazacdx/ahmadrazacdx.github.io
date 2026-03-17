import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
  opacity: number;
  color: string;
  age: number;
  lifetime: number;
  turbX: number;
}

const COLORS = [
  "139,92,246",  // violet
  "99,102,241",  // indigo
  "59,130,246",  // blue
  "168,85,247",  // purple
];

export function MouseGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const prevMouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (x: number, y: number, speed: number) => {
      const intensity = Math.min(speed / 30, 1);
      // Slow move = 1 wisp, fast move = up to 3
      const count = intensity < 0.2 ? 1 : intensity < 0.6 ? 2 : 3;

      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const ox = (Math.random() - 0.5) * 10;
        const oy = (Math.random() - 0.5) * 10;

        particlesRef.current.push({
          x: x + ox,
          y: y + oy,
          vx: (Math.random() - 0.5) * 0.5,
          // Gentle upward drift
          vy: -(0.25 + Math.random() * 0.5 + intensity * 0.4),
          radius: 2 + Math.random() * 3,
          // Small target — fine wisp, not a blob
          targetRadius: 12 + intensity * 20 + Math.random() * 14,
          // Keep opacity low — tinted not white
          opacity: 0.12 + intensity * 0.14,
          color,
          age: 0,
          lifetime: 2 + Math.random() * 1.5,
          turbX: (Math.random() - 0.5) * 0.04,
        });
      }

      if (particlesRef.current.length > 120) {
        particlesRef.current.splice(0, particlesRef.current.length - 120);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevMouse.current = { x: e.clientX, y: e.clientY };
      spawn(e.clientX, e.clientY, speed);
    };
    window.addEventListener("mousemove", onMouseMove);

    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.age += dt;
        if (p.age >= p.lifetime) return false;

        const t = p.age / p.lifetime;

        p.vx += p.turbX;
        p.vy *= 0.993;
        p.vx *= 0.990;
        p.x += p.vx;
        p.y += p.vy;

        // Expand radius
        const growFrac = Math.min(t * 2, 1);
        const r = p.radius + (p.targetRadius - p.radius) * (1 - Math.pow(1 - growFrac, 2));

        // Fade: quick in, slow out
        const fadeIn  = Math.min(t * 8, 1);
        const fadeOut = Math.pow(1 - t, 1.2);
        const alpha   = p.opacity * fadeIn * fadeOut;

        if (alpha < 0.003 || r < 0.5) return false;

        // Soft radial gradient — no additive blend, stays tinted not white
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0,   `rgba(${p.color}, ${Math.min(alpha, 1)})`);
        g.addColorStop(0.5, `rgba(${p.color}, ${Math.min(alpha * 0.4, 1)})`);
        g.addColorStop(1,   `rgba(${p.color}, 0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
