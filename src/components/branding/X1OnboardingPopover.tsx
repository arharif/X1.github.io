import { Compass, Gamepad2, BrainCircuit, ShieldCheck, Rocket, BookOpen, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { safeStorage } from '@/lib/storage';

const DISMISS_KEY = 'x1-onboarding-mini-dismissed';

const options = [
  { label: 'Technology & Innovation', to: '/professional', icon: Rocket },
  { label: 'Games & Quizzes', to: '/games', icon: Gamepad2 },
  { label: 'Philosophy & Curiosity', to: '/personal', icon: BrainCircuit },
  { label: 'AI / GRC / Privacy', to: '/compliance-frameworks', icon: ShieldCheck },
  { label: 'Cybersecurity Career Path', to: '/security-mindmap', icon: Compass },
  { label: 'Compliance Frameworks', to: '/compliance-frameworks', icon: BookOpen },
];

export function X1OnboardingPopover() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [miniDismissed, setMiniDismissed] = useState(() => safeStorage.get(DISMISS_KEY) === '1');
  const ref = useRef<HTMLDivElement | null>(null);
  const active = useMemo(() => location.pathname === '/', [location.pathname]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onOut = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    document.addEventListener('mousedown', onOut);
    return () => { document.removeEventListener('keydown', onEsc); document.removeEventListener('mousedown', onOut); };
  }, []);

  if (!active) return null;

  return <div ref={ref} className="x1-onboarding-wrap">
    {!miniDismissed && !open && <div className="x1-onboarding-mini"><p className="font-semibold text-xs">Start here ✨</p><p className="text-[11px] text-muted">Discover what X1 can help you explore.</p><button aria-label="Dismiss onboarding hint" onClick={() => { setMiniDismissed(true); safeStorage.set(DISMISS_KEY, '1'); }}><X size={12} /></button></div>}
    <button className="x1-logo-trigger" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Open onboarding options">X1</button>
    {open && <div className="x1-onboarding-popover"><div className="x1-onboarding-head"><p className="text-sm font-semibold">What do you want to explore today?</p><button aria-label="Close onboarding" onClick={() => setOpen(false)}><X size={14} /></button></div><div className="x1-onboarding-grid">{options.map((o) => { const I = o.icon; return <Link key={o.label} to={o.to} className="x1-onboarding-option" onClick={() => setOpen(false)}><I size={14} /><span>{o.label}</span></Link>; })}</div></div>}
  </div>;
}
