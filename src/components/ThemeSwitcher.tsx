import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThemeMode } from '@/lib/theme';

const themes: ThemeMode[] = ['dark', 'light', 'purple', 'rainbow', 'egyptian', 'horror'];

const themeMeta: Record<ThemeMode, { label: string; previewClass: string }> = {
  dark: { label: 'Dark theme', previewClass: 'theme-preview theme-preview--dark' },
  light: { label: 'Light theme', previewClass: 'theme-preview theme-preview--light' },
  purple: { label: 'Purple theme', previewClass: 'theme-preview theme-preview--purple' },
  rainbow: { label: 'Rainbow theme', previewClass: 'theme-preview theme-preview--rainbow' },
  'egyptian': { label: 'Egyptian theme', previewClass: 'theme-preview theme-preview--egyptian' },
  horror: { label: 'Horror theme', previewClass: 'theme-preview theme-preview--horror' },
};

export function ThemeSwitcher({ mode, onChange }: { mode: ThemeMode; onChange: (m: ThemeMode) => void }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative" aria-label="Theme selector">
      <button type="button" className="theme-switcher-button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu" aria-label="Open theme selector" title={`Current theme: ${themeMeta[mode].label}`}>
        <Sparkles size={13} aria-hidden="true" />
        <ChevronDown size={13} className={`theme-switcher-chevron ${open ? 'is-open' : ''}`} aria-hidden="true" />
      </button>
      {open ? (
        <div className="theme-switcher-menu" role="menu" aria-label="Theme options">
          {themes.map((theme) => {
            const selected = theme === mode;
            return (
              <button
                key={theme}
                onClick={() => { onChange(theme); setOpen(false); }}
                className={`theme-option-card ${selected ? 'is-selected' : ''}`}
                role="menuitemradio"
                aria-checked={selected}
                aria-label={`Activate ${themeMeta[theme].label}`}
                title={themeMeta[theme].label}
              >
                <span className={themeMeta[theme].previewClass} aria-hidden="true" />
                <span className="theme-option-label">{themeMeta[theme].label.replace(' theme', '')}</span>
                {selected ? <Check size={12} className="theme-swatch-check" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
