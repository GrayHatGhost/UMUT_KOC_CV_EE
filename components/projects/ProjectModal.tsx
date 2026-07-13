"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";

import {
  aiApproachText,
  type Project,
} from "@/src/content/projects";
import Dialog from "@/components/dialog/Dialog";

type Props = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(
    () => new Set(),
  );

  useEffect(() => {
    setActiveImageIndex(0);
    setFailedImages(new Set());
  }, [project?.id]);

  const images = project?.images ?? [];

  const activeImage = useMemo(
    () => images[activeImageIndex],
    [activeImageIndex, images],
  );

  if (!project) return null;

  const hasActiveImage =
    Boolean(activeImage?.src) && !failedImages.has(activeImageIndex);

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  const markImageAsFailed = (index: number) => {
    setFailedImages((current) => {
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={project.title}
      size="wide"
    >
      <article className="project-modal">
        <header className="project-modal__header">
          <p className="t-label">
            PROJE {project.number} · {project.category}
          </p>

          <h2 className="project-modal__title">
            {project.title}
          </h2>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal__live-link"
            >
              Canlı projeyi görüntüle
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </header>

        <div className="project-modal__layout">
          <div className="project-modal__main">
            <section
              aria-labelledby={`project-summary-${project.id}`}
              className="project-modal__section"
            >
              <h3
                id={`project-summary-${project.id}`}
                className="project-modal__section-label"
              >
                PROJE ÖZETİ
              </h3>

              <div className="project-modal__paragraphs">
                {project.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section
              aria-labelledby={`project-images-${project.id}`}
              className="project-modal__section"
            >
              <div className="project-modal__section-heading">
                <h3
                  id={`project-images-${project.id}`}
                  className="project-modal__section-label"
                >
                  EKRAN GÖRÜNTÜLERİ
                </h3>

                {images.length > 1 && (
                  <p className="project-modal__image-count">
                    {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </p>
                )}
              </div>

              <div className="project-gallery">
                <div className="project-gallery__stage">
                  {hasActiveImage ? (
                    <img
                      src={activeImage.src}
                      alt={activeImage.alt}
                      loading={activeImageIndex === 0 ? "eager" : "lazy"}
                      onError={() =>
                        markImageAsFailed(activeImageIndex)
                      }
                    />
                  ) : (
                    <div className="project-gallery__placeholder">
                      <ImageIcon size={24} aria-hidden="true" />
                      <span>Proje ekran görüntüsü eklenecek</span>
                      <small>{project.title}</small>
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="project-gallery__control project-gallery__control--previous"
                        onClick={showPreviousImage}
                        aria-label="Önceki proje görseli"
                      >
                        <ChevronLeft size={19} />
                      </button>

                      <button
                        type="button"
                        className="project-gallery__control project-gallery__control--next"
                        onClick={showNextImage}
                        aria-label="Sonraki proje görseli"
                      >
                        <ChevronRight size={19} />
                      </button>
                    </>
                  )}
                </div>

                {activeImage?.caption && (
                  <p className="project-gallery__caption">
                    {activeImage.caption}
                  </p>
                )}

                {images.length > 1 && (
                  <div
                    className="project-gallery__thumbnails"
                    aria-label="Proje görselleri"
                  >
                    {images.map((image, index) => {
                      const imageAvailable =
                        Boolean(image.src) && !failedImages.has(index);

                      return (
                        <button
                          key={`${image.src}-${index}`}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          className={[
                            "project-gallery__thumbnail",
                            activeImageIndex === index
                              ? "project-gallery__thumbnail--active"
                              : "",
                          ].join(" ")}
                          aria-label={`${index + 1}. proje görselini göster`}
                          aria-current={
                            activeImageIndex === index
                              ? "true"
                              : undefined
                          }
                        >
                          {imageAvailable ? (
                            <img
                              src={image.src}
                              alt=""
                              loading="lazy"
                              onError={() => markImageAsFailed(index)}
                            />
                          ) : (
                            <ImageIcon
                              size={16}
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            <section
              aria-labelledby={`project-approach-${project.id}`}
              className="project-modal__section project-modal__approach"
            >
              <h3
                id={`project-approach-${project.id}`}
                className="project-modal__section-label"
              >
                NASIL GELİŞTİRDİM?
              </h3>

              <div className="project-modal__approach-copy">
                {aiApproachText.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </div>

          <aside className="project-modal__aside">
            <MetaList
              title="ROLÜM VE SÜREÇ"
              items={project.role}
            />

            <MetaList
              title="OLUŞTURULAN ÖZELLİKLER"
              items={project.features}
            />

            <MetaList
              title="ÖĞRENDİKLERİM"
              items={project.learnings}
            />
          </aside>
        </div>
      </article>

      <style jsx>{`
        .project-modal {
          min-height: 100%;
          padding: clamp(2rem, 5vw, 4rem);
          background: var(--surface-dark);
          color: var(--ink);
        }

        .project-modal__header {
          padding-right: clamp(1.5rem, 4vw, 4rem);
          padding-bottom: clamp(2.5rem, 5vw, 4.5rem);
          border-bottom: 1px solid var(--rule);
        }

        .project-modal__title {
          max-width: 22ch;
          margin-top: 1rem;
          color: var(--ink);
          font-family:
            var(--font-display), var(--font-geist), Georgia, serif;
          font-size: clamp(2rem, 4.2vw, 4.25rem);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.02;
        }

        .project-modal__live-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 1.75rem;
          color: var(--ink-2);
          font-size: 0.875rem;
          font-weight: 560;
          transition:
            color 0.25s var(--ease),
            transform 0.25s var(--ease);
        }

        .project-modal__live-link:hover,
        .project-modal__live-link:focus-visible {
          color: var(--ink);
          transform: translate(3px, -3px);
        }

        .project-modal__layout {
          display: grid;
          grid-template-columns: minmax(0, 1.42fr) minmax(250px, 0.58fr);
          gap: clamp(3rem, 7vw, 7rem);
          padding-top: clamp(3rem, 6vw, 5rem);
        }

        .project-modal__main,
        .project-modal__aside {
          min-width: 0;
        }

        .project-modal__section {
          padding-bottom: clamp(3rem, 6vw, 5rem);
        }

        .project-modal__section + .project-modal__section {
          padding-top: clamp(3rem, 6vw, 5rem);
          border-top: 1px solid var(--rule);
        }

        .project-modal__section-heading {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: baseline;
        }

        .project-modal__section-label {
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.14em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .project-modal__paragraphs,
        .project-modal__approach-copy {
          display: grid;
          gap: 1.1rem;
          max-width: 66ch;
          margin-top: 1.5rem;
        }

        .project-modal__paragraphs p {
          color: var(--ink-2);
          font-size: 1rem;
          line-height: 1.78;
        }

        .project-modal__approach {
          padding: clamp(2rem, 4vw, 3rem);
          border: 1px solid var(--rule);
          background: var(--surface);
        }

        .project-modal__approach-copy p {
          color: var(--ink-2);
          font-size: 0.9375rem;
          line-height: 1.78;
        }

        .project-modal__image-count {
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .project-gallery {
          margin-top: 1.5rem;
        }

        .project-gallery__stage {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border: 1px solid var(--rule);
          background: var(--surface);
        }

        .project-gallery__stage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-gallery__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 2rem;
          color: var(--ink-3);
          text-align: center;
        }

        .project-gallery__placeholder span {
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .project-gallery__placeholder small {
          color: var(--ink-3);
          font-size: 0.75rem;
        }

        .project-gallery__control {
          position: absolute;
          top: 50%;
          width: 2.75rem;
          height: 2.75rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--rule-strong);
          border-radius: 999px;
          background: rgba(8, 8, 8, 0.88);
          color: var(--ink);
          transform: translateY(-50%);
          transition:
            background-color 0.2s var(--ease),
            border-color 0.2s var(--ease);
        }

        .project-gallery__control:hover,
        .project-gallery__control:focus-visible {
          border-color: rgba(255, 255, 255, 0.5);
          background: #080808;
        }

        .project-gallery__control--previous {
          left: 1rem;
        }

        .project-gallery__control--next {
          right: 1rem;
        }

        .project-gallery__caption {
          margin-top: 0.8rem;
          color: var(--ink-3);
          font-size: 0.8125rem;
          line-height: 1.6;
        }

        .project-gallery__thumbnails {
          display: flex;
          gap: 0.7rem;
          overflow-x: auto;
          margin-top: 1rem;
          padding-bottom: 0.35rem;
        }

        .project-gallery__thumbnail {
          width: 5.4rem;
          aspect-ratio: 16 / 9;
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid var(--rule);
          background: var(--surface);
          color: var(--ink-3);
          opacity: 0.56;
          transition:
            opacity 0.2s var(--ease),
            border-color 0.2s var(--ease);
        }

        .project-gallery__thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-gallery__thumbnail--active {
          border-color: rgba(255, 255, 255, 0.55);
          opacity: 1;
        }

        .project-modal__aside {
          align-self: start;
          position: sticky;
          top: 2rem;
        }

        @media (max-width: 960px) {
          .project-modal__layout {
            grid-template-columns: 1fr;
          }

          .project-modal__aside {
            position: static;
          }
        }

        @media (max-width: 767px) {
          .project-modal {
            padding: 1.25rem;
          }

          .project-modal__header {
            padding-right: 2.5rem;
          }

          .project-modal__layout {
            gap: 3rem;
          }

          .project-modal__approach {
            padding: 1.25rem;
          }

          .project-gallery__control {
            width: 2.5rem;
            height: 2.5rem;
          }

          .project-gallery__control--previous {
            left: 0.65rem;
          }

          .project-gallery__control--next {
            right: 0.65rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-modal__live-link,
          .project-gallery__control,
          .project-gallery__thumbnail {
            transition: none;
          }

          .project-modal__live-link:hover,
          .project-modal__live-link:focus-visible {
            transform: none;
          }
        }
      `}</style>
    </Dialog>
  );
}

function MetaList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="meta-list">
      <h3>{title}</h3>

      <ul>
        {items.map((item) => (
          <li key={item}>
            <span aria-hidden="true">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .meta-list {
          padding-top: 1.5rem;
          padding-bottom: 2rem;
          border-top: 1px solid var(--rule);
        }

        .meta-list h3 {
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.14em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .meta-list ul {
          display: grid;
          gap: 0.72rem;
          margin-top: 1.2rem;
          list-style: none;
        }

        .meta-list li {
          display: grid;
          grid-template-columns: 0.8rem minmax(0, 1fr);
          gap: 0.55rem;
          color: var(--ink-2);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .meta-list li > span:first-child {
          color: var(--ink-3);
        }
      `}</style>
    </section>
  );
}
