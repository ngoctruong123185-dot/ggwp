"use client";

import React, { useEffect, useRef } from "react";

/**
 * Cinematic hero background: a running track in perspective at stadium night.
 * Distance markers stream toward the viewer and a few glowing "runners" race
 * down the lanes. Scrolling briefly speeds the track up; the pointer leans the
 * vanishing point. Pauses off-screen and in background tabs; draws a single
 * still frame when the user prefers reduced motion. Pure 2D canvas, no assets.
 */

type RGB = [number, number, number];

interface Palette {
  blaze: RGB;
  violet: RGB;
  gold: RGB;
  lane: RGB;
  laneAlpha: number;
}

interface Runner {
  lane: number;
  z: number;
  len: number;
  pace: number;
  color: "blaze" | "violet" | "gold";
}

const LANES = 8;
const Z_NEAR = 1;
const Z_FAR = 34;
const MARKER_GAP = 2.4;

function readTriplet(name: string, fallback: RGB): RGB {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map(Number);
  return parts.length === 3 && parts.every((n) => !Number.isNaN(n)) ? (parts as RGB) : fallback;
}

function readPalette(): Palette {
  const alpha = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--lane-alpha"));
  return {
    blaze: readTriplet("--c-blue-500", [255, 106, 26]),
    violet: readTriplet("--c-violet-500", [142, 128, 255]),
    gold: readTriplet("--c-amber-500", [255, 194, 51]),
    lane: readTriplet("--lane", [255, 255, 255]),
    laneAlpha: Number.isNaN(alpha) ? 0.05 : alpha,
  };
}

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;

function makeRunner(seed: number, fresh = false): Runner {
  const colors: Runner["color"][] = ["blaze", "blaze", "violet", "gold"];
  return {
    lane: Math.floor(Math.random() * LANES),
    z: fresh ? 3 + Math.random() * (Z_FAR - 3) : Z_FAR + Math.random() * 14,
    len: 2.2 + Math.random() * 3.2,
    pace: 0.55 + Math.random() * 0.9,
    color: colors[(seed + Math.floor(Math.random() * 4)) % colors.length],
  };
}

export function TrackCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let palette = readPalette();
    let width = 0;
    let height = 0;
    let dpr = 1;

    let markerOffset = 0;
    let boost = 0;
    let lean = 0;
    let leanTarget = 0;
    let lastScrollY = window.scrollY;
    const runners: Runner[] = Array.from({ length: 6 }, (_, i) => makeRunner(i, true));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (!width || !height) return;

      const wide = width >= 1024;
      const horizon = height * (wide ? 0.42 : 0.5);
      const vx = width * (wide ? 0.6 : 0.5) + lean * width * 0.04;
      const halfBottom = width * (wide ? 0.6 : 0.95);
      const depth = height - horizon;

      const project = (u: number, z: number) => ({
        x: vx + (u * halfBottom) / z,
        y: horizon + depth / z,
      });

      // Track surface: tartan glow fading into the dark
      const surface = ctx.createLinearGradient(0, height, 0, horizon);
      surface.addColorStop(0, rgba(palette.blaze, 0.22));
      surface.addColorStop(0.55, rgba(palette.blaze, 0.06));
      surface.addColorStop(1, rgba(palette.blaze, 0));
      const bl = project(-1, Z_NEAR);
      const br = project(1, Z_NEAR);
      const tl = project(-1, Z_FAR);
      const tr = project(1, Z_FAR);
      ctx.beginPath();
      ctx.moveTo(bl.x, bl.y);
      ctx.lineTo(br.x, br.y);
      ctx.lineTo(tr.x, tr.y);
      ctx.lineTo(tl.x, tl.y);
      ctx.closePath();
      ctx.fillStyle = surface;
      ctx.fill();

      // Lane lines
      const laneStroke = ctx.createLinearGradient(0, height, 0, horizon);
      laneStroke.addColorStop(0, rgba(palette.lane, palette.laneAlpha * 7));
      laneStroke.addColorStop(1, rgba(palette.lane, 0));
      ctx.strokeStyle = laneStroke;
      ctx.lineWidth = 1.25;
      for (let i = 0; i <= LANES; i++) {
        const u = -1 + (2 * i) / LANES;
        const a = project(u, Z_NEAR);
        const b = project(u, Z_FAR);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Distance markers streaming toward the viewer
      const first = MARKER_GAP - (markerOffset % MARKER_GAP);
      for (let z = Z_NEAR + first; z < Z_FAR; z += MARKER_GAP) {
        const l = project(-1, z);
        const r = project(1, z);
        const fade = 1 - z / Z_FAR;
        ctx.strokeStyle = rgba(palette.lane, palette.laneAlpha * 4.5 * fade * fade);
        ctx.lineWidth = Math.max(0.6, 2.2 / z);
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(r.x, r.y);
        ctx.stroke();
      }

      // Runners: glowing streaks with a fading tail
      ctx.lineCap = "round";
      for (const r of runners) {
        const front = Math.max(Z_NEAR, r.z);
        const back = Math.min(Z_FAR, r.z + r.len);
        if (back <= front) continue;
        const u = -1 + (2 * r.lane + 1) / LANES;
        const p1 = project(u, front);
        const p2 = project(u, back);
        const color = palette[r.color];
        const nearness = 1 - front / Z_FAR;
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, rgba(color, 0.95 * nearness));
        grad.addColorStop(1, rgba(color, 0));
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1, 9 / front);
        ctx.shadowColor = rgba(color, 0.8 * nearness);
        ctx.shadowBlur = 18 * nearness;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // Horizon haze
      const haze = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 60);
      haze.addColorStop(0, rgba(palette.violet, 0));
      haze.addColorStop(0.5, rgba(palette.violet, 0.08));
      haze.addColorStop(1, rgba(palette.violet, 0));
      ctx.fillStyle = haze;
      ctx.fillRect(0, horizon - 40, width, 100);
    };

    let raf = 0;
    let last = performance.now();
    let running = false;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      boost *= Math.exp(-dt * 2.6);
      lean += (leanTarget - lean) * Math.min(1, dt * 3);
      const speed = 5.5 + boost;
      markerOffset += speed * dt;
      for (let i = 0; i < runners.length; i++) {
        const r = runners[i];
        r.z -= speed * r.pace * dt;
        if (r.z + r.len < Z_NEAR) runners[i] = makeRunner(i);
      }

      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(26, boost + Math.abs(y - lastScrollY) * 0.06);
      lastScrollY = y;
    };
    const onPointer = (e: PointerEvent) => {
      leanTarget = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
