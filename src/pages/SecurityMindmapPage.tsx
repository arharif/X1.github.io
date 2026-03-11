import { SecurityRolesMap } from '@/components/security-map/SecurityRolesMap';
import { cyberOperatingModelSections } from '@/data/cyberOperatingModel';
import { OrgNode } from '@/types/securityRoles';

function OperatingTree({ node }: { node: OrgNode }) {
  return (
    <li className="pl-4">
      <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">{node.title}</div>
      {node.children && node.children.length > 0 && (
        <ul className="mt-2 space-y-2 border-l border-white/10 pl-3">
          {node.children.map((child) => (
            <OperatingTree key={`${node.title}-${child.title}`} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function SecurityMindmapPage() {
  return (
    <section className="space-y-3">
      <div className="mindmap-hero rounded-3xl p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">Security Map</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-200/90">
              Explore each cybersecurity domain to understand what it covers, the core requirements, and the practical skills needed to grow in that area.
            </p>
          </div>
          <p className="mindmap-chip">Interactive overview</p>
        </div>
      </div>

      <SecurityRolesMap />

      <section className="glass rounded-2xl p-4 md:p-5" aria-label="Cybersecurity operating model">
        <h2 className="text-xl font-semibold">Cybersecurity Operating Model</h2>
        <p className="mt-1 text-sm text-muted">Executive-friendly organizational hierarchy for leadership, delivery functions, and independent assurance.</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {cyberOperatingModelSections.map((section) => (
            <article key={section.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-300">{section.title}</h3>
              <ul className="mt-3 space-y-2 border-l border-white/10 pl-2">
                <OperatingTree node={section.root} />
              </ul>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
