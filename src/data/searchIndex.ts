import { complianceFrameworks } from '@/data/complianceFrameworks';

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'framework' | 'article' | 'game' | 'security';
  path: string;
  keywords?: string[];
};

const pageIndex: SearchItem[] = [
  { id: 'landing', title: 'Landing', description: 'Main entry page with two universes.', type: 'page', path: '/', keywords: ['home'] },
  { id: 'tech', title: 'Technology & Innovation', description: 'Professional technology and cybersecurity content.', type: 'page', path: '/professional', keywords: ['ai', 'cybersecurity'] },
  { id: 'personal', title: 'Curiosities & Philosophy', description: 'Personal reflections and philosophy posts.', type: 'page', path: '/personal', keywords: ['philosophy', 'curiosity'] },
  { id: 'security-map', title: 'Security Map', description: 'Explore security domains in a visual map.', type: 'security', path: '/security-mindmap', keywords: ['mindmap', 'security'] },
  { id: 'compliance', title: 'Compliance Frameworks', description: 'Structured framework summaries and unified model.', type: 'framework', path: '/compliance-frameworks', keywords: ['grc', 'governance'] },
  { id: 'submitting', title: 'Submitting', description: 'Submit your article for review.', type: 'page', path: '/submitting', keywords: ['contribute'] },
  { id: 'games', title: 'Games', description: 'Interactive games hub.', type: 'game', path: '/games', keywords: ['play'] },
  { id: 'admin', title: 'Admin Login', description: 'Admin authentication and content management.', type: 'page', path: '/login', keywords: ['admin', 'login'] },
];

const frameworkIndex: SearchItem[] = complianceFrameworks.map((f) => ({
  id: `framework-${f.id}`,
  title: f.name || 'Untitled',
  description: f.shortDescription || 'No description available',
  type: 'framework',
  path: `/compliance-frameworks#${f.id}`,
  keywords: [f.fullName, f.category, f.cheatSheet, ...f.domains.map((d) => d.name)].filter(Boolean),
}));


const certificationTerms = [
  'CISSP','CISM','CISA','CRISC','CGEIT','CCSP','ISO 27001 Lead Implementer','ISO 27001 Lead Auditor','ISO 22301 Lead Implementer','ISO 22301 Lead Auditor','CIPP/E','CIPM','AIGP','ISO 42001 Lead Implementer','ISO 42001 Lead Auditor','Security+','CySA+','CASP+','SecurityX','CEH','OSCP','CDPSE','ITIL 4 Foundation','ITIL','PMP','TOGAF'
];

const certificationIndex: SearchItem[] = certificationTerms.map((name) => ({
  id: `cert-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  title: name,
  description: 'Certification path in the Unified Compliance & Security Map.',
  type: 'security',
  path: `/compliance-frameworks#${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  keywords: ['certification', 'career path', 'compliance map', name],
}));

export const searchIndex: SearchItem[] = [...pageIndex, ...frameworkIndex, ...certificationIndex];
