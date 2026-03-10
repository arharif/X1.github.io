import { useMemo, useRef, useState } from 'react';
import { securityMapData } from '@/data/securityMap';
import { SecurityMapFilters } from './SecurityMapFilters';
import { filterEdges, filterNodes, FilterState } from './filters';
import { SecurityMapDetailPanel } from './SecurityMapDetailPanel';

const viewWidth = 2040;
const viewHeight = 6800;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function SecurityRolesMap() {
  const [filters, setFilters] = useState<FilterState>({ category: 'all', search: '', showRoles: true, showSubdomains: true, coreRolesOnly: false });
  const [activeId, setActiveId] = useState<string>('category-executive-governance');
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [scale, setScale] = useState(0.33);
  const [offset, setOffset] = useState({ x: 80, y: -120 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const visibleNodes = useMemo(() => filterNodes(securityMapData, filters), [filters]);
  const visibleEdges = useMemo(() => filterEdges(visibleNodes, securityMapData.edges), [visibleNodes]);
  const nodeMap = useMemo(() => new Map(visibleNodes.map((node) => [node.id, node])), [visibleNodes]);

  const activeNode = nodeMap.get(activeId) || visibleNodes[0];

  const connectedIds = useMemo(() => {
    const target = hoverId || activeNode?.id;
    if (!target) return new Set<string>();
    const set = new Set<string>();
    visibleEdges.forEach((edge) => {
      if (edge.source === target) set.add(edge.target);
      if (edge.target === target) set.add(edge.source);
    });
    return set;
  }, [hoverId, activeNode?.id, visibleEdges]);

  const fitView = () => {
    if (!visibleNodes.length) return;
    const xs = visibleNodes.map((n) => n.x);
    const ys = visibleNodes.map((n) => n.y);
    const minX = Math.min(...xs) - 120;
    const minY = Math.min(...ys) - 140;
    const maxX = Math.max(...xs) + 120;
    const maxY = Math.max(...ys) + 140;
    const w = maxX - minX;
    const h = maxY - minY;
    const nextScale = clamp(Math.min(1220 / w, 680 / h), 0.24, 1.15);
    setScale(nextScale);
    setOffset({ x: -minX + 80, y: -minY + 60 });
  };

  const resetView = () => {
    setScale(0.33);
    setOffset({ x: 80, y: -120 });
  };

  return (
    <div className="mindmap-shell">
      <SecurityMapFilters
        categories={securityMapData.categories}
        state={filters}
        onChange={setFilters}
        onZoomIn={() => setScale((v) => clamp(v + 0.08, 0.22, 1.2))}
        onZoomOut={() => setScale((v) => clamp(v - 0.08, 0.22, 1.2))}
        onFit={fitView}
        onReset={resetView}
      />

      {visibleNodes.length === 0 && <div className="glass rounded-2xl p-4 text-sm text-muted">No matching nodes. Clear search or broaden filters.</div>}

      <div className="mindmap-layout">
        <div
          className="mindmap-canvas"
          onMouseDown={(e) => { dragRef.current = { x: e.clientX, y: e.clientY }; }}
          onMouseMove={(e) => {
            if (!dragRef.current) return;
            const dx = (e.clientX - dragRef.current.x) / scale;
            const dy = (e.clientY - dragRef.current.y) / scale;
            setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
            dragRef.current = { x: e.clientX, y: e.clientY };
          }}
          onMouseUp={() => { dragRef.current = null; }}
          onMouseLeave={() => { dragRef.current = null; }}
          onWheel={(e) => { e.preventDefault(); setScale((v) => clamp(v + (e.deltaY < 0 ? 0.05 : -0.05), 0.22, 1.2)); }}
          role="img"
          aria-label="Cybersecurity roles map"
        >
          <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="mindmap-svg" preserveAspectRatio="xMinYMin meet">
            <defs>
              <pattern id="roles-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width={viewWidth} height={viewHeight} fill="url(#roles-grid)" opacity="0.65" />
            <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
              {visibleEdges.map((edge) => {
                const s = nodeMap.get(edge.source);
                const t = nodeMap.get(edge.target);
                if (!s || !t) return null;
                const category = securityMapData.categories.find((c) => c.id === edge.categoryId);
                const active = (hoverId || activeNode?.id) && (edge.source === (hoverId || activeNode?.id) || edge.target === (hoverId || activeNode?.id));
                const faded = filters.category !== 'all' && edge.categoryId !== filters.category;
                return <line key={edge.id} x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={active ? 'rgba(255,255,255,.88)' : faded ? 'rgba(100,116,139,.16)' : category?.color.edge || 'rgba(148,163,184,.26)'} strokeWidth={active ? 2.2 : 1.1} />;
              })}

              {visibleNodes.map((node) => {
                const category = securityMapData.categories.find((c) => c.id === node.categoryId);
                const isActive = node.id === activeNode?.id;
                const isHover = node.id === hoverId;
                const connected = connectedIds.has(node.id);
                const faded = filters.category !== 'all' && node.categoryId !== filters.category;
                const opacity = isActive || isHover ? 1 : connected ? 0.95 : faded ? 0.18 : 0.75;
                const radius = node.type === 'category' ? 18 : node.type === 'subdomain' ? 12 : node.coreRole ? 11 : 9;
                const strokeDasharray = node.type === 'subdomain' ? '2 2' : undefined;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="mindmap-node"
                    onMouseEnter={() => setHoverId(node.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => setActiveId(node.id)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveId(node.id); }}
                    aria-label={`${node.type} ${node.label}`}
                  >
                    <circle r={radius} fill={category?.color.fill || '#334155'} opacity={opacity} />
                    <circle r={radius + 6} fill="transparent" stroke={category?.color.ring || '#cbd5e1'} strokeOpacity={isActive || isHover ? 0.9 : 0.3} strokeDasharray={strokeDasharray} />
                    <text x={node.type === 'subdomain' ? -16 : 16} y={4} textAnchor={node.type === 'subdomain' ? 'end' : 'start'} className="mindmap-label" style={{ fill: category?.color.text || '#e2e8f0', opacity }}>{node.label}</text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <SecurityMapDetailPanel node={activeNode} />
      </div>
    </div>
  );
}
