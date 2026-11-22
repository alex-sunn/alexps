import type {
  EducationItem,
  ExperienceItem,
  NavSectionId,
  ProfileIdentity,
  ProjectItem,
  ProofStatItem,
  SkillGroup,
} from '../types/portfolio';

interface OverviewDetailPaneProps {
  identity: ProfileIdentity;
  proofStats: readonly ProofStatItem[];
  experience: readonly ExperienceItem[];
  projects: readonly ProjectItem[];
  education: EducationItem;
  skillGroups: readonly SkillGroup[];
  interests: readonly string[];
  onNavigateSection: (section: NavSectionId) => void;
  onOpenExperience: (id: string) => void;
  onOpenProject: (slug: string) => void;
}

export function OverviewDetailPane({
  identity,
  proofStats,
  experience,
  projects,
  education,
  skillGroups,
  interests,
  onNavigateSection,
  onOpenExperience,
  onOpenProject,
}: OverviewDetailPaneProps) {
  const handleProofClick = (stat: ProofStatItem) => {
    if (stat.targetSection === 'experience' && stat.targetId) {
      onOpenExperience(stat.targetId);
      return;
    }
    if (stat.targetSection === 'projects' && stat.targetId) {
      onOpenProject(stat.targetId);
      return;
    }
    onNavigateSection(stat.targetSection);
  };

  return (
    <article className="detail-pane" aria-labelledby="overview-heading">
      <div className="overview-hero-grid">
        <div>
          <div className="breadcrumb">
            <span>Overview</span>
            <span className="breadcrumb-sep">·</span>
            <span>{identity.location}</span>
          </div>

          <h1 id="overview-heading" className="detail-title">
            {identity.heroStatement}
          </h1>

          <div style={{ marginTop: '18px' }}>
            {identity.aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="detail-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <figure className="profile-photo-frame">
          <img
            src={identity.photoUrl}
            alt={identity.photoAlt}
            className="profile-photo"
          />
        </figure>
      </div>

      <div className="proof-grid" role="list" aria-label="Key quantifiable proof points">
        {proofStats.map((stat) => (
          <button
            key={stat.id}
            type="button"
            className="proof-cell"
            onClick={() => handleProofClick(stat)}
          >
            <span className="proof-val num">{stat.value}</span>
            <span className="proof-label">{stat.label}</span>
            <span className="proof-sub">{stat.sublabel} -&gt;</span>
          </button>
        ))}
      </div>

      <section className="preview-split" aria-label="Quick navigation directory">
        <div>
          <div className="preview-col-head">
            <h2 className="detail-h2" style={{ margin: 0 }}>
              Recent Experience ({experience.length})
            </h2>
            <button
              type="button"
              className="inline-link-btn"
              onClick={() => onNavigateSection('experience')}
            >
              All roles -&gt;
            </button>
          </div>
          <div className="preview-list">
            {experience.map((job) => (
              <button
                key={job.id}
                type="button"
                className="preview-row-btn"
                onClick={() => onOpenExperience(job.id)}
              >
                <div className="preview-row-main">
                  <span className="preview-row-title">{job.company}</span>
                  <span className="preview-row-sub">
                    {job.role} · {job.period}
                  </span>
                </div>
                <span className="preview-row-arrow cta-arrow" aria-hidden="true">
                  -&gt;
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="preview-col-head">
            <h2 className="detail-h2" style={{ margin: 0 }}>
              Flagship Projects ({projects.length})
            </h2>
            <button
              type="button"
              className="inline-link-btn"
              onClick={() => onNavigateSection('projects')}
            >
              All projects -&gt;
            </button>
          </div>
          <div className="preview-list">
            {projects.map((project) => (
              <button
                key={project.slug}
                type="button"
                className="preview-row-btn"
                onClick={() => onOpenProject(project.slug)}
              >
                <div className="preview-row-main">
                  <span className="preview-row-title">{project.title}</span>
                  <span className="preview-row-sub">
                    {project.category} · {project.metrics[0]?.value}
                  </span>
                </div>
                <span className="preview-row-arrow cta-arrow" aria-hidden="true">
                  -&gt;
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="availability-strip">
        <div className="availability-item">
          <span className="mono-cap">Based in</span>
          <span className="availability-val">{identity.location}</span>
        </div>
        <div className="availability-item">
          <span className="mono-cap">Status</span>
          <span className="availability-val">{identity.availability}</span>
        </div>
        <div className="availability-item">
          <span className="mono-cap">Core Focus</span>
          <span className="availability-val">{identity.focusSummary}</span>
        </div>
      </div>

      <section className="detail-section" style={{ borderTop: 'none', paddingTop: '4px' }}>
        <span className="mono-cap">Education</span>
        <h2 className="detail-h2" style={{ marginTop: '8px' }}>
          {education.institution}
        </h2>
        <p className="detail-body" style={{ marginBottom: '6px' }}>
          {education.degree} · {education.period}
        </p>
        <p className="detail-body" style={{ color: 'var(--muted)', fontSize: '15px' }}>
          CGPA: <strong style={{ color: 'var(--ink)' }}>{education.cgpa}</strong> ·{' '}
          {education.distinctions.join(' · ')}
        </p>
        <p className="detail-body" style={{ color: 'var(--muted)', fontSize: '14px' }}>
          Coursework: {education.coursework.join(', ')}
        </p>
      </section>

      <section className="detail-section">
        <h2 className="detail-h2">Skills &amp; Tooling</h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <h3 className="skill-col-title">{group.label}</h3>
              <ul className="skill-plain-list">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2 className="detail-h2">Interests</h2>
        <p className="detail-body" style={{ marginBottom: 0 }}>
          {interests.join(' · ')}
        </p>
      </section>
    </article>
  );
}
