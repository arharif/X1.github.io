import { motion } from 'framer-motion';
import { Activity, BadgeCheck, Compass, CreditCard, Library, LifeBuoy, LockKeyhole, Network, Shield, ShieldCheck } from 'lucide-react';
import type { ComponentType } from 'react';
import { useMemo, useState } from 'react';

type Framework = {
  id: string;
  name: string;
  category: string;
  filter: 'Security' | 'Privacy' | 'Resilience' | 'Governance' | 'Payment' | 'Assurance' | 'Technical Controls';
  purpose?: string;
  scope?: string;
  applicability?: string;
  keyDomains?: string[];
  mainRequirements?: string[];
  requiredEvidence?: string[];
  controlMapping?: string;
  kpis?: string[];
  roadmap?: string[];
  cheatSheet?: string;
  icon: ComponentType<{ size?: string | number; className?: string }>;
};

const frameworks: Framework[] = [
  { id: 'iso27001', name: 'ISO 27001:2022', category: 'Security Management', filter: 'Security', icon: ShieldCheck, purpose: 'Establish, implement, and continually improve an ISMS.', scope: 'Organization-wide information security governance and controls.', applicability: 'Enterprises seeking certifiable security governance.', keyDomains: ['Context & leadership', 'Risk treatment', 'Annex A controls'], mainRequirements: ['ISMS scope & policy', 'Risk assessment and treatment plan', 'Internal audits and management review'], requiredEvidence: ['Risk register', 'Statement of Applicability', 'Audit reports'], controlMapping: 'Maps strongly to NIST CSF and NIST 800-53 families.', kpis: ['Audit findings closure rate', 'Control effectiveness trend'], roadmap: ['Define scope', 'Perform risk assessment', 'Implement Annex A controls', 'Audit and certification'], cheatSheet: 'Build ISMS, manage risk, prove continuous improvement.' },
  { id: 'nist-csf', name: 'NIST CSF 2.0', category: 'Cybersecurity Maturity', filter: 'Security', icon: Compass, purpose: 'Improve cybersecurity outcomes using outcome-driven functions.', scope: 'Govern, Identify, Protect, Detect, Respond, Recover.', applicability: 'Any organization building cybersecurity maturity.', keyDomains: ['Govern', 'Protect', 'Detect', 'Recover'], mainRequirements: ['Current profile', 'Target profile', 'Improvement plan'], requiredEvidence: ['Profiles', 'Risk decisions', 'Exercise outcomes'], controlMapping: 'Bridges ISO 27001, CIS, and sector regulations.', kpis: ['Mean time to detect', 'Recovery objective attainment'], roadmap: ['Baseline profile', 'Gap analysis', 'Prioritized initiatives'], cheatSheet: 'Use profiles to align cyber outcomes with business risk.' },
  { id: 'nist-800-53', name: 'NIST SP 800-53', category: 'Control Library', filter: 'Technical Controls', icon: Library, purpose: 'Comprehensive catalog of security and privacy controls.', scope: 'Federal-grade control baselines and overlays.', applicability: 'Regulated environments and control-heavy programs.', keyDomains: ['Access control', 'Audit', 'Incident response', 'System integrity'], mainRequirements: ['Control selection', 'Implementation statements', 'Assessment procedures'], requiredEvidence: ['SSP', 'POA&M', 'Assessment results'], controlMapping: 'Detailed source mapping for CSF, ISO, and SOC controls.', kpis: ['Control pass rate', 'POA&M aging'], roadmap: ['Select baseline', 'Tailor controls', 'Assess continuously'], cheatSheet: 'Pick baseline, tailor controls, and assess continuously.' },
  { id: 'pci-dss', name: 'PCI DSS v4.0.1', category: 'Payment Security', filter: 'Payment', icon: CreditCard, purpose: 'Protect cardholder data and secure payment ecosystems.', scope: 'People, processes, and systems in card data environment.', applicability: 'Any entity storing, processing, or transmitting card data.', keyDomains: ['Network security', 'Data protection', 'Vulnerability management'], mainRequirements: ['Segmentation', 'Strong authentication', 'Logging and monitoring'], requiredEvidence: ['ASV scans', 'Pen test reports', 'Access reviews'], controlMapping: 'Supports alignment with ISO and NIST controls.', kpis: ['Critical vuln remediation SLA', 'MFA coverage'], roadmap: ['Define CDE', 'Harden environment', 'Validate compliance'], cheatSheet: 'Secure card data flow end-to-end and validate regularly.' },
  { id: 'soc2', name: 'SOC 2', category: 'Client Assurance', filter: 'Assurance', icon: BadgeCheck, purpose: 'Demonstrate trust controls for service organizations.', scope: 'Trust Services Criteria: Security, Availability, etc.', applicability: 'SaaS and vendors requiring customer assurance.', keyDomains: ['Security', 'Availability', 'Confidentiality'], mainRequirements: ['Control design', 'Control operation over period', 'Independent attestation'], requiredEvidence: ['Policies', 'Tickets', 'Monitoring logs'], controlMapping: 'Often mapped from ISO/NIST control sets.', kpis: ['Control exceptions', 'Change approval compliance'], roadmap: ['Scoping', 'Readiness', 'Type I/II audit'], cheatSheet: 'Show controls are designed well and operate consistently.' },
  { id: 'gdpr', name: 'GDPR', category: 'Privacy', filter: 'Privacy', icon: LockKeyhole, purpose: 'Protect personal data and data subject rights.', scope: 'EU personal data processing activities.', applicability: 'Organizations processing EU residents’ data.', keyDomains: ['Lawful basis', 'Data subject rights', 'Breach notification'], mainRequirements: ['RoPA', 'DPIAs', 'Security of processing'], requiredEvidence: ['Consent records', 'DPIA reports', 'Breach logs'], controlMapping: 'Aligns with ISO privacy/security controls and NIST privacy.', kpis: ['DSAR turnaround time', 'Privacy incident rate'], roadmap: ['Data inventory', 'Gap remediation', 'Operational governance'], cheatSheet: 'Know your data, justify processing, protect rights.' },
  { id: 'dora', name: 'DORA', category: 'Digital Resilience', filter: 'Resilience', icon: Activity, purpose: 'Strengthen ICT risk management in financial entities.', scope: 'ICT governance, incident reporting, resilience testing.', applicability: 'EU financial institutions and critical ICT providers.', keyDomains: ['ICT risk management', 'Incident reporting', 'Third-party oversight'], mainRequirements: ['Resilience testing', 'Major incident handling', 'Provider monitoring'], requiredEvidence: ['ICT risk policies', 'Test reports', 'Vendor assessments'], controlMapping: 'Complements NIS2 and ISO 27001 practices.', kpis: ['Major incident reporting timeliness', 'Third-party risk scores'], roadmap: ['Assess current controls', 'Close resilience gaps', 'Operationalize reporting'], cheatSheet: 'Operational resilience with strong ICT governance and testing.' },
  { id: 'iso22301', name: 'ISO 22301', category: 'Business Continuity', filter: 'Resilience', icon: LifeBuoy, purpose: 'Build and maintain a business continuity management system.', scope: 'Continuity strategy, planning, testing, and improvement.', applicability: 'Organizations needing disruption resilience.', keyDomains: ['Business impact analysis', 'Continuity strategy', 'Exercises'], mainRequirements: ['BIA', 'BC plans', 'Exercise program'], requiredEvidence: ['BIA documents', 'Test outcomes', 'Recovery plans'], controlMapping: 'Pairs with ISO 27001 and DORA resilience objectives.', kpis: ['RTO achievement rate', 'Exercise completion'], roadmap: ['BIA', 'Plan design', 'Test and improve'], cheatSheet: 'Define critical services and prove recoverability.' },
  { id: 'cobit', name: 'COBIT 2019', category: 'IT Governance', filter: 'Governance', icon: Network, purpose: 'Govern and manage enterprise IT with value focus.', scope: 'Governance objectives and management objectives.', applicability: 'Organizations maturing IT governance capabilities.', keyDomains: ['EDM', 'APO', 'BAI', 'DSS', 'MEA'], mainRequirements: ['Governance design factors', 'Process capability targets'], requiredEvidence: ['RACI models', 'Governance metrics', 'Committee records'], controlMapping: 'Governance umbrella across ISO/NIST/CIS implementations.', kpis: ['Governance objective maturity', 'Risk treatment completion'], roadmap: ['Assess governance baseline', 'Target capabilities', 'Track improvement'], cheatSheet: 'Align IT decisions to business value and risk appetite.' },
  { id: 'cis', name: 'CIS Controls v8', category: 'Cyber Hygiene', filter: 'Technical Controls', icon: Shield, purpose: 'Prioritized safeguards to reduce common attack paths.', scope: '18 controls grouped by implementation groups.', applicability: 'Teams seeking practical technical hardening baseline.', keyDomains: ['Asset management', 'Vulnerability management', 'Detection and response'], mainRequirements: ['Control ownership', 'Safeguard implementation', 'Continuous tracking'], requiredEvidence: ['Asset inventories', 'Vuln scan trends', 'EDR coverage reports'], controlMapping: 'Operationally maps to CSF Protect/Detect and ISO controls.', kpis: ['Patch SLA adherence', 'Asset coverage ratio'], roadmap: ['Implement IG1 baseline', 'Expand to IG2/IG3', 'Continuously monitor'], cheatSheet: 'Start with high-impact safeguards and expand by maturity.' },
];

