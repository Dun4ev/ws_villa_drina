import { useEffect, useMemo, useState } from "react";

import { Modal } from "./Modal";
import "./interactions.css";

export type GalleryLanguage = "sr" | "en";
export type GalleryCategory = "villa" | "interior" | "outdoors" | "river";

export interface GalleryPhoto {
  src: string;
  alt: Record<GalleryLanguage, string>;
  category: GalleryCategory;
  width: number;
  height: number;
}

export interface GalleryProps {
  lang: GalleryLanguage;
  photos: GalleryPhoto[];
}

type GalleryFilter = "all" | GalleryCategory;

const COPY = {
  sr: {
    all: "Sve",
    villa: "Vila",
    interior: "Enterijer",
    outdoors: "Bazen i vrt",
    river: "Reka",
    showMore: "Prikaži sve fotografije",
    showLess: "Prikaži manje",
    previous: "Prethodna fotografija",
    next: "Sledeća fotografija",
    close: "Zatvori galeriju",
    dialog: "Pregled fotografije",
    filters: "Filteri galerije",
    open: "Otvori fotografiju",
  },
  en: {
    all: "All",
    villa: "Villa",
    interior: "Interiors",
    outdoors: "Pool & garden",
    river: "River",
    showMore: "Show all photos",
    showLess: "Show fewer",
    previous: "Previous photo",
    next: "Next photo",
    close: "Close gallery",
    dialog: "Photo viewer",
    filters: "Gallery filters",
    open: "Open photo",
  },
} as const;

const FILTERS: GalleryFilter[] = [
  "all",
  "villa",
  "interior",
  "outdoors",
  "river",
];

export function Gallery({ lang, photos }: GalleryProps) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const copy = COPY[lang];

  const filteredPhotos = useMemo(
    () =>
      filter === "all"
        ? photos
        : photos.filter((photo) => photo.category === filter),
    [filter, photos],
  );
  const visiblePhotos = expanded ? filteredPhotos : filteredPhotos.slice(0, 6);
  const activePhoto =
    activeIndex === null ? null : filteredPhotos[activeIndex] ?? null;

  useEffect(() => {
    setExpanded(false);
    setActiveIndex(null);
  }, [filter]);

  useEffect(() => {
    if (activeIndex !== null && activeIndex >= filteredPhotos.length) {
      setActiveIndex(null);
    }
  }, [activeIndex, filteredPhotos.length]);

  const move = (direction: -1 | 1) => {
    if (activeIndex === null || filteredPhotos.length === 0) return;
    setActiveIndex(
      (activeIndex + direction + filteredPhotos.length) % filteredPhotos.length,
    );
  };

  return (
    <div className="gallery">
      <div className="gallery__filters" role="group" aria-label={copy.filters}>
        {FILTERS.map((category) => (
          <button
            key={category}
            type="button"
            className="gallery__filter"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {copy[category]}
          </button>
        ))}
      </div>

      <div className="gallery__grid">
        {visiblePhotos.map((photo, index) => (
          <button
            key={`${photo.src}-${index}`}
            type="button"
            className="gallery__item"
            onClick={() => setActiveIndex(index)}
            aria-label={`${copy.open}: ${photo.alt[lang]}`}
            title={`${copy.open}: ${photo.alt[lang]}`}
          >
            <img
              src={photo.src}
              alt={photo.alt[lang]}
              width={photo.width}
              height={photo.height}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {filteredPhotos.length > 6 && (
        <button
          type="button"
          className="gallery__expand interaction-button"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? copy.showLess : copy.showMore}
        </button>
      )}

      <Modal
        open={activePhoto !== null}
        onClose={() => setActiveIndex(null)}
        label={copy.dialog}
        className="gallery-lightbox"
      >
        {activePhoto && activeIndex !== null && (
          <div
            className="gallery-lightbox__content"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(-1);
              } else if (event.key === "ArrowRight") {
                event.preventDefault();
                move(1);
              }
            }}
          >
            <button
              type="button"
              className="gallery-lightbox__close"
              onClick={() => setActiveIndex(null)}
              aria-label={copy.close}
              autoFocus
            >
              ×
            </button>
            <figure>
              <img
                src={activePhoto.src}
                alt={activePhoto.alt[lang]}
                width={activePhoto.width}
                height={activePhoto.height}
              />
              <figcaption>
                <span>{activePhoto.alt[lang]}</span>
                <span aria-live="polite">
                  {activeIndex + 1} / {filteredPhotos.length}
                </span>
              </figcaption>
            </figure>
            {filteredPhotos.length > 1 && (
              <div className="gallery-lightbox__navigation">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={copy.previous}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={copy.next}
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Gallery;
