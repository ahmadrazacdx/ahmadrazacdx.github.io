import { useEffect, useRef } from "react";

type SmokeParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
};

export function MouseHover() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const prevMousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const maxParticles = isCoarsePointer ? 180 : 360;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnSmoke = (count: number, x: number, y: number) => {
      const list = particlesRef.current;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.4 + 0.1;
        const velocityInfluenceX = mouseVelocity.current.x * 0.045;
        const velocityInfluenceY = mouseVelocity.current.y * 0.045;
        const maxLife = Math.random() * 32 + 26;

        list.push({
          x,
          y,
          vx: Math.cos(angle) * speed + velocityInfluenceX,
          vy: Math.sin(angle) * speed + velocityInfluenceY - 0.25,
          size: Math.random() * 28 + 18,
          life: maxLife,
          maxLife,
          hue: 205 + Math.random() * 70,
        });
      }

      if (list.length > maxParticles) {
        list.splice(0, list.length - maxParticles);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      prevMousePos.current = mousePos.current;
      mousePos.current = { x: e.clientX, y: e.clientY };
      mouseVelocity.current = {
        x: mousePos.current.x - prevMousePos.current.x,
        y: mousePos.current.y - prevMousePos.current.y,
      };

      const speed = Math.hypot(mouseVelocity.current.x, mouseVelocity.current.y);
      const spawnCount = Math.max(3, Math.min(12, Math.floor(speed * 0.35) + 3));
      spawnSmoke(spawnCount, e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      spawnSmoke(20, e.clientX, e.clientY);
    };

    const animate = (time: number) => {
      const lastTime = lastFrameTimeRef.current || time;
      const delta = Math.min((time - lastTime) / 16.67, 2);
      lastFrameTimeRef.current = time;

      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.life -= delta;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vx *= 0.965;
        particle.vy = particle.vy * 0.965 - 0.008 * delta;

        const lifeRatio = particle.life / particle.maxLife;
        const radius = particle.size * (1 + (1 - lifeRatio) * 0.7);
        const alpha = 0.18 * lifeRatio;
        const coreAlpha = 0.24 * lifeRatio;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          radius * 0.08,
          particle.x,
          particle.y,
          radius,
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 94%, 66%, ${coreAlpha})`);
        gradient.addColorStop(0.35, `hsla(${particle.hue + 12}, 90%, 58%, ${alpha})`);
        gradient.addColorStop(1, "hsla(210, 100%, 60%, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Keep subtle motion alive even when pointer is idle.
      if (particles.length < 6) {
        spawnSmoke(1, mousePos.current.x, mousePos.current.y);
      }

      mouseVelocity.current.x *= 0.88;
      mouseVelocity.current.y *= 0.88;

      rafRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(rafRef.current);
      particlesRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        mixBlendMode: "screen",
        opacity: 0.85,
      }}
    />
  );
}
