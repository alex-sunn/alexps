export type ThemeMode = 'light' | 'dark';

export type NavSectionId = 'overview' | 'experience' | 'projects' | 'awards';

export type ScenePreset =
  | 'capital-core'
  | 'agent-lattice'
  | 'skyline-spire'
  | 'apex-beacon';

export type ProjectCategory =
  | 'AI & Finance'
  | 'Real Estate & AI'
  | 'Finance & Quant';

export type ProjectSortMode = 'type' | 'featured';

export interface NavItem {
  id: NavSectionId;
  code: string;
  label: string;
}

export interface ProofStatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  targetSection: NavSectionId;
  targetId?: string;
}

export interface ProfileIdentity {
  name: string;
  roleTagline: string;
  heroStatement: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  focusSummary: string;
  githubUrl: string;
  githubLabel: string;
  linkedinUrl: string;
  linkedinLabel: string;
  resumePdfUrl: string;
  photoUrl: string;
  photoAlt: string;
  aboutParagraphs: readonly string[];
}

export interface ProjectSubsection {
  heading: string;
  body: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
}

export interface ProjectMediaItem {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  label: string;
  caption: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  repoFolder: string;
  visibility: 'private' | 'public';
  repoUrl?: string;
  liveUrl?: string;
  title: string;
  category: ProjectCategory;
  dateLabel: string;
  scenePreset: ScenePreset;
  sceneLabel: string;
  oneLiner: string;
  media: readonly ProjectMediaItem[];
  aboutParagraphs: readonly string[];
  howItWorks: readonly ProjectSubsection[];
  outcomes: readonly string[];
  metrics: readonly MetricHighlight[];
  stack: readonly string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  scenePreset: ScenePreset;
  sceneLabel: string;
  summary: string;
  metrics: readonly MetricHighlight[];
  bullets: readonly string[];
  focusTags: readonly string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  cgpa: string;
  distinctions: readonly string[];
  coursework: readonly string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: readonly string[];
}

export interface AccomplishmentItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  badge: string;
  description: string;
}

export interface PortfolioData {
  identity: ProfileIdentity;
  navItems: readonly NavItem[];
  proofStats: readonly ProofStatItem[];
  projects: readonly ProjectItem[];
  experience: readonly ExperienceItem[];
  education: EducationItem;
  skillGroups: readonly SkillGroup[];
  accomplishments: readonly AccomplishmentItem[];
  interests: readonly string[];
}
