import { ThemeMode } from '@/lib/theme';

export function ThemeMotionBackground({ mode }: { mode: ThemeMode }) {
  return (
    <div className={`theme-motion-bg theme-bg-${mode}`} aria-hidden="true">
      <span className="theme-motion-bg__glow" />
      <span className="theme-motion-bg__stars" />
      <span className="theme-motion-bg__particles" />
    </div>
  );
}
