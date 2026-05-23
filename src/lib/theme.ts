import { safeStorage } from '@/lib/storage';

export type ThemeMode = 'dark' | 'light' | 'purple' | 'rainbow' | 'egyptian' | 'horror';

export const themeMap: Record<ThemeMode, string> = {
  dark: 'theme-dark',
  light: 'theme-light',
  purple: 'theme-purple',
  rainbow: 'theme-rainbow',
  'egyptian': 'theme-egyptian',
  horror: 'theme-horror',
};

export const initTheme = (): ThemeMode => {
  const stored = safeStorage.get('theme') as ThemeMode | null;
  return stored && stored in themeMap ? stored : 'dark';
};
