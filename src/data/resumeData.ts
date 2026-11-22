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
      'Economics & Management Science student at Toronto Metropolitan University (4.1/4.33 CGPA, TRSM Top 10%) combining institutional finance experience with full-stack AI engineering.',
      'Across internships at QuadReal Property Group, Impressions Group, and IGM Financial, I have underwritten $1.3MM in recurring revenue initiatives across $1.9Bn of lease-up real estate assets, cut equity research KPI reporting time by 70%, and supported enterprise AI infrastructure delivery—while building 15-agent investment desks and autonomous real estate CRMs.',
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
        'An event-driven 15-agent investment desk automating equity research, quant portfolio optimization, and compliance execution.',
      aboutParagraphs: [
        'Pixel Agents models an institutional asset manager as an autonomous multi-agent swarm. Rather than relying on a single monolithic prompt, 15 specialized personas collaborate across Front, Middle, and Back-Office desks to analyze filings, construct factor weights, validate risk limits, and propose executable trades.',
        'Each agent persona—from equity research analysts and quant researchers to trading desk leads and portfolio managers—reads from a shared Vector RAG memory layer and streams structured approvals into a Bloomberg Terminal-style React workstation.',
      ],
      howItWorks: [
        {
          heading: 'Multi-Agent Desk Orchestration',
          body: 'An event-driven FastAPI and WebSocket message bus routes research memos, quant factor optimizations, and compliance gates across 15 specialized Gemini 2.5 agent personas with human-in-the-loop sign-off.',
        },
        {
          heading: 'Vector RAG & Live Context Relay',
          body: 'A vector retrieval pipeline indexes SEC filings, market sentiment, and investment theses directly into agent runtimes so every portfolio decision is grounded in verifiable company fundamentals.',
        },
        {
          heading: 'Bloomberg-Style Execution Terminal',
          body: 'Custom tool adapters generate DCF models, Excel workbooks, and PowerPoint briefs alongside automated ledger accounting, real-time portfolio rebalancing, and custodian broker reconciliations.',
        },
      ],
      outcomes: [
        'Coordinated 15 specialized AI agents across Front, Middle, and Back-Office investment workflows.',
        'Engineered real-time WebSocket message relay and Vector RAG memory indexing SEC filings and theses.',
        'Integrated dedicated DCF, Excel, PowerPoint, and deep-research tool adapters into a live React dashboard.',
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
        'A multi-tenant commercial real estate CRM and autonomous lead qualification platform cutting deal triage from hours to seconds.',
      aboutParagraphs: [
        'Built after interviewing commercial real estate brokers to pinpoint why leads slipped through manual spreadsheets, DealFlow AI eliminates manual CRM data entry for non-technical deal teams.',
        'It pairs a multi-tenant Next.js 16 and PostgreSQL SaaS platform with an autonomous Playwright discovery and outreach pipeline, turning unstructured emails and texts into scored, tour-ready brokerage deals.',
      ],
      howItWorks: [
        {
          heading: '95%+ Structured JSON Extraction',
          body: 'Google Gemini 2.0 Flash parses unstructured real estate inquiries into typed JSON budgets, timelines, and property criteria, cutting manual deal triage from hours to seconds.',
        },
        {
          heading: 'Twilio Smart Proxy SMS Routing',
          body: 'A single brokerage Twilio number smart-routes incoming lead SMS messages straight to the assigned realtor cell phone while maintaining clean brokerage-level conversation threads.',
        },
        {
          heading: 'Bi-Directional Calendar & 0–100 Deal Scoring',
          body: 'PostgreSQL + Prisma rank every inquiry on a 0–100 scale, feed realtor leaderboards tracking response speed and pipeline value, and book property tours via Google Calendar OAuth 2.0.',
        },
      ],
      outcomes: [
        'Achieved 95%+ structured extraction accuracy using Gemini 2.0 Flash on messy brokerage inquiries.',
        'Built a Next.js 16 Kanban pipeline, realtor leaderboard, and PostgreSQL/Prisma scoring dashboard.',
        'Paired with a standalone Playwright GTA lead-gen and automated outreach scheduler.',
      ],
      metrics: [
        { value: '95%+ Acc', label: 'JSON Qualification' },
        { value: '0–100', label: 'Deal Scoring Engine' },
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
    {
      id: 'dcf-terminal',
      slug: 'dcf-terminal',
      repoFolder: 'dcf_model',
      visibility: 'private',
      title: 'Financial Terminal & DCF Suite',
      category: 'Finance & Quant',
      dateLabel: '2026',
      scenePreset: 'skyline-spire',
      sceneLabel: 'Interactive 3D Spire // 9-Module Quantitative & Valuation Workstation',
      oneLiner:
        'A 9-module quantitative workstation combining live market data, FRED macro telemetry, risk matrices, and auto-filled DCF Excel export.',
      aboutParagraphs: [
        'Designed as an all-in-one Python financial analysis terminal, this suite unifies macroeconomic monitoring, equity screening, technical overlays, and institutional discounted cash flow modeling in a single local workspace.',
        'Instead of stitching together ad-hoc spreadsheets for every company screen, analysts pull historical financials, peer multiples, and macro yields directly into pre-built DCF assumptions.',
      ],
      howItWorks: [
        {
          heading: 'Auto-Filled DCF & Formatted Excel Export',
          body: 'Pulls income statement, balance sheet, and cash flow histories via yfinance to pre-populate WACC, revenue growth, and terminal value sensitivity tables with one-click Excel workbook export.',
        },
        {
          heading: 'Macro Economy & Peer Comparables',
          body: 'Tracks FRED macroeconomic indicators (GDP, CPI, Treasury yields), economic calendar events, aggregated financial news, and side-by-side valuation multiples across peer tickers.',
        },
        {
          heading: 'Technical & Correlation Risk Telemetry',
          body: 'Computes SMA, RSI, Bollinger Bands, MACD, ATR, and OBV indicators alongside multi-asset correlation matrices and annualized volatility metrics.',
        },
      ],
      outcomes: [
        'Delivered 9 integrated views covering Market Dashboard, Macro Economy, News, Technicals, Fundamentals, Peers, Risk, and DCF Builder.',
        'Automated historical statement ingestion and WACC/terminal-value sensitivity exports to Excel.',
      ],
      metrics: [
        { value: '9 Modules', label: 'Integrated Views' },
        { value: 'FRED + YF', label: 'Live Data Feeds' },
        { value: 'Excel Out', label: 'Formatted DCF' },
      ],
      stack: ['Python', 'Streamlit', 'yfinance', 'FRED API', 'Pandas', 'openpyxl'],
    },
    {
      id: 'wholesaling-radar',
      slug: 'wholesaling-radar',
      repoFolder: 'wholesaling_automation_dashboard',
      visibility: 'private',
      title: 'Wholesaling Automation Radar',
      category: 'Real Estate & AI',
      dateLabel: '2026',
      scenePreset: 'apex-beacon',
      sceneLabel: 'Interactive 3D Beacon // 7-Channel Off-Market Acquisition Radar',
      oneLiner:
        'A real-time off-market real estate acquisition console aggregating 7 regional listing & foreclosure scrapers via live SSE logs.',
      aboutParagraphs: [
        'Off-market residential acquisition depends on spotting distressed, FSBO, and foreclosure listings before they hit broad syndication. Wholesaling Automation Radar consolidates seven fragmented listing sources into one live operator dashboard.',
        'An Express server coordinates headless scrapers with persistent browser profiles and streams live execution telemetry to the browser over Server-Sent Events (SSE).',
      ],
      howItWorks: [
        {
          heading: '7-Channel Headless Discovery',
          body: 'Dedicated Puppeteer and Cheerio scrapers monitor Zillow FSBO, FSBO Canada, Kijiji, Craigslist, Foreclosures, Marketplace, and Cash Buyers across configured geographic regions.',
        },
        {
          heading: 'Real-Time SSE Terminal Stream',
          body: 'The Express backend broadcasts live scraping state, regional progress, and newly captured leads via Server-Sent Events directly into a browser terminal log.',
        },
        {
          heading: 'Persistent Session & Deduplicated Storage',
          body: 'Maintains persistent Puppeteer browser profiles across runs and writes normalized property leads cleanly into structured JSON storage for rapid underwriting.',
        },
      ],
      outcomes: [
        'Unified 7 distinct property and cash-buyer scrapers behind one full-stack Express control panel.',
        'Built zero-polling Server-Sent Events (SSE) live terminal logging for transparent run diagnostics.',
      ],
      metrics: [
        { value: '7 Channels', label: 'Parallel Scrapers' },
        { value: 'SSE Live', label: 'Terminal Telemetry' },
        { value: 'CA + US', label: 'Regional Coverage' },
      ],
      stack: ['Node.js', 'Express', 'Puppeteer', 'Cheerio', 'Server-Sent Events', 'JavaScript'],
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
        'Supporting enterprise AI infrastructure initiatives across technology, cybersecurity, and executive financial reporting.',
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
        'Underwrote revenue monetization and automated national portfolio asset management across $1.9Bn of lease-up developments.',
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
        'Built multi-sector DCF valuation models, automated real-time earnings trackers, and cut weekly KPI reporting time by 70%.',
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
        'Ranked in the top 10% of Ted Rogers School of Management students and awarded the TMU Academic Achievement Scholarship in Economics & Management Science.',
    },
    {
      id: 'awd-toastmasters',
      title: 'TMU Toastmasters Finalist',
      organization: 'Toronto Metropolitan University',
      period: '2024',
      badge: 'FINALIST',
      description:
        'Advanced to the university finals delivering persuasive executive speeches and impromptu analytical arguments under live timing.',
    },
    {
      id: 'awd-speaking',
      title: 'Provincial Effective Speaking Contest Winner',
      organization: 'Ontario Provincial Competition',
      period: '2019 – 2023',
      badge: 'PROVINCIAL WINNER',
      description:
        'Multi-year provincial winner recognized for clarity of structure, persuasive delivery, and composure under questioning.',
    },
    {
      id: 'awd-deca',
      title: 'ICDC and Provincial DECA Competitor',
      organization: 'DECA International Career Development Conference',
      period: '2019 – 2022',
      badge: 'ICDC QUALIFIER',
      description:
        'Competed at provincial and international levels solving time-constrained finance and business strategy case studies.',
    },
    {
      id: 'awd-tennis',
      title: 'Competitive Tennis — Former Provincialist',
      organization: 'Ontario Competitive Circuit',
      period: 'Competitive Career',
      badge: 'PROVINCIALIST',
      description:
        'Former provincial-level tennis competitor bringing sustained match focus and disciplined preparation to investing and software engineering.',
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
          label: '2026 Q1',
          value: 82,
          displayValue: '9-Module DCF',
          milestone: 'Financial Terminal',
          detail: 'Python market terminal + Excel DCF exports',
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
