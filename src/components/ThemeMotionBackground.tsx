import { ThemeMode } from '@/lib/theme';

export function ThemeMotionBackground({ mode }: { mode: ThemeMode }) {
  return <div className={`theme-motion-bg theme-bg-${mode}`} aria-hidden="true" />;
}
