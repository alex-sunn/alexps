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

  it('includes the 2 active curated projects with structured walkthrough media and excludes paused ones', () => {
    expect(RESUME_DATA.projects).toHaveLength(2);
    expect(RESUME_DATA.projects.map((p) => p.slug)).toEqual([
      'pixel-agents',
      'dealflow-ai',
    ]);
    expect(RESUME_DATA.projects.some((p) => p.slug === 'dcf-terminal')).toBe(false);
    expect(RESUME_DATA.projects.some((p) => p.slug === 'wholesaling-radar')).toBe(false);

    const seenIds = new Set<string>();

    for (const project of RESUME_DATA.projects) {
      expect(project.visibility).toBe('private');
      expect(project.aboutParagraphs.length).toBeGreaterThanOrEqual(2);
      expect(project.howItWorks.length).toBeGreaterThanOrEqual(3);
      expect(project.stack.length).toBeGreaterThanOrEqual(5);

      expect(project.media.length).toBeGreaterThanOrEqual(3);
      const videos = project.media.filter((m) => m.type === 'video');
      const images = project.media.filter((m) => m.type === 'image');
      expect(videos.length).toBeGreaterThanOrEqual(1);
      expect(images.length).toBeGreaterThanOrEqual(2);
      expect(videos[0].src.endsWith('.webm')).toBe(true);
      expect(videos[0].poster?.endsWith('.png')).toBe(true);

      for (const item of project.media) {
        expect(seenIds.has(item.id)).toBe(false);
        seenIds.add(item.id);
        expect(item.src.startsWith(`/media/${project.slug}/`)).toBe(true);
        expect(item.label.length).toBeGreaterThan(2);
        expect(item.caption.length).toBeGreaterThan(15);
        expect(item.alt.length).toBeGreaterThan(10);
        expect(item.caption).not.toContain('\u2014');

        if (item.poster) {
          expect(item.poster.startsWith(`/media/${project.slug}/`)).toBe(true);
        }
      }
    }
  });

  it('includes 3 internships, TMU education, and 5 awards', () => {
    expect(RESUME_DATA.experience).toHaveLength(3);
    expect(RESUME_DATA.education.institution).toBe('Toronto Metropolitan University');
    expect(RESUME_DATA.accomplishments).toHaveLength(5);
  });
});
