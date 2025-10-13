import { useEffect, useRef } from "react";

/**
 * Ultra-light background canvas with strict FPS/DPR caps and auto-pause.
 * - If VITE_ENABLE_FLUID=0 or user prefers-reduced-motion => static frame (near 0% CPU).
 * - No global mousemove relays. No heavy shaders.
 * - Explicitly loses WebGL context on unmount to free GPU.
 *
 * To toggle on/off:
 *   .env.production -> VITE_ENABLE_FLUID=0  (off in prod)
 *   .env.development -> VITE_ENABLE_FLUID=1 (on while testing)
 */

type Props = {
  fps?: number;    // default 24
  dprMax?: number; // default 1.5
};

const ENABLE_FLUID =
  (import.meta.env.VITE_ENABLE_FLUID ?? "1") !== "0";

export default function WebglFluidAnimation({ fps = 24, dprMax = 1.5 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // If disabled or reduced motion, draw one static frame and bail.
    if (!ENABLE_FLUID || prefersReduced) {
      const ctx = canvas.getContext("2d", {
        alpha: true,
        desynchronized: true,
      });
      if (ctx) {
        resizeCanvas(canvas, dprMax);
        drawStatic(ctx, canvas);
      }
      return;
    }

    // Try low-power WebGL; fall back to static if not available.
    const gl =
      (canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        preserveDrawingBuffer: false,
        desynchronized: true,
        powerPreference: "low-power",
      }) as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        preserveDrawingBuffer: false,
        desynchronized: true,
        powerPreference: "low-power",
      }) as WebGLRenderingContext | null);

    if (!gl) {
      const ctx = canvas.getContext("2d", {
        alpha: true,
        desynchronized: true,
      });
      if (ctx) {
        resizeCanvas(canvas, dprMax);
        drawStatic(ctx, canvas);
      }
      return;
    }

    let lastTime = 0;
    const frameInterval = 1000 / fps;

    const onResize = () => {
      resizeCanvas(canvas, dprMax);
      // @ts-ignore
      gl.viewport(0, 0, gl.drawingBufferWidth ?? canvas.width, gl.drawingBufferHeight ?? canvas.height);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      lastTime = performance.now();
      loop(lastTime);
    };

    const stop = () => {
      runningRef.current = false;
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const loop = (t: number) => {
      if (!runningRef.current) return;
      rafRef.current = requestAnimationFrame(loop);

      // FPS cap
      const delta = t - lastTime;
      if (delta < frameInterval) return;
      lastTime = t;

      // Very cheap "alive" background: animated clear color (no heavy shaders)
      renderCheap(gl, t);
    };

    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (!document.hidden) start();

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      // Explicitly free GPU
      // @ts-ignore
      const ext = gl.getExtension("WEBGL_lose_context");
      // @ts-ignore
      ext?.loseContext?.();
    };
  }, [fps, dprMax]);

  return (
    <div className="fixed inset-0 -z-10 h-full w-full opacity-70 pointer-events-none">
      <canvas
        id="webgl-fluid"
        ref={canvasRef}
        className="fixed inset-0 inline-block h-full w-full"
      />
    </div>
  );
}

/* ---------- helpers ---------- */

function resizeCanvas(canvas: HTMLCanvasElement, dprMax: number) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, dprMax);
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
}

function drawStatic(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.2)");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderCheap(gl: WebGLRenderingContext | WebGL2RenderingContext, t: number) {
  const s = Math.sin(t * 0.0004) * 0.03 + 0.05; // ~5�8% alpha
  gl.clearColor(0.0, 0.0, 0.0, Math.max(0.0, Math.min(0.15, 0.08 + s)));
  gl.clear(gl.COLOR_BUFFER_BIT);
}
