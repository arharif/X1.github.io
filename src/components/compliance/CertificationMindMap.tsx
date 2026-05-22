import { useMemo, useState } from 'react';
import { certificationTracks, certifications, recommendedRoadmap } from '@/data/certifications';

const safeTracks = Array.isArray(certificationTracks) ? certificationTracks : [];
const safeCerts = Array.isArray(certifications) ? certifications : [];

export function CertificationMindMap() {
  const [selectedCertId, setSelectedCertId] = useState(safeCerts[0]?.id ?? '');
  const selected = useMemo(() => safeCerts.find((c) => c.id === selectedCertId) ?? safeCerts[0], [selectedCertId]);

  return (
    <section id="certification-mind-map" className="space-y-4">
      <div className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">Certification Mind Map</h2>
        <p className="mt-2 text-sm text-muted">Visualize how cybersecurity, GRC, privacy, AI governance, cloud, audit, resilience, and leadership certifications support different career paths.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="glass rounded-2xl p-4">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full border border-cyan-300/40 bg-cyan-300/15 px-5 py-2 text-sm font-semibold">Cybersecurity Certification Roadmap</div>
          </div>

          {safeTracks.length === 0 ? (
            <div className="rounded-xl bg-white/5 p-3 text-sm text-muted">No certification tracks available.</div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {safeTracks.map((track) => (
                <div key={track.id} className="rounded-xl border border-white/15 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-cyan-100">{track.title}</p>
                  <p className="mt-1 text-xs text-muted">{track.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(track.certifications ?? []).map((certId) => {
                      const cert = safeCerts.find((c) => c.id === certId);
                      if (!cert) return null;
                      const active = selected?.id === cert.id;
                      return (
                        <button
                          key={cert.id}
                          onClick={() => setSelectedCertId(cert.id)}
                          className={`rounded-full border px-2 py-1 text-xs ${active ? 'border-cyan-300/55 bg-cyan-300/20' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
                          aria-label={`Select certification ${cert.name}`}
                        >
                          {cert.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="glass rounded-2xl p-4">
          <h3 className="text-xl font-semibold">{selected?.name ?? 'Certification details'}</h3>
          <div className="mt-3 space-y-2 text-sm">
            <p><strong>Definition:</strong> {selected?.definition ?? 'No data available.'}</p>
            <p><strong>Best for:</strong> {selected?.bestFor ?? 'No data available.'}</p>
            <p><strong>Career path:</strong> {selected?.careerPath ?? 'No data available.'}</p>
            <p><strong>Main domains:</strong> {(selected?.domains ?? []).join(' · ') || 'No data available.'}</p>
            <p><strong>What this certification helps you prove:</strong> {selected?.objective ?? 'Advance practical and governance-ready cybersecurity capabilities.'}</p>
            <p><strong>Recommended profile fit:</strong> {selected?.bestFor ?? 'No data available.'}</p>
            <p><strong>Recommended priority:</strong> {selected?.priority ? `${selected.priority}/8` : 'Context-dependent'} {selected?.priorityReason ? `— ${selected.priorityReason}` : ''}</p>
          </div>

          <div className="mt-4 rounded-xl border border-violet-300/25 bg-violet-500/10 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-100">Recommended roadmap for this profile</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-muted">
              {(recommendedRoadmap ?? []).map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
