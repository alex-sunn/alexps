import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type {
  ExperienceItem,
  ProjectCategory,
  ProjectItem,
  ProjectSortMode,
} from '../types/portfolio';

interface BrowseIndexRailProps {
  mode: 'projects' | 'experience';
  projects: readonly ProjectItem[];
  selectedProjectSlug: string;
  onSelectProject: (slug: string) => void;
  experience: readonly ExperienceItem[];
  selectedExperienceId: string;
  onSelectExperience: (id: string) => void;
}

const CATEGORY_ORDER: readonly ProjectCategory[] = [
  'AI & Finance',
  'Real Estate & AI',
  'Finance & Quant',
];

function categoryColorClass(category: ProjectCategory): string {
  if (category === 'AI & Finance') return 'cat-ai-fin';
  if (category === 'Real Estate & AI') return 'cat-re-ai';
  return 'cat-quant';
}

export function BrowseIndexRail({
  mode,
  projects,
  selectedProjectSlug,
  onSelectProject,
  experience,
  selectedExperienceId,
  onSelectExperience,
}: BrowseIndexRailProps) {
  const [sortMode, setSortMode] = useState<ProjectSortMode>('type');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedLabel =
    mode === 'projects'
      ? projects.find((p) => p.slug === selectedProjectSlug)?.title ?? 'Projects'
      : experience.find((e) => e.id === selectedExperienceId)?.company ?? 'Experience';

  const handleSelectProject = (slug: string) => {
    onSelectProject(slug);
    setDrawerOpen(false);
  };

  const handleSelectExperience = (id: string) => {
    onSelectExperience(id);
    setDrawerOpen(false);
  };

  return (
    <aside
      className="index-pane"
      aria-label={mode === 'projects' ? 'Browse projects' : 'Browse experience'}
    >
      <button
        type="button"
        className="mobile-browse-bar"
        aria-expanded={drawerOpen}
        onClick={() => setDrawerOpen((prev) => !prev)}
      >
        <span>
          {mode === 'projects' ? 'Browse projects' : 'Browse experience'} ·{' '}
          <span style={{ color: 'var(--accent)' }}>{selectedLabel}</span>
        </span>
        {drawerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <div className={`index-drawer${drawerOpen ? ' open' : ''}`}>
        {mode === 'projects' ? (
          <>
            <div className="index-head">
              <h2 className="index-title">Projects</h2>
              <button
                type="button"
                className="sort-btn"
                onClick={() =>
                  setSortMode((prev) => (prev === 'type' ? 'featured' : 'type'))
                }
              >
                {sortMode === 'type' ? 'Sort by Type' : 'Sort by Featured'}
              </button>
            </div>

            {sortMode === 'type' ? (
              <div className="index-groups">
                {CATEGORY_ORDER.map((category) => {
                  const groupItems = projects.filter((p) => p.category === category);
                  if (groupItems.length === 0) return null;
                  return (
                    <div key={category}>
                      <h3 className={`index-group-label ${categoryColorClass(category)}`}>
                        {category}
                      </h3>
                      <ul className="index-list">
                        {groupItems.map((project) => {
                          const isSelected = project.slug === selectedProjectSlug;
                          return (
                            <li key={project.slug}>
                              <button
                                type="button"
                                className="index-item-btn"
                                aria-current={isSelected ? 'true' : undefined}
                                onClick={() => handleSelectProject(project.slug)}
                              >
                                {isSelected && (
                                  <span className="index-item-marker" aria-hidden="true">
                                    &gt;
                                  </span>
                                )}
                                <span className="index-item-name">{project.title}</span>
                                <span className="index-item-meta">
                                  {project.metrics[0]?.value} · {project.dateLabel}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <ul className="index-list">
                {projects.map((project) => {
                  const isSelected = project.slug === selectedProjectSlug;
                  return (
                    <li key={project.slug}>
                      <button
                        type="button"
                        className="index-item-btn"
                        aria-current={isSelected ? 'true' : undefined}
                        onClick={() => handleSelectProject(project.slug)}
                      >
                        {isSelected && (
                          <span className="index-item-marker" aria-hidden="true">
                            &gt;
                          </span>
                        )}
                        <span className="index-item-name">{project.title}</span>
                        <span className="index-item-meta">
                          {project.category} · {project.dateLabel}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <>
            <div className="index-head">
              <h2 className="index-title">Experience</h2>
            </div>

            <ul className="index-list experience-index-list">
              {experience.map((job) => {
                const isSelected = job.id === selectedExperienceId;
                return (
                  <li key={job.id}>
                    <button
                      type="button"
                      className="index-item-btn"
                      aria-current={isSelected ? 'true' : undefined}
                      onClick={() => handleSelectExperience(job.id)}
                    >
                      {isSelected && (
                        <span className="index-item-marker" aria-hidden="true">
                          &gt;
                        </span>
                      )}
                      <span className="index-item-name">{job.company}</span>
                      <span className="index-item-meta" style={{ opacity: 0.9 }}>
                        {job.role}
                      </span>
                      <span className="index-item-meta">{job.period}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
}
