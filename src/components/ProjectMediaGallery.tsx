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

function findNextImageIndex(
  media: readonly ProjectMediaItem[],
  fromIndex: number,
  delta: -1 | 1,
): number {
  if (media.length === 0) return fromIndex;
  for (let step = 1; step <= media.length; step += 1) {
    const candidate = (fromIndex + delta * step + media.length * 2) % media.length;
    if (media[candidate].type === 'image') {
      return candidate;
    }
  }
  return fromIndex;
}

export function ProjectMediaGallery({ media, projectTitle }: ProjectMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const safeIndex = activeIndex < media.length ? activeIndex : 0;
  const activeItem = media[safeIndex];
  const imageCount = media.filter((item) => item.type === 'image').length;

  useEffect(() => {
    if (!isLightboxOpen || !activeItem || activeItem.type !== 'image') {
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
        setActiveIndex((prev) => findNextImageIndex(media, prev, -1));
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopImmediatePropagation();
        setActiveIndex((prev) => findNextImageIndex(media, prev, 1));
      }
    };

    window.addEventListener('keydown', handleCaptureKeyDown, true);
    return () => window.removeEventListener('keydown', handleCaptureKeyDown, true);
  }, [activeItem, isLightboxOpen, media]);

  if (!activeItem) {
    return null;
  }

  const stepSlide = (delta: -1 | 1) => {
    setActiveIndex((prev) => cycleIndex(prev, media.length, delta));
  };

  const stepLightboxImage = (delta: -1 | 1) => {
    setActiveIndex((prev) => findNextImageIndex(media, prev, delta));
  };

  const slideLabel = formatSlideCount(safeIndex, media.length);
  const kindLabel = activeItem.type === 'video' ? 'Video walkthrough' : 'Screenshot';

  return (
    <>
      <figure
        className="project-gallery"
        aria-label={`${projectTitle} walkthrough and screenshots`}
      >
        <div className="project-media-stage">
          {activeItem.type === 'video' ? (
            <>
              <video
                key={activeItem.src}
                className="project-media-video"
                controls
                muted
                loop
                playsInline
                preload="metadata"
                poster={activeItem.poster}
                aria-label={activeItem.alt}
              >
                <source src={activeItem.src} type="video/webm" />
              </video>
              <span className="project-media-badge" aria-hidden="true">
                <Play size={10} />
                <span>WEBM WALKTHROUGH</span>
              </span>
            </>
          ) : (
            <button
              type="button"
              className="project-media-zoom-btn"
              onClick={() => setIsLightboxOpen(true)}
              aria-label={`Inspect ${activeItem.label} full screen`}
            >
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="project-media-img"
                loading="eager"
              />
              <span className="project-media-zoom-hint" aria-hidden="true">
                <Expand size={11} />
                <span>Click to zoom</span>
              </span>
            </button>
          )}
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
        activeItem.type === 'image' &&
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
                  <span className="project-media-kind">Screenshot</span>
                  <span className="media-lightbox-title">
                    {projectTitle} / {activeItem.label}
                  </span>
                </div>

                <div className="media-lightbox-actions">
                  {imageCount > 1 && (
                    <div className="pager-controls">
                      <button
                        type="button"
                        className="pager-btn"
                        onClick={() => stepLightboxImage(-1)}
                        aria-label="Previous screenshot"
                      >
                        &lt;-
                      </button>
                      <span className="num">{slideLabel}</span>
                      <button
                        type="button"
                        className="pager-btn"
                        onClick={() => stepLightboxImage(1)}
                        aria-label="Next screenshot"
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
                <img src={activeItem.src} alt={activeItem.alt} className="media-lightbox-img" />
              </div>

              <p className="media-lightbox-caption">{activeItem.caption}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