const filters = ['All', 'Security', 'Privacy', 'Resilience', 'Governance', 'Payment', 'Assurance', 'Technical Controls'] as const;

export function ComplianceFrameworksPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');
  const [activeId, setActiveId] = useState(frameworks[0]?.id ?? '');

  const filtered = useMemo(() => (activeFilter === 'All' ? frameworks : frameworks.filter((f) => f.filter === activeFilter)), [activeFilter]);
  const selected = useMemo(() => frameworks.find((f) => f.id === activeId) ?? filtered[0] ?? frameworks[0], [activeId, filtered]);

  return (
    <section className="space-y-6">
      <div className="glass rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Governance & Risk</p>
        <h1 className="mt-2 text-4xl font-semibold">Compliance Frameworks</h1>
        <p className="mt-3 text-muted">Explore leading cybersecurity, privacy, resilience, and governance frameworks through clear summaries, domains, evidence, and implementation guidance.</p>
        <p className="mt-3 text-sm text-muted">This page is designed as a practical knowledge map for understanding what each framework is for, where it applies, what evidence it requires, and how it can support a mature security and compliance program.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((chip) => (
          <button key={chip} onClick={() => setActiveFilter(chip)} className={`rounded-full px-3 py-1.5 text-sm ${activeFilter === chip ? 'bg-white/25' : 'bg-white/10 hover:bg-white/15'}`}>
            {chip}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button whileHover={{ y: -4, scale: 1.01 }} key={item.id} onClick={() => setActiveId(item.id)} className={`glass rounded-2xl p-5 text-left ${selected?.id === item.id ? 'border-cyan-300/50' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{item.category}</span>
                  <Icon size={18} className="text-cyan-200" />
                </div>
                <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-muted">{item.purpose ?? 'Purpose details will be added soon.'}</p>
                <p className="mt-2 text-xs text-muted">Domains: {(item.keyDomains ?? []).slice(0, 3).join(' · ') || 'N/A'}</p>
                <p className="mt-1 text-xs text-muted">Evidence: {(item.requiredEvidence ?? []).slice(0, 2).join(' · ') || 'N/A'}</p>
                <span className="mt-3 inline-block text-sm text-cyan-200">Explore framework</span>
              </motion.button>
            );
          })}
        </div>

        <aside className="glass rounded-2xl p-5">
          <h2 className="text-2xl font-semibold">{selected?.name ?? 'Framework details'}</h2>
          <div className="mt-4 space-y-3 text-sm">
            <p><strong>Purpose:</strong> {selected?.purpose ?? 'No data available.'}</p>
            <p><strong>Scope:</strong> {selected?.scope ?? 'No data available.'}</p>
            <p><strong>Applicability:</strong> {selected?.applicability ?? 'No data available.'}</p>
            <p><strong>Key Domains:</strong> {(selected?.keyDomains ?? []).join(' · ') || 'No data available.'}</p>
            <p><strong>Main Requirements:</strong> {(selected?.mainRequirements ?? []).join(' · ') || 'No data available.'}</p>
            <p><strong>Required Evidence:</strong> {(selected?.requiredEvidence ?? []).join(' · ') || 'No data available.'}</p>
            <p><strong>Control Mapping:</strong> {selected?.controlMapping ?? 'No data available.'}</p>
            <p><strong>KPIs / KRIs:</strong> {(selected?.kpis ?? []).join(' · ') || 'No data available.'}</p>
            <p><strong>Implementation Roadmap:</strong> {(selected?.roadmap ?? []).join(' → ') || 'No data available.'}</p>
            <p><strong>Cheat Sheet Summary:</strong> {selected?.cheatSheet ?? 'No data available.'}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
