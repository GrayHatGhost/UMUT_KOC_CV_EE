"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ExternalLink, ImageIcon } from "lucide-react";

import Dialog from "@/components/dialog/Dialog";
import { type DesignWork } from "@/src/content/design-works";

type DesignLightboxProps = {
  work: DesignWork | null;
  onClose: () => void;
};

export default function DesignLightbox({
  work,
  onClose,
}: DesignLightboxProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [work?.id]);

  return (
    <Dialog
      isOpen={Boolean(work)}
      onClose={onClose}
      ariaLabel={
        work ? `${work.title} tasarımını incele` : "Tasarımı incele"
      }
      size="wide"
    >
      {work && (
        <article className="design-lightbox">
          <div className="design-lightbox__visual">
            <div className="design-lightbox__image-stage">
              {!imageFailed && work.image ? (
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, (max-width: 1200px) 65vw, 820px"
                  className="design-lightbox__image"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="design-lightbox__placeholder">
                  <ImageIcon size={28} aria-hidden="true" />

                  <span>Tasarım görseli eklenecek</span>

                  <small>{work.title}</small>
                </div>
              )}
            </div>
          </div>

          <aside className="design-lightbox__details">
            <div>
              <p className="design-lightbox__number">
                TASARIM {work.number}
              </p>

              <p className="design-lightbox__category">
                {work.category}
              </p>

              <h2 className="design-lightbox__title">
                {work.title}
              </h2>

              <p className="design-lightbox__purpose">
                {work.purpose}
              </p>
            </div>

            <dl className="design-lightbox__metadata">
              <div>
                <dt>Platform</dt>
                <dd>{work.platform}</dd>
              </div>

              <div>
                <dt>Araçlar</dt>
                <dd>{work.tools.join(" · ")}</dd>
              </div>

              {work.year && (
                <div>
                  <dt>Yıl</dt>
                  <dd>{work.year}</dd>
                </div>
              )}
            </dl>

            <a
              href={work.image}
              target="_blank"
              rel="noopener noreferrer"
              className="design-lightbox__original"
            >
              Görseli yeni sekmede aç
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </aside>

          <style jsx>{`
            .design-lightbox {
              min-height: min(
                820px,
                calc(100dvh - clamp(1.5rem, 4vw, 3rem))
              );
              display: grid;
              grid-template-columns:
                minmax(0, 1.48fr)
                minmax(270px, 0.52fr);
              background: var(--surface-dark);
              color: var(--ink);
            }

            .design-lightbox__visual {
              min-width: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: clamp(1rem, 3vw, 2.5rem);
              border-right: 1px solid var(--rule);
              background: #080808;
            }

            .design-lightbox__image-stage {
              position: relative;
              width: 100%;
              height: 100%;
              min-height: 34rem;
              overflow: hidden;
              background: #050505;
            }

            :global(.design-lightbox__image) {
              object-fit: contain;
            }

            .design-lightbox__placeholder {
              width: 100%;
              height: 100%;
              min-height: inherit;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 0.7rem;
              padding: 2rem;
              border: 1px solid var(--rule);
              color: var(--ink-3);
              text-align: center;
            }

            .design-lightbox__placeholder span {
              font-size: 0.6875rem;
              font-weight: 650;
              letter-spacing: 0.13em;
              text-transform: uppercase;
            }

            .design-lightbox__placeholder small {
              max-width: 24rem;
              color: var(--ink-3);
              font-size: 0.75rem;
              line-height: 1.5;
            }

            .design-lightbox__details {
              min-width: 0;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 3rem;
              padding:
                clamp(4.5rem, 7vw, 6.5rem)
                clamp(1.75rem, 4vw, 3.5rem)
                clamp(2rem, 4vw, 3.5rem);
              background: var(--surface);
            }

            .design-lightbox__number,
            .design-lightbox__category,
            .design-lightbox__metadata dt {
              color: var(--ink-3);
              font-size: 0.6875rem;
              font-weight: 650;
              letter-spacing: 0.13em;
              line-height: 1.5;
              text-transform: uppercase;
            }

            .design-lightbox__category {
              margin-top: 1rem;
            }

            .design-lightbox__title {
              max-width: 15ch;
              margin-top: 1.1rem;
              color: var(--ink);
              font-family:
                var(--font-display), var(--font-geist), Georgia, serif;
              font-size: clamp(2rem, 3.5vw, 3.75rem);
              font-weight: 700;
              letter-spacing: -0.045em;
              line-height: 1.02;
            }

            .design-lightbox__purpose {
              max-width: 38ch;
              margin-top: 1.5rem;
              color: var(--ink-2);
              font-size: 0.95rem;
              line-height: 1.75;
            }

            .design-lightbox__metadata {
              display: grid;
              border-top: 1px solid var(--rule);
            }

            .design-lightbox__metadata > div {
              display: grid;
              grid-template-columns: minmax(5.5rem, 0.45fr) minmax(0, 1fr);
              gap: 1.25rem;
              padding-top: 1rem;
              padding-bottom: 1rem;
              border-bottom: 1px solid var(--rule);
            }

            .design-lightbox__metadata dd {
              color: var(--ink-2);
              font-size: 0.875rem;
              line-height: 1.6;
            }

            .design-lightbox__original {
              display: inline-flex;
              width: fit-content;
              align-items: center;
              gap: 0.6rem;
              color: var(--ink-2);
              font-size: 0.8125rem;
              font-weight: 560;
              transition:
                color 0.22s var(--ease),
                transform 0.22s var(--ease);
            }

            .design-lightbox__original:hover,
            .design-lightbox__original:focus-visible {
              color: var(--ink);
              transform: translate(3px, -3px);
            }

            @media (max-width: 960px) {
              .design-lightbox {
                grid-template-columns: 1fr;
              }

              .design-lightbox__visual {
                min-height: 68dvh;
                border-right: 0;
                border-bottom: 1px solid var(--rule);
              }

              .design-lightbox__image-stage {
                min-height: 62dvh;
              }

              .design-lightbox__details {
                min-height: auto;
                padding-top: 3.5rem;
              }
            }

            @media (max-width: 767px) {
              .design-lightbox {
                min-height: 100dvh;
              }

              .design-lightbox__visual {
                min-height: 72dvh;
                padding:
                  max(4.25rem, env(safe-area-inset-top))
                  0.75rem
                  1rem;
              }

              .design-lightbox__image-stage {
                min-height: 64dvh;
              }

              .design-lightbox__details {
                gap: 2.5rem;
                padding:
                  2rem
                  1.25rem
                  max(2rem, env(safe-area-inset-bottom));
              }

              .design-lightbox__metadata > div {
                grid-template-columns: 5.25rem minmax(0, 1fr);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .design-lightbox__original {
                transition: none;
              }

              .design-lightbox__original:hover,
              .design-lightbox__original:focus-visible {
                transform: none;
              }
            }
          `}</style>
        </article>
      )}
    </Dialog>
  );
}
