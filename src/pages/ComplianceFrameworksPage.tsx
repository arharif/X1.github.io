import { motion } from 'framer-motion';
import { BadgeCheck, BrainCircuit, Building2, CreditCard, LockKeyhole, Scale, ShieldCheck, SquareStack, Workflow } from 'lucide-react';
import { useMemo, useState } from 'react';
import { complianceFilters, complianceFrameworks, ComplianceFramework, FrameworkCategory } from '@/data/complianceFrameworks';
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

const safeList = <T,>(x: T[] | undefined) => (Array.isArray(x) ? x : []);

export function ComplianceFrameworksPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof complianceFilters)[number]>('All');
  const [activeId, setActiveId] = useState<string>(complianceFrameworks[0]?.id ?? '');

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return complianceFrameworks;
    return complianceFrameworks.filter((f) => f.category === activeFilter as FrameworkCategory);
  }, [activeFilter]);

  const selected: ComplianceFramework | undefined = useMemo(
    () => filtered.find((f) => f.id === activeId) ?? filtered[0] ?? complianceFrameworks[0],
    [activeId, filtered],
  );

  return (
    <section className="space-y-6">
      <div className="glass rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">GRC Knowledge Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold">Compliance Frameworks</h1>
        <p className="mt-3 text-muted">Explore leading cybersecurity, privacy, resilience, AI governance, payment security, and IT governance frameworks through structured summaries, domains, evidence, KPIs, and implementation roadmaps.</p>
      </div>

      <section className="space-y-3">
        <div className="glass rounded-2xl p-5">
          <h2 className="text-2xl font-semibold">Frameworks Library</h2>
          <p className="mt-2 text-sm text-muted">Compare international security, privacy, resilience, payment, AI governance, and IT governance frameworks using a consistent structure.</p>
        </div>

      <div className="flex flex-wrap gap-2">
        {complianceFilters.map((chip) => (
          <button key={chip} onClick={() => setActiveFilter(chip)} className={`rounded-full px-3 py-1.5 text-sm ${activeFilter === chip ? 'bg-white/25' : 'bg-white/10 hover:bg-white/15'}`}>
            {chip}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? <div className="glass rounded-2xl p-4 text-sm text-muted">No frameworks available for this filter yet.</div> : (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <motion.button whileHover={{ y: -3 }} key={item.id} onClick={() => setActiveId(item.id)} className={`glass rounded-2xl p-5 text-left ${selected?.id === item.id ? 'border-cyan-300/50' : ''}`}>
                <div className="flex items-center justify-between gap-2"><span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{item.category}</span><Scale size={17} className="text-cyan-200" /></div>
                <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-muted">{item.shortDescription}</p>
                <p className="mt-2 text-xs text-muted">Domains: {safeList(item.domains).slice(0, 2).map((d) => d.name).join(' · ') || 'N/A'}</p>
                <p className="mt-2 text-xs text-muted">{item.cheatSheet}</p>
                <span className="mt-3 inline-block text-sm text-cyan-200">Explore</span>
              </motion.button>
            ))}
          </div>

          <aside className="glass rounded-2xl p-5">
            <h2 className="text-2xl font-semibold">{selected?.name ?? 'Framework details'}</h2>
            <p className="mt-2 text-sm text-muted">{selected?.fullName ?? 'No framework selected.'}</p>
            <div className="mt-4 space-y-3 text-sm">
              <p><strong>Definition:</strong> {selected?.definition ?? 'No data available.'}</p>
              <p><strong>Cheat Sheet Summary:</strong> {selected?.cheatSheet ?? 'No data available.'}</p>
              <p><strong>Best Role in Unified Model:</strong> {selected?.modelRole ?? 'No data available.'}</p>
              <p><strong>Purpose:</strong> {safeList(selected?.purpose).map((x) => `${x.label}: ${x.explanation}`).join(' · ') || 'No data available.'}</p>
              <p><strong>Scope:</strong> {safeList(selected?.scope).map((x) => `${x.area}: ${x.description}`).join(' · ') || 'No data available.'}</p>
              <p><strong>Domains:</strong> {safeList(selected?.domains).map((x) => `${x.name} (${x.description})`).join(' · ') || 'No data available.'}</p>
              <p><strong>Key requirements:</strong> {safeList(selected?.keyRequirements).map((x) => `${x.requirement} — ${x.practicalMeaning}`).join(' · ') || 'No data available.'}</p>
              <p><strong>Implementation roadmap:</strong> {safeList(selected?.roadmap).map((x) => `${x.phase}: ${x.deliverable}`).join(' → ') || 'No data available.'}</p>
              <p><strong>KPIs / KRIs:</strong> {safeList(selected?.metrics).map((x) => `${x.metric} (${x.type})`).join(' · ') || 'No data available.'}</p>
            </div>
          </aside>
        </div>
      )}
      </section>

      <CertificationMindMap />

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Unified Compliance Framework</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {layerCards.map((layer) => {
            const Icon = layer.icon;
            return <div key={layer.title} className="glass rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-white/10 to-white/5 p-4"><p className="flex items-center gap-2 text-sm font-semibold"><Icon size={16} /> {layer.title}</p><p className="mt-2 text-xs text-muted">{layer.items.join(' · ')}</p></div>;
          })}
        </div>
      </div>
    </section>
  );
}
