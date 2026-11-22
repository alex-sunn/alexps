import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { mapPixelToAsciiCell } from './asciiMapper';
import { createPresetSceneGroups } from './proceduralGeometries';
import type { ScenePreset, ThemeMode } from '../types/portfolio';

interface AsciiSceneCanvasProps {
  activePreset: ScenePreset;
  theme: ThemeMode;
}

const CELL_W = 7;
const CELL_H = 11;
const ASSEMBLY_MS = 650;

interface FallbackPoint {
  x: number;
  y: number;
  z: number;
  accent: number;
}

function generateFallbackShape(preset: ScenePreset): FallbackPoint[] {
  const pts: FallbackPoint[] = [];

  if (preset === 'agent-lattice') {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const isAccent =
            Math.abs(x) + Math.abs(y) + Math.abs(z) === 3 ||
            (x === 0 && y === 0 && z === 0);
          pts.push({ x: x * 0.9, y: y * 0.9, z: z * 0.9, accent: isAccent ? 1 : 0 });
        }
      }
    }
    return pts;
  }

  if (preset === 'skyline-spire') {
    for (let i = 0; i < 6; i++) {
      const baseX = (i - 2.5) * 0.55;
      const height = 0.6 + ((i % 3) + 1) * 0.55;
      for (let h = 0; h <= 8; h++) {
        const y = -1.2 + (h / 8) * height;
        pts.push({ x: baseX, y, z: i % 2 === 0 ? 0.3 : -0.3, accent: h >= 7 ? 1 : 0 });
      }
    }
    return pts;
  }

  for (let i = 0; i < 72; i++) {
    const theta = (i / 72) * Math.PI * 2;
    pts.push({
      x: Math.cos(theta) * 1.85,
      y: Math.sin(theta * 2) * 0.55,
      z: Math.sin(theta) * 1.85,
      accent: 1,
    });
  }
  for (let lat = -3; lat <= 3; lat++) {
    const phi = (lat / 3.5) * (Math.PI / 2);
    const ringR = Math.cos(phi) * 1.15;
    const count = Math.max(6, Math.round(ringR * 16));
    for (let j = 0; j < count; j++) {
      const a = (j / count) * Math.PI * 2;
      pts.push({
        x: Math.cos(a) * ringR,
        y: Math.sin(phi) * 1.15,
        z: Math.sin(a) * ringR,
        accent: preset === 'apex-beacon' && Math.abs(lat) <= 1 ? 1 : 0,
      });
    }
  }
  return pts;
}

