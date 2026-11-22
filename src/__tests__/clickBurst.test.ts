import { describe, expect, it } from 'vitest';
import {
  CLICK_GLYPH_SEQUENCE,
  createClickBurstParticles,
  getParticleVisual,
  stepClickBurstParticles,
} from '../canvas/clickBurst';

describe('clickBurst ASCII particle engine', () => {
  it('spawns 8 theme-matched particles on click in Light and Dark modes', () => {
    const lightBurst = createClickBurstParticles(200, 150, 'light', 1);
    const darkBurst = createClickBurstParticles(200, 150, 'dark', 1);

    expect(lightBurst).toHaveLength(8);
    expect(darkBurst).toHaveLength(8);

    expect(lightBurst[0].isCenter).toBe(true);
    expect(lightBurst[0].color).toBe('#b8620a');
    expect(lightBurst.some((p) => p.color === '#2b2a28')).toBe(true);

    expect(darkBurst[0].color).toBe('#f5a623');
    expect(darkBurst.some((p) => p.color === '#c8c6c0')).toBe(true);
  });

  it('advances positions immutably, decays glyph density, and removes expired particles', () => {
    const initial = createClickBurstParticles(100, 100, 'light', 3);
    const radialBefore = initial[1];

    const stepped = stepClickBurstParticles(initial, 40);
    const radialAfter = stepped[1];

    // Original array remains untouched
    expect(initial[1].ageMs).toBe(0);
    expect(radialAfter.ageMs).toBe(40);
    expect(radialAfter.x !== radialBefore.x || radialAfter.y !== radialBefore.y).toBe(true);
    expect(Math.hypot(radialAfter.vx, radialAfter.vy)).toBeLessThan(
      Math.hypot(radialBefore.vx, radialBefore.vy),
    );

    const late = stepClickBurstParticles(initial, 260);
    // Center spark (lifeMs 240) expires while radial particles (360..480ms) stay alive
    expect(late.every((p) => !p.isCenter)).toBe(true);

    const visual = getParticleVisual(late[0]);
    expect(CLICK_GLYPH_SEQUENCE.includes(visual.char as (typeof CLICK_GLYPH_SEQUENCE)[number])).toBe(true);
    expect(visual.alpha).toBeGreaterThan(0);
    expect(visual.alpha).toBeLessThan(1);

    const expired = stepClickBurstParticles(initial, 600);
    expect(expired).toHaveLength(0);
  });
});
