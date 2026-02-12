export interface Experience {
  period: string
  role: string
  company: string
  description: string
}

export interface System {
  name: string
  description: string
  tech: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export const personalInfo = {
  name: "Danny Yanko",
  title: "Solutions Architect & Systems Builder",
  email: "danny@djy89.net",
  website: "djy89.net",
}

export const experience: Experience[] = [
  {
    period: "2022 — Present",
    role: "Solutions Architect & Marketing Manager",
    company: "Mixed Sweet Media",
    description: "Build AI-powered automation systems and lead marketing operations for enterprise clients including Parkland and Canada Beef. Delivered 200+ training videos, achieved 615% campaign ROI, and created systems generating 20:1 efficiency gains.",
  },
  {
    period: "2017 — 2019",
    role: "Marketing Manager & IT Support",
    company: "Summit Kids",
    description: "Managed full marketing operations and cross-functional project coordination. Authored 50+ SOPs to systematize workflows. Coordinated multi-site initiatives and stakeholder alignment.",
  },
  {
    period: "2011 — 2022",
    role: "Independent Creative & Systems Builder",
    company: "Consulting",
    description: "Built marketing operations for clients across healthcare, energy, and tech. Delivered multilingual platforms, achieved 6:1 ROI on SEO/PPC campaigns, and opened 4 new B2B distribution channels.",
  },
]

export const systems: System[] = [
  {
    name: "International Trading Platform",
    description: "Full-stack rebuild of B2B2C trading platform. 52-table normalized schema, 3.7M+ production rows, multi-currency support, and regulatory compliance across jurisdictions.",
    tech: ["React", "Node.js", "TypeScript", "SQL Server"],
  },
  {
    name: "Enterprise Analytics Dashboard",
    description: "Real-time analytics for 2000+ fuel station locations with RBAC, territory management, and performance leaderboards for Parkland/Sunoco.",
    tech: ["React", "Supabase", "PostgreSQL", "Row-Level Security"],
  },
  {
    name: "AI Email Triage System",
    description: "Production system processing Office 365 emails through Claude AI for intelligent categorization, then routing to Asana with proper project assignment.",
    tech: ["Node.js", "Claude API", "Microsoft Graph", "Asana API"],
  },
]

export const skills: SkillGroup[] = [
  { category: "AI & Automation", items: ["Claude API", "OpenAI API", "Prompt Engineering", "Multi-Agent Systems", "CrewAI"] },
  { category: "Development", items: ["TypeScript", "Python", "JavaScript", "PowerShell", "SQL"] },
  { category: "Frameworks", items: ["Next.js", "React", "Node.js", "Supabase"] },
  { category: "Marketing Tech", items: ["HubSpot", "Google Analytics", "Marketo", "Salesforce"] },
  { category: "Infrastructure", items: ["Linux/Debian", "WireGuard", "AWS SES", "Vercel", "PostgreSQL"] },
  { category: "Tools", items: ["Git", "Asana", "Notion", "Final Cut Pro", "Figma"] },
]
