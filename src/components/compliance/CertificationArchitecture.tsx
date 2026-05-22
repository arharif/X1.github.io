import { useMemo, useState } from 'react';
import {
  certifications,
  certificationTracks,
  type Certification,
  type CertificationTrack,
} from '@/data/certifications';

const safeArray = <T,>(value: T[] | undefined | null): T[] =>
  Array.isArray(value) ? value : [];

export function CertificationArchitecture() {
  const safeCertifications = safeArray(certifications);
  const safeTracks = safeArray(certificationTracks);
  const [selectedId, setSelectedId] = useState(safeCertifications[0]?.id ?? '');

  const selectedCertification =
    safeCertifications.find((item) => item.id === selectedId) ??
    safeCertifications[0] ??
    null;

  const certMap = useMemo(
    () => new Map<string, Certification>(safeCertifications.map((item) => [item.id, item])),
    [safeCertifications],
  );

  const roadmap = useMemo(
    () => safeCertifications.filter((item) => item.priority).sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99)),
    [safeCertifications],
  );

  return (
    <section id="certification-architecture" className="space-y-4">
      <div className="glass rounded-2xl p-5">
        <h2 className="text-2xl font-semibold">Certification Architecture</h2>
        <p className="mt-2 text-sm text-muted">
          Select a certification to explore its definition, domains, chapters, practical value, career path, and why it is recommended.
        </p>
      </div>

      {safeCertifications.length === 0 ? (
        <div className="glass rounded-2xl p-4 text-sm text-muted">No certifications available.</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="glass rounded-2xl p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {roadmap.map((item) => (
                <button
                  key={`priority-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-xs"
                >
                  P{item.priority}: {item.name}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {safeTracks.map((track: CertificationTrack) => (
                <div key={track.id} className="rounded-xl border border-white/15 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-cyan-100">{track.title}</p>
                  <p className="mt-1 text-xs text-muted">{track.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {safeArray(track.certifications).map((certId) => {
                      const cert = certMap.get(certId);
                      if (!cert) return null;
                      const active = cert.id === selectedCertification?.id;
                      return (
                        <button
                          key={cert.id}
                          onClick={() => setSelectedId(cert.id)}
                          aria-label={`Select certification ${cert.name}`}
                          className={`rounded-full border px-2 py-1 text-xs ${
                            active ? 'border-violet-300/60 bg-violet-300/20' : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {cert.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="glass rounded-2xl p-4 text-sm">
            {!selectedCertification ? (
              <p className="text-muted">Select a certification to view details.</p>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold">{selectedCertification.name}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{selectedCertification.category}</span>
                  {selectedCertification.priority ? (
                    <span className="rounded-full bg-cyan-300/20 px-2 py-0.5 text-xs text-cyan-100">Priority {selectedCertification.priority}</span>
                  ) : null}
                </div>
                <div className="mt-3 space-y-2">
                  <p><strong>Definition:</strong> {selectedCertification.definition}</p>
                  <p><strong>Best for:</strong> {selectedCertification.bestFor}</p>
                  <p><strong>Career path:</strong> {selectedCertification.careerPath}</p>
                  <div>
                    <strong>Domains / chapter names:</strong>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {safeArray(selectedCertification.domainsCovered).map((domain) => (
                        <span key={domain} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{domain}</span>
                      ))}
                    </div>
                  </div>
                  <p><strong>Practical value:</strong> {selectedCertification.practicalValue}</p>
                  <p><strong>Why recommended:</strong> {selectedCertification.whyRecommended}</p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
