import { Check, ChevronDown, Palette } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThemeMode } from '@/lib/theme';

const themes: ThemeMode[] = ['dark', 'light', 'purple', 'rainbow'];

const themeMeta: Record<ThemeMode, { label: string; swatchClass: string }> = {
  dark: { label: 'Dark theme', swatchClass: 'theme-swatch theme-swatch--dark' },
  light: { label: 'Light theme', swatchClass: 'theme-swatch theme-swatch--light' },
  purple: { label: 'Purple theme', swatchClass: 'theme-swatch theme-swatch--purple' },
  rainbow: { label: 'Rainbow theme', swatchClass: 'theme-swatch theme-swatch--rainbow' },
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
      <button
        type="button"
        className="theme-switcher-button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open theme selector"
      >
        <Palette size={14} aria-hidden="true" />
        <span className={themeMeta[mode].swatchClass} aria-hidden="true" />
        <ChevronDown size={14} className={`theme-switcher-chevron ${open ? 'is-open' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="theme-switcher-menu" role="menu" aria-label="Theme options">
          {themes.map((theme) => {
            const selected = theme === mode;
            return (
              <button
                key={theme}
                onClick={() => {
                  onChange(theme);
                  setOpen(false);
                }}
                className={`theme-swatch-button ${selected ? 'is-selected' : ''}`}
                role="menuitemradio"
                aria-checked={selected}
                aria-label={`Activate ${themeMeta[theme].label}`}
                title={themeMeta[theme].label}
              >
                <span className={themeMeta[theme].swatchClass} />
                {selected ? <Check size={12} className="theme-swatch-check" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
