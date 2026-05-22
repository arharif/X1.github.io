import { ChevronDown, Palette } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThemeMode } from '@/lib/theme';

const themes: ThemeMode[] = ['dark', 'light', 'purple', 'rainbow'];

export function ThemeSwitcher({ mode, onChange }: { mode: ThemeMode; onChange: (m: ThemeMode) => void }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative" aria-label="Theme selector">
      <button type="button" className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs capitalize" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu" aria-label="Open theme menu">
        <Palette size={13} /> {mode} <ChevronDown size={13} className={open ? 'rotate-180' : ''} />
      </button>
      {open && (
        <div className="glass absolute right-0 z-50 mt-2 min-w-[140px] rounded-xl p-1.5" role="menu">
          {themes.map((theme) => (
            <button key={theme} onClick={() => { onChange(theme); setOpen(false); }} className={`block w-full rounded-lg px-2.5 py-1.5 text-left text-xs capitalize ${theme === mode ? 'bg-white/20' : 'hover:bg-white/10'}`} role="menuitem" aria-label={`Activate ${theme} theme`}>
              {theme}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
