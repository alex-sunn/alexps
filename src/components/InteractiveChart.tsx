import { useEffect, useRef, useState } from 'react';
import type {
  ChartDataPoint,
  ChartRenderMode,
  ChartSeries,
  ThemeMode,
} from '../types/portfolio';

export interface ChartPointCoord {
  x: number;
  y: number;
  barHeight: number;
  point: ChartDataPoint;
}

export interface ChartGeometry {
  padLeft: number;
  padRight: number;
  padTop: number;
  padBottom: number;
  plotW: number;
  plotH: number;
  coords: ChartPointCoord[];
}

export function computeChartGeometry(
  points: readonly ChartDataPoint[],
  width: number,
  height: number,
): ChartGeometry {
  const padLeft = 14;
  const padRight = 14;
  const padTop = 16;
  const padBottom = 24;
  const plotW = Math.max(40, width - padLeft - padRight);
  const plotH = Math.max(40, height - padTop - padBottom);

  const values = points.map((p) => p.value);
  const minVal = Math.max(0, Math.min(...values) - 12);
  const maxVal = Math.max(100, ...values);
  const span = Math.max(1, maxVal - minVal);

  const coords: ChartPointCoord[] = points.map((point, index) => {
    const ratioX = points.length <= 1 ? 0.5 : index / (points.length - 1);
    const x =
      points.length <= 1
        ? padLeft + plotW * 0.5
        : padLeft + 18 + ratioX * Math.max(10, plotW - 36);
    const normY = (point.value - minVal) / span;
    const y = padTop + plotH - normY * plotH;
    const barHeight = Math.max(6, padTop + plotH - y);
    return { x, y, barHeight, point };
  });

  return { padLeft, padRight, padTop, padBottom, plotW, plotH, coords };
}

interface InteractiveChartProps {
  series: ChartSeries;
  mode: ChartRenderMode;
  theme: ThemeMode;
  onSelectSeries: (key: 'timeline' | 'benchmarks') => void;
  onSelectMode: (mode: ChartRenderMode) => void;
}

