import { motion } from 'framer-motion';
import {
  BadgeCheck,
  BrainCircuit,
  Building2,
  LockKeyhole,
  Scale,
  ShieldCheck,
  SquareStack,
  Workflow,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  complianceFilters,
  complianceFrameworks,
  type ComplianceFramework,
  type FrameworkCategory,
} from '@/data/complianceFrameworks';
import { CertificationMindMap } from '@/components/compliance/CertificationMindMap';

const layerCards = [
  { title: 'Governance Layer', items: ['COBIT', 'ISO 27001', 'NIST CSF'], icon: Building2 },
  { title: 'Security Control Layer', items: ['ISO 27002', 'NIST 800-53', 'CIS Controls', 'PCI DSS'], icon: ShieldCheck },
  { title: 'Risk Authorization Layer', items: ['NIST RMF'], icon: Workflow },
  { title: 'Privacy Layer', items: ['GDPR', 'ISO 27701'], icon: LockKeyhole },
  { title: 'Resilience Layer', items: ['ISO 22301', 'DORA'], icon: SquareStack },
  { title: 'AI Governance Layer', items: ['NIST AI RMF', 'ISO 42001'], icon: BrainCircuit },
  { title: 'Assurance Layer', items: ['SOC 2', 'Internal Audit', 'Client Requirements'], icon: BadgeCheck },
];

const safeArray = <T,>(value: T[] | undefined | null): T[] => (Array.isArray(value) ? value : []);

