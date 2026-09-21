import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import { ArrowUpRight, X } from '@phosphor-icons/react';
import { Modal } from './Modal';
import { copy, villa, type Language } from '../data/villa';
import './mobile-menu.css';
const targets = ['villa', 'gallery', 'experience', 'contact'];
export function MobileMenu({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Language }) {
  const [closing, setClosing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = copy[lang];
  const close = (target?: string) => {
    if (timer.current) return;
    const finish = () => {
      timer.current = null;
      flushSync(() => { setClosing(false); onClose(); });
      if (target) requestAnimationFrame(() => {
        window.location.hash = target;
        const section = document.getElementById(target);
        section?.setAttribute('tabindex', '-1'); section?.focus({ preventScroll: true });
      });
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else { setClosing(true); timer.current = setTimeout(finish, 540); }
  };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 801px)');
    const resize = () => { if (desktop.matches && open) { if(timer.current) clearTimeout(timer.current); timer.current=null; setClosing(false); onClose(); } };
    desktop.addEventListener('change', resize);
    return () => desktop.removeEventListener('change', resize);
  }, [open, onClose]);
  return <Modal open={open} onClose={() => close()} label={lang === 'sr' ? 'Mobilna navigacija' : 'Mobile navigation'} className={`curved-menu ${closing ? 'is-closing' : ''}`}>
    <div className="curved-menu-panel">
      <div className="curved-menu-top"><span className="curved-menu-brand">DRINA LUX<small>RIVERSIDE STAYS</small></span><button className="curved-menu-close" aria-label={t.closeMenu} onClick={() => close()}><X size={26} weight="light" aria-hidden="true" /></button></div>
      <nav id="mobile-nav" aria-label={lang === 'sr' ? 'Mobilna navigacija' : 'Mobile navigation'}>{t.nav.map((label, i) => <a key={targets[i]} style={{ '--item': i } as CSSProperties} href={`#${targets[i]}`} onClick={e => { e.preventDefault(); close(targets[i]); }}><span>{label}</span><ArrowUpRight size={24} weight="light" aria-hidden="true" /></a>)}</nav>
      <div className="curved-menu-footer"><p>Šor · Loznica · Serbia</p><a className="button button-dark" href={villa.contacts.booking} target="_blank" rel="noopener noreferrer">{t.booking}<ArrowUpRight size={18} aria-hidden="true" /></a><a className="curved-menu-instagram" href={villa.contacts.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} aria-hidden="true" /></a></div>
    </div>
  </Modal>;
}
