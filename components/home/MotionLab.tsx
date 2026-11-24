"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type Mode = "servo" | "network";

type Node = { name: string; short: string };

const MODES: Record<Mode, { index: string; label: string; describe: string }> = {
  servo: {
    index: "01",
    label: "Servo core",
    describe:
      "Servo core: an eight-blade mechanical iris inside a ticked ring, opening and closing slowly.",
  },
  network: {
    index: "02",
    label: "Project signals",
    describe:
      "Project signals: seven projects arranged around the initials PM, with pulses travelling along each connection.",
  },
};

const TAU = Math.PI * 2;
// Design space the drawing is authored in; scaled to fit the canvas.
const DESIGN_W = 460;
const DESIGN_H = 290;

const C = {
  accent: "#00ce99",
  accentHi: "#3ff0c0",
  accentLo: "#00a87d",
  ink: "#101418",
  ring: "#2c4a42",
  ringHi: "#5a8b7c",
  tick: "#3e5a51",
  tickHi: "#9ec0b3",
  label: "#c5e8db",
  caption: "#aac4ba",
  leader: "#557e72",
  grid: "#2e3b38",
  link: "#2f5a4c",
};

type Point = [number, number];

function polar(r: number, a: number): Point {
  return [r * Math.cos(a), r * Math.sin(a)];
}

