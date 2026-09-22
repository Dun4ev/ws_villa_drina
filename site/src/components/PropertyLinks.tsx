import type { Language } from '../data/villa';
import './property-links.css';
export function PropertyLinks({ current, lang }: { current: 'drina' | 'idila'; lang: Language }) {
  return <div className="property-links" role="group" aria-label={lang === 'sr' ? 'Naše kuće' : 'Our houses'}>
    <a href={`/?lang=${lang}`} aria-current={current === 'drina' ? 'page' : undefined}>Drina Lux</a>
    <span aria-hidden="true">/</span>
    <a href={`/idila/?lang=${lang}`} aria-current={current === 'idila' ? 'page' : undefined}>Idila · Tara</a>
  </div>;
}
