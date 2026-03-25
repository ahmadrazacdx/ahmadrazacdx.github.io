import { useEffect, useRef } from "react";

export function MouseHover() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const interactiveRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const pulse = pulseRef.current;
    if (!dot || !ringEl || !pulse) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarsePointer || prefersReducedMotion) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouse.current = { x: cx, y: cy };
    ring.current = { x: cx, y: cy };

    let pointerVisible = false;

    const setTransforms = () => {
      dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${interactiveRef.current ? 1.25 : 1})`;
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerVisible = true;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dot.style.opacity !== "1") {
        dot.style.opacity = "1";
        ringEl.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      interactiveRef.current = Boolean(
        target?.closest("a, button, [role='button'], input, textarea, select, summary, .cursor-magnetic")
      );

      dot.style.background = interactiveRef.current ? "rgba(192,132,252,0.95)" : "rgba(148,163,255,0.95)";
      ringEl.style.borderColor = interactiveRef.current ? "rgba(192,132,252,0.55)" : "rgba(148,163,255,0.45)";
      ringEl.style.boxShadow = interactiveRef.current
        ? "0 0 34px rgba(192,132,252,0.28), inset 0 0 18px rgba(192,132,252,0.12)"
        : "0 0 26px rgba(148,163,255,0.20), inset 0 0 14px rgba(148,163,255,0.08)";

      setTransforms();
    };

    const onPointerDown = () => {
      pulse.style.transition = "none";
      pulse.style.opacity = "0.35";
      pulse.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(0.4)`;

      requestAnimationFrame(() => {
        pulse.style.transition = "transform 420ms ease, opacity 420ms ease";
        pulse.style.opacity = "0";
        pulse.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(1.8)`;
      });
    };

    const onPointerLeave = () => {
      if (!pointerVisible) return;
      dot.style.opacity = "0";
      ringEl.style.opacity = "0";
    };

    const onPointerEnter = () => {
      if (!pointerVisible) return;
      dot.style.opacity = "1";
      ringEl.style.opacity = "1";
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.22;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.22;

      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${interactiveRef.current ? 1.25 : 1})`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("pointerenter", onPointerEnter, { passive: true });

    setTransforms();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerenter", onPointerEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={pulseRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: "34px",
          height: "34px",
          borderRadius: "9999px",
          border: "1px solid rgba(192,132,252,0.45)",
          opacity: 0,
          mixBlendMode: "screen",
          transform: "translate3d(0,0,0) translate(-50%, -50%) scale(0.4)",
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: "30px",
          height: "30px",
          borderRadius: "9999px",
          border: "1px solid rgba(148,163,255,0.45)",
          boxShadow: "0 0 26px rgba(148,163,255,0.20), inset 0 0 14px rgba(148,163,255,0.08)",
          opacity: 0,
          transition: "opacity 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
          mixBlendMode: "screen",
          transform: "translate3d(0,0,0) translate(-50%, -50%)",
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: "8px",
          height: "8px",
          borderRadius: "9999px",
          background: "rgba(148,163,255,0.95)",
          boxShadow: "0 0 20px rgba(148,163,255,0.45)",
          opacity: 0,
          transition: "opacity 150ms ease, background 180ms ease",
          mixBlendMode: "screen",
          transform: "translate3d(0,0,0) translate(-50%, -50%)",
        }}
      />
    </>
  );
}
