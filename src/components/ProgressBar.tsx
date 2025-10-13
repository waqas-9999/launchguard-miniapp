import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  /** 0�100 */
  value: number;
  /** ms for the width transition (only when value changes) */
  durationMs?: number;
  /** className for outer container */
  className?: string;
  /** height of the bar, e.g., "12px" */
  height?: string;
  /** accessible label */
  ariaLabel?: string;
};

const clamp01 = (n: number) => Math.max(0, Math.min(100, n));

/**
 * CPU-friendly progress:
 * - NO requestAnimationFrame loop
 * - Single CSS transition on width when value changes
 * - Starts only when visible (IntersectionObserver)
 * - Respects prefers-reduced-motion
 */
export default function ProgressBar({
  value,
  durationMs = 700,
  className = "",
  height = "12px",
  ariaLabel = "Progress",
}: Props) {
  const [inView, setInView] = useState(false);
  const [internal, setInternal] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const reduceMotion = useMemo(
    () =>
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) ||
      false,
    []
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return; // don't animate offscreen
    const next = clamp01(value);
    if (reduceMotion) {
      setInternal(next);
      return;
    }
    // Defer one tick so CSS transition can kick in after mount/visibility change
    const id = window.setTimeout(() => setInternal(next), 16);
    return () => clearTimeout(id);
  }, [value, inView, reduceMotion]);

  return (
    <div
      ref={rootRef}
      className={`relative w-full rounded-full bg-white/10 overflow-hidden ${className}`}
      style={{ height }}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(internal)}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${internal}%`,
          transition: reduceMotion
            ? "none"
            : `width ${durationMs}ms cubic-bezier(.2,.8,.2,1)`,
          willChange: "width",
          // Keep it GPU-friendly without heavy filters/shadows
          background:
            "linear-gradient(90deg, #efb81c 0%, rgba(239,184,28,0.92) 50%, rgba(239,184,28,0.82) 100%)",
        }}
      />
    </div>
  );
}