export function InteractiveChart({
  series,
  mode,
  theme,
  onSelectSeries,
  onSelectMode,
}: InteractiveChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activePoint =
    hoverIndex !== null && series.points[hoverIndex]
      ? series.points[hoverIndex]
      : series.points[series.points.length - 1];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth || 560;
    const height = canvas.clientHeight || 170;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);

    const isDark = theme === 'dark';
    const gridColor = isDark ? 'rgba(242, 241, 238, 0.08)' : 'rgba(17, 18, 17, 0.08)';
    const accent = isDark ? '#f5a623' : '#b8620a';
    const accentHi = isDark ? '#ffe4a0' : '#8f4704';
    const nodeDefault = isDark ? '#f2f1ee' : '#111211';
    const barInactiveFill = isDark ? 'rgba(200, 198, 192, 0.14)' : 'rgba(17, 18, 17, 0.08)';
    const barInactiveStroke = isDark ? '#c8c6c0' : '#6c6f78';
    const labelColor = isDark ? '#8a8882' : '#6c6f78';
    const gradTop = isDark ? 'rgba(245, 166, 35, 0.28)' : 'rgba(184, 98, 10, 0.20)';
    const gradBot = isDark ? 'rgba(245, 166, 35, 0.01)' : 'rgba(184, 98, 10, 0.01)';

    const geom = computeChartGeometry(series.points, width, height);
    const baselineY = geom.padTop + geom.plotH;

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const gy = geom.padTop + (geom.plotH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(geom.padLeft, gy);
      ctx.lineTo(width - geom.padRight, gy);
      ctx.stroke();
    }

    if (mode === 'line' && geom.coords.length > 0) {
      const grad = ctx.createLinearGradient(0, geom.padTop, 0, baselineY);
      grad.addColorStop(0, gradTop);
      grad.addColorStop(1, gradBot);

      ctx.beginPath();
      ctx.moveTo(geom.coords[0].x, baselineY);
      geom.coords.forEach((c) => ctx.lineTo(c.x, c.y));
      ctx.lineTo(geom.coords[geom.coords.length - 1].x, baselineY);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      geom.coords.forEach((c, i) => {
        if (i === 0) ctx.moveTo(c.x, c.y);
        else ctx.lineTo(c.x, c.y);
      });
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.stroke();

      geom.coords.forEach((c, idx) => {
        const isHovered = hoverIndex === idx;
        ctx.beginPath();
        ctx.arc(c.x, c.y, isHovered ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? accentHi : nodeDefault;
        ctx.fill();
      });
    } else if (mode === 'bars') {
      const barW = Math.min(34, Math.max(14, geom.plotW / (geom.coords.length * 1.9)));
      geom.coords.forEach((c, idx) => {
        const isHovered = hoverIndex === idx;
        const bx = c.x - barW / 2;
        if (isHovered || idx === geom.coords.length - 1) {
          ctx.fillStyle = isHovered ? accentHi : accent;
          ctx.fillRect(bx, c.y, barW, c.barHeight);
        } else {
          ctx.fillStyle = barInactiveFill;
          ctx.fillRect(bx, c.y, barW, c.barHeight);
          ctx.strokeStyle = barInactiveStroke;
          ctx.lineWidth = 1;
          ctx.strokeRect(bx, c.y, barW, c.barHeight);
        }
      });
    }

    if (hoverIndex !== null && geom.coords[hoverIndex]) {
      const target = geom.coords[hoverIndex];
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = isDark ? 'rgba(255, 228, 160, 0.45)' : 'rgba(184, 98, 10, 0.45)';
      ctx.beginPath();
      ctx.moveTo(target.x, geom.padTop);
      ctx.lineTo(target.x, baselineY);
      ctx.stroke();
      ctx.restore();
    }

    ctx.font = '10px "Geist Mono", monospace';
    ctx.textAlign = 'center';
    geom.coords.forEach((c, idx) => {
      ctx.fillStyle = hoverIndex === idx ? accentHi : labelColor;
      ctx.fillText(c.point.label, c.x, height - 7);
    });
  }, [series, mode, theme, hoverIndex]);

  const handlePointer = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas || series.points.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const relX = clientX - rect.left;
    const geom = computeChartGeometry(series.points, rect.width || 560, rect.height || 170);

    let closest = 0;
    let bestDist = Infinity;
    geom.coords.forEach((c, idx) => {
      const dist = Math.abs(c.x - relX);
      if (dist < bestDist) {
        bestDist = dist;
        closest = idx;
      }
    });
    setHoverIndex(closest);
  };

  return (
    <div className="chart-frame">
      <div className="chart-head">
        <div className="seg-group" role="group" aria-label="Chart dataset">
          <button
            type="button"
            className={`seg-btn${series.key === 'timeline' ? ' active' : ''}`}
            onClick={() => onSelectSeries('timeline')}
          >
            Trajectory
          </button>
          <button
            type="button"
            className={`seg-btn${series.key === 'benchmarks' ? ' active' : ''}`}
            onClick={() => onSelectSeries('benchmarks')}
          >
            Benchmarks
          </button>
        </div>

        <div className="seg-group" role="group" aria-label="Chart style">
          <button
            type="button"
            className={`seg-btn${mode === 'line' ? ' active' : ''}`}
            onClick={() => onSelectMode('line')}
          >
            Line
          </button>
          <button
            type="button"
            className={`seg-btn${mode === 'bars' ? ' active' : ''}`}
            onClick={() => onSelectMode('bars')}
          >
            Bars
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="tcv"
        aria-label={`${series.label} interactive impact chart`}
        onMouseMove={(e) => handlePointer(e.clientX)}
        onMouseLeave={() => setHoverIndex(null)}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointer(e.touches[0].clientX);
        }}
      />

      {activePoint && (
        <div className="chart-readout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span className="mono-cap" style={{ fontSize: '10px' }}>
              {activePoint.label} · {activePoint.milestone}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
              {activePoint.detail}
            </span>
          </div>
          <span className="chart-readout-val num">{activePoint.displayValue}</span>
        </div>
      )}
    </div>
  );
}