export function AsciiSceneCanvas({ activePreset, theme }: AsciiSceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activePresetRef = useRef<ScenePreset>(activePreset);
  const themeRef = useRef<ThemeMode>(theme);

  useEffect(() => {
    activePresetRef.current = activePreset;
  }, [activePreset]);

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

    let width = window.innerWidth || 1280;
    let height = window.innerHeight || 800;
    let cols = Math.max(36, Math.min(200, Math.floor(width / CELL_W)));
    let rows = Math.max(22, Math.min(92, Math.floor(height / CELL_H)));

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mountTime = performance.now();

    const syncCanvasSize = () => {
      width = window.innerWidth || 1280;
      height = window.innerHeight || 800;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(36, Math.min(200, Math.floor(width / CELL_W)));
      rows = Math.max(22, Math.min(92, Math.floor(height / CELL_H)));
    };
    syncCanvasSize();

    let renderer: THREE.WebGLRenderer | null = null;
    let renderTarget: THREE.WebGLRenderTarget | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let groups: Record<ScenePreset, THREE.Group> | null = null;
    let pixelBuffer = new Uint8Array(cols * rows * 4);

    try {
      const glCanvas = document.createElement('canvas');
      renderer = new THREE.WebGLRenderer({
        canvas: glCanvas,
        antialias: false,
        alpha: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(cols, rows, false);
      renderTarget = new THREE.WebGLRenderTarget(cols, rows, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
      });

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(44, cols / rows, 0.1, 50);
      camera.position.set(0, 0.05, 4.45);

      groups = createPresetSceneGroups();
      const baseScale = width >= 1050 ? 1.32 : 0.95;
      (Object.keys(groups) as ScenePreset[]).forEach((key) => {
        const g = groups![key];
        const isActive = key === activePresetRef.current;
        g.visible = isActive;
        g.scale.setScalar(isActive ? baseScale : 0.01);
        scene!.add(g);
      });
    } catch {
      renderer = null;
      renderTarget = null;
    }

    const handleResize = () => {
      syncCanvasSize();
      if (renderer && renderTarget && camera) {
        renderer.setSize(cols, rows, false);
        renderTarget.setSize(cols, rows);
        camera.aspect = cols / rows;
        camera.updateProjectionMatrix();
        pixelBuffer = new Uint8Array(cols * rows * 4);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (width <= 0 || height <= 0) return;
      pointer.targetX = (e.clientX / width - 0.5) * 2;
      pointer.targetY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let frameId = 0;
    let lastDrawnPreset: ScenePreset = activePresetRef.current;
    let fallbackPoints = generateFallbackShape(lastDrawnPreset);
    const initialScale = width >= 1050 ? 1.32 : 0.95;
    const scaleState: Record<ScenePreset, number> = {
      'capital-core': activePresetRef.current === 'capital-core' ? initialScale : 0,
      'agent-lattice': activePresetRef.current === 'agent-lattice' ? initialScale : 0,
      'skyline-spire': activePresetRef.current === 'skyline-spire' ? initialScale : 0,
      'apex-beacon': activePresetRef.current === 'apex-beacon' ? initialScale : 0,
    };

    const drawAsciiGrid = (now: number) => {
      if (document.hidden) {
        frameId = requestAnimationFrame(drawAsciiGrid);
        return;
      }

      const elapsedSinceMount = now - mountTime;
      const assemblyProgress = prefersReducedMotion
        ? 1
        : Math.min(1, elapsedSinceMount / ASSEMBLY_MS);
      const t = prefersReducedMotion ? 0.4 : now * 0.001;

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      ctx.clearRect(0, 0, width, height);
      ctx.font = '400 9px "Geist Mono", ui-monospace, monospace';
      ctx.textBaseline = 'top';

      const targetPreset = activePresetRef.current;
      const currentTheme = themeRef.current;
      const desiredScale = width >= 1050 ? 1.32 : 0.95;
      const offsetX = width >= 1050 ? 0.85 : 0;

      if (renderer && renderTarget && scene && camera && groups) {
        (Object.keys(groups) as ScenePreset[]).forEach((key) => {
          const g = groups![key];
          const targetScale = key === targetPreset ? desiredScale : 0;
          scaleState[key] += (targetScale - scaleState[key]) * 0.14;

          if (scaleState[key] < 0.02) {
            g.visible = false;
            return;
          }

          g.visible = true;
          g.scale.setScalar(scaleState[key]);
          g.position.x = offsetX;
          g.rotation.y = t * 0.28 + pointer.x * 0.4;
          g.rotation.x = Math.sin(t * 0.42) * 0.14 + pointer.y * 0.24;
        });

        renderer.setRenderTarget(renderTarget);
        renderer.clear();
        renderer.render(scene, camera);
        renderer.readRenderTargetPixels(renderTarget, 0, 0, cols, rows, pixelBuffer);
        renderer.setRenderTarget(null);

        const cellDx = width / cols;
        const cellDy = height / rows;

        for (let row = 0; row < rows; row++) {
          const flippedRow = rows - 1 - row;
          for (let col = 0; col < cols; col++) {
            const idx = (flippedRow * cols + col) * 4;
            const lum = pixelBuffer[idx] / 255;
            if (lum < 0.04) continue;

            const accent = pixelBuffer[idx + 2] / 255;
            const seed = ((col * 37 + row * 17) % 97) / 97;
            const { char, color } = mapPixelToAsciiCell(
              lum,
              accent,
              assemblyProgress,
              seed,
              currentTheme,
            );
            if (char === ' ') continue;

            ctx.fillStyle = color;
            ctx.fillText(char, col * cellDx, row * cellDy);
          }
        }
      } else {
        if (lastDrawnPreset !== targetPreset) {
          lastDrawnPreset = targetPreset;
          fallbackPoints = generateFallbackShape(targetPreset);
        }

        const cosY = Math.cos(t * 0.28 + pointer.x * 0.4);
        const sinY = Math.sin(t * 0.28 + pointer.x * 0.4);
        const cosX = Math.cos(0.25 + pointer.y * 0.22);
        const sinX = Math.sin(0.25 + pointer.y * 0.22);

        const centerX = width * (width >= 1050 ? 0.68 : 0.5);
        const centerY = height * 0.5;
        const scale = Math.min(width, height) * 0.24;

        fallbackPoints.forEach((pt, index) => {
          const rx = pt.x * cosY - pt.z * sinY;
          const rz = pt.x * sinY + pt.z * cosY;
          const ry = pt.y * cosX - rz * sinX;
          const depthZ = pt.y * sinX + rz * cosX;

          const perspective = 4 / (4.8 - depthZ);
          const screenX = centerX + rx * scale * perspective;
          const screenY = centerY - ry * scale * perspective;
          const lum = Math.min(1, Math.max(0.25, 0.6 + depthZ * 0.22));
          const seed = (index % 31) / 31;

          const { char, color } = mapPixelToAsciiCell(
            lum,
            pt.accent,
            assemblyProgress,
            seed,
            currentTheme,
          );
          if (char === ' ') return;

          ctx.fillStyle = color;
          ctx.fillText(char, screenX, screenY);
        });
      }

      frameId = requestAnimationFrame(drawAsciiGrid);
    };

    frameId = requestAnimationFrame(drawAsciiGrid);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (renderTarget) renderTarget.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      id="gl-backdrop"
      ref={canvasRef}
      className="ascii-backdrop"
      aria-hidden="true"
    />
  );
}
