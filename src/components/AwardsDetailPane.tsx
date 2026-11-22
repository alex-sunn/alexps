import type { AccomplishmentItem } from '../types/portfolio';

interface AwardsDetailPaneProps {
  accomplishments: readonly AccomplishmentItem[];
}

export function AwardsDetailPane({ accomplishments }: AwardsDetailPaneProps) {
  return (
    <article className="detail-pane" aria-labelledby="awards-heading">
      <div className="breadcrumb">
        <span>Awards</span>
      </div>

      <h1 id="awards-heading" className="detail-title">
        Awards
      </h1>
      <p className="detail-lead">
        Academic honors, speaking contests, case competitions, and competitive achievements.
      </p>

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
