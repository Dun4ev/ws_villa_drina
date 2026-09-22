import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLuxuryMotion } from './hooks/useLuxuryMotion';
import {
  ArrowRight,
  Bed,
  Campfire,
  CaretLeft,
  CaretRight,
  EnvelopeSimple,
  List,
  MapPin,
  Mountains,
  Phone,
  Play,
  UsersThree,
  X,
} from '@phosphor-icons/react';
import { Modal } from './components/Modal';
import { PropertyLinks } from './components/PropertyLinks';
import type { Language } from './data/villa';
import './idila.css';
import './idila-layout.css';
import './idila-effects.css';
import './components/mobile-menu.css';

type IdilaCopy = {
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
  distanceLabel: string;
  distanceValue: string;
  distanceNote: string;
  map: string;
  videoEyebrow: string;
  videoTitle: string;
  videoAction: string;
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  call: string;
  email: string;
  footerPlace: string;
};

const copy: Record<Language, IdilaCopy> = {
  sr: {
    title: 'Idila Zaovinskog jezera | Kuća za odmor na Tari',
    description: 'Kuća za odmor Idila u Novoj Vežanji, Zaovine, za 6 odraslih ili do 8 gostiju sa decom.',
    skip: 'Pređi na sadržaj',
    menu: 'Otvori meni',
    close: 'Zatvori meni',
    closePhoto: 'Zatvori fotografiju',
    language: 'Izbor jezika',
    nav: ['Kuća', 'Galerija', 'Tara'],
    inquiry: 'Pošaljite upit',
    place: 'Zaovine · Nova Vežanja',
    heroTitle: 'Vaša kuća\nna Tari.',
    heroText: 'Predah u prirodi, u ritmu koji vam prija.',
    facts: ['3 spavaće sobe', '6 odraslih', 'Do 8 sa decom', 'Kamin na drva'],
    storyEyebrow: 'Tara u svom najlepšem ritmu',
    storyTitle: 'Mesto za\nsporija jutra.',
    storyText: 'Topla kuća među borovima, sa prostorom za zajedničke trenutke i mirne dane na planini.',
    storyCaption: 'Kuća, terasa i priroda Tare',
    imageNotes: ['Detalji enterijera', 'Terasa za duga jutra'],
    galleryEyebrow: 'Pogledajte kuću',
    galleryTitle: 'Prostor za vaš boravak.',
    galleryText: 'Otvorite fotografiju za veći prikaz.',
    openPhoto: 'Otvori fotografiju',
    galleryDialog: 'Galerija kuće Idila',
    previous: 'Prethodna fotografija',
    next: 'Sledeća fotografija',
    images: ['Kuća Idila na Tari', 'Enterijer kuće Idila', 'Terasa kuće Idila', 'Spavaća soba u kući Idila'],
    taraEyebrow: 'Zaovine · Tara',
    taraTitle: 'Planina blizu,\nsvakodnevica daleko.',
    taraText: 'Idila se nalazi u naselju Nova Vežanja u Zaovinama. Jezero je udaljeno oko 800 m vazdušnom linijom; kuća nije na samoj obali.',
    distanceLabel: 'Zaovinsko jezero',
    distanceValue: 'oko 800 m',
    distanceNote: 'vazdušnom linijom',
    map: 'Otvori lokaciju',
    videoEyebrow: 'Tara govori sama za sebe',
    videoTitle: 'Upoznajte Idilu.',
    videoAction: 'Pogledajte video',
    contactEyebrow: 'Kontakt',
    contactTitle: 'Pošaljite upit',
    contactText: 'Rado ćemo odgovoriti i pomoći oko planiranja boravka.',
    call: 'Pozovite',
    email: 'Pošaljite email',
    footerPlace: 'Zaovine · Tara · Srbija',
  },
  en: {
    title: 'Idila Zaovinskog jezera | Holiday house on Tara',
    description: 'Idila holiday house in Nova Vežanja, Zaovine, for 6 adults or up to 8 guests with children.',
    skip: 'Skip to content',
    menu: 'Open menu',
    close: 'Close menu',
    closePhoto: 'Close photograph',
    language: 'Language selection',
    nav: ['The house', 'Gallery', 'Tara'],
    inquiry: 'Send an inquiry',
    place: 'Zaovine · Nova Vežanja',
    heroTitle: 'Your house\non Tara.',
    heroText: 'A pause in nature, at a pace that feels like your own.',
    facts: ['3 bedrooms', '6 adults', 'Up to 8 with children', 'Wood fireplace'],
    storyEyebrow: 'Tara at its most peaceful',
    storyTitle: 'A place for\nslower mornings.',
    storyText: 'A warm house among the pines, with room for time together and quiet days in the mountains.',
    storyCaption: 'The house, terrace and nature of Tara',
    imageNotes: ['Interior details', 'A terrace for long mornings'],
    galleryEyebrow: 'See the house',
    galleryTitle: 'Space for your stay.',
    galleryText: 'Open any photograph for a larger view.',
    openPhoto: 'Open photograph',
    galleryDialog: 'Idila house gallery',
    previous: 'Previous photograph',
    next: 'Next photograph',
    images: ['Idila house on Tara', 'Interior of Idila house', 'Terrace at Idila house', 'Bedroom at Idila house'],
    taraEyebrow: 'Zaovine · Tara',
    taraTitle: 'The mountain close,\neveryday life far away.',
    taraText: 'Idila is in Nova Vežanja, Zaovine. The lake is approximately 800 m away in a straight line; the house is not on the shoreline.',
    distanceLabel: 'Zaovine Lake',
    distanceValue: 'about 800 m',
    distanceNote: 'in a straight line',
    map: 'Open location',
    videoEyebrow: 'Tara speaks for itself',
    videoTitle: 'Meet Idila.',
    videoAction: 'Watch the video',
    contactEyebrow: 'Contact',
    contactTitle: 'Send an inquiry',
    contactText: 'We will be happy to answer your questions and help plan your stay.',
    call: 'Call us',
    email: 'Send an email',
    footerPlace: 'Zaovine · Tara · Serbia',
  },
};

