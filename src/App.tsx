import { useCallback, useEffect, useState } from 'react';
import { AsciiClickBurst } from './canvas/AsciiClickBurst';
import { AsciiSceneCanvas } from './canvas/AsciiSceneCanvas';
import { AwardsDetailPane } from './components/AwardsDetailPane';
import { BrowseIndexRail } from './components/BrowseIndexRail';
import { ExperienceDetailPane } from './components/ExperienceDetailPane';
import { LeftIdentityRail } from './components/LeftIdentityRail';
import { OverviewDetailPane } from './components/OverviewDetailPane';
import { ProjectDetailPane } from './components/ProjectDetailPane';
import { RESUME_DATA } from './data/resumeData';
import type { NavSectionId, ScenePreset, ThemeMode } from './types/portfolio';

const THEME_STORAGE_KEY = 'alex-sun-theme';

function getInitialTheme(): ThemeMode {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'light';
}

interface ParsedRoute {
  section: NavSectionId;
  projectSlug: string;
  experienceId: string;
}

function parseHashRoute(hash: string): ParsedRoute {
  const clean = hash.replace(/^#\/?/, '').trim();
  const [rawSection, rawItem] = clean.split('/');

  const defaultProject = RESUME_DATA.projects[0].slug;
  const defaultExp = RESUME_DATA.experience[0].id;

  if (rawSection === 'projects') {
    const matchedProject = RESUME_DATA.projects.find((p) => p.slug === rawItem);
    return {
      section: 'projects',
      projectSlug: matchedProject ? matchedProject.slug : defaultProject,
      experienceId: defaultExp,
    };
  }

  if (rawSection === 'experience') {
    const matchedExp = RESUME_DATA.experience.find((e) => e.id === rawItem);
    return {
      section: 'experience',
      projectSlug: defaultProject,
      experienceId: matchedExp ? matchedExp.id : defaultExp,
    };
  }

  if (rawSection === 'awards') {
    return {
      section: 'awards',
      projectSlug: defaultProject,
      experienceId: defaultExp,
    };
  }

  return {
    section: 'overview',
    projectSlug: defaultProject,
    experienceId: defaultExp,
  };
}

function buildHashRoute(
  section: NavSectionId,
  projectSlug: string,
  experienceId: string,
): string {
  if (section === 'projects') return `#projects/${projectSlug}`;
  if (section === 'experience') return `#experience/${experienceId}`;
  return `#${section}`;
}

export function App() {
  const initialRoute = parseHashRoute(
    typeof window !== 'undefined' ? window.location.hash : '',
  );

  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [activeSection, setActiveSection] = useState<NavSectionId>(initialRoute.section);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>(
    initialRoute.projectSlug,
  );
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>(
    initialRoute.experienceId,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#050505' : '#ffffff');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage access errors
    }
  }, [theme]);

  useEffect(() => {
    const syncFromHash = () => {
      const next = parseHashRoute(window.location.hash);
      setActiveSection(next.section);
      if (next.section === 'projects') setSelectedProjectSlug(next.projectSlug);
      if (next.section === 'experience') setSelectedExperienceId(next.experienceId);
    };

    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const syncUrlHash = useCallback(
    (section: NavSectionId, projectSlug: string, experienceId: string) => {
      const nextHash = buildHashRoute(section, projectSlug, experienceId);
      try {
        if (window.location.hash !== nextHash) {
          window.history.replaceState(null, '', nextHash);
        }
      } catch {
        // Ignore history errors in restricted frames
      }
    },
    [],
  );

  const navigateSection = useCallback(
    (section: NavSectionId) => {
      setActiveSection(section);
      syncUrlHash(section, selectedProjectSlug, selectedExperienceId);
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [selectedExperienceId, selectedProjectSlug, syncUrlHash],
  );

  const openProject = useCallback(
    (slug: string) => {
      setSelectedProjectSlug(slug);
      setActiveSection('projects');
      syncUrlHash('projects', slug, selectedExperienceId);
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [selectedExperienceId, syncUrlHash],
  );

  const openExperience = useCallback(
    (id: string) => {
      setSelectedExperienceId(id);
      setActiveSection('experience');
      syncUrlHash('experience', selectedProjectSlug, id);
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [selectedProjectSlug, syncUrlHash],
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const projectIndex = Math.max(
    0,
    RESUME_DATA.projects.findIndex((p) => p.slug === selectedProjectSlug),
  );
  const activeProject = RESUME_DATA.projects[projectIndex] ?? RESUME_DATA.projects[0];

  const activeExperience =
    RESUME_DATA.experience.find((e) => e.id === selectedExperienceId) ??
    RESUME_DATA.experience[0];

  let activeScenePreset: ScenePreset = 'capital-core';
  if (activeSection === 'projects') activeScenePreset = activeProject.scenePreset;
  else if (activeSection === 'experience') activeScenePreset = activeExperience.scenePreset;
  else if (activeSection === 'awards') activeScenePreset = 'apex-beacon';

  const stepProject = useCallback(
    (delta: -1 | 1) => {
      const len = RESUME_DATA.projects.length;
      const nextIndex = (projectIndex + delta + len) % len;
      openProject(RESUME_DATA.projects[nextIndex].slug);
    },
    [openProject, projectIndex],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (event.key === '1') navigateSection('overview');
      if (event.key === '2') navigateSection('experience');
      if (event.key === '3') navigateSection('projects');
      if (event.key === '4') navigateSection('awards');
      if (event.key === 't' || event.key === 'T') toggleTheme();

      if (activeSection === 'projects') {
        if (event.key === 'ArrowLeft') stepProject(-1);
        if (event.key === 'ArrowRight') stepProject(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, navigateSection, stepProject, toggleTheme]);

  const hasMiddleIndex = activeSection === 'projects' || activeSection === 'experience';

  return (
    <>
      <AsciiSceneCanvas activePreset={activeScenePreset} theme={theme} />
      <AsciiClickBurst theme={theme} />

      <div className="print-only-header">
        <strong>{RESUME_DATA.identity.name}</strong> | {RESUME_DATA.identity.email} ·{' '}
        {RESUME_DATA.identity.phone} · {RESUME_DATA.identity.linkedinLabel} ·{' '}
        {RESUME_DATA.identity.location}
      </div>

      <div className={`site-shell ${hasMiddleIndex ? 'has-index' : 'wide-detail'}`}>
        <LeftIdentityRail
          identity={RESUME_DATA.identity}
          navItems={RESUME_DATA.navItems}
          activeSection={activeSection}
          theme={theme}
          onSelectSection={navigateSection}
          onToggleTheme={toggleTheme}
        />

        {hasMiddleIndex && (
          <BrowseIndexRail
            mode={activeSection}
            projects={RESUME_DATA.projects}
            selectedProjectSlug={activeProject.slug}
            onSelectProject={openProject}
            experience={RESUME_DATA.experience}
            selectedExperienceId={activeExperience.id}
            onSelectExperience={openExperience}
          />
        )}

        <main className="main-content">
          {activeSection === 'overview' && (
            <OverviewDetailPane
              identity={RESUME_DATA.identity}
              proofStats={RESUME_DATA.proofStats}
              experience={RESUME_DATA.experience}
              projects={RESUME_DATA.projects}
              education={RESUME_DATA.education}
              skillGroups={RESUME_DATA.skillGroups}
              interests={RESUME_DATA.interests}
              onNavigateSection={navigateSection}
              onOpenExperience={openExperience}
              onOpenProject={openProject}
            />
          )}

          {activeSection === 'projects' && (
            <ProjectDetailPane
              project={activeProject}
              contactEmail={RESUME_DATA.identity.email}
              projectIndex={projectIndex}
              totalProjects={RESUME_DATA.projects.length}
              onPrevProject={() => stepProject(-1)}
              onNextProject={() => stepProject(1)}
              onNavigateSection={navigateSection}
            />
          )}

          {activeSection === 'experience' && (
            <ExperienceDetailPane
              job={activeExperience}
              allExperience={RESUME_DATA.experience}
              onSelectExperience={openExperience}
            />
          )}

          {activeSection === 'awards' && (
            <AwardsDetailPane
              accomplishments={RESUME_DATA.accomplishments}
              chartSeries={RESUME_DATA.chartSeries}
              theme={theme}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
