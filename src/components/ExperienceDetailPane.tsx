import type { ExperienceItem } from '../types/portfolio';

interface ExperienceDetailPaneProps {
  job: ExperienceItem;
  allExperience: readonly ExperienceItem[];
  onSelectExperience: (id: string) => void;
}

export function ExperienceDetailPane({
  job,
  allExperience,
  onSelectExperience,
}: ExperienceDetailPaneProps) {
  return (
    <article className="detail-pane" aria-labelledby="experience-detail-title">
      <div className="breadcrumb">
        <span>Experience</span>
        <span className="breadcrumb-sep">/</span>
        <span>{job.company}</span>
      </div>

      <h1 id="experience-detail-title" className="detail-title">
        {job.company}
      </h1>
      <div className="detail-meta-line">
        {job.role} · {job.period} · {job.location}
      </div>
      <p className="detail-lead">{job.summary}</p>

      <div className="metrics-strip">
        {job.metrics.map((metric) => (
          <div key={metric.label} className="metric-cell">
            <span className="metric-cell-val">{metric.value}</span>
            <span className="metric-cell-label">{metric.label}</span>
          </div>
        ))}
      </div>

      <section className="detail-section">
        <h2 className="detail-h2">Key contributions</h2>
        <ul className="detail-bullets">
          {job.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <div className="stack-line">
        <strong>Focus:</strong> {job.focusTags.join(', ')}
      </div>

      <div className="inline-nav-links">
        {allExperience
          .filter((item) => item.id !== job.id)
          .map((other) => (
            <button
              key={other.id}
              type="button"
              className="inline-link-btn"
              onClick={() => onSelectExperience(other.id)}
            >
              {other.company} -&gt;
            </button>
          ))}
      </div>
    </article>
  );
}
