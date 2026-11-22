import { useState } from 'react';
import { InteractiveChart } from './InteractiveChart';
import type {
  AccomplishmentItem,
  ChartRenderMode,
  ChartSeries,
  ChartSeriesKey,
  ThemeMode,
} from '../types/portfolio';

interface AwardsDetailPaneProps {
  accomplishments: readonly AccomplishmentItem[];
  chartSeries: Record<ChartSeriesKey, ChartSeries>;
  theme: ThemeMode;
}

export function AwardsDetailPane({
  accomplishments,
  chartSeries,
  theme,
}: AwardsDetailPaneProps) {
  const [seriesKey, setSeriesKey] = useState<ChartSeriesKey>('timeline');
  const [chartMode, setChartMode] = useState<ChartRenderMode>('line');

  return (
    <article className="detail-pane" aria-labelledby="awards-heading">
      <div className="breadcrumb">
        <span>Awards &amp; Trajectory</span>
      </div>

      <h1 id="awards-heading" className="detail-title">
        Awards &amp; Trajectory
      </h1>
      <p className="detail-lead">
        Academic distinctions, public speaking championships, case competitions, and progression across finance and AI engineering.
      </p>

      <InteractiveChart
        series={chartSeries[seriesKey]}
        mode={chartMode}
        theme={theme}
        onSelectSeries={setSeriesKey}
        onSelectMode={setChartMode}
      />

      <section className="awards-list" aria-label="Accomplishments and honors">
        {accomplishments.map((item) => (
          <div key={item.id} className="award-row">
            <div className="award-row-head">
              <h2 className="award-title">{item.title}</h2>
              <span className="award-badge">{item.badge}</span>
            </div>
            <div className="mono-cap" style={{ fontSize: '10px' }}>
              {item.organization} · {item.period}
            </div>
            <p className="detail-body" style={{ marginBottom: 0, fontSize: '15px' }}>
              {item.description}
            </p>
          </div>
        ))}
      </section>
    </article>
  );
}
