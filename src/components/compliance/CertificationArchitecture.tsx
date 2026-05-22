import { useMemo, useState } from 'react';
import {
  certifications,
  certificationTracks,
  type Certification,
  type CertificationTrack,
} from '@/data/certifications';

const safeArray = <T,>(value: T[] | undefined | null): T[] => (Array.isArray(value) ? value : []);

export function CertificationArchitecture() {
  const certs = safeArray(certifications);
  const tracks = safeArray(certificationTracks);
  const [selectedId, setSelectedId] = useState(certs[0]?.id ?? '');

  const selectedCertification = useMemo(
    () => certs.find((item) => item.id === selectedId) ?? certs[0] ?? null,
    [certs, selectedId],
  );

  const roadmap = useMemo(() => certs.filter((c) => c.priority).sort((a,b)=>(a.priority??99)-(b.priority??99)), [certs]);
  const certMap = useMemo(() => new Map(certs.map((c) => [c.id, c])), [certs]);

  return (
    <section id="certification-architecture" className="space-y-4">
      <div className="glass rounded-2xl p-5">
        <h2 className="text-2xl font-semibold">Certification Architecture</h2>
        <p className="mt-2 text-sm text-muted">Select a certification to explore its definition, domains, chapters, practical value, and recommended fit for GRC, audit, resilience, privacy, AI governance, and CISO-track development.</p>
      </div>
      {certs.length === 0 ? <div className="glass rounded-2xl p-4 text-sm text-muted">No certifications available.</div> : (
      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <div className="glass rounded-2xl p-4 space-y-4">
          <div className="flex justify-center"><span className="rounded-full border border-cyan-300/40 bg-cyan-300/15 px-4 py-1.5 text-xs font-semibold">Cybersecurity Certification Roadmap</span></div>
          <div className="flex flex-wrap gap-2">
            {roadmap.map((item) => <button key={`path-${item.id}`} onClick={() => setSelectedId(item.id)} className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-xs">P{item.priority}: {item.name}</button>)}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {tracks.map((track: CertificationTrack) => (
              <div key={track.id} className="rounded-xl border border-white/15 bg-white/5 p-3">
                <p className="text-sm font-semibold text-cyan-100">{track.title}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {safeArray(track.certifications).map((certId) => {
                    const cert = certMap.get(certId);
                    if (!cert) return null;
                    const active = cert.id === selectedCertification?.id;
                    return <button key={cert.id} onClick={() => setSelectedId(cert.id)} aria-label={`Select certification ${cert.name}`} className={`rounded-full border px-2 py-1 text-xs ${active ? 'border-violet-300/60 bg-violet-300/20' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>{cert.name}{cert.priority ? <span className="ml-1 text-[10px] text-cyan-200">P{cert.priority}</span> : null}</button>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass rounded-2xl p-4 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{selectedCertification?.name ?? 'Certification details'}</h3>
            {selectedCertification?.category ? <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{selectedCertification.category}</span> : null}
            {selectedCertification?.priority ? <span className="rounded-full bg-cyan-300/20 px-2 py-0.5 text-xs text-cyan-100">Priority {selectedCertification.priority}</span> : null}
          </div>
          <div className="mt-3 space-y-2">
            <p><strong>Definition:</strong> {selectedCertification?.definition ?? 'No data available.'}</p>
            <p><strong>Best for:</strong> {selectedCertification?.bestFor ?? 'No data available.'}</p>
            <p><strong>Career path:</strong> {selectedCertification?.careerPath ?? 'No data available.'}</p>
            <div><strong>Domain / chapter names:</strong><div className="mt-1 flex flex-wrap gap-1.5">{safeArray(selectedCertification?.domains).map((d)=><span key={d} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{d}</span>)}</div></div>
            <p><strong>What this certification covers:</strong> {safeArray(selectedCertification?.covers).join(' · ') || 'No data available.'}</p>
            <p><strong>Knowledge gained:</strong> {safeArray(selectedCertification?.knowledgeGained).join(' · ') || 'No data available.'}</p>
            <p><strong>Practical value:</strong> {selectedCertification?.practicalValue ?? 'No data available.'}</p>
            <p><strong>Recommended profile fit:</strong> {selectedCertification?.profileFit ?? 'No data available.'}</p>
            <p><strong>Suggested learning outcome:</strong> {selectedCertification?.learningOutcome ?? 'No data available.'}</p>
            {selectedCertification?.priorityReason ? <p><strong>Why recommended:</strong> {selectedCertification.priorityReason}</p> : null}
          </div>
        </aside>
      </div>)}
    </section>
  );
}
