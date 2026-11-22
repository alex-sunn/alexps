import { useEffect, useRef } from 'react';
import {
  createClickBurstParticles,
  getParticleVisual,
  stepClickBurstParticles,
  type ClickBurstParticle,
} from './clickBurst';
import type { ThemeMode } from '../types/portfolio';

interface AsciiClickBurstProps {
  theme: ThemeMode;
}

const MAX_ACTIVE_PARTICLES = 80;

export function AsciiClickBurst({ theme }: AsciiClickBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<ThemeMode>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = window.innerWidth || 1280;
    let height = window.innerHeight || 800;

    const syncSize = () => {
      width = window.innerWidth || 1280;
      height = window.innerHeight || 800;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    syncSize();

    let particles: ClickBurstParticle[] = [];
    let rafId: number | null = null;
    let lastTime = 0;
    let burstSeed = 0;

    const renderFrame = (now: number) => {
      const dt = lastTime === 0 ? 16 : Math.min(48, Math.max(1, now - lastTime));
      lastTime = now;

      particles = stepClickBurstParticles(particles, dt);
      ctx.clearRect(0, 0, width, height);

      if (particles.length === 0) {
        rafId = null;
        lastTime = 0;
        ctx.globalAlpha = 1;
        return;
      }

      ctx.font = '500 10px "Geist Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (const particle of particles) {
        const { char, alpha } = getParticleVisual(particle);
        if (alpha <= 0.02) continue;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.fillText(char, particle.x, particle.y);
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(renderFrame);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button > 0) return;

      burstSeed += 1;
      const spawned = createClickBurstParticles(
        event.clientX,
        event.clientY,
        themeRef.current,
        burstSeed,
      );
      particles = particles.concat(spawned).slice(-MAX_ACTIVE_PARTICLES);

      if (rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    window.addEventListener('resize', syncSize);
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      id="click-fx"
      ref={canvasRef}
      className="click-fx-canvas"
      aria-hidden="true"
    />
  );
}
