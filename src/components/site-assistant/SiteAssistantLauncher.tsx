import { useEffect, useState } from 'react';
import { X1Mark } from '@/components/branding/X1Mark';
import { SiteAssistantPanel } from './SiteAssistantPanel';

const singletonKey = '__x1_single_launcher__';

export function SiteAssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const w = window as Window & { [singletonKey]?: boolean };
    if (w[singletonKey]) {
      setEnabled(false);
      return;
    }
    w[singletonKey] = true;
    return () => {
      w[singletonKey] = false;
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <button
        className="assistant-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close X1 assistant' : 'Open X1 assistant'}
        aria-expanded={open}
        aria-controls="x1-assistant-panel"
      >
        <span className="assistant-launcher-logo"><X1Mark size="sm" /></span>
        <span className="assistant-launcher-title">X1</span>
      </button>
      <SiteAssistantPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
