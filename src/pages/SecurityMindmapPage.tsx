import { Link } from 'react-router-dom';
import { SecurityRolesMap } from '@/components/security-map/SecurityRolesMap';
import { categoryFamilies } from '@/data/securityMap';

export function SecurityMindmapPage() {
  return (
    <section className="space-y-6">
      <div className="mindmap-hero rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/90">Flagship Experience</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Security Map</h1>
        <p className="mt-3 max-w-4xl text-sm text-slate-200/90 md:text-base">
          Full Cybersecurity Roles Map: explore domain families, subdomains, and roles in one structured, interactive atlas built for executive and technical audiences.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href="#security-roles-map" className="mindmap-cta">Explore Roles Map</a>
          <Link to="/professional" className="mindmap-ghost">Professional Universe</Link>
          <Link to="/games" className="mindmap-ghost">Games</Link>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Category Color Families</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {categoryFamilies.map((category) => (
            <span key={category.id} className="mindmap-tag" style={{ borderColor: category.color.ring, color: category.color.text }}>{category.label}</span>
          ))}
        </div>
      </div>

      <div id="security-roles-map" className="space-y-4">
        <SecurityRolesMap />
      </div>
    </section>
  );
}