export default function MotionLab({ nodes }: { nodes: Node[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>("servo");
  // null = follow the visitor's motion preference until they press the button.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  // Reduced motion starts on a static frame.
  const paused = userPaused ?? reducedMotion;

  // Live values read by the render loop without re-subscribing.
  const modeRef = useRef<Mode>(mode);
  const pausedRef = useRef(paused);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    modeRef.current = mode;
    pausedRef.current = paused;
    syncRef.current();
  }, [mode, paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      ctx = null;
    }
    if (!ctx) {
      setFailed(true);
      return;
    }
    const g = ctx;

    const monoFamily =
      getComputedStyle(canvas).fontFamily || "ui-monospace, monospace";

    let t = 0;
    let last = 0;
    let frame = 0;
    let inView = true;

    /* ---------------- drawing helpers (design units) ---------------- */

    function path(points: Point[], close = false) {
      g.beginPath();
      points.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
      if (close) g.closePath();
    }

    function stroke(points: Point[], color: string, width = 1) {
      path(points);
      g.strokeStyle = color;
      g.lineWidth = width;
      g.stroke();
    }

    function ring(r: number, color: string, width = 1, start = 0, end = TAU) {
      g.beginPath();
      g.arc(0, 0, r, start, end);
      g.strokeStyle = color;
      g.lineWidth = width;
      g.stroke();
    }

    function dot(x: number, y: number, r: number, color: string) {
      g.beginPath();
      g.arc(x, y, r, 0, TAU);
      g.fillStyle = color;
      g.fill();
    }

    function text(
      s: string,
      x: number,
      y: number,
      color: string,
      size: number,
      align: CanvasTextAlign = "left"
    ) {
      g.font = `500 ${size}px ${monoFamily}`;
      g.textAlign = align;
      g.textBaseline = "middle";
      g.fillStyle = color;
      g.fillText(s, x, y);
    }

    /* ---------------- scenes ---------------- */

    function servo(scale: number, halfW: number) {
      const spin = t * 0.16;
      const breathe = Math.sin(t * 0.8);
      const R = 92; // iris disc radius
      const caption = Math.max(10, 9.5 / scale);

      // crosshair and diagonal ticks
      for (let i = 0; i < 4; i++) {
        const a = (i * TAU) / 4;
        stroke([polar(118, a), polar(140, a)], C.ringHi, 1.2);
        const d = a + TAU / 8;
        stroke([polar(124, d), polar(134, d)], C.leader, 1);
      }

      ring(128, C.ring, 1);
      ring(110, C.ringHi, 1.6);

      // tick ring
      for (let i = 0; i < 72; i++) {
        const a = (i * TAU) / 72 - spin * 0.35;
        const major = i % 6 === 0;
        stroke(
          [polar(106, a), polar(major ? 96 : 100, a)],
          major ? C.tickHi : C.tick,
          major ? 1.2 : 1
        );
      }

      // rotating guide arcs
      for (let i = 0; i < 3; i++) {
        const s = -spin + (i * TAU) / 3;
        ring(119, "#37a98a", 2, s, s + 0.76);
      }

      // iris disc
      const gradient = g.createRadialGradient(0, 0, 10, 0, 0, R);
      gradient.addColorStop(0, C.accentHi);
      gradient.addColorStop(1, C.accent);
      g.beginPath();
      g.arc(0, 0, R, 0, TAU);
      g.fillStyle = gradient;
      g.fill();

      // aperture: octagon whose edges extend outward as blade seams
      const rA = 30 + 9 * breathe;
      const rot = spin + 0.25 * breathe;
      const verts: Point[] = [];
      for (let i = 0; i < 8; i++) verts.push(polar(rA, rot + (i * TAU) / 8));

      g.save();
      g.beginPath();
      g.arc(0, 0, R, 0, TAU);
      g.clip();

      for (let i = 0; i < 8; i++) {
        const [x0, y0] = verts[(i + 7) % 8];
        const [x1, y1] = verts[i];
        const dx = x1 - x0;
        const dy = y1 - y0;
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len;
        const uy = dy / len;
        const far: Point = [x1 + ux * R * 2, y1 + uy * R * 2];
        stroke([[x1, y1], far], C.ink, 2.6);
        stroke([[x1 + uy * 2.2, y1 - ux * 2.2], [far[0] + uy * 2.2, far[1] - ux * 2.2]], "rgba(190,255,232,0.35)", 0.8);
      }
      g.restore();

      path(verts, true);
      g.fillStyle = C.ink;
      g.fill();
      g.strokeStyle = C.accentLo;
      g.lineWidth = 1.2;
      g.stroke();

      ring(R, C.accentLo, 1.5);
      ring(7 + 1.5 * Math.sin(t * 1.5), C.accent, 1.5);

      // callouts, kept inside the visible width on narrow canvases
      g.font = `500 ${caption}px ${monoFamily}`;
      const edge = halfW - 8;
      const irisW = g.measureText("IRIS / 08").width;
      const ringW = g.measureText("SERVO RING").width;
      const irisX = Math.min(170, edge - irisW);
      const ringX = Math.max(-170, -edge + ringW);
      stroke([[78, -84], [104, -110], [Math.max(110, irisX - 2), -110]], C.leader);
      text("IRIS / 08", irisX, -110, C.caption, caption);
      stroke([[-80, 84], [-104, 110], [Math.min(-110, ringX + 2), 110]], C.leader);
      text("SERVO RING", ringX, 110, C.caption, caption, "right");
    }

    function network(scale: number) {
      const compact = scale < 0.85;
      const size = Math.max(10, 9.5 / scale);
      const rx = compact ? 150 : 162;
      const ry = 104;
      const n = nodes.length;

      for (let i = 0; i < n; i++) {
        const a = (i * TAU) / n - Math.PI / 2;
        const x = rx * Math.cos(a);
        const y = ry * Math.sin(a);
        const elbow: Point = [x * 0.52, y * 0.18];

        stroke([[0, 0], elbow, [x, y]], C.link, 1.4);

        const u = (t * 0.32 + i / n) % 1;
        const from: Point = u < 0.5 ? [0, 0] : elbow;
        const to: Point = u < 0.5 ? elbow : [x, y];
        const v = u < 0.5 ? u * 2 : (u - 0.5) * 2;
        dot(from[0] + (to[0] - from[0]) * v, from[1] + (to[1] - from[1]) * v, 2.4, C.accentHi);

        dot(x, y, 5, "#171a20");
        g.beginPath();
        g.arc(x, y, 5, 0, TAU);
        g.strokeStyle = C.accent;
        g.lineWidth = 1.6;
        g.stroke();

        const above = y < -60;
        const label = compact ? nodes[i].short : nodes[i].name;
        text(label, x, y + (above ? -16 : 18), C.label, size, "center");
      }

      dot(0, 0, 20, "#14251f");
      ring(20, C.accent, 1.5);
      ring(26 + 2 * Math.sin(t * 2), "rgba(0,206,153,0.35)", 1);
      text("PM", 0, 1, C.accentHi, Math.max(12, 11 / scale), "center");
    }

    /* ---------------- frame ---------------- */

    function draw() {
      const box = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(box.width * dpr));
      const h = Math.max(1, Math.round(box.height * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }

      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, w, h);

      // dot grid in CSS-pixel space that fades out toward the edges so the
      // drawing blends into the page instead of sitting in a box
      const step = 16 * dpr;
      const size = Math.max(1, Math.round(dpr));
      const reach = Math.min(w, h) * 0.62;
      for (let x = step / 2; x < w; x += step) {
        for (let y = step / 2; y < h; y += step) {
          const fade = 1 - Math.hypot(x - w / 2, y - h / 2) / reach;
          if (fade <= 0) continue;
          g.fillStyle = `rgba(70, 110, 98, ${(0.75 * fade).toFixed(3)})`;
          g.fillRect(x, y, size, size);
        }
      }

      const k = Math.min(w / DESIGN_W, h / DESIGN_H);
      g.setTransform(k, 0, 0, k, w / 2, h / 2);
      const cssScale = k / dpr;
      if (modeRef.current === "servo") servo(cssScale, w / 2 / k);
      else network(cssScale);
    }

    function tick(now: number) {
      frame = 0;
      if (last) t += Math.min((now - last) / 1000, 0.05);
      last = now;
      draw();
      if (shouldRun()) frame = requestAnimationFrame(tick);
    }

    function shouldRun() {
      return !pausedRef.current && !document.hidden && inView;
    }

    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      draw();
      if (shouldRun()) frame = requestAnimationFrame(tick);
    }

    syncRef.current = sync;

    const resize = new ResizeObserver(() => {
      if (!frame) draw();
    });
    resize.observe(canvas);

    const visibility = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0 }
    );
    visibility.observe(stage);

    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", sync);
      syncRef.current = () => {};
    };
  }, [nodes]);

  const current = MODES[mode];

  return (
    <div ref={stageRef} className="relative">
      {/* soft light behind the drawing, fading into the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%] bg-[radial-gradient(closest-side,rgba(0,206,153,0.16),rgba(0,206,153,0.05)_55%,transparent)]"
      />

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between font-mono text-[0.7rem] tracking-wide text-[#8f9a97] sm:text-xs">
          <span className="flex items-center gap-2 text-[#c6d3ce]">
            <span aria-hidden="true" className="chip-dot h-1.5 w-1.5 rounded-full bg-[#00ce99]" />
            Motion lab
          </span>
          <span aria-live="polite">
            {current.index} / {current.label}
          </span>
        </div>

        {failed ? (
          <StaticIris label={current.describe} />
        ) : (
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={current.describe}
            className="block aspect-[1.3] w-full font-mono sm:aspect-[1.4]"
          />
        )}
      </div>

      <div
        role="group"
        aria-label="Motion lab controls"
        className="relative mx-auto mt-1 flex w-full max-w-[30rem] items-stretch gap-1 rounded-full border border-[#34383f] bg-[#1b1c23]/80 p-1 font-mono text-[0.72rem] backdrop-blur sm:text-[0.78rem]"
      >
        {(Object.keys(MODES) as Mode[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            className="min-h-10 flex-1 rounded-full px-2 leading-tight text-[#aab3b1] transition-colors hover:text-[#f1f4ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ce99] aria-pressed:bg-[#00ce99] aria-pressed:font-semibold aria-pressed:text-[#08231a]"
          >
            {MODES[key].label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setUserPaused(!paused)}
          aria-label={paused ? "Play motion" : "Pause motion"}
          className="flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-full px-3 text-[#aab3b1] transition-colors hover:text-[#f1f4ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ce99]"
        >
          <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
          <span className="hidden sm:inline">{paused ? "Play" : "Pause"}</span>
        </button>
      </div>
    </div>
  );
}

/** Lightweight static fallback when a 2D canvas context is unavailable. */
function StaticIris({ label }: { label: string }) {
  const blades = Array.from({ length: 8 }, (_, i) => {
    const a = (i * TAU) / 8;
    const [x1, y1] = polar(30, a);
    const [x2, y2] = polar(92, a + 0.9);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }).join("");

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`${-DESIGN_W / 2} ${-DESIGN_H / 2} ${DESIGN_W} ${DESIGN_H}`}
      className="block aspect-[1.3] w-full sm:aspect-[1.4]"
    >
      <circle r="128" fill="none" stroke={C.ring} />
      <circle r="110" fill="none" stroke={C.ringHi} strokeWidth="1.6" />
      <circle r="92" fill={C.accent} />
      <path d={blades} stroke={C.ink} strokeWidth="2.6" />
      <circle r="30" fill={C.ink} />
    </svg>
  );
}
