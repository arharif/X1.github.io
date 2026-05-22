import { useMemo, useState } from 'react';
import { certificationAreas, certificationGroups, certifications } from '@/data/certifications';

const safeArray = <T,>(value: T[] | undefined | null): T[] => (Array.isArray(value) ? value : []);

export function CertificationArchitecture() {
  const safeCertifications = safeArray(certifications);
  const [selectedId, setSelectedId] = useState(safeCertifications[0]?.id ?? '');
  const [activeArea, setActiveArea] = useState<(typeof certificationAreas)[number]>('All');
  const [searchValue, setSearchValue] = useState('');

  const filteredCertifications = useMemo(() => {
    const byArea = activeArea === 'All' ? safeCertifications : safeCertifications.filter((item) => item.area === activeArea);
    const normalized = searchValue.trim().toLowerCase();
    if (!normalized || normalized.length < 2) return byArea;
    return byArea.filter((item) => {
      const target = [item.name, item.area, item.level, item.bestFit, item.practicalValue, item.careerPath, item.category, ...safeArray(item.domains)]
        .join(' ')
        .toLowerCase();
      return target.includes(normalized);
    });
  }, [activeArea, safeCertifications, searchValue]);

  const selectedCertification =
    filteredCertifications.find((item) => item.id === selectedId) ?? filteredCertifications[0] ?? safeCertifications[0] ?? null;

  const recommendedSet = useMemo(() => {
    const group = safeArray(certificationGroups).find((item) => item.id === 'recommended-grc-ciso-track');
    const knownIds = new Set(safeCertifications.map((item) => item.id));
    return safeArray(group?.certifications).filter((id) => knownIds.has(id));
  }, [safeCertifications]);

  return (
    <section id="certification-explorer" className="space-y-4">
      <div className="glass rounded-2xl p-5">
        <h2 className="text-2xl font-semibold">Certification Explorer</h2>
        <p className="mt-2 text-sm text-muted">Explore certifications by area, search by keyword, and inspect full exam domains with practical role alignment.</p>
      </div>

      {safeCertifications.length === 0 ? (
        <div className="glass rounded-2xl p-4 text-sm text-muted">No certifications available.</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1.2fr]">
          <div className="glass space-y-4 rounded-2xl p-4">
            <div>
              <input
                aria-label="Search certifications"
                className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm focus-visible:border-cyan-300/70"
                placeholder="Search certifications…"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value.slice(0, 120))}
              />
              <p className="mt-2 text-xs text-muted">Try searching by topic, tag, or keyword.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {certificationAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setActiveArea(area)}
                  className={`rounded-full border px-3 py-1 text-xs ${activeArea === area ? 'border-cyan-300/70 bg-cyan-300/20 text-white' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
                >
                  {area}
                </button>
              ))}
            </div>

            <div className="max-h-[430px] space-y-2 overflow-y-auto pr-1">
              {filteredCertifications.length === 0 ? (
                <p className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-muted">No matching certifications found.</p>
              ) : (
                filteredCertifications.map((certification) => (
                  <button
                    key={certification.id}
                    id={`cert-${certification.id}`}
                    onClick={() => setSelectedId(certification.id)}
                    aria-label={`Select certification ${certification.name}`}
                    className={`w-full rounded-xl border p-3 text-left ${selectedCertification?.id === certification.id ? 'border-cyan-300/60 bg-cyan-400/15' : 'border-white/15 bg-white/5 hover:bg-white/10'}`}
                  >
                    <p className="text-sm font-semibold">{certification.name}</p>
                    <p className="text-xs text-muted">{certification.area} · {certification.level}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          <aside className="glass rounded-2xl p-4 text-sm">
            {!selectedCertification ? (
              <p className="text-muted">Select a certification to view details.</p>
            ) : (
              <div className="space-y-3">
                <div>
                  <h3 className="text-2xl font-semibold">{selectedCertification.name}</h3>
                  <p className="mt-1 text-xs text-cyan-100">{selectedCertification.area} · {selectedCertification.level}</p>
                </div>
                <p><strong>Best fit:</strong> {selectedCertification.bestFit}</p>
                <p><strong>Career path:</strong> {selectedCertification.careerPath}</p>
                <p><strong>Practical value:</strong> {selectedCertification.practicalValue}</p>
                <div>
                  <p><strong>Full domains / exam areas:</strong></p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {safeArray(selectedCertification.domains).map((domain) => (
                      <li key={domain} className="rounded-full border border-violet-300/30 bg-violet-400/15 px-2 py-1 text-xs">{domain}</li>
                    ))}
                  </ul>
                </div>
                {recommendedSet.length > 0 && (
                  <div className="rounded-xl border border-cyan-300/25 bg-cyan-400/10 p-3">
                    <p className="text-sm font-semibold text-cyan-100">Recommended for this profile</p>
                    <p className="mt-1 text-xs text-muted">GRC, PCI, SOC 2, PCA/DR Drill, privacy, AI governance, NIST, ISO, and CISO-track focus.</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {recommendedSet.map((id) => {
                        const item = safeCertifications.find((certification) => certification.id === id);
                        if (!item) return null;
                        return <span key={id} className="rounded-full border border-cyan-300/30 bg-white/10 px-2 py-1 text-xs">{item.name}</span>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
