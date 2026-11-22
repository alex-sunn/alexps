import type { ThemeMode } from '../types/portfolio';

export const ASCII_RAMP = ' .:-=+*#%0$@/|' as const;

const LIGHT_STRUCTURAL_RAMP = ['#eeede9', '#e5e4df', '#dad9d3', '#cecdc6', '#c2c0b8'] as const;
const LIGHT_ACCENT_RAMP = ['#f4ead8', '#ecdcc0', '#e3cba3', '#d9b985', '#cfa768'] as const;

const DARK_STRUCTURAL_RAMP = ['#141413', '#1c1b19', '#252421', '#2f2e2a', '#3b3a35'] as const;
const DARK_ACCENT_RAMP = ['#261a0b', '#36250f', '#4a3214', '#61421a', '#785220'] as const;

export interface AsciiCellSample {
  char: string;
  color: string;
}

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * Maps a normalized luminance [0, 1] and accent mask [0, 1] to an ASCII glyph
 * and ethereal mist tone in Light Mode or subtle obsidian shadow tone in Dark Mode.
 */
export function mapPixelToAsciiCell(
  luminance: number,
  accentMask: number,
  assemblyProgress = 1,
  cellSeed = 0,
  theme: ThemeMode = 'light',
): AsciiCellSample {
  const lum = clamp01(luminance);
  const accent = clamp01(accentMask);
  const progress = clamp01(assemblyProgress);
  const seed = clamp01(cellSeed);

  const structuralPalette = theme === 'dark' ? DARK_STRUCTURAL_RAMP : LIGHT_STRUCTURAL_RAMP;
  const accentPalette = theme === 'dark' ? DARK_ACCENT_RAMP : LIGHT_ACCENT_RAMP;

  if (lum < 0.04) {
    return { char: ' ', color: structuralPalette[0] };
  }

  if (progress < 1) {
    const threshold = seed * 0.85;
    if (progress < threshold) {
      return { char: ' ', color: structuralPalette[0] };
    }
    if (progress < threshold + 0.14) {
      const shimmerIndex = Math.min(
        ASCII_RAMP.length - 1,
        Math.max(1, Math.floor(seed * (ASCII_RAMP.length - 1))),
      );
      return {
        char: ASCII_RAMP[shimmerIndex],
        color: accent >= 0.35 ? accentPalette[2] : structuralPalette[2],
      };
    }
  }

  const rampIndex = Math.min(
    ASCII_RAMP.length - 1,
    Math.max(1, Math.round(lum * (ASCII_RAMP.length - 1))),
  );
  const palette = accent >= 0.35 ? accentPalette : structuralPalette;
  const colorIndex = Math.min(
    palette.length - 1,
    Math.floor(lum * palette.length),
  );

  return {
    char: ASCII_RAMP[rampIndex],
    color: palette[colorIndex],
  };
}
