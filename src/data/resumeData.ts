import type { PortfolioData } from '../types/portfolio';

export const RESUME_DATA: PortfolioData = {
  identity: {
    name: 'Alex Sun',
    roleTagline: 'Toronto · Finance & AI',
    heroStatement: 'Real Estate Investments, Equity Research & AI Systems.',
    email: 'alex.sun@torontomu.ca',
    phone: '647-882-2479',
    location: 'Toronto, Ontario',
    availability: 'Open to Internships & Collaborations',
    focusSummary: 'Real Estate Investments, Equity Research & AI Systems',
    githubUrl: 'https://github.com/alex-sunn',
    githubLabel: 'github.com/alex-sunn',
    linkedinUrl: 'https://linkedin.com/in/alexsun521',
    linkedinLabel: 'linkedin.com/in/alexsun521',
    resumePdfUrl: '/Alex_Sun_Resume.pdf',
    photoUrl: '/alex-sun.jpg',
    photoAlt: 'Alex Sun with his dog in Toronto',
    aboutParagraphs: [
      'I study Economics & Management Science at Toronto Metropolitan University (4.1/4.33 CGPA, TRSM Top 10%) and enjoy building practical software at the intersection of finance, real estate, and AI.',
      'Across internships at QuadReal Property Group, Impressions Group, and IGM Financial, I helped underwrite a $1.3MM ARR parking strategy across $1.9Bn of lease-up real estate, automated equity research dashboards that cut weekly KPI reporting time by 70%, and supported enterprise AI delivery. Outside of work, I build tools like multi-agent investment desks and commercial real estate CRMs.',
    ],
  },

  navItems: [
    { id: 'overview', code: '01', label: 'Overview' },
    { id: 'experience', code: '02', label: 'Experience' },
    { id: 'projects', code: '03', label: 'Projects' },
    { id: 'awards', code: '04', label: 'Awards' },
  ],

  proofStats: [
    {
      id: 'proof-assets',
      value: '$1.9Bn',
      label: 'Assets Supported',
      sublabel: 'QuadReal',
      targetSection: 'experience',
      targetId: 'quadreal',
    },
    {
      id: 'proof-arr',
      value: '$1.3MM',
      label: 'ARR Strategy',
      sublabel: 'Adopted Model',
      targetSection: 'experience',
      targetId: 'quadreal',
    },
    {
      id: 'proof-cgpa',
      value: '4.1/4.33',
      label: 'CGPA · Top 10%',
      sublabel: 'TMU BCom',
      targetSection: 'awards',
    },
    {
      id: 'proof-agents',
      value: '15 Agents',
      label: 'AI Desk Swarm',
      sublabel: 'Pixel Agents',
      targetSection: 'projects',
      targetId: 'pixel-agents',
    },
  ],

  // Projects default to visibility: 'private'; add repoUrl / liveUrl and set visibility: 'public' if open-sourced.
  projects: [
    {
      id: 'pixel-agents',
      slug: 'pixel-agents',
      repoFolder: 'ai_investment_banker',
      visibility: 'private',
      title: 'AI Portfolio Management (Pixel Agents)',
      category: 'AI & Finance',
      dateLabel: '2026',
      scenePreset: 'agent-lattice',
      sceneLabel: 'Interactive 3D Lattice // 15-Agent Front, Middle & Back-Office Swarm',
      oneLiner:
        'A 15-agent investment platform that splits equity research, portfolio sizing, risk checks, and trade approvals across separate AI desks.',
      media: [
        {
          id: 'pixel-walkthrough',
          type: 'video',
          src: '/media/pixel-agents/walkthrough.webm',
          poster: '/media/pixel-agents/office-overview.png',
          label: 'Walkthrough',
          caption: 'Live 2D trading floor simulation moving across Research Lab, Risk Desk, Ideas, Board, Portfolio, and Trade Execution panels.',
          alt: 'Video walkthrough of Pixel Agents trading floor and command terminal',
        },
        {
          id: 'pixel-office',
          type: 'image',
          src: '/media/pixel-agents/office-overview.png',
          label: 'Trading Floor',
          caption: 'Multi-room pixel office showing specialized AI analysts collaborating alongside the MD Gate approval queue.',
          alt: 'Pixel Agents multi-room trading floor and MD Gate terminal screenshot',
        },
        {
          id: 'pixel-committee',
          type: 'image',
          src: '/media/pixel-agents/agent-committee.png',
          label: 'Macro & Ideas',
          caption: 'Live FRED macro regime steering panel paired with conviction-scored equity trade recommendations.',
          alt: 'Pixel Agents macro regime and trade ideas terminal screenshot',
        },
      ],
      aboutParagraphs: [
        'Instead of asking one big prompt to do everything, Pixel Agents models how an actual investment firm separates work across Front, Middle, and Back-Office teams. Fifteen specialized agents cover equity research, quantitative weighting, trading execution, and compliance gates before any order moves forward.',
        'Every persona, including research analysts, quants, traders, and the portfolio manager, pulls context from a shared vector store of SEC filings and investment notes, then streams trade proposals into a live React terminal.',
      ],
      howItWorks: [
        {
          heading: 'Multi-Agent Desk Setup',
          body: 'A FastAPI and WebSocket backend passes research memos, portfolio weights, and risk checks between 15 Gemini 2.5 agent personas while keeping a human sign-off step before execution.',
        },
        {
          heading: 'Vector RAG Context',
          body: 'A vector index stores SEC filings, market sentiment, and thesis notes so agents cite real company fundamentals instead of guessing from memory.',
        },
        {
          heading: 'Terminal & Analyst Tools',
          body: 'Custom tool adapters build DCF sheets, Excel workbooks, and PowerPoint summaries alongside automated ledger tracking, rebalancing views, and broker reconciliations.',
        },
      ],
      outcomes: [
        'Coordinated 15 specialized AI agents across Front, Middle, and Back-Office investment workflows.',
        'Built a WebSocket relay and Vector RAG pipeline indexing SEC filings and investment theses.',
        'Added tool integrations for DCF sheets, Excel exports, PowerPoint decks, and live trade tracking.',
      ],
      metrics: [
        { value: '15 Agents', label: 'Multi-Desk Swarm' },
        { value: 'Vector RAG', label: 'SEC & Thesis Memory' },
        { value: 'WebSockets', label: 'Live Trade Relay' },
      ],
      stack: [
        'TypeScript',
        'React',
        'Node.js',
        'WebSockets',
        'Python',
        'FastAPI',
        'Gemini 2.5',
        'Vector RAG',
        'SQLAlchemy',
      ],
    },
    {
      id: 'dealflow-ai',
      slug: 'dealflow-ai',
      repoFolder: 'dealflow-ai',
      visibility: 'private',
      title: 'DealFlow AI',
      category: 'Real Estate & AI',
      dateLabel: '2026',
      scenePreset: 'capital-core',
      sceneLabel: 'Interactive 3D Core // Autonomous Commercial Real Estate Qualification',
      oneLiner:
        'A real estate CRM and lead qualification tool that turns messy inbound inquiries into scored, ready-to-book deals in seconds.',
      media: [
        {
          id: 'dealflow-walkthrough',
          type: 'video',
          src: '/media/dealflow-ai/walkthrough.webm',
          poster: '/media/dealflow-ai/dashboard.png',
          label: 'Walkthrough',
          caption: 'End-to-end tour across the DealFlow CRM overview, 6-stage Kanban pipeline, and Recharts conversion analytics.',
          alt: 'Video walkthrough of DealFlow AI CRM dashboard, Kanban pipeline, and analytics',
        },
        {
          id: 'dealflow-dashboard',
          type: 'image',
          src: '/media/dealflow-ai/dashboard.png',
          label: 'CRM Overview',
          caption: 'Lead triage inbox showing parsed deal budgets, property intent, hot lead flags, and qualification status.',
          alt: 'DealFlow AI CRM overview dashboard with scored commercial real estate leads',
        },
        {
          id: 'dealflow-pipeline',
          type: 'image',
          src: '/media/dealflow-ai/pipeline.png',
          label: 'Kanban Board',
          caption: 'Automated AI qualification columns advancing inbound leads from initial contact to booked property tours.',
          alt: 'DealFlow AI drag-and-drop deal pipeline Kanban board',
        },
        {
          id: 'dealflow-analytics',
          type: 'image',
          src: '/media/dealflow-ai/analytics.png',
          label: 'Analytics',
          caption: 'Pipeline conversion funnel, lead volume over time, and projected brokerage commission volume.',
          alt: 'DealFlow AI pipeline analytics and conversion charts',
        },
      ],
      aboutParagraphs: [
        'I built DealFlow AI after talking with commercial real estate brokers and seeing how often good leads got lost in messy email threads and spreadsheets. The goal was an interface simple enough that non-technical brokers could skip manual CRM data entry altogether.',
        'Under the hood, a Next.js 16 and PostgreSQL web app pairs with a Playwright lead-discovery pipeline to parse incoming texts and emails, score deal quality, and route conversations to the right broker.',
      ],
      howItWorks: [
        {
          heading: '95%+ Structured JSON Extraction',
          body: 'Gemini 2.0 Flash reads unstructured buyer and tenant inquiries and extracts budgets, timelines, and property criteria into typed JSON, cutting deal triage from hours to seconds.',
        },
        {
          heading: 'Twilio Smart Proxy SMS Routing',
          body: 'A shared brokerage Twilio number forwards lead texts straight to the assigned realtor phone while keeping clean conversation history inside the CRM.',
        },
        {
          heading: 'Calendar Booking & 0-100 Deal Scoring',
          body: 'PostgreSQL and Prisma score each lead from 0 to 100, track broker response speeds on a leaderboard, and book tours directly through Google Calendar OAuth 2.0.',
        },
      ],
      outcomes: [
        'Reached 95%+ structured extraction accuracy with Gemini 2.0 Flash on real brokerage inquiries.',
        'Built a Next.js 16 Kanban board, broker leaderboard, and PostgreSQL/Prisma pipeline analytics view.',
        'Connected a standalone Playwright GTA lead-gen and automated outreach scheduler.',
      ],
      metrics: [
        { value: '95%+ Acc', label: 'JSON Qualification' },
        { value: '0-100', label: 'Deal Scoring Engine' },
        { value: 'Seconds', label: 'Triage Latency' },
      ],
      stack: [
        'TypeScript',
        'Next.js 16',
        'React 19',
        'PostgreSQL',
        'Prisma ORM',
        'Gemini 2.0 Flash',
        'Twilio API',
        'Google OAuth 2.0',
        'Playwright',
      ],
    },
  ],

  experience: [
    {
      id: 'igm-financial',
      company: 'IGM Financial',
      role: 'ISO Major Projects Management Intern',
      period: 'Sep. 2026 – Dec. 2026',
      location: 'Toronto, ON',
      scenePreset: 'agent-lattice',
      sceneLabel: 'Enterprise AI Infrastructure & Strategic Delivery',
      summary:
        'Supporting enterprise AI infrastructure projects across technology, cybersecurity, and financial reporting teams.',
      metrics: [
        { value: 'AI Infra', label: 'Enterprise Scope' },
        { value: 'RAID Logs', label: 'Delivery Governance' },
        { value: 'Cross-Team', label: 'Tech · Sec · Biz' },
      ],
      bullets: [
        'Supported AI infrastructure projects by coordinating project activities and maintaining project documentation.',
        'Maintained project plans, tracked deliverables, and updated RAID logs to support managers in delivery execution.',
        'Collaborated with technology, cybersecurity, and business stakeholders to support strategic enterprise initiatives.',
        'Developed centralized repositories and financial reports for AI initiatives improving access to critical information.',
      ],
      focusTags: [
        'AI Infrastructure',
        'RAID Logs',
        'Cybersecurity Governance',
        'Financial Reporting',
        'Stakeholder Alignment',
      ],
    },
    {
      id: 'quadreal',
      company: 'QuadReal Property Group',
      role: 'Investments and Operations Intern',
      period: 'May 2025 – Aug. 2025',
      location: 'Toronto, ON',
      scenePreset: 'skyline-spire',
      sceneLabel: '$1.9Bn Lease-Up Portfolio & $1.3MM ARR Strategy',
      summary:
        'Underwrote revenue monetization and automated portfolio reporting across $1.9Bn of lease-up real estate developments.',
      metrics: [
        { value: '$1.9Bn', label: 'Assets Supported' },
        { value: '$1.3MM', label: 'Projected ARR' },
        { value: '15 hrs/wk', label: 'VBA Time Saved' },
      ],
      bullets: [
        'Identified and underwrote a resident parking monetization strategy, projecting $1.3MM in ARR, adopted by asset management and incorporated into portfolio-level valuation models.',
        'Supported asset management of $1.9Bn in lease-up developments by monitoring and consolidating operating performance versus underwriting assumptions and identifying key drivers of variance in cash flow, NOI, and returns.',
        'Designed VBA automations consolidating data across a national portfolio, replacing 15 hrs/week of manual work.',
        'Built portfolio-level dashboards to support revenue optimization initiatives, and improve stabilized asset performance.',
      ],
      focusTags: [
        'Real Estate Investments',
        'Underwriting & NOI',
        'Valuation Models',
        'Excel VBA Automation',
        'Portfolio Dashboards',
      ],
    },
    {
      id: 'impressions-group',
      company: 'Impressions Group',
      role: 'Data Analyst - Equity Research Intern',
      period: 'Sep. 2023 – Sep. 2024',
      location: 'Toronto, ON',
      scenePreset: 'capital-core',
      sceneLabel: 'Equity Research, DCF Valuation & Automated KPI Reporting',
      summary:
        'Built multi-sector DCF valuation models, live earnings trackers, and automated KPI dashboards that cut manual reporting by 70%.',
      metrics: [
        { value: '-70%', label: 'Reporting Time' },
        { value: 'DCF + Comps', label: 'Multi-Sector' },
        { value: '12 Mos', label: 'Research Tenure' },
      ],
      bullets: [
        'Underwrote discounted cash flow (DCF) models, comparable analyses, and performed sensitivity analyses for equities across multiple sectors to evaluate risk-adjusted returns, downside scenarios, and capital allocation decisions.',
        'Built and maintained automated Excel worksheets to continuously track earnings releases, corporate actions, and broader market developments in real time, synthesizing insights into concise updates and recommendations for the team.',
        'Configured an automated weekly KPI dashboard in Tableau/Power BI, reducing manual reporting time by 70%.',
        'Conducted in-depth industry research on emerging semiconductor sector trends, contributing a key section to a research note distributed to senior portfolio managers and institutional clients.',
      ],
      focusTags: [
        'Equity Research',
        'DCF & Sensitivity',
        'Power BI & Tableau',
        'Automated Excel',
        'Semiconductor Sector',
      ],
    },
  ],

  education: {
    institution: 'Toronto Metropolitan University',
    degree: 'Bachelor of Commerce in Economics and Management Science',
    period: 'Expected August 2028',
    location: 'Toronto, ON',
    cgpa: '4.1 / 4.33',
    distinctions: ['TRSM Top 10% Student', 'TMU Academic Achievement Scholarship'],
    coursework: [
      'Financial Modeling',
      'Microeconomics & Macroeconomics',
      'Data Analysis',
      'AI & Machine Learning',
    ],
  },

  skillGroups: [
    {
      id: 'finance',
      label: 'Finance & Real Estate',
      skills: [
        'Financial Modeling (DCF, M&A, LBO)',
        'Valuation & Sensitivity Analysis',
        'Due Diligence & Capital Markets',
        'Yardi & Argus',
      ],
    },
    {
      id: 'ai-eng',
      label: 'AI & Engineering',
      skills: [
        'AI Automation & Multi-Agent Systems',
        'Claude Code / Codex',
        'TypeScript, React & Next.js',
        'Python, FastAPI & Vector RAG',
      ],
    },
    {
      id: 'data-bi',
      label: 'Data & Analytics',
      skills: [
        'Excel (VBA) & SQL',
        'Power BI & Tableau',
        'PostgreSQL & Prisma ORM',
        'Playwright & Puppeteer',
      ],
    },
  ],

  accomplishments: [
    {
      id: 'awd-trsm',
      title: 'TRSM Top 10% & TMU Academic Achievement Scholarship',
      organization: 'Toronto Metropolitan University',
      period: '2024 – Present',
      badge: '4.1 / 4.33 CGPA',
      description:
        'Ranked in the top 10% of Ted Rogers School of Management students and awarded the TMU Academic Achievement Scholarship.',
    },
    {
      id: 'awd-toastmasters',
      title: 'TMU Toastmasters Finalist',
      organization: 'Toronto Metropolitan University',
      period: '2024',
      badge: 'FINALIST',
      description:
        'Reached the university finals delivering prepared and impromptu speeches under live timing.',
    },
    {
      id: 'awd-speaking',
      title: 'Provincial Effective Speaking Contest Winner',
      organization: 'Ontario Provincial Competition',
      period: '2019 – 2023',
      badge: 'PROVINCIAL WINNER',
      description:
        'Multi-year provincial winner in competitive public speaking and Q&A.',
    },
    {
      id: 'awd-deca',
      title: 'ICDC and Provincial DECA Competitor',
      organization: 'DECA International Career Development Conference',
      period: '2019 – 2022',
      badge: 'ICDC QUALIFIER',
      description:
        'Competed at provincial and international levels solving timed finance and business strategy case studies.',
    },
    {
      id: 'awd-tennis',
      title: 'Competitive Tennis (Former Provincialist)',
      organization: 'Ontario Competitive Circuit',
      period: 'Competitive Career',
      badge: 'PROVINCIALIST',
      description:
        'Competed at the provincial level in junior tennis across Ontario.',
    },
  ],

  interests: [
    'Tennis (Former Provincialist)',
    'Chess (1500 Rating)',
    'Poker',
    'Snowboarding',
    'Volleyball',
    'Camping',
    'Formula 1',
  ],

  chartSeries: {
    timeline: {
      key: 'timeline',
      label: 'Career & Technical Trajectory',
      points: [
        {
          label: '2023 Q3',
          value: 28,
          displayValue: 'Impressions Group',
          milestone: 'Equity Research Intern',
          detail: 'DCF, comps & real-time earnings tracker',
        },
        {
          label: '2024 Q2',
          value: 46,
          displayValue: '-70% Reporting',
          milestone: 'KPI Automation',
          detail: 'Tableau / Power BI + Semiconductor note',
        },
        {
          label: '2025 Q2',
          value: 74,
          displayValue: '$1.9Bn / $1.3MM',
          milestone: 'QuadReal Property Group',
          detail: 'ARR strategy + 15 hrs/wk VBA automation',
        },
        {
          label: '2026 Q2',
          value: 94,
          displayValue: '15-Agent Swarm',
          milestone: 'Pixel Agents & DealFlow',
          detail: 'Multi-agent desk + 95%+ CRE CRM triage',
        },
        {
          label: '2026 Q4',
          value: 100,
          displayValue: 'IGM Financial',
          milestone: 'ISO Major Projects',
          detail: 'Enterprise AI infrastructure & RAID delivery',
        },
      ],
    },
    benchmarks: {
      key: 'benchmarks',
      label: 'Quantified Career Benchmarks',
      points: [
        {
          label: 'CGPA',
          value: 95,
          displayValue: '4.1 / 4.33',
          milestone: 'TMU BCom',
          detail: 'TRSM Top 10% & Academic Scholarship',
        },
        {
          label: 'ASSETS',
          value: 100,
          displayValue: '$1.9Bn',
          milestone: 'QuadReal Lease-Up',
          detail: 'Operating variance, NOI & cash flow analysis',
        },
        {
          label: 'ARR',
          value: 86,
          displayValue: '$1.3MM',
          milestone: 'Parking Strategy',
          detail: 'Adopted into portfolio valuation models',
        },
        {
          label: 'KPI TIME',
          value: 70,
          displayValue: '-70%',
          milestone: 'Impressions Group',
          detail: 'Automated Power BI / Tableau weekly KPIs',
        },
        {
          label: 'SWARM',
          value: 84,
          displayValue: '15 Agents',
          milestone: 'Pixel Agents',
          detail: 'Front, Middle & Back-Office AI desk',
        },
        {
          label: 'TRIAGE',
          value: 95,
          displayValue: '95%+ Acc',
          milestone: 'DealFlow AI CRM',
          detail: 'Gemini 2.0 Flash JSON deal extraction',
        },
      ],
    },
  },
};
