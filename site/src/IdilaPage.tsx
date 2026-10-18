import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLuxuryMotion } from './hooks/useLuxuryMotion';
import {
  ArrowRight,
  Bed,
  Campfire,
  CaretLeft,
  CaretRight,
  List,
  Mountains,
  UsersThree,
  X,
} from '@phosphor-icons/react';
import { Modal } from './components/Modal';
import { PhotoTransition } from './components/PhotoTransition';
import { menuExitDuration } from './motion';
import { PropertyLinks } from './components/PropertyLinks';
import type { Language } from './data/villa';
import './idila.css';
import './idila-layout.css';
import './idila-effects.css';
import './components/mobile-menu.css';

type BorikaCopy = {
  title: string;
  description: string;
  skip: string;
  menu: string;
  close: string;
  closePhoto: string;
  language: string;
  nav: [string, string, string];
  inquiry: string;
  place: string;
  heroTitle: string;
  heroText: string;
  facts: [string, string, string, string];
  storyEyebrow: string;
  storyTitle: string;
  storyText: string;
  storyCaption: string;
  imageNotes: [string, string];
  galleryEyebrow: string;
  galleryTitle: string;
  galleryText: string;
  openPhoto: string;
  galleryDialog: string;
  previous: string;
  next: string;
  images: [string, string, string, string];
  taraEyebrow: string;
  taraTitle: string;
  taraText: string;
  videoEyebrow: string;
  videoTitle: string;
  videoAction: string;
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  footerPlace: string;
};

const copy: Record<Language, BorikaCopy> = {
  sr: {
    title: 'Vila Borika | Portfolio koncept',
    description: 'Samostalni portfolio koncept izmišljene planinske kuće, sa AI ilustracijama. Nije klijentski projekat; rezervacije nisu dostupne.',
    skip: 'Pređi na sadržaj',
    menu: 'Otvori meni',
    close: 'Zatvori meni',
    closePhoto: 'Zatvori fotografiju',
    language: 'Izbor jezika',
    nav: ['Kuća', 'Galerija', 'Priroda'],
    inquiry: 'Pogledajte galeriju',
    place: 'PORTFOLIO · SAMOSTALNI KONCEPT',
    heroTitle: 'Vaša kuća\nna planini.',
    heroText: 'Predah u prirodi, u ritmu koji vam prija.',
    facts: ['3 spavaće sobe', '6 odraslih', 'Do 8 sa decom', 'Kamin na drva'],
    storyEyebrow: 'Priroda u svom najlepšem ritmu',
    storyTitle: 'Mesto za\nsporija jutra.',
    storyText: 'Topla kuća među borovima, sa prostorom za zajedničke trenutke i mirne dane na planini.',
    storyCaption: 'Kuća, terasa i priroda',
    imageNotes: ['Detalji enterijera', 'Terasa za duga jutra'],
    galleryEyebrow: 'Pogledajte kuću',
    galleryTitle: 'Prostor za vaš boravak.',
    galleryText: 'Otvorite fotografiju za veći prikaz.',
    openPhoto: 'Otvori fotografiju',
    galleryDialog: 'Galerija kuće Borika',
    previous: 'Prethodna fotografija',
    next: 'Sledeća fotografija',
    images: ['Kuća Borika na planini', 'Enterijer kuće Borika', 'Terasa kuće Borika', 'Spavaća soba u kući Borika'],
    taraEyebrow: 'Planinski predah',
    taraTitle: 'Planina blizu,\nsvakodnevica daleko.',
    taraText: 'Borovi, mirna jutra i pogled na prirodu. Ova stranica prikazuje dizajn koncept; tačna lokacija i udaljenosti nisu navedene.',
    videoEyebrow: 'Priroda govori sama za sebe',
    videoTitle: 'Upoznajte Boriku.',
    videoAction: 'Pogledajte galeriju',
    contactEyebrow: 'Portfolio',
    contactTitle: 'Samostalni dizajn koncept',
    contactText: 'Samostalni portfolio koncept, nije klijentski projekat. Objekti i nazivi su izmišljeni; ilustrativne slike su generisane pomoću AI. Kontakt i rezervacije nisu dostupni.',
    footerPlace: 'Portfolio · Dizajn koncept',
  },
  en: {
    title: 'Vila Borika | Portfolio concept',
    description: 'A self-initiated portfolio concept for a fictional mountain house with AI-generated illustrations. Not a client commission; no reservations.',
    skip: 'Skip to content',
    menu: 'Open menu',
    close: 'Close menu',
    closePhoto: 'Close photograph',
    language: 'Language selection',
    nav: ['The house', 'Gallery', 'Nature'],
    inquiry: 'Explore the gallery',
    place: 'PORTFOLIO · SELF-INITIATED CONCEPT',
    heroTitle: 'Your house\nin the mountains.',
    heroText: 'A pause in nature, at a pace that feels like your own.',
    facts: ['3 bedrooms', '6 adults', 'Up to 8 with children', 'Wood fireplace'],
    storyEyebrow: 'Nature at its most peaceful',
    storyTitle: 'A place for\nslower mornings.',
    storyText: 'A warm house among the pines, with room for time together and quiet days in the mountains.',
    storyCaption: 'The house, terrace and surrounding nature',
    imageNotes: ['Interior details', 'A terrace for long mornings'],
    galleryEyebrow: 'See the house',
    galleryTitle: 'Space for your stay.',
    galleryText: 'Open any photograph for a larger view.',
    openPhoto: 'Open photograph',
    galleryDialog: 'Borika house gallery',
    previous: 'Previous photograph',
    next: 'Next photograph',
    images: ['Borika house in the mountains', 'Interior of Borika house', 'Terrace at Borika house', 'Bedroom at Borika house'],
    taraEyebrow: 'Mountain retreat',
    taraTitle: 'The mountain close,\neveryday life far away.',
    taraText: 'Pines, quiet mornings and views of nature. This page presents a design concept; the exact location and distances are omitted.',
    videoEyebrow: 'Nature speaks for itself',
    videoTitle: 'Meet Borika.',
    videoAction: 'Explore the gallery',
    contactEyebrow: 'Portfolio',
    contactTitle: 'Self-initiated design concept',
    contactText: 'A self-initiated portfolio concept, not a client commission. Properties and names are fictional; illustrative images are AI-generated. Contact and reservations are unavailable.',
    footerPlace: 'Portfolio · Design concept',
  },
};

