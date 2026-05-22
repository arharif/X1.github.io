import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchIndex } from '@/data/searchIndex';

const safeIndex = Array.isArray(searchIndex) ? searchIndex : [];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const nav = useNavigate();

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (value.length < 2) return [];
    return safeIndex
      .filter((item) => [item.title, item.description, item.type, ...(item.keywords ?? [])].join(' ').toLowerCase().includes(value))
      .slice(0, 8);
  }, [query]);

  const showPanel = focused;

  return (
    <div className="relative mx-auto mb-6 w-full max-w-2xl">
      <div className="glass flex items-center gap-2 rounded-2xl px-3 py-2">
        <Search size={16} className="text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
          onKeyDown={(e) => { if (e.key === 'Escape') { setQuery(''); setFocused(false); } }}
          aria-label="Search content"
          placeholder="Search frameworks, security concepts, articles, games…"
          className="w-full border-0 bg-transparent text-sm outline-none"
        />
      </div>
      {showPanel && (
        <div className="glass absolute left-0 right-0 top-[calc(100%+8px)] z-40 max-h-80 overflow-auto rounded-2xl p-2">
          {query.trim().length < 2 ? (
            <p className="px-2 py-2 text-xs text-muted">Try searching: ISO 27001, PCI DSS, GDPR, Security Map…</p>
          ) : results.length === 0 ? (
            <p className="px-2 py-2 text-xs text-muted">No results found.</p>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { nav(item.path || '/'); setFocused(false); setQuery(''); }}
                className="mb-1 block w-full rounded-xl px-3 py-2 text-left hover:bg-white/10"
              >
                <p className="text-sm font-medium">{item.title || 'Untitled'}</p>
                <p className="text-xs text-muted">{item.description || 'No description available'}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
