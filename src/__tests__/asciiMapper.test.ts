import { describe, expect, it } from 'vitest';
import { ASCII_RAMP, mapPixelToAsciiCell } from '../canvas/asciiMapper';
import { computeChartGeometry } from '../components/InteractiveChart';
import { RESUME_DATA } from '../data/resumeData';

describe('asciiMapper (Ultra-Ethereal Light & Subtle Dark Backdrops)', () => {
  it('returns blank space for near-zero luminance', () => {
    const cell = mapPixelToAsciiCell(0.01, 0, 1, 0.5, 'light');
    expect(cell.char).toBe(' ');
  });

  it('maps light mode pixels to ultra-ethereal mist silver and pale champagne inks', () => {
    const structural = mapPixelToAsciiCell(1, 0, 1, 0.2, 'light');
    const accent = mapPixelToAsciiCell(0.95, 1, 1, 0.2, 'light');

    expect(structural.char).toBe(ASCII_RAMP[ASCII_RAMP.length - 1]);
    expect(structural.color).toBe('#c2c0b8');
    expect(accent.color).toBe('#cfa768');
  });

  it('maps dark mode pixels to subtle obsidian-slate and warm shadow inks', () => {
    const structural = mapPixelToAsciiCell(0.95, 0, 1, 0.2, 'dark');
    const accent = mapPixelToAsciiCell(0.95, 1, 1, 0.2, 'dark');

    expect(structural.color).toBe('#3b3a35');
    expect(accent.color).toBe('#785220');
  });

  it('dissolves cells during partial assembly progress and reveals at progress=1', () => {
    const early = mapPixelToAsciiCell(0.8, 1, 0.1, 0.9, 'light');
    const complete = mapPixelToAsciiCell(0.8, 1, 1, 0.9, 'light');
    expect(early.char).toBe(' ');
    expect(complete.char).not.toBe(' ');
  });
});

describe('computeChartGeometry', () => {
  it('computes bounded coordinates for every point in timeline series', () => {
    const points = RESUME_DATA.chartSeries.timeline.points;
    const geom = computeChartGeometry(points, 560, 170);
    expect(geom.coords).toHaveLength(points.length);
    for (const coord of geom.coords) {
      expect(coord.x).toBeGreaterThan(0);
      expect(coord.x).toBeLessThan(560);
      expect(coord.y).toBeGreaterThanOrEqual(geom.padTop);
      expect(coord.y).toBeLessThanOrEqual(geom.padTop + geom.plotH);
    }
  });
});
