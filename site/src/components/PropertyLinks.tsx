import type { Language } from '../data/villa';
import './property-links.css';
export function PropertyLinks({ current, lang }: { current: 'drina' | 'idila'; lang: Language }) {
  return <div className="property-links" role="group" aria-label={lang === 'sr' ? 'Portfolio koncepti' : 'Portfolio concepts'}>
    <a href={`/?lang=${lang}`} aria-current={current === 'drina' ? 'page' : undefined}>Vila Mirava</a>
    <span aria-hidden="true">/</span>
    <a href={`/idila/?lang=${lang}`} aria-current={current === 'idila' ? 'page' : undefined}>Vila Borika</a>
  </div>;
}
