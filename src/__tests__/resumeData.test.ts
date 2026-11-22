import { describe, expect, it } from 'vitest';
import { RESUME_DATA } from '../data/resumeData';

describe('RESUME_DATA curated integrity', () => {
  it('contains Alex Sun identity, GitHub, PDF resume, photo, and 4 numbered navigation items', () => {
    expect(RESUME_DATA.identity.name).toBe('Alex Sun');
    expect(RESUME_DATA.identity.email).toBe('alex.sun@torontomu.ca');
    expect(RESUME_DATA.identity.githubUrl).toBe('https://github.com/alex-sunn');
    expect(RESUME_DATA.identity.resumePdfUrl).toBe('/Alex_Sun_Resume.pdf');
    expect(RESUME_DATA.identity.photoUrl).toBe('/alex-sun.jpg');
    expect(RESUME_DATA.navItems.map((n) => n.label)).toEqual([
      'Overview',
      'Experience',
      'Projects',
      'Awards',
    ]);
    expect(RESUME_DATA.proofStats).toHaveLength(4);
  });

  it('includes exactly the 4 most impressive curated projects with visibility and structured howItWorks', () => {
    expect(RESUME_DATA.projects).toHaveLength(4);
    expect(RESUME_DATA.projects.map((p) => p.slug)).toEqual([
      'pixel-agents',
      'dealflow-ai',
      'dcf-terminal',
      'wholesaling-radar',
    ]);

    for (const project of RESUME_DATA.projects) {
      expect(project.visibility).toBe('private');
      expect(project.aboutParagraphs.length).toBeGreaterThanOrEqual(2);
      expect(project.howItWorks.length).toBeGreaterThanOrEqual(3);
      expect(project.stack.length).toBeGreaterThanOrEqual(5);
    }
  });

  it('includes 3 internships, TMU education, 5 awards, and non-arbitrary benchmark chart series', () => {
    expect(RESUME_DATA.experience).toHaveLength(3);
    expect(RESUME_DATA.education.institution).toBe('Toronto Metropolitan University');
    expect(RESUME_DATA.accomplishments).toHaveLength(5);
    expect(RESUME_DATA.chartSeries.timeline.points.length).toBeGreaterThanOrEqual(5);
    expect(RESUME_DATA.chartSeries.benchmarks.points).toHaveLength(6);
  });
});
