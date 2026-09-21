import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ArrowDown, Bed, Bathtub, Waves, SwimmingPool, CookingPot, Fire, Car, WifiHigh, Snowflake, List, X, Plus } from '@phosphor-icons/react';
import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/manrope';
import { Gallery } from './components/Gallery';
import { ContactDialog } from './components/ContactDialog';
import { Modal } from './components/Modal';
import { copy, villa, type Language } from './data/villa';
import { photos } from './data/photos';
import { useLuxuryMotion } from './hooks/useLuxuryMotion';
import './motion.css';

const navTargets = ['villa', 'gallery', 'experience', 'contact'];
const amenitiesIcons = [SwimmingPool, CookingPot, Fire, Car, WifiHigh, Snowflake];
function initialLanguage(): Language {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'en' || urlLang === 'sr') return urlLang;
  try { return localStorage.getItem('drina-language') === 'en' ? 'en' : 'sr'; } catch { return 'sr'; }
}
export function App() {
  useLuxuryMotion();
  const [lang, setLang] = useState<Language>(initialLanguage);
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [contact, setContact] = useState(false);
  const [floor, setFloor] = useState(false);
  const t = copy[lang];
  useEffect(() => {
    document.documentElement.lang = lang === 'sr' ? 'sr-Latn' : 'en';
    document.title = t.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description);
    try { localStorage.setItem('drina-language', lang); } catch { /* Private browsing still works. */ }
    const url = new URL(window.location.href); url.searchParams.set('lang',lang); window.history.replaceState(null,'',url);
  }, [lang, t]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if(e.key === 'Escape' && menu) { setMenu(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown',close); return () => window.removeEventListener('keydown',close);
  }, [menu]);
  const booking = (className = 'button button-dark') => <a className={className} href={villa.contacts.booking} target="_blank" rel="noopener noreferrer">{t.booking}<ArrowUpRight size={18} aria-hidden="true" /></a>;
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero-image" src="/images/hero.webp" alt="" fetchPriority="high" width="2200" height="1238" />
      <div className="hero-shade" />
      <header className="header">
        <a href="#" className="brand" aria-label="Drina Lux"><span>DRINA LUX</span><small>RIVERSIDE STAYS</small></a>
        <nav className="desktop-nav" aria-label={lang==='sr'?'Glavna navigacija':'Main navigation'}>{t.nav.map((label,i)=><a key={label} href={`#${navTargets[i]}`}>{label}</a>)}</nav>
        <div className="header-actions"><div className="languages" aria-label={t.languageLabel}>{(['sr','en'] as const).map(l=><button key={l} lang={l==='sr'?'sr-Latn':'en'} aria-label={l==='sr'?'Srpski':'English'} aria-pressed={lang===l} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}</div><a className="header-booking" href={villa.contacts.booking} target="_blank" rel="noopener noreferrer">Booking <ArrowUpRight size={16} aria-hidden="true"/></a><button ref={menuButton} className="menu-toggle" aria-label={menu?t.closeMenu:t.menu} aria-expanded={menu} aria-controls="mobile-nav" onClick={()=>setMenu(!menu)}>{menu?<X size={25}/>:<List size={25}/>}</button></div>
      </header>
      {menu && <nav id="mobile-nav" className="mobile-nav" aria-label={lang==='sr'?'Mobilna navigacija':'Mobile navigation'}>{t.nav.map((label,i)=><a key={label} href={`#${navTargets[i]}`} onClick={()=>setMenu(false)}>{label}<ArrowUpRight size={20}/></a>)}</nav>}
      <div className="hero-copy container"><p className="eyebrow light">{t.eyebrow}</p><h1 id="hero-title" data-reveal>{t.hero1}<br/><em>{t.hero2}</em></h1><p className="hero-description" data-reveal data-reveal-delay="120">{t.heroText}</p><div className="hero-buttons">{booking('button button-cream')}<a className="hero-secondary" href="#villa">{t.explore}<ArrowRight size={18} aria-hidden="true" /></a></div></div>
      <div className="hero-bottom container"><a href="#main"><ArrowDown size={16} aria-hidden="true"/>{t.scroll}</a><span>{t.heroNote}</span></div>
    </section>
    <main id="main">
      <section className="intro container section-space" aria-labelledby="intro-title"><div className="intro-copy" data-reveal><p className="eyebrow">{t.introLabel}</p><h2 id="intro-title">{t.intro1}<br/><em>{t.intro2}</em></h2><p className="body-copy">{t.introText}</p><a className="text-link" href="#villa">{t.explore}<ArrowRight size={19} aria-hidden="true"/></a></div><figure className="intro-image" data-reveal><img src="/images/river-sunset.webp" alt={lang==='sr'?'Zalazak sunca iznad Drine':'Sunset over the Drina river'} width="1600" height="1067" loading="lazy"/><figcaption>{t.riverCaption}</figcaption></figure></section>
      <section id="villa" className="villa-section container" aria-labelledby="villa-title"><div className="villa-image"><img src="/images/villa.webp" alt={lang==='sr'?'Vila Drina Lux i privatni bazen':'Drina Lux villa and private pool'} width="1600" height="1067" loading="lazy"/><span className="image-tag">DRINA LUX</span><a href="#gallery" className="image-gallery-link" aria-label={t.photos}><ArrowUpRight size={24}/></a></div><div className="villa-copy" data-reveal><p className="eyebrow">{t.villaLabel}</p><h2 id="villa-title">Drina Lux</h2><p className="body-copy">{t.villaText}</p><div className="facts">{[Bed,Bathtub,SwimmingPool,Waves].map((Icon,i)=><div key={i}><Icon size={29} weight="light" aria-hidden="true"/><span>{i<2?<b>{i===0?'3':'1'} </b>:null}{t.facts[i]}</span></div>)}</div><a className="button button-dark" href="#gallery">{t.photos}<ArrowRight size={18} aria-hidden="true"/></a></div></section>
      <section id="gallery" className="gallery-section container section-space" aria-labelledby="gallery-title"><div className="section-heading" data-reveal><div><p className="eyebrow">{t.galleryLabel}</p><h2 id="gallery-title">{t.galleryTitle}</h2></div><p>{t.galleryText}</p></div><Gallery lang={lang} photos={photos}/></section>
      <section className="layout-section" id="layout" aria-labelledby="layout-title"><div className="container layout-grid"><div className="layout-copy" data-reveal><p className="eyebrow">{t.layoutLabel}</p><h2 id="layout-title">{t.layoutTitle}</h2><p className="body-copy">{t.layoutText}</p><div className="room-list">{villa.rooms.map((room,i)=><div key={i}><span>{room.name[lang]}{i<3?` ${i+1}`:''}</span><span>{room.area}</span></div>)}</div><p className="layout-note">{t.layoutNote}</p></div><button className="floor-plan" onClick={()=>setFloor(true)} aria-label={t.layoutAction}><img src="/images/floor-plan.png" alt={t.layoutAlt} width="1179" height="966" loading="lazy"/><span>{t.layoutAction}<Plus size={18} aria-hidden="true"/></span></button></div></section>
      <section id="experience" className="experience container section-space" aria-labelledby="experience-title"><p className="eyebrow">{t.experienceLabel}</p><h2 id="experience-title">{t.experienceTitle}</h2><div className="experience-grid">{['pool','bbq','river-sunset'].map((image,i)=><article key={image} data-reveal data-reveal-delay={i*90}><img src={`/images/${image}.webp`} alt={t.experiences[i].text} loading="lazy" width="1000" height="1200"/><h3>{t.experiences[i].title}</h3><p>{t.experiences[i].text}</p></article>)}</div><div className="amenities"><h3>{t.amenitiesTitle}</h3><div className="amenities-grid">{t.amenities.map((label,i)=>{const Icon=amenitiesIcons[i];return <div key={label}><Icon size={28} weight="light" aria-hidden="true"/><span>{label}</span></div>})}</div></div></section>
      <section className="location container" aria-labelledby="location-title"><div className="location-image"><img src="/images/river.webp" alt={lang==='sr'?'Pogled na Drinu sa obale':'View of the Drina from the riverbank'} loading="lazy" width="1600" height="1067"/></div><div className="location-copy" data-reveal><p className="eyebrow">{t.locationLabel}</p><h2 id="location-title">{t.locationTitle}</h2><p className="body-copy">{t.locationText}</p><a className="text-link" href={villa.map} target="_blank" rel="noopener noreferrer">{t.map}<ArrowUpRight size={18} aria-hidden="true"/></a></div></section>
      <section id="contact" className="booking-section" aria-labelledby="booking-title"><img src="/images/river-sunset.webp" alt="" loading="lazy" width="1600" height="1067"/><div className="booking-shade"/><div className="container booking-content"><p className="eyebrow light">{t.bookingLabel}</p><h2 id="booking-title">{t.bookingTitle}</h2><p>{t.bookingText}</p><div className="booking-actions">{booking('button button-cream')}<button className="button button-outline" onClick={()=>setContact(true)}>{t.contact}<ArrowRight size={18} aria-hidden="true"/></button></div></div></section>
    </main>
    <footer className="footer container"><a href="#" className="brand"><span>DRINA LUX</span><small>{t.footer}</small></a><p>Šor, Loznica · {lang==='sr'?'Srbija':'Serbia'}</p><span>© {new Date().getFullYear()} {t.rights}</span></footer>
    <div className="mobile-booking">{booking('button button-dark')}<button className="button button-contact" onClick={()=>setContact(true)}>{lang==='sr'?'Kontakt':'Contact'}<ArrowUpRight size={18} aria-hidden="true"/></button></div>
    <ContactDialog lang={lang} open={contact} onClose={()=>setContact(false)} contacts={villa.contacts}/>
    <Modal open={floor} onClose={()=>setFloor(false)} label={t.layoutAction} className="floor-modal"><button className="floor-close" aria-label={lang==='sr'?'Zatvori plan':'Close floor plan'} onClick={()=>setFloor(false)}><X size={22}/></button><img className="floor-modal-image" src="/images/floor-plan.png" alt={t.layoutAlt}/><p className="layout-note">{t.layoutNote}</p></Modal>
  </>;
}
