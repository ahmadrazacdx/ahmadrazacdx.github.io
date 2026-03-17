import { useEffect, useRef } from "react";

export function MouseGradient() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerpFactor = 0.08;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpFactor;

      if (spotlight) {
        spotlight.style.setProperty('--mouse-x', `${currentPos.current.x}px`);
        spotlight.style.setProperty('--mouse-y', `${currentPos.current.y}px`);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
          rgba(139, 92, 246, 0.15), 
          rgba(99, 102, 241, 0.08) 40%, 
          rgba(59, 130, 246, 0.04) 60%, 
          transparent)`,
      }}
    />
  );
}
