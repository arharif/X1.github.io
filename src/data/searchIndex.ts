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
  { id: 'landing', title: 'Landing', description: 'Main entry page with featured exploration cards.', type: 'page', path: '/', keywords: ['home'] },
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


const certificationIndex: SearchItem[] = [
  { id: 'cert-security-plus', title: 'CompTIA Security+', description: 'Foundation certification path.', type: 'security', path: '/compliance-frameworks#cert-security-plus', keywords: ['certification', 'foundation', 'comptia'] },
  { id: 'cert-isc2-cc', title: 'ISC2 CC', description: 'Entry-level cybersecurity certification.', type: 'security', path: '/compliance-frameworks#cert-isc2-cc', keywords: ['certification', 'foundation', 'isc2'] },
  { id: 'cert-cysa-plus', title: 'CySA+', description: 'Blue team and SOC certification path.', type: 'security', path: '/compliance-frameworks#cert-cysa-plus', keywords: ['soc', 'blue team', 'certification'] },
  { id: 'cert-cissp', title: 'CISSP', description: 'Advanced leadership and architecture certification.', type: 'security', path: '/compliance-frameworks#cert-cissp', keywords: ['leadership', 'architecture', 'certification'] },
  { id: 'cert-cism', title: 'CISM', description: 'Information security management certification.', type: 'security', path: '/compliance-frameworks#cert-cism', keywords: ['management', 'isaca', 'certification'] },
  { id: 'cert-cisa', title: 'CISA', description: 'Audit and assurance certification.', type: 'security', path: '/compliance-frameworks#cert-cisa', keywords: ['audit', 'assurance', 'certification'] },
  { id: 'cert-crisc', title: 'CRISC', description: 'Risk management certification.', type: 'security', path: '/compliance-frameworks#cert-crisc', keywords: ['grc', 'risk', 'certification'] },
  { id: 'cert-ccsp', title: 'CCSP', description: 'Cloud security certification path.', type: 'security', path: '/compliance-frameworks#cert-ccsp', keywords: ['cloud security', 'certification'] },
  { id: 'cert-iso-27001-lead-auditor', title: 'ISO 27001 Lead Auditor', description: 'ISMS audit certification.', type: 'security', path: '/compliance-frameworks#cert-iso-27001-lead-auditor', keywords: ['iso', 'audit', 'certification'] },
  { id: 'cert-iso-27001-lead-implementer', title: 'ISO 27001 Lead Implementer', description: 'ISMS implementation certification.', type: 'security', path: '/compliance-frameworks#cert-iso-27001-lead-implementer', keywords: ['iso', 'implementer', 'certification'] },
  { id: 'cert-iso-22301-lead-implementer', title: 'ISO 22301 Lead Implementer', description: 'Business continuity certification path.', type: 'security', path: '/compliance-frameworks#cert-iso-22301-lead-implementer', keywords: ['resilience', 'business continuity', 'certification'] },
  { id: 'cert-cippe', title: 'CIPP/E', description: 'Privacy and data protection certification.', type: 'security', path: '/compliance-frameworks#cert-cippe', keywords: ['privacy', 'gdpr', 'certification'] },
];

export const searchIndex: SearchItem[] = [...pageIndex, ...frameworkIndex, ...certificationIndex];