const galleryImages = ['/images/idila/hero-clean.jpg', '/images/idila/interior-clean.jpg', '/images/idila/terrace-clean.jpg', '/images/idila/bedroom-clean.jpg'] as const;
const gallerySizes = [[1449, 1085], [1448, 1086], [1254, 1254], [1538, 1023]] as const;
const factsIcons = [Bed, UsersThree, UsersThree, Campfire] as const;
const contactEmail = 'idilazaovinskogjezera@gmail.com';
const contactPhone = '+38169632641';

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else { setMenuClosing(true); menuTimer.current = setTimeout(finish, 540); }
  };

  const movePhoto = (direction: -1 | 1) => {
    setActivePhoto((current) => current === null ? null : (current + direction + galleryImages.length) % galleryImages.length);
  };

  return <div className="idila-page" id="idila-top">
    <a className="idila-skip" href="#idila-main">{t.skip}</a>

    <header className={`idila-header${scrolled ? ' is-compact' : ''}`}>
      <div className="idila-header__inner">
        <a className="idila-brand" href="#idila-top" aria-label="Idila Zaovinskog jezera">
          <Mountains size={48} weight="thin" aria-hidden="true" />
          <span><b>IDILA</b><small>ZAOVINSKOG JEZERA</small></span>
        </a>
        <div className="idila-header__properties"><PropertyLinks current="idila" lang={lang} /></div>
        <nav className="idila-nav" aria-label={lang === 'sr' ? 'Glavna navigacija' : 'Main navigation'}>
          {t.nav.map((label, index) => <a key={label} href={`#${['house', 'gallery', 'tara'][index]}`}>{label}</a>)}
        </nav>
        <a className="idila-header__cta" href={`mailto:${contactEmail}`}>{t.inquiry}</a>
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
            <span><b>IDILA</b><small>ZAOVINSKOG JEZERA</small></span>
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
          <a className="idila-button" href={`mailto:${contactEmail}`}>{t.inquiry}<ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </Modal>

    <main id="idila-main">
      <section className="idila-hero" id="house" aria-labelledby="idila-hero-title">
        <div className="idila-hero__copy">
          <p className="idila-eyebrow">{t.place}</p>
          <h1 id="idila-hero-title" data-reveal>{t.heroTitle}</h1>
          <span className="idila-rule" aria-hidden="true" />
          <p className="idila-hero__text" data-reveal data-reveal-delay="120">{t.heroText}</p>
          <a className="idila-button" href={`mailto:${contactEmail}`}>{t.inquiry}<ArrowRight size={20} aria-hidden="true" /></a>
          <div className="idila-hero__signature" aria-hidden="true"><Mountains size={62} weight="thin" /><span>{lang === 'sr' ? 'PLANINE POVEZUJU LJUDE' : 'MOUNTAINS BRING PEOPLE TOGETHER'}</span></div>
        </div>
        <figure className="idila-hero__visual">
          <img src="/images/idila/hero-clean.jpg" alt={t.images[0]} width="1449" height="1085" fetchPriority="high" />
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
          <img src="/images/idila/interior-clean.jpg" alt={t.images[1]} width="1448" height="1086" loading="lazy" />
          <figcaption>{t.imageNotes[0]}</figcaption>
        </figure>
        <figure className="idila-story__image idila-story__image--wide">
          <img src="/images/idila/terrace-clean.jpg" alt={t.images[2]} width="1254" height="1254" loading="lazy" />
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
            <img src={galleryImages[activePhoto]} alt={t.images[activePhoto]} width={gallerySizes[activePhoto][0]} height={gallerySizes[activePhoto][1]} />
            <figcaption><span>{t.images[activePhoto]}</span><span aria-live="polite">{activePhoto + 1} / {galleryImages.length}</span></figcaption>
          </figure>
          <div className="idila-lightbox__controls">
            <button type="button" onClick={() => movePhoto(-1)} aria-label={t.previous}><CaretLeft size={30} aria-hidden="true" /></button>
            <button type="button" onClick={() => movePhoto(1)} aria-label={t.next}><CaretRight size={30} aria-hidden="true" /></button>
          </div>
        </div>}
      </Modal>

      <section className="idila-location" id="tara" aria-labelledby="idila-location-title">
        <figure><img src="/images/idila/exterior-clean.jpg" alt={t.images[0]} width="1448" height="1086" loading="lazy" /></figure>
        <div className="idila-location__copy" data-reveal>
          <p className="idila-eyebrow">{t.taraEyebrow}</p>
          <h2 id="idila-location-title">{t.taraTitle}</h2>
          <p>{t.taraText}</p>
          <div className="idila-distance"><MapPin size={31} weight="thin" aria-hidden="true" /><span><small>{t.distanceLabel}</small><b>{t.distanceValue}</b><em>{t.distanceNote}</em></span></div>
          <a className="idila-text-link" href="https://maps.app.goo.gl/8xHbiki4JXTxTb2p9" target="_blank" rel="noopener noreferrer">{t.map}<ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="idila-video" aria-labelledby="idila-video-title">
        <img src="/images/idila/exterior-clean.jpg" alt="" width="1448" height="1086" loading="lazy" />
        <div className="idila-video__shade" />
        <div className="idila-video__copy" data-reveal>
          <p className="idila-eyebrow">{t.videoEyebrow}</p>
          <h2 id="idila-video-title">{t.videoTitle}</h2>
          <a href="https://www.youtube.com/watch?v=AndruFi-TB4" target="_blank" rel="noopener noreferrer"><span>{t.videoAction}</span><b><Play size={25} weight="fill" aria-hidden="true" /></b></a>
        </div>
      </section>

      <section className="idila-contact" aria-labelledby="idila-contact-title">
        <div><p className="idila-eyebrow">{t.contactEyebrow}</p><h2 id="idila-contact-title">{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <div className="idila-contact__actions">
          <a href={`tel:${contactPhone}`}><Phone size={21} weight="thin" aria-hidden="true" /><span><small>{t.call}</small>+381 69 632 641</span></a>
          <a href={`mailto:${contactEmail}`}><EnvelopeSimple size={21} weight="thin" aria-hidden="true" /><span><small>{t.email}</small>{contactEmail}</span></a>
        </div>
      </section>
    </main>

    <footer className="idila-footer">
      <a className="idila-brand" href="#idila-top"><span><b>IDILA</b><small>ZAOVINSKOG JEZERA</small></span></a>
      <p>{t.footerPlace}<br/>{lang === 'sr' ? 'Priroda. Ljudi. Bolji dani.' : 'Nature. People. Better days.'}</p>
      <PropertyLinks current="idila" lang={lang} />
    </footer>
  </div>;
}

export default IdilaPage;