export function ComplianceFrameworksPage() {
  const frameworks = safeArray(complianceFrameworks);
  const [activeFilter, setActiveFilter] = useState<(typeof complianceFilters)[number]>('All');
  const [activeId, setActiveId] = useState<string>(frameworks[0]?.id ?? '');

  const filteredFrameworks = useMemo(() => {
    if (activeFilter === 'All') return frameworks;
    return frameworks.filter((f) => f.category === (activeFilter as FrameworkCategory));
  }, [activeFilter, frameworks]);

  const selectedFramework: ComplianceFramework | null = useMemo(
    () => filteredFrameworks.find((f) => f.id === activeId) ?? filteredFrameworks[0] ?? frameworks[0] ?? null,
    [activeId, filteredFrameworks, frameworks],
  );

  return (
    <section className="space-y-6">
      <div className="glass rounded-2xl p-5 md:p-6">
        <h1 className="text-3xl font-semibold">Compliance Frameworks</h1>
        <p className="mt-2 text-sm text-muted">
          Explore cybersecurity, privacy, resilience, AI governance, payment security, audit, and IT governance
          frameworks through structured summaries, implementation guidance, KPIs, and certification paths.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => document.getElementById('frameworks-library')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-white/15 px-3 py-1.5 text-sm"
            aria-label="Explore frameworks section"
          >
            Explore Frameworks
          </button>
          <button
            onClick={() => document.getElementById('certification-mind-map')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm"
            aria-label="View certifications section"
          >
            View Certifications
          </button>
        </div>
      </div>

      <section id="frameworks-library" className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Frameworks Library</h2>
          <p className="text-sm text-muted">
            Compare international security, privacy, resilience, payment, AI governance, and IT governance frameworks
            using a consistent structure.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {complianceFilters.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                activeFilter === chip ? 'bg-white/25' : 'bg-white/10 hover:bg-white/15'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {filteredFrameworks.length === 0 ? (
          <div className="glass rounded-2xl p-4 text-sm text-muted">No frameworks available.</div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredFrameworks.map((item) => (
                <motion.button
                  whileHover={{ y: -3 }}
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`glass rounded-2xl p-5 text-left ${selectedFramework?.id === item.id ? 'border-cyan-300/50' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{item.category}</span>
                    <Scale size={17} className="text-cyan-200" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted">{item.shortDescription}</p>
                  <p className="mt-2 text-xs text-muted">
                    Domains: {safeArray(item.domains).slice(0, 2).map((d) => d.name).join(' · ') || 'N/A'}
                  </p>
                  <p className="mt-2 text-xs text-muted">{item.cheatSheet}</p>
                  <span className="mt-3 inline-block text-sm text-cyan-200">Explore</span>
                </motion.button>
              ))}
            </div>

            <aside className="glass rounded-2xl p-5">
              <h2 className="text-2xl font-semibold">{selectedFramework?.name ?? 'Framework details'}</h2>
              <p className="mt-2 text-sm text-muted">{selectedFramework?.fullName ?? 'No framework selected.'}</p>
              <div className="mt-4 space-y-3 text-sm">
                <p>
                  <strong>Definition:</strong> {selectedFramework?.definition ?? 'No data available.'}
                </p>
                <p>
                  <strong>Cheat Sheet Summary:</strong> {selectedFramework?.cheatSheet ?? 'No data available.'}
                </p>
                <p>
                  <strong>Best Role in Unified Model:</strong> {selectedFramework?.modelRole ?? 'No data available.'}
                </p>
                <p>
                  <strong>Purpose:</strong>{' '}
                  {safeArray(selectedFramework?.purpose)
                    .map((x) => `${x.label}: ${x.explanation}`)
                    .join(' · ') || 'No data available.'}
                </p>
                <p>
                  <strong>Scope:</strong>{' '}
                  {safeArray(selectedFramework?.scope)
                    .map((x) => `${x.area}: ${x.description}`)
                    .join(' · ') || 'No data available.'}
                </p>
                <p>
                  <strong>Domains:</strong>{' '}
                  {safeArray(selectedFramework?.domains)
                    .map((x) => `${x.name} (${x.description})`)
                    .join(' · ') || 'No data available.'}
                </p>
                <p>
                  <strong>Key requirements:</strong>{' '}
                  {safeArray(selectedFramework?.keyRequirements)
                    .map((x) => `${x.requirement} — ${x.practicalMeaning}`)
                    .join(' · ') || 'No data available.'}
                </p>
                <p>
                  <strong>Implementation roadmap:</strong>{' '}
                  {safeArray(selectedFramework?.roadmap)
                    .map((x) => `${x.phase}: ${x.deliverable}`)
                    .join(' → ') || 'No data available.'}
                </p>
                <p>
                  <strong>KPIs / KRIs:</strong>{' '}
                  {safeArray(selectedFramework?.metrics)
                    .map((x) => `${x.metric} (${x.type})`)
                    .join(' · ') || 'No data available.'}
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <CertificationMindMap />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Recommended Certification Roadmap</h2>
        <p className="text-sm text-muted">
          A focused path aligned with GRC, PCI, SOC 2, PCA/DR Drill, privacy, AI governance, NIST, ISO, and CISO-track
          development.
        </p>
        <div className="grid gap-2 md:grid-cols-2">
          {[
            'ISO 27001 Lead Implementer — Strong base for ISMS, controls, risk, and certification projects.',
            'CISM — Best match for security governance and CISO-track thinking.',
            'CRISC — Strengthens IT risk and control management expertise.',
            'CISA — Helps with audit, evidence, SOC 2, control testing, and assurance.',
            'ISO 22301 Lead Implementer — Directly aligned with PCA/DR Drill work.',
            'CIPP/E or CIPM — Useful for privacy, GDPR, and DPO-style governance.',
            'AIGP or ISO 42001 Lead Implementer — Strong choice for AI governance and responsible AI programs.',
            'CISSP — Excellent senior-level certification once broad security foundation is mature.',
          ].map((step, idx) => (
            <div key={step} className="glass rounded-xl p-3 text-sm">
              <span className="mr-2 text-cyan-200">{idx + 1}.</span>
              {step}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Unified Compliance Model Summary</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {layerCards.map((layer) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.title}
                className="glass rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-white/10 to-white/5 p-4"
              >
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Icon size={16} /> {layer.title}
                </p>
                <p className="mt-2 text-xs text-muted">{layer.items.join(' · ')}</p>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
