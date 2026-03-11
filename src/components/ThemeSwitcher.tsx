import { ThemeMode } from '@/lib/theme';

export function ThemeSwitcher({ mode, onChange }: { mode: ThemeMode; onChange: (m: ThemeMode) => void }) {
  return (
    <div className="glass inline-flex rounded-full p-1 text-xs" role="group" aria-label="Theme selector">
      {(['dark', 'light', 'purple', 'rainbow'] as ThemeMode[]).map((theme) => (
        <button
          key={theme}
          onClick={() => onChange(theme)}
          aria-pressed={mode === theme}
          aria-label={`Activate ${theme} theme`}
          className={`rounded-full px-3 py-1 capitalize transition ${mode === theme ? 'bg-white/20' : 'hover:bg-white/10'}`}
        >
          {theme}
        </button>
      ))}
    </div>
  );
}