const galleryImages = ['/images/borika/exterior.webp', '/images/borika/living.webp', '/images/borika/terrace.webp', '/images/borika/bedroom.webp'] as const;
const gallerySizes = [[1536, 1024], [1536, 1024], [1536, 1024], [1536, 1024]] as const;
const factsIcons = [Bed, UsersThree, UsersThree, Campfire] as const;

function initialLanguage(): Language {
  const urlLanguage = new URLSearchParams(window.location.search).get('lang');
  if (urlLanguage === 'sr' || urlLanguage === 'en') return urlLanguage;
  try {
    return localStorage.getItem('drina-language') === 'en' ? 'en' : 'sr';
  } catch {
    return 'sr';
  }
}

export function IdilaPage() {
  useLuxuryMotion();
  const [scrolled, setScrolled] = useState(() => window.scrollY > 60);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => () => { if (menuTimer.current) clearTimeout(menuTimer.current); }, []);
  const [lang, setLang] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'sr' ? 'sr-Latn' : 'en';
    document.title = t.title;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute('content', t.description);
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute('content', t.title);
    }
    try {
      localStorage.setItem('drina-language', lang);
    } catch {
      // Language still works when browser storage is unavailable.
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
  }, [lang, t.description, t.title]);

  useEffect(() => {
    if (activePhoto === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setActivePhoto((current) => current === null ? null : (current + galleryImages.length - 1) % galleryImages.length);
      }
      if (event.key === 'ArrowRight') {
        setActivePhoto((current) => current === null ? null : (current + 1) % galleryImages.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activePhoto]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 1180) {
        if (menuTimer.current) clearTimeout(menuTimer.current);
        menuTimer.current = null; setMenuClosing(false); setMenuOpen(false);
      }
    };
    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  const changeLanguage = (next: Language) => {
    setLang(next);
    setMenuOpen(false);
  };

  const closeMenu = (target?: string) => {
    if (menuTimer.current) return;
    const finish = () => {
      menuTimer.current = null;
      flushSync(() => { setMenuClosing(false); setMenuOpen(false); });
      requestAnimationFrame(() => {
        if (target) {
          window.location.hash = target;
          const section = document.getElementById(target);
          section?.setAttribute('tabindex', '-1');
          section?.focus({ preventScroll: true });
        } else menuButtonRef.current?.focus();
      });
    };
    const duration = menuExitDuration();
    if (duration === 0) finish();
    else { setMenuClosing(true); menuTimer.current = setTimeout(finish, duration); }
  };

  const movePhoto = (direction: -1 | 1) => {
    setActivePhoto((current) => current === null ? null : (current + direction + galleryImages.length) % galleryImages.length);
  };

  return <div className="idila-page" id="idila-top">
    <a className="idila-skip" href="#idila-main">{t.skip}</a>

    <header className={`idila-header${scrolled ? ' is-compact' : ''}`}>
      <div className="idila-header__inner">
        <a className="idila-brand" href="#idila-top" aria-label="Vila Borika">
          <Mountains size={48} weight="thin" aria-hidden="true" />
          <span><b>VILA BORIKA</b><small>MOUNTAIN STAYS</small></span>
        </a>
        <div className="idila-header__properties"><PropertyLinks current="idila" lang={lang} /></div>
        <nav className="idila-nav" aria-label={lang === 'sr' ? 'Glavna navigacija' : 'Main navigation'}>
          {t.nav.map((label, index) => <a key={label} href={`#${['house', 'gallery', 'tara'][index]}`}>{label}</a>)}
        </nav>
        <a className="idila-header__cta" href="#gallery">{t.inquiry}</a>
        <div className="idila-languages" aria-label={t.language}>
          {(['sr', 'en'] as const).map((language) => <button key={language} type="button" aria-pressed={lang === language} onClick={() => changeLanguage(language)}>{language.toUpperCase()}</button>)}
        </div>
        <button ref={menuButtonRef} className="idila-menu-button" type="button" aria-label={menuOpen ? t.close : t.menu} aria-expanded={menuOpen} aria-controls="idila-mobile-menu" onClick={() => setMenuOpen(true)}>
          <List size={27} aria-hidden="true" />
        </button>
      </div>
    </header>

    <Modal open={menuOpen} onClose={() => closeMenu()} label={lang === 'sr' ? 'Mobilna navigacija' : 'Mobile navigation'} className={`idila-mobile-menu${menuClosing ? ' is-closing' : ''}`}>
      <div id="idila-mobile-menu" className="idila-mobile-menu__panel">
        <div className="idila-mobile-menu__top">
          <a className="idila-brand" href="#idila-top" onClick={e => { e.preventDefault(); closeMenu('idila-top'); }}>
            <Mountains size={42} weight="thin" aria-hidden="true" />
            <span><b>VILA BORIKA</b><small>MOUNTAIN STAYS</small></span>
          </a>
          <button type="button" className="idila-mobile-menu__close" aria-label={t.close} onClick={() => closeMenu()} autoFocus><X size={27} aria-hidden="true" /></button>
        </div>
        <div className="idila-mobile-menu__properties"><PropertyLinks current="idila" lang={lang} /></div>
        <nav aria-label={lang === 'sr' ? 'Mobilna navigacija' : 'Mobile navigation'}>
          {t.nav.map((label, index) => <a key={label} href={`#${['house', 'gallery', 'tara'][index]}`} onClick={e => { e.preventDefault(); closeMenu(['house', 'gallery', 'tara'][index]); }}><span>0{index + 1}</span>{label}<ArrowRight size={21} aria-hidden="true" /></a>)}
        </nav>
        <div className="idila-mobile-menu__footer">
          <div className="idila-languages" aria-label={t.language}>
            {(['sr', 'en'] as const).map((language) => <button key={language} type="button" aria-pressed={lang === language} onClick={() => changeLanguage(language)}>{language.toUpperCase()}</button>)}
          </div>
          <a className="idila-button" href="#gallery" onClick={e => { e.preventDefault(); closeMenu('gallery'); }}>{t.inquiry}<ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </Modal>

    <main id="idila-main">
      <section className="idila-hero" id="house" aria-labelledby="idila-hero-title">
        <div className="idila-hero__copy">
          <p className="idila-eyebrow">{t.place}</p>
          <h1 id="idila-hero-title" data-reveal>{t.heroTitle}</h1>
          <span className="idila-rule" aria-hidden="true" />
          <p className="idila-hero__text" data-reveal data-reveal-delay="50">{t.heroText}</p>
          <a className="idila-button" href="#gallery">{t.inquiry}<ArrowRight size={20} aria-hidden="true" /></a>
          <div className="idila-hero__signature" aria-hidden="true"><Mountains size={62} weight="thin" /><span>{lang === 'sr' ? 'PLANINE POVEZUJU LJUDE' : 'MOUNTAINS BRING PEOPLE TOGETHER'}</span></div>
        </div>
        <figure className="idila-hero__visual">
          <img src="/images/borika/exterior.webp" alt={t.images[0]} width="1536" height="1024" fetchPriority="high" />
          <figcaption>{lang === 'sr' ? <>Više<br/><em>od odmora.</em></> : <>More<br/><em>than a stay.</em></>}</figcaption>
        </figure>
      </section>

      <section className="idila-facts" aria-label={lang === 'sr' ? 'Glavne karakteristike' : 'Key features'}>
        {t.facts.map((fact, index) => {
          const Icon = factsIcons[index];
          return <div key={fact}><Icon size={33} weight="thin" aria-hidden="true" /><span>{fact}</span></div>;
        })}
      </section>

      <section className="idila-story" aria-labelledby="idila-story-title">
        <div className="idila-story__copy" data-reveal>
          <p className="idila-eyebrow">{t.storyEyebrow}</p>
          <h2 id="idila-story-title">{t.storyTitle}</h2>
          <p>{t.storyText}</p>
          <span className="idila-rule" aria-hidden="true" />
          <em>{t.storyCaption}</em>
        </div>
        <figure className="idila-story__image idila-story__image--tall">
          <img src="/images/borika/living.webp" alt={t.images[1]} width="1536" height="1024" loading="lazy" />
          <figcaption>{t.imageNotes[0]}</figcaption>
        </figure>
        <figure className="idila-story__image idila-story__image--wide">
          <img src="/images/borika/terrace.webp" alt={t.images[2]} width="1536" height="1024" loading="lazy" />
          <figcaption>{t.imageNotes[1]}</figcaption>
        </figure>
      </section>

      <section className="idila-gallery-section" id="gallery" aria-labelledby="idila-gallery-title">
        <div className="idila-section-heading" data-reveal>
          <div><p className="idila-eyebrow">{t.galleryEyebrow}</p><h2 id="idila-gallery-title">{t.galleryTitle}</h2></div>
          <p>{t.galleryText}</p>
        </div>
        <div className="idila-gallery">
          {galleryImages.map((src, index) => <button key={src} type="button" className={`idila-gallery__item idila-gallery__item--${index + 1}`} onClick={() => setActivePhoto(index)} aria-label={`${t.openPhoto}: ${t.images[index]}`}>
            <img src={src} alt={t.images[index]} width={gallerySizes[index][0]} height={gallerySizes[index][1]} loading="lazy" />
            <span>{String(index + 1).padStart(2, '0')} <em>{t.images[index]}</em></span>
          </button>)}
        </div>
      </section>

      <Modal open={activePhoto !== null} onClose={() => setActivePhoto(null)} label={t.galleryDialog} className="idila-lightbox">
        {activePhoto !== null && <div className="idila-lightbox__content">
          <button type="button" className="idila-lightbox__close" aria-label={t.closePhoto} onClick={() => setActivePhoto(null)} autoFocus><X size={28} aria-hidden="true" /></button>
          <figure>
            <PhotoTransition src={galleryImages[activePhoto]} alt={t.images[activePhoto]} width={gallerySizes[activePhoto][0]} height={gallerySizes[activePhoto][1]} />
            <figcaption><span>{t.images[activePhoto]}</span><span aria-live="polite">{activePhoto + 1} / {galleryImages.length}</span></figcaption>
          </figure>
          <div className="idila-lightbox__controls">
            <button type="button" onClick={() => movePhoto(-1)} aria-label={t.previous}><CaretLeft size={30} aria-hidden="true" /></button>
            <button type="button" onClick={() => movePhoto(1)} aria-label={t.next}><CaretRight size={30} aria-hidden="true" /></button>
          </div>
        </div>}
      </Modal>

      <section className="idila-location" id="tara" aria-labelledby="idila-location-title">
        <figure><img src="/images/borika/exterior.webp" alt={t.images[0]} width="1536" height="1024" loading="lazy" /></figure>
        <div className="idila-location__copy" data-reveal>
          <p className="idila-eyebrow">{t.taraEyebrow}</p>
          <h2 id="idila-location-title">{t.taraTitle}</h2>
          <p>{t.taraText}</p>
          <a className="idila-text-link" href="#gallery">{t.inquiry}<ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="idila-video" aria-labelledby="idila-video-title">
        <img src="/images/borika/exterior.webp" alt="" width="1536" height="1024" loading="lazy" />
        <div className="idila-video__shade" />
        <div className="idila-video__copy" data-reveal>
          <p className="idila-eyebrow">{t.videoEyebrow}</p>
          <h2 id="idila-video-title">{t.videoTitle}</h2>
          <a href="#gallery"><span>{t.videoAction}</span><b><ArrowRight size={25} aria-hidden="true" /></b></a>
        </div>
      </section>

      <section className="idila-contact" aria-labelledby="idila-contact-title">
        <div><p className="idila-eyebrow">{t.contactEyebrow}</p><h2 id="idila-contact-title">{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <div className="idila-contact__actions">
          <a href="#gallery"><ArrowRight size={21} aria-hidden="true" /><span>{t.inquiry}</span></a>
        </div>
      </section>
    </main>

    <footer className="idila-footer">
      <a className="idila-brand" href="#idila-top"><span><b>VILA BORIKA</b><small>MOUNTAIN STAYS</small></span></a>
      <p>{t.footerPlace}<br/>{lang === 'sr' ? 'Priroda. Ljudi. Bolji dani.' : 'Nature. People. Better days.'}</p>
      <PropertyLinks current="idila" lang={lang} />
    </footer>
  </div>;
}

export default IdilaPage;
