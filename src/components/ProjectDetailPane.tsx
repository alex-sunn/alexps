import { ExternalLink, Lock } from 'lucide-react';
import { ProjectMediaGallery } from './ProjectMediaGallery';
import type { NavSectionId, ProjectItem } from '../types/portfolio';

interface ProjectDetailPaneProps {
  project: ProjectItem;
  contactEmail: string;
  projectIndex: number;
  totalProjects: number;
  onPrevProject: () => void;
  onNextProject: () => void;
  onNavigateSection: (section: NavSectionId) => void;
}

export function ProjectDetailPane({
  project,
  contactEmail,
  projectIndex,
  totalProjects,
  onPrevProject,
  onNextProject,
  onNavigateSection,
}: ProjectDetailPaneProps) {
  const indexLabel = `${String(projectIndex + 1).padStart(2, '0')} / ${String(
    totalProjects,
  ).padStart(2, '0')}`;

  const walkthroughHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `Walkthrough Request: ${project.title}`,
  )}`;

  return (
    <article className="detail-pane" aria-labelledby="project-detail-title">
      <div className="breadcrumb">
        <span>Projects</span>
        <span className="breadcrumb-sep">/</span>
        <span>{project.title}</span>
      </div>

      <h1 id="project-detail-title" className="detail-title">
        {project.title}
      </h1>
      <p className="detail-lead">{project.oneLiner}</p>

      <div className="project-meta-bar">
        <div className="media-caption-text">
          <span className="media-caption-title">{project.category}</span>
          <div className="project-links-row">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-link-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <span>View on GitHub</span>
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            ) : (
              <>
                <span
                  className="media-caption-sub"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                >
                  <Lock size={11} aria-hidden="true" />
                  <span>Private Repository</span>
                </span>
                <a href={walkthroughHref} className="inline-link-btn">
                  Request Walkthrough -&gt;
                </a>
              </>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-link-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <span>Live Demo</span>
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="pager-controls">
          <button
            type="button"
            className="pager-btn"
            onClick={onPrevProject}
            aria-label="Previous project"
            title="Previous project (Left Arrow)"
          >
            &lt;-
          </button>
          <span className="num">{indexLabel}</span>
          <button
            type="button"
            className="pager-btn"
            onClick={onNextProject}
            aria-label="Next project"
            title="Next project (Right Arrow)"
          >
            -&gt;
          </button>
        </div>
      </div>

      <ProjectMediaGallery
        key={project.slug}
        media={project.media}
        projectTitle={project.title}
      />

      <div className="metrics-strip">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="metric-cell">
            <span className="metric-cell-val">{metric.value}</span>
            <span className="metric-cell-label">{metric.label}</span>
          </div>
        ))}
      </div>

      <section className="detail-section">
        <h2 className="detail-h2">About this project</h2>
        {project.aboutParagraphs.map((paragraph) => (
          <p key={paragraph} className="detail-body">
            {paragraph}
          </p>
        ))}

        <h3 className="detail-h3">How it works</h3>
        {project.howItWorks.map((item) => (
          <div key={item.heading}>
            <h4 className="detail-h4">{item.heading}</h4>
            <p className="detail-body">{item.body}</p>
          </div>
        ))}

        <h3 className="detail-h3">Key outcomes</h3>
        <ul className="detail-bullets">
          {project.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <div className="stack-line">
        <strong>Stack:</strong> {project.stack.join(', ')}
      </div>

      <div className="inline-nav-links">
        <button
          type="button"
          className="inline-link-btn"
          onClick={() => onNavigateSection('overview')}
        >
          &lt;- Back to Overview
        </button>
        <button
          type="button"
          className="inline-link-btn"
          onClick={() => onNavigateSection('experience')}
        >
          View Experience -&gt;
        </button>
      </div>
    </article>
  );
}
