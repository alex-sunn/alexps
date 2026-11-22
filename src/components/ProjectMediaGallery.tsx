import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Expand, Play, X } from 'lucide-react';
import type { ProjectMediaItem } from '../types/portfolio';

interface ProjectMediaGalleryProps {
  media: readonly ProjectMediaItem[];
  projectTitle: string;
}

function formatSlideCount(index: number, total: number): string {
  return `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

function cycleIndex(current: number, total: number, delta: -1 | 1): number {
  if (total <= 0) return 0;
  return (current + delta + total) % total;
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ProjectMediaGallery({ media, projectTitle }: ProjectMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPrefersReducedMotion);

  const safeIndex = activeIndex < media.length ? activeIndex : 0;
  const activeItem = media[safeIndex];

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen || !activeItem) {
      return undefined;
    }

    const handleCaptureKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        setIsLightboxOpen(false);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        event.stopImmediatePropagation();
        setActiveIndex((prev) => cycleIndex(prev, media.length, -1));
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopImmediatePropagation();
        setActiveIndex((prev) => cycleIndex(prev, media.length, 1));
      }
    };

    window.addEventListener('keydown', handleCaptureKeyDown, true);
    return () => window.removeEventListener('keydown', handleCaptureKeyDown, true);
  }, [activeItem, isLightboxOpen, media.length]);

  if (!activeItem) {
    return null;
  }

  const stepSlide = (delta: -1 | 1) => {
    setActiveIndex((prev) => cycleIndex(prev, media.length, delta));
  };

  const slideLabel = formatSlideCount(safeIndex, media.length);
  const kindLabel = activeItem.type === 'video' ? 'Motion demo' : 'Screenshot';
  const showReducedFallback = activeItem.type === 'video' && prefersReducedMotion;

  return (
    <>
      <figure
        className="project-gallery"
        aria-label={`${projectTitle} walkthrough and screenshots`}
      >
        <div className="project-media-stage">
          <button
            type="button"
            className="project-media-zoom-btn"
            onClick={() => setIsLightboxOpen(true)}
            aria-label={`Inspect ${activeItem.label} full screen`}
          >
            {activeItem.type === 'video' && !showReducedFallback ? (
              <video
                key={activeItem.src}
                className="project-media-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={activeItem.poster}
                aria-label={activeItem.alt}
              >
                <source src={activeItem.src} type="video/webm" />
              </video>
            ) : (
              <img
                src={showReducedFallback ? (activeItem.poster ?? activeItem.src) : activeItem.src}
                alt={activeItem.alt}
                className="project-media-img"
                loading="eager"
              />
            )}
            <span className="project-media-zoom-hint" aria-hidden="true">
              <Expand size={11} />
              <span>Expand</span>
            </span>
          </button>
        </div>

        <figcaption className="project-media-bar">
          <div className="project-media-meta">
            <span className="project-media-kind">{kindLabel}</span>
            <span className="project-media-caption">{activeItem.caption}</span>
          </div>

          {media.length > 1 && (
            <div className="pager-controls project-media-pager">
              <button
                type="button"
                className="pager-btn"
                onClick={() => stepSlide(-1)}
                aria-label="Previous media"
                title="Previous slide"
              >
                &lt;-
              </button>
              <span className="num" aria-label={`Slide ${safeIndex + 1} of ${media.length}`}>
                {slideLabel}
              </span>
              <button
                type="button"
                className="pager-btn"
                onClick={() => stepSlide(1)}
                aria-label="Next media"
                title="Next slide"
              >
                -&gt;
              </button>
            </div>
          )}
        </figcaption>

        {media.length > 1 && (
          <div className="project-media-thumbs" role="list" aria-label="Media slides">
            {media.map((item, idx) => {
              const isActive = idx === safeIndex;
              const thumbSrc = item.poster ?? item.src;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="listitem"
                  className={`project-media-thumb ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`${item.label} (${item.type === 'video' ? 'video' : 'screenshot'})`}
                >
                  <span className="project-thumb-frame">
                    <img src={thumbSrc} alt="" loading="lazy" />
                    {item.type === 'video' && (
                      <span className="project-thumb-play" aria-hidden="true">
                        <Play size={10} />
                      </span>
                    )}
                  </span>
                  <span className="project-thumb-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </figure>

      {isLightboxOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="media-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${projectTitle} media viewer`}
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="media-lightbox-dialog" onClick={(event) => event.stopPropagation()}>
              <div className="media-lightbox-head">
                <div className="media-lightbox-title-wrap">
                  <span className="project-media-kind">{kindLabel}</span>
                  <span className="media-lightbox-title">
                    {projectTitle} / {activeItem.label}
                  </span>
                </div>

                <div className="media-lightbox-actions">
                  {media.length > 1 && (
                    <div className="pager-controls">
                      <button
                        type="button"
                        className="pager-btn"
                        onClick={() => stepSlide(-1)}
                        aria-label="Previous slide in viewer"
                      >
                        &lt;-
                      </button>
                      <span className="num">{slideLabel}</span>
                      <button
                        type="button"
                        className="pager-btn"
                        onClick={() => stepSlide(1)}
                        aria-label="Next slide in viewer"
                      >
                        -&gt;
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    className="media-lightbox-close"
                    onClick={() => setIsLightboxOpen(false)}
                    aria-label="Close full-screen viewer"
                  >
                    <X size={14} aria-hidden="true" />
                    <span>Close (Esc)</span>
                  </button>
                </div>
              </div>

              <div className="media-lightbox-body">
                {activeItem.type === 'video' ? (
                  <video
                    key={activeItem.src}
                    className="media-lightbox-video"
                    controls
                    autoPlay={!prefersReducedMotion}
                    muted
                    loop
                    playsInline
                    poster={activeItem.poster}
                    aria-label={activeItem.alt}
                  >
                    <source src={activeItem.src} type="video/webm" />
                  </video>
                ) : (
                  <img src={activeItem.src} alt={activeItem.alt} className="media-lightbox-img" />
                )}
              </div>

              <p className="media-lightbox-caption">{activeItem.caption}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
