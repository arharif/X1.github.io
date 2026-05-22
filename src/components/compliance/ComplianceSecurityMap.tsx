import { useEffect, useMemo, useState } from 'react';
import { complianceFrameworks } from '@/data/complianceFrameworks';
import { useLocation } from 'react-router-dom';
import { complianceMapNodes, mapCenterId } from '@/data/complianceMap';

const safeNodes = Array.isArray(complianceMapNodes) ? complianceMapNodes : [];

export function ComplianceSecurityMap() {
  const center = safeNodes.find((n) => n.id === mapCenterId) ?? safeNodes[0];
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(center?.id ?? '');


  useEffect(() => {
    const hash = location.hash?.replace('#', '').trim();
    if (!hash) return;
    const exists = safeNodes.some((n) => n.id === hash);
    if (exists) setSelectedId(hash);
  }, [location.hash]);

  const selected = useMemo(() => safeNodes.find((n) => n.id === selectedId) ?? center, [selectedId, center]);
  const layers = useMemo(() => safeNodes.filter((n) => n.type === 'layer'), []);

  const frameworkLookup = useMemo(() => {
    const map = new Map(complianceFrameworks.map((f) => [f.id, f]));
    map.set('nist-csf', complianceFrameworks.find((f) => f.id === 'nist-csf-2')!);
    map.set('cis-controls', complianceFrameworks.find((f) => f.id === 'cis-v8-1')!);
    map.set('cobit-2019', complianceFrameworks.find((f) => f.id === 'cobit-2019')!);
    return map;
  }, []);

  const selectedFramework = selected?.type === 'framework' ? frameworkLookup.get(selected.id) : undefined;

  return (
    <section className="space-y-4">
      <div className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Unified Compliance & Security Map</h2>
        <p className="mt-2 text-sm text-muted">Visualize how governance, cybersecurity, privacy, resilience, AI governance, payment security, audit, and professional certifications connect into one unified security maturity model.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <div className="glass rounded-2xl p-4">
          <div className="mb-4 flex justify-center">
            <button className={`rounded-full border px-4 py-2 text-sm font-semibold ${selected?.id===center?.id?'bg-cyan-300/20 border-cyan-300/40':'bg-white/10 border-white/20'}`} onClick={() => setSelectedId(center?.id ?? '')} aria-label="Select central unified compliance framework node">{center?.label ?? 'Unified Compliance Framework'}</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {layers.map((layer) => (
              <div key={layer.id} className="rounded-xl border border-white/15 bg-white/5 p-3">
                <button onClick={() => setSelectedId(layer.id)} className={`w-full rounded-full px-3 py-1.5 text-left text-sm ${selected?.id===layer.id?'bg-violet-400/20':'bg-white/10 hover:bg-white/15'}`} aria-label={`Select ${layer.label} layer node`}>
                  {layer.label}
                </button>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {safeNodes.filter((n) => n.layer === layer.label).map((child) => (
                    <button key={child.id} onClick={() => setSelectedId(child.id)} className={`rounded-full border px-2 py-1 text-xs ${selected?.id===child.id?'border-cyan-300/50 bg-cyan-300/20':'border-white/20 bg-white/5 hover:bg-white/10'}`} aria-label={`Select ${child.label} ${child.type} node`}>
                      {child.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass rounded-2xl p-4">
          <h3 className="text-xl font-semibold">{selected?.label ?? 'Node details'}</h3>
          <p className="mt-2 text-sm text-muted">{selected?.description ?? 'No details available.'}</p>
          <div className="mt-3 space-y-2 text-sm">
            {selectedFramework ? (
              <>
                <p><strong>Definition:</strong> {selectedFramework.definition}</p>
                <p><strong>Purpose:</strong> {(selectedFramework.purpose ?? []).map((p) => p.explanation).join(' · ') || 'No data available.'}</p>
                <p><strong>Scope:</strong> {(selectedFramework.scope ?? []).map((s) => s.description).join(' · ') || 'No data available.'}</p>
                <p><strong>Key domains:</strong> {(selectedFramework.domains ?? []).map((d) => d.name).join(' · ') || 'No data available.'}</p>
                <p><strong>Key requirements:</strong> {(selectedFramework.keyRequirements ?? []).map((r) => r.requirement).join(' · ') || 'No data available.'}</p>
                <p><strong>KPIs / KRIs:</strong> {(selectedFramework.metrics ?? []).map((m) => `${m.metric} (${m.type})`).join(' · ') || 'No data available.'}</p>
                <p><strong>Cheat sheet:</strong> {selectedFramework.cheatSheet ?? 'No data available.'}</p>
                <p><strong>Best role:</strong> {selectedFramework.modelRole ?? 'No data available.'}</p>
              </>
            ) : (
              <>
                <p><strong>Definition:</strong> {selected?.details?.definition ?? 'No data available.'}</p>
                <p><strong>Layer purpose:</strong> {(selected?.details?.purpose ?? []).join(' · ') || 'No data available.'}</p>
                <p><strong>Frameworks:</strong> {(selected?.details?.frameworks ?? []).join(' · ') || 'No data available.'}</p>
                <p><strong>Certifications:</strong> {(selected?.details?.certifications ?? []).join(' · ') || 'No data available.'}</p>
                <p><strong>Best for:</strong> {selected?.details?.bestFor ?? 'No data available.'}</p>
                <p><strong>Career path:</strong> {selected?.details?.careerPath ?? 'No data available.'}</p>
                <p><strong>Main domains:</strong> {(selected?.details?.domains ?? []).join(' · ') || 'No data available.'}</p>
                <p><strong>Suggested priority:</strong> {selected?.details?.suggestedPriority ?? 'No data available.'}</p>
                <p><strong>Why this matters:</strong> {selected?.details?.whyMatters ?? 'No data available.'}</p>
                <p><strong>Use cases:</strong> {(selected?.details?.useCases ?? []).join(' · ') || 'No data available.'}</p>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
