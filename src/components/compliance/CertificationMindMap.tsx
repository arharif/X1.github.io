import { useMemo, useState } from 'react';
import { certifications } from '@/data/certifications';

const safeArray = <T,>(value: T[] | undefined | null): T[] => (Array.isArray(value) ? value : []);

export function CertificationMindMap() {
  const certs = safeArray(certifications);
  const [selectedCertId, setSelectedCertId] = useState(certs[0]?.id ?? '');
  const selected = useMemo(() => certs.find((c) => c.id === selectedCertId) ?? certs[0] ?? null, [selectedCertId, certs]);

  return (
    <section id="certification-mind-map" className="space-y-4">
      <div className="glass rounded-2xl p-5">
        <h2 className="text-2xl font-semibold">Certification Mind Map</h2>
        <p className="mt-2 text-sm text-muted">Select a certification to review deep, profile-aligned guidance for governance, audit, resilience, privacy, and AI governance growth.</p>
      </div>

      {certs.length === 0 ? (
        <div className="glass rounded-2xl p-4 text-sm text-muted">No certifications available.</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <div className="glass rounded-2xl p-4">
            <div className="flex flex-wrap gap-2">
              {certs.map((cert) => {
                const active = selected?.id === cert.id;
                return (
                  <button
                    key={cert.id}
                    id={cert.id}
                    onClick={() => setSelectedCertId(cert.id)}
                    aria-label={`Select certification ${cert.name}`}
                    className={`rounded-full border px-3 py-1.5 text-xs focus-visible:outline-none ${
                      active ? 'border-cyan-300/60 bg-cyan-300/20' : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {cert.name}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="glass rounded-2xl p-4 text-sm">
            <h3 className="text-xl font-semibold">{selected?.name ?? 'Certification details'}</h3>
            <div className="mt-3 space-y-2">
              <p><strong>Definition:</strong> {selected?.definition ?? 'No data available.'}</p>
              <p><strong>Best for:</strong> {selected?.bestFor ?? 'No data available.'}</p>
              <p><strong>Career path:</strong> {selected?.careerPath ?? 'No data available.'}</p>
              <p><strong>Main domains:</strong> {safeArray(selected?.domains).join(' · ') || 'No data available.'}</p>
              <p><strong>What this certification covers:</strong> {safeArray(selected?.covers).join(' · ') || 'No data available.'}</p>
              <p><strong>What knowledge you gain:</strong> {safeArray(selected?.knowledgeGained).join(' · ') || 'No data available.'}</p>
              <p><strong>Practical use cases:</strong> {safeArray(selected?.practicalUseCases).join(' · ') || 'No data available.'}</p>
              <p><strong>How it supports GRC/CISO/audit/privacy/resilience/AI governance:</strong> {selected?.supportAreas ?? 'No data available.'}</p>
              <p><strong>Recommended profile fit:</strong> {selected?.profileFit ?? 'No data available.'}</p>
              <p><strong>Priority:</strong> {selected?.priority ? `${selected.priority}/8` : 'Context-dependent'} {selected?.priorityReason ? `— ${selected.priorityReason}` : ''}</p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
