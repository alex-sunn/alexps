import type { ThemeMode } from '../types/portfolio';

export const CLICK_GLYPH_SEQUENCE = ['$', '*', '+', '/', ':', '.'] as const;

const LIGHT_COLORS = ['#b8620a', '#2b2a28', '#6c6f78', '#b8620a', '#424340'] as const;
const DARK_COLORS = ['#f5a623', '#c8c6c0', '#ffe4a0', '#f2f1ee', '#f5a623'] as const;

export interface ClickBurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ageMs: number;
  lifeMs: number;
  color: string;
  glyphIndex: number;
  isCenter: boolean;
}

export interface ParticleVisual {
  char: string;
  alpha: number;
}

/**
 * Creates 8 compact ASCII micro-glyph particles (1 center spark + 7 radial glyphs)
 * themed to Light Mode (burnt amber & graphite) or Dark Mode (warm gold & silver).
 */
export function createClickBurstParticles(
  x: number,
  y: number,
  theme: ThemeMode,
  seedOffset = 0,
): ClickBurstParticle[] {
  const palette = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const particles: ClickBurstParticle[] = [
    {
      x,
      y,
      vx: 0,
      vy: 0,
      ageMs: 0,
      lifeMs: 240,
      color: palette[0],
      glyphIndex: 2,
      isCenter: true,
    },
  ];

  const radialCount = 7;
  for (let i = 0; i < radialCount; i++) {
    const pseudo = Math.abs(Math.sin((seedOffset + 1) * 12.9898 + i * 78.233));
    const frac = pseudo - Math.floor(pseudo);
    const angle = (i / radialCount) * Math.PI * 2 + (frac - 0.5) * 0.42;
    const speed = 65 + frac * 40;
    const lifeMs = 360 + Math.round(frac * 120);

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      ageMs: 0,
      lifeMs,
      color: palette[i % palette.length],
      glyphIndex: i % 3,
      isCenter: false,
    });
  }

  return particles;
}

/**
 * Advances all particles by `dtMs` with exponential velocity drag and filters expired items.
 */
export function stepClickBurstParticles(
  particles: readonly ClickBurstParticle[],
  dtMs: number,
): ClickBurstParticle[] {
  if (particles.length === 0 || dtMs <= 0) {
    return particles.slice();
  }

  const dtSec = Math.min(dtMs, 50) / 1000;
  const drag = Math.exp(-dtSec * 6.5);
  const next: ClickBurstParticle[] = [];

  for (const p of particles) {
    const nextAge = p.ageMs + dtMs;
    if (nextAge >= p.lifeMs) continue;

    next.push({
      x: p.x + p.vx * dtSec,
      y: p.y + p.vy * dtSec,
      vx: p.vx * drag,
      vy: p.vy * drag,
      ageMs: nextAge,
      lifeMs: p.lifeMs,
      color: p.color,
      glyphIndex: p.glyphIndex,
      isCenter: p.isCenter,
    });
  }

  return next;
}

/**
 * Computes the decaying ASCII character and ease-out opacity for a particle's current age.
 */
export function getParticleVisual(particle: ClickBurstParticle): ParticleVisual {
  const ratio = Math.min(1, Math.max(0, particle.ageMs / Math.max(1, particle.lifeMs)));
  const alpha = Math.pow(1 - ratio, 1.45);

  if (particle.isCenter) {
    return {
      char: ratio < 0.55 ? '+' : '.',
      alpha,
    };
  }

  const seqIndex = Math.min(
    CLICK_GLYPH_SEQUENCE.length - 1,
    Math.floor(ratio * (CLICK_GLYPH_SEQUENCE.length - 1)) +
      (ratio < 0.25 ? particle.glyphIndex % 2 : 0),
  );

  return {
    char: CLICK_GLYPH_SEQUENCE[seqIndex],
    alpha,
  };
}
